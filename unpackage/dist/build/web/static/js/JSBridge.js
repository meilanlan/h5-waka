var u = navigator.userAgent,
    inAPP =
        /micromessenger/i.test(u) === false &&
        (typeof window.webkit !== "undefined" ||
            typeof window.WKWebViewJavascriptBridge !== "undefined"),
    apiHeaders = false, //xhr請求使用
    isiOS = (isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)),
    methods = {
        getParam: function (name) {
            var reg = new RegExp("[?&]+" + name + "=([^?^#^&]+)");
            try {
                return unescape(window.location.href.match(reg)[1]);
            } catch (e) {
                return null;
            }
        },
    },
    JSQueryInitInfoObj = {},
    urlUid = methods.getParam("HTTP_USER_UID") || 0,
    urlToken =
        methods.getParam("HTTP_USER_TOKEN") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzIzNTY2MjksImlhdCI6MTczMTQ5MjYyOSwicGxhdCI6MSwidXNlcklkIjoxMDAwMDAwN30.GVcQHy6Eiyg4AXXuc1V2f-3cyspIvCJ3vRdWz52u7rU",
    urlAnchor = methods.getParam("anchor_pfid") || 0,
    urlLiveId = methods.getParam("live_id") || 0,
    data4app,
    WKWVJBCallbacks = [],
    getUserinfoCallback = [],
    getAnchorinfoCallback = [],
    JSNavigationBarCallback = [],
    JSRegMsgTypeCallback = [],
    userinfo;
    
if (inAPP) {
    if (isiOS) {
        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(
            null
        );
    }
}
window.JSSetInitInfo = function (res) {
    res = res.replace(/[\f\r\t\v]+/g, "");
    res = res.replace(/\n/g, "<br>");
    window.userinfo = JSON.parse(res);
    while (window.getUserinfoCallback.length) {
        window.getUserinfoCallback.shift()(window.userinfo);
    }
};
window.client = {
    getUserinfo(callback) {
        if (window.inAPP) {
            window.getUserinfoCallback.push(callback); //记住这次请求，加入到请求队列
            window.getUserInfo_toBridge(); //去主动找客户端获取
        } else {
            window.userinfo = {
                user: {
                    auth_token: urlToken,
                },
            };
            if (typeof callback === "function") callback(window.userinfo);
        }
    },
    //登录-弹出登录界面
    openJSLogin(callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSLogin",
                {},
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            window.WKWebViewJavascriptBridge.JSLogin();
        }
    },
    //客户端登出
    setJSLogout(callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSLogout",
                {},
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            window.WKWebViewJavascriptBridge.JSLogout();
        }
    },
    //关闭当前web界面
    closeWebview(option, callback) {
        let op = option || {};
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSCloseWindow",
                op,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            window.WKWebViewJavascriptBridge.JSCloseWindow();
        }
    },

    //关闭当前web界面
    closeWebviewWallet(option, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSCloseWindow",
                option,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            window.WKWebViewJavascriptBridge.JSCloseWindow();
        }
    },
    //拉起当前webview
    spackBack(callback) {
        if (isiOS) {
            console.log("进来调用ios");
            window.WKWebViewJavascriptBridge.callHandler(
                "JSUserSpaceBack",
                {},
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            console.log("进来调用");
            this.closeWebview();
        }
    },
    // 供web沉浸式支持使用
    JSNavigationBar(callback, iosData, anData) {
        if (window.WKWebViewJavascriptBridge) {
            window.JSNavigationBar_toBridge(callback, iosData, anData);
        } else {
            window.JSNavigationBarCallback.push([callback, iosData, anData]);
        }
    },
    // 供web沉浸式支持使用
    JSGetParentWindowType(callback) {
        if (window.WKWebViewJavascriptBridge) {
            window.JSGetParentWindowType_toBridge(callback);
        } else {
            window.JSGetParentWindowTypeCallback.push([callback]);
        }
    },
    // web to app的路由支持
    JSAction(paramData, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSAction",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            // var anres = window.WKWebViewJavascriptBridge.JSAction(
            //     `art://com.lang.art?action=${JSON.stringify(paramData)}`
            // );
            var anres = window.WKWebViewJavascriptBridge.JSAction(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(anres);
        }
    },
    // 唤起客户端支付：购买机器人套餐
    BuyRobotJSAction(paramData, callback) {
      if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSPay",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var jsPayCallBack = window.WKWebViewJavascriptBridge.JSPay(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(jsPayCallBack);
        }
      }else{
        h5Toast("请在客户端开启支付");
      }
    },
    // 唤起客户端支付宝授权
    JSBindAlipayJSAction(paramData, callback) {
      if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSBindAlipay",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var jsPayCallBack = window.WKWebViewJavascriptBridge.JSBindAlipay(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(jsPayCallBack);
        }
      }else{
        h5Toast("请在客户端开启授权");
      }
    },
    // 唤起客户端微信授权
    JSBindWechatJSAction(paramData, callback) {
      if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSBindWechat",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var jsPayCallBack = window.WKWebViewJavascriptBridge.JSBindWechat(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(jsPayCallBack);
        }
      }else{
        h5Toast("请在客户端开启授权");
      }
    },
    
    // 唤起app端播放
    JSOpenVideoPlay(param) {
        if (window.inAPP) {
            var paramData = { id: 19, url: param };
            console.log(paramData);
            this.JSAction(paramData);
        } else {
            h5Toast("请在客户端播发");
        }
    },
    // 获取当前用户标签url
    JSQueryIconInfoByTag(paramData, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSQueryIconInfoByTag",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var anres = window.WKWebViewJavascriptBridge.JSQueryIconInfoByTag(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(anres);
        }
    },
    // web to app的路由支持
    JSAnswerResult(paramData, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSAnswerResult",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var anres = window.WKWebViewJavascriptBridge.JSAnswerResult(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(anres);
        }
    },
    // toast
    toast(msg) {
        if (window.inAPP) {
            var paramData = { id: "1004", param: { toast: msg } };
            this.JSAction(paramData);
        } else {
            h5Toast(msg);
        }
    },
    // JSRegMsgType
    JSRegMsgType(array, callback) {
        if (typeof callback === "function") {
            window.orderCallback.push(callback);
        }
        if (window.WKWebViewJavascriptBridge) {
            window.JSRegMsgType_toBridge(array);
        } else {
            window.JSRegMsgTypeCallback.push(array);
        }
        // console.log('JSRegMsgType订阅成功' + array)
        // if (typeof callback === 'function') {
        //     window.orderCallback.push(callback);
        // }
        // if (isiOS) {
        //     window.WKWebViewJavascriptBridge.callHandler('JSRegMsgType', array);
        // } else {
        //     window.WKWebViewJavascriptBridge.JSRegMsgType(JSON.stringify(array));
        // }
    },

    // JSWebBroadcast web广播消息
    JSWebBroadcast(param) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSWebBroadcast",
                param
            );
        } else {
            window.WKWebViewJavascriptBridge.JSWebBroadcast(
                JSON.stringify(param)
            );
        }
    },

    // 提供h5系统相册方法
    upPhoto(paramData, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSPhotoAlbum",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var url = window.WKWebViewJavascriptBridge.JSPhotoAlbum(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(url);
        }
    },
    //分享截屏图片
    Share_Image(paramData, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSShareSnapshotImage",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var url = window.WKWebViewJavascriptBridge.JSShareSnapshotImage(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(url);
        }
    },
    // 更新数据
    JSUpdateBalance(balance) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler("JSUpdateBalance", {
                balance: balance,
            });
        } else {
            window.WKWebViewJavascriptBridge.JSUpdateBalance({
                balance: balance,
            });
        }
    },
    // 订阅vip
    JSOrderVip(prodid, cash) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler("JSOrderVip", {
                prod_id: prodid,
            });
        } else {
            window.WKWebViewJavascriptBridge.JSOrderVip(
                JSON.stringify({ prod_id: prodid, cash: Number(cash) })
            );
        }
    },
    // 通知客户端已订阅vip
    JSVipNotice() {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler("JSVipNotice", {
                finished: 1,
            });
        } else {
            window.WKWebViewJavascriptBridge.JSVipNotice(
                JSON.stringify({ finished: 1 })
            );
        }
    },
    // 打开一个新页面(url, show_title)  show_title如果为0  需要web自己沉浸手机状态栏
    openPage(url, show_title) {
        if (window.inAPP) {
            var paramData = {
                id: "1",
                param: {
                    url: String(url),
                    show_title: Number(show_title),
                },
            };
            // this.JSAction(paramData)
            if (isiOS) {
                window.WKWebViewJavascriptBridge.callHandler(
                    "JSAction",
                    paramData,
                    function (cre) {
                        //clientReturn
                        if (typeof callback === "function") callback(cre);
                    }
                );
            } else {
                // var anres = window.WKWebViewJavascriptBridge.JSAction(`murmur://com.lang.voice?action=${paramData}`);
                var anres = window.WKWebViewJavascriptBridge.JSAction(
                    JSON.stringify(paramData)
                );
                if (typeof callback === "function") callback(anres);
            }
        } else {
            this.toast("此方法僅支持在app內使用");
        }
    },
    JSResourceCheck(r_id, callback) {
        if (window.inAPP) {
            var paramData = {
                r_id: String(r_id),
            };
            if (isiOS) {
                window.WKWebViewJavascriptBridge.callHandler(
                    "JSResourceCheck",
                    paramData,
                    function (cre) {
                        //clientReturn
                        if (typeof callback === "function") callback(cre);
                    }
                );
            } else {
                var anres = window.WKWebViewJavascriptBridge.JSResourceCheck(
                    JSON.stringify(paramData)
                );
                if (typeof callback === "function") callback(anres);
            }
        } else {
            this.toast("此方法僅支持在app內使用");
        }
    },
    // 提供h5系统获取举报信息
    JSReportData(callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSReportData",
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var url = window.WKWebViewJavascriptBridge.JSReportData();
            if (typeof callback === "function") callback(JSON.parse(url));
        }
    },
    // 提供h5传递预加载信息
    JSPreLoad(paramData, callback) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSPreLoadCallback",
                paramData,
                function (cre) {
                    //clientReturn
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            var url = window.WKWebViewJavascriptBridge.JSPreLoadCallback(
                JSON.stringify(paramData)
            );
            if (typeof callback === "function") callback(url);
        }
    },
    // // 预加载H5通知安卓客户端JSWebInited
    JSWebInited() {
        if (!isiOS && window.inAPP) {
            console.log("调用方法JSWebInited");
            window.WKWebViewJavascriptBridge.JSWebInited();
        }
    },
    // 复制文本
    JsCopyText(text) {
        if (window.inAPP) {
            if (isiOS) {
                window.WKWebViewJavascriptBridge.callHandler("JSCopyString", {
                    text: text,
                });
                this.toast("Copy succeeded");
            } else {
                window.WKWebViewJavascriptBridge.JSCopyString(text);
            }
        } else {
            this.toast("此方法僅支持在app內使用");
        }
    },
    // 分享URL
    JsShareUrl(url) {
        if (window.inAPP) {
            // this.JSAction(paramData)
            if (isiOS) {
                let paramData = {
                    id: "1003",
                    param: {
                        share_url: String(url),
                        share_content_type: 3,
                    },
                };
                window.WKWebViewJavascriptBridge.callHandler(
                    "JSAction",
                    paramData,
                    function (cre) {
                        //clientReturn
                        if (typeof callback === "function") callback(cre);
                    }
                );
            } else {
                // var anres = window.WKWebViewJavascriptBridge.JSAction(`murmur://com.lang.voice?action=${paramData}`);
                let paramData = {
                    id: "1003",
                    param: {
                        url: String(url),
                        share_content_type: 3,
                    },
                };
                var anres = window.WKWebViewJavascriptBridge.JSAction(
                    JSON.stringify(paramData)
                );
                if (typeof callback === "function") callback(anres);
            }
        } else {
            this.toast("此方法僅支持在app內使用");
        }
    },
};

if (window.inAPP) {
    if (isiOS) {
        var loopGetTime = 0;
        var loopGet = setInterval(function () {
            loopGetTime += 10;
            if (loopGetTime >= 10000) {
                // window.client.toast("网络超时，请关闭页面，重新进入！");
                clearInterval(loopGet);
                return false;
            }
            if (window.WKWebViewJavascriptBridge) {
                window.WKWebViewJavascriptBridge.registerHandler(
                    "UserSpaceNativeMinsized",
                    UserSpaceNativeMinsized
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSPhotoAlbumCallBack",
                    JSPhotoAlbumCallBack
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSShareSnapshotImage",
                    JSShareSnapshotImageCallBack
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSSetInitInfo",
                    JSSetInitInfo
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSOpenRTCAudioPlayerCompleted",
                    JSOpenRTCAudioPlayerCompleted
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSCalendarAccessCallback",
                    JSCalendarAccessCallback
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSRealTimeData",
                    JSRealTimeData
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSUpdateData",
                    JSUpdateData
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSBridgeAppNoticeH5",
                    JSBridgeAppNoticeH5
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSBridgeBuySuc",
                    JSBridgeBuySuc
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSWeb3WalletVerifyCallback",
                    JSWeb3WalletVerifyCallback
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSPayResultCallBack",
                    JSPayResultCallBack
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSNoticeResultCallBack",
                    JSNoticeResultCallBack
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSBindAlipay",
                    JSBindAlipay
                );
                window.WKWebViewJavascriptBridge.registerHandler(
                    "JSBindWechat",
                    JSBindWechat
                );
                
                //window.WKWebViewJavascriptBridge.registerHandler('JSOrderVipCallBack', JSOrderVipCallBack);
                // -------------执行所有已经注册了的callback-----------------
                window.WKWebViewJavascriptBridge.callHandler(
                    "JSQueryInitInfo",
                    {},
                    function (cre) {
                        //clientReturn
                        window.JSSetInitInfo(cre);
                    }
                );
                while (window.JSNavigationBarCallback.length > 0) {
                    var callbackObj = window.JSNavigationBarCallback.shift();
                    window.JSNavigationBar_toBridge(
                        callbackObj[0],
                        callbackObj[1],
                        callbackObj[2]
                    );
                }
                while (window.JSRegMsgTypeCallback.length > 0) {
                    window.JSRegMsgType_toBridge(
                        window.JSRegMsgTypeCallback.shift()
                    );
                }
                clearInterval(loopGet);
            }
        }, 10);
    } else {
        window.client.JSWebInited();
    }
}

window.JSPhotoAlbumCallBack = function (res) {
    // ios返回的res是object类型   安卓返回的res是string 需要JSON.parse转一下
    if (typeof window.updateImgAfter === "function") {
        window.updateImgAfter(res);
    }
};

 // 安卓支付回调函数
window.JSPayResultCallBack = function (res) {
  // ios返回的res是object类型   安卓返回的res是string 需要JSON.parse转一下
  if (typeof window.pay_result_after === "function") {
      window.pay_result_after(res);
  }
};
// 客户端通知h5更新数据
window.JSNoticeResultCallBack = function(res){
  if (typeof window.notice_result_callback === "function") {
      window.notice_result_callback(res);
  }
};

window.JSShareSnapshotImageCallBack = function (res) {
    // ios返回的res是object类型   安卓返回的res是string 需要JSON.parse转一下
    if (typeof window.Share_Image_after === "function") {
        window.Share_Image_after(res);
    }
};

window.UserSpaceNativeMinsized = function (res) {
    // ios返回的res是object类型   安卓返回的res是string 需要JSON.parse转一下
    if (typeof window.updateTopNav === "function") {
        window.updateTopNav(res);
    }
};

window.JSOpenRTCAudioPlayerCompleted = function (res) {
    // window.client.toast(JSON.stringify(res))
    // alert(JSON.stringify(res))
};
window.JSCalendarAccessCallback = function (res) {
    // window.client.toast(JSON.stringify(res))
    // alert(JSON.stringify(res))
};
//app發送數據調用function
window.JSRealTimeData = function (_data) {
    window.data4app = _data;
};

window.orderCallback = [];
window.JSUpdateData = function (res) {
    console.log(res, "res的结果是：");
    typeof res === "string" && (res = JSON.parse(res));
    if (100 === ~~res.msg_type) {
        typeof window.orderVipAfter === "function" &&
            window.orderVipAfter(res.content);
    } else if (104 === ~~res.msg_type) {
        // 认证回调
        typeof window.authResultAfter === "function" &&
            window.authResultAfter(res.content);
    } else if (105 === ~~res.msg_type) {
        // 充值回调
        typeof window.rechargeAfter === "function" &&
            window.rechargeAfter(res.content);
    } else {
        if (window.orderCallback.length) {
            for (var i = 0; i < window.orderCallback.length; i++) {
                window.orderCallback[i](res);
            }
        }
    }
};
window.JSBridgeAppNoticeH5 = function (res) {
    window.localStorage.removeItem("JSBridgeAppNoticeH5");
    window.localStorage.setItem("JSBridgeAppNoticeH5", JSON.stringify(res));
    let flag = typeof window.getAppNoticeH5 === "function";
    window.localStorage.removeItem("flag");
    window.localStorage.setItem("flag", flag);
    let setIntervalTime = "";
    if (typeof window.getAppNoticeH5 === "function") {
        window.getAppNoticeH5(res);
    } else {
        setIntervalTime = setInterval(() => {
            console.log("setIntervalTime");
            if (typeof window.getAppNoticeH5 === "function") {
                let flag2 = typeof window.getAppNoticeH5 === "function";
                window.localStorage.setItem("flag2", flag2);
                window.getAppNoticeH5(res);
                // clearInterval(setIntervalTime);
            }
        }, 40);
    }
};
// 主动获取传递的参数
window.JSWebGetPageData_toBridge = function (callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSWebGetPageData",
            {},
            function (res) {
                if (typeof callback === "function") callback(res);
            }
        );
    } else {
        var res = window.WKWebViewJavascriptBridge.JSWebGetPageData();
        if (typeof callback === "function") {
            callback(res);
        }
    }
};

window.JSCloseWindowCompleted = function (res) {
    if (typeof window.JSBridgeAppNoticeH5Update === "function") {
        window.JSBridgeAppNoticeH5Update(res);
    }
};

window.getUserInfo_toBridge = function (callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSQueryInitInfo",
            {},
            function (cre) {
                //clientReturn
                window.JSSetInitInfo(cre);
            }
        );
    } else {
        var userObj = window.WKWebViewJavascriptBridge.JSQueryInitInfo();
        window.JSSetInitInfo(userObj);
    }
};

window.JSNavigationBar_toBridge = function (callback, iosData, anData) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSNavigationBar",
            iosData,
            function (cre) {
                //clientReturn
                if (typeof callback === "function") callback(cre);
            }
        );
    } else {
        var pTop = window.WKWebViewJavascriptBridge.JSNavigationBar(anData);
        if (typeof callback === "function") callback(pTop);
    }
};
window.JSGetParentWindowType_toBridge = function (callback) {
    var isDialog = window.WKWebViewJavascriptBridge.JSGetParentWindowType();
    if (typeof callback === "function") callback(isDialog);
};
window.JSRegMsgType_toBridge = function (array) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler("JSRegMsgType", array);
    } else {
        window.WKWebViewJavascriptBridge.JSRegMsgType(JSON.stringify(array));
    }
};
// JSWeb3WalletLogin  钱包登录
window.JSWeb3WalletLogin = function (obj) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler("JSWeb3WalletLogin", obj);
    } else {
        window.WKWebViewJavascriptBridge.JSWeb3WalletLogin(JSON.stringify(obj));
    }
};
// 通知客户端设置生物验证 钱包登录
window.JSWeb3WalletInit = function (obj) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler("JSWeb3WalletInit", obj);
    } else {
        window.WKWebViewJavascriptBridge.JSWeb3WalletInit(JSON.stringify(obj));
    }
};

// JSWeb3WalletLogin  钱包登录  安卓切换回app   ios用不上
window.JSBringToTop = function (obj) {
    if (isiOS) {
    } else {
        window.WKWebViewJavascriptBridge.JSBringToTop();
    }
};

// 把链接成功的钱包对象给客户端
window.JSWeb3SetWalletConnectStorage_Bridge = function (obj) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSWeb3SetWalletConnectStorage",
            obj
        );
    } else {
        window.WKWebViewJavascriptBridge.JSWeb3SetWalletConnectStorage(
            JSON.stringify(obj)
        );
    }
};
// 从客户端获取之前缓存的对象
window.JSWeb3GetWalletConnectStorage_Bridge = function (callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSWeb3GetWalletConnectStorage",
            function (cre) {
                //clientReturn
                if (typeof callback === "function") callback(cre);
            }
        );
    } else {
        let res =
            window.WKWebViewJavascriptBridge.JSWeb3GetWalletConnectStorage();
        if (typeof callback === "function") callback(res);
    }
};
// 通知客户端删除缓存的对象
window.JSWeb3RemoveWalletConnectStorage_Bridge = function (callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSWeb3RemoveWalletConnectStorage"
        );
    } else {
        window.WKWebViewJavascriptBridge.JSWeb3RemoveWalletConnectStorage();
    }
};

// 自定义钱包把链接成功的钱包对象给客户端
window.JSWeb3WalletStorage_Bridge = function (obj, callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSWeb3WalletStorage",
            obj,
            function (cre) {
                if (typeof callback === "function") callback(cre);
            }
        );
    } else {
        let res = window.WKWebViewJavascriptBridge.JSWeb3WalletStorage(
            obj.type,
            obj.key.toString(),
            JSON.stringify(obj.value)
        );
        console.log(res, "res安卓触发");
        if (typeof callback === "function") callback(res);
    }
};

//查询钱包app是否安装
window.JSAppIsInStall_Bridge = function (callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSAppIsInstall",
            function (cre) {
                if (typeof callback === "function") callback(cre);
            }
        );
    } else {
        let res = window.WKWebViewJavascriptBridge.JSAppIsInstall();
        if (typeof callback === "function") callback(res);
    }
};
// JSWeb3GetWalletAddr
// 主动向APP端查询钱包地址
window.JSWeb3GetWalletAddr_Bridge = function (callback) {
    if (isiOS) {
        window.WKWebViewJavascriptBridge.callHandler(
            "JSWeb3GetWalletAddr",
            function (cre) {
                if (typeof callback === "function") callback(cre);
            }
        );
    } else {
        let res = window.WKWebViewJavascriptBridge.JSWeb3GetWalletAddr();
        if (typeof callback === "function") callback(res);
    }
};

//H5支付保证金或出价成功后，通知客户端刷新页面
window.JSWebPageBackResult = function (callback) {
    if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSWebPageBackResult",
                function (cre) {
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            let res = window.WKWebViewJavascriptBridge.JSWebPageBackResult();
            if (typeof callback === "function") callback(res);
        }
    }
};

//H5隐藏输入键盘
window.JSHideKeyboard_toBridge = function (callback) {
    if (window.inAPP) {
        if (isiOS) {
        } else {
            window.WKWebViewJavascriptBridge.JSHideKeyboard();
        }
    }
};

//钱包交互成功给客户端的回调通知事件
// case unknown = 0

// ///挂单 指用户主动卖出NFT，可以用NATIVE（ETH）或者ERC-20（WETH）挂单
// case listing = 1

// ///出价 对一个尚未出售的NFT出价，这个时候用的货币是ERC-20（WETH）出价
// case offer = 2

// ///购买 直接购买挂单的NFT，根据挂单的货币类型结算
// case buy = 3

// ///接受 指接受对方的offer，直接售出NFT，此时会以ERC-20（WETH）结算
// case accept = 4

// ///取消 指用户取消挂单或者出价
// case cancel = 5
// ///授权 在交易过程中，需要授权“代理人”对ERC-721、ERC-20（WETH）以及NATIVE进行转移操作
// case approval = 6

// event_result   成功签名&确认支付：1    失败：取消&拒绝支付：2

// 回传参数 ex: ["wallet_event": 1, "event_result": 1]  购买成功["wallet_event": 3, "event_result": 1]
window.JSWalletInteract = function (obj) {
    if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSWalletInteract",
                obj
            );
        } else {
            window.WKWebViewJavascriptBridge.JSWalletInteract(
                JSON.stringify(obj)
            );
        }
    }
};

// 保存图片或者分享
// obj{
// type:1分享    2保存图片
// }
window.JSShareImage = function (obj, callback) {
    if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSShareImage",
                obj,
                function (cre) {
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            let res = window.WKWebViewJavascriptBridge.JSShareImage(
                JSON.stringify(obj)
            );
            if (typeof callback === "function") callback(res);
        }
    }
};
// JSAppVersion  获取客户端版本号

window.JSAppVersion = function (callback) {
    if (window.inAPP) {
        if (window.isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSAppVersion",
                function (cre) {
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            let res = window.WKWebViewJavascriptBridge.JSAppVersion();
            if (typeof callback === "function") callback(res);
        }
    }
};
window.JSUpdateUserCenterInfo = function () {
    if (window.inAPP) {
        if (window.isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSUpdateUserCenterInfo"
            );
        } else {
            window.WKWebViewJavascriptBridge.JSUpdateUserCenterInfo();
        }
    }
};
// 购买成功  客户端回调通知
window.JSBridgeBuySuc = function (res) {
    console.log(res, "JSBridgeBuySuc");
    if (window.JSBridgeBuySucPage) {
        window.JSBridgeBuySucPage(res);
    }
};
// 新手引导任务   通知客户端
window.JSQueryGuideInfo = function (type) {
    if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler("JSQueryGuideInfo", {
                step: type.toString(),
            });
        } else {
            let res = window.WKWebViewJavascriptBridge.JSQueryGuideInfo(
                JSON.stringify({
                    step: type.toString(),
                })
            );
        }
    }
};
// 查询是否开启生物验证
window.JSWeb3WalletVerify = function (callback) {
    if (window.inAPP) {
        if (window.isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSWeb3WalletVerify",
                function (cre) {
                    if (typeof callback === "function") callback(cre);
                }
            );
        } else {
            let res = window.WKWebViewJavascriptBridge.JSWeb3WalletVerify();
            if (typeof callback === "function") callback(res);
        }
    }
};

// 开启生物验证
window.JSWeb3WalletEnableVerify = function (obj) {
    if (window.inAPP) {
        if (isiOS) {
            window.WKWebViewJavascriptBridge.callHandler(
                "JSWeb3WalletEnableVerify",
                obj
            );
        } else {
            window.WKWebViewJavascriptBridge.JSWeb3WalletEnableVerify(
                JSON.stringify(obj)
            );
        }
    }
};
// 生物验证成功  客户端回调通知
window.JSWeb3WalletVerifyCallback = function (res) {
    console.log(res, "JSWeb3WalletVerifyCallback");
    if (window.JSVerifyCallback) {
        window.JSVerifyCallback(res);
    }
};

// toast
function h5Toast(msg) {
    var h5ToastDom;
    if (!document.querySelector("#h5-toast")) {
        var h5ToastStyle = document.createElement("style");
        h5ToastDom = document.createElement("div");
        h5ToastDom.setAttribute("id", "h5-toast");
        h5ToastStyle.setAttribute("id", "h5-toast-style");
        // (h5ToastStyle.innerHTML =
        //     "#h5-toast{box-sizing:border-box;position:fixed;z-index:99999;top:0;left:calc(50% - 5rem);width:10rem;margin:0;padding:0 1em;border:0;padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;color:#FFF;font-size:.365rem;line-height:3em;background:#EA5B6B;transform:translateY(-100%);}#h5-toast.h5-toast-show{animation:h5ToastShow 2s linear;}@keyframes h5ToastShow{0%{transform:translateY(-100%);}3%{transform:translateY(0);}95%{transform:translateY(0);}100%{transform:translateY(-100%);}}"),
        h5ToastStyle.innerHTML =
            "#h5-toast{box-sizing:border-box;position:fixed;z-index:99999;bottom: 1.4rem;left:50%;margin:0;padding: .3rem;border-radius: 0.3rem;line-height: 1.2;border:0;overflow:hidden;text-overflow:ellipsis;text-align:center;color:#FFF;font-size:.365rem;background:rgba(0,0,0,.8);transform:translate(-50%, 260%);}#h5-toast.h5-toast-show{animation:h5ToastShow 2s linear;}@keyframes h5ToastShow{0%{transform:translate(-50%, 260%);}3%{transform:translate(-50%, 0);}95%{transform:translate(-50%, 0);}100%{transform:translate(-50%, 260%);}}";
        // white-space:nowrap; padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top);
        document.querySelector("body").appendChild(h5ToastStyle);
        document.querySelector("body").appendChild(h5ToastDom);
    }
    h5ToastDom = document.querySelector("#h5-toast");
    h5ToastDom.innerHTML = msg;
    h5ToastDom.removeAttribute("class");
    setTimeout(function () {
        h5ToastDom.setAttribute("class", "h5-toast-show");
    }, 10);
}
