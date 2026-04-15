"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
if (!Math) {
  (LuckyWheel + ruleX + resultX + uniPopup)();
}
const LuckyWheel = () => "../../components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/lucky-wheel.js";
const uniPopup = () => "../../components/uni-popup/components/uni-popup/uni-popup.js";
const ruleX = () => "./components/rule-x.js";
const resultX = () => "./components/result-x.js";
const _sfc_main = {
  __name: "luckyCanvas",
  setup(__props) {
    let prizes = [
      { id: 3, action: { id: "", trace_id: "", param: "" }, award_type: 3, award_use_status: 0, title: "VIP体验卡3个月", icon: new URL("@/static/image/lucky/1.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid1-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 2, action: { id: "", trace_id: "", param: "" }, award_type: 6, award_use_status: 0, title: "限定红包皮肤1个", icon: new URL("@/static/image/lucky/list-2.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid2-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 5, action: { id: "", trace_id: "", param: "" }, award_type: 5, award_use_status: 0, title: "限定聊天气泡", icon: new URL("@/static/image/lucky/3.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid3-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 7, action: { id: "", trace_id: "", param: "" }, award_type: 2, award_use_status: 0, title: "hi币20个", icon: new URL("@/static/image/lucky/4.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid4-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 6, action: { id: "", trace_id: "", param: "" }, award_type: 7, award_use_status: 0, title: "季度版机器人", icon: new URL("@/static/image/lucky/5.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid5-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 1, action: { id: "", trace_id: "", param: "" }, award_type: 8, award_use_status: 0, title: "能量助力60个", icon: new URL("@/static/image/lucky/6.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid6-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 4, action: { id: "", trace_id: "", param: "" }, award_type: 4, award_use_status: 0, title: "SVIP体验卡1个月", icon: new URL("@/static/image/lucky/7.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid7-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] },
      { id: 8, action: { id: "", trace_id: "", param: "" }, award_type: 1, award_use_status: 0, title: "现金红包20元", icon: new URL("@/static/image/lucky/8.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, fonts: [{ text: "", top: "10%" }], imgs: [{ src: new URL("@/static/image/lucky/awaid8-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, award_desc: "", width: "174rpx", height: "218rpx" }] }
    ];
    let buttons = [
      { radius: "117rpx" },
      { imgs: [{ src: new URL("@/static/image/pointer.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/luckyCanvas/luckyCanvas.js", document.baseURI).href).href, width: "234rpx", height: "234rpx", top: "-115rpx" }] },
      { fonts: [{ text: "新人福利", top: "-20px", fontSize: "28rpx", fontColor: "#ffffff", fontWeight: 600, lineHeight: "38rpx" }] },
      { fonts: [{ text: "免费1次", top: "6rpx", fontSize: "24rpx", fontColor: "rgba(255,255,255,0.6)", fontWeight: 600, lineHeight: "32rpx" }] }
      // { radius: '66rpx', background: '#afc8ff' },
    ];
    const data = common_vendor.reactive({
      award: 1,
      status: 0
      //是否已领取奖品
    });
    const rulePopup = common_vendor.ref();
    const popupType = common_vendor.ref(-1);
    const removeAnm = common_vendor.ref(false);
    const startAnm = common_vendor.ref(false);
    const endAnm = common_vendor.ref(false);
    const myLucky = common_vendor.ref();
    function toAppPage() {
      window.client.JSAction({
        id: prizes[data.award].action.id
        // param: {index: parseInt(1)}
      });
      closePopup();
    }
    const turntableStart = () => {
      if (data.status != 1) {
        removeAnm.value = true;
        startAnm.value = true;
        myLucky.value.play();
        service_robotAccount_index.awardTakeApi({}, (res) => {
          if (res.code === 0) {
            setTimeout(() => {
              data.award = prizes.findIndex((item) => item.award_type === res.data.award_type);
              prizes[data.award].action = res.data.action;
              prizes[data.award].award_desc = res.data.award_desc;
              prizes[data.award].award_use_status = res.data.award_use_status;
              myLucky.value.stop(data.award);
            }, 3e3);
          } else {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "抽奖次数已用完",
          icon: "none"
        });
      }
    };
    function endCallBack(prize) {
      popupType.value = 2;
      setTimeout(() => {
        rulePopup.value.open();
      }, 800);
      data.status = 1;
      endAnm.value = true;
    }
    function checkAwardSt() {
      service_robotAccount_index.checkAwardStApi({}, (res) => {
        if (res.code === 0) {
          data.status = res.data.status;
          if (res.data.award) {
            data.award = prizes.findIndex((item) => item.award_type === res.data.award.award_type);
            prizes[data.award].action = res.data.award.action;
            prizes[data.award].award_desc = res.data.award.award_desc;
            prizes[data.award].award_use_status = res.data.award.award_use_status;
          }
        } else {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        }
      });
    }
    function openRule() {
      popupType.value = 1;
      rulePopup.value.open();
    }
    function closePopup() {
      rulePopup.value.close();
      setTimeout(() => {
        popupType.value = -1;
      }, 200);
    }
    common_vendor.onLoad(() => {
      common_vendor.nextTick$1(() => {
        window.client.getUserinfo((res) => {
          checkAwardSt();
        });
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$8,
        b: common_vendor.n({
          aniStar: startAnm.value,
          aniEnd: endAnm.value
        }),
        c: common_vendor.n({
          aniStar: startAnm.value,
          aniEnd: endAnm.value
        }),
        d: common_vendor.n({
          aniStar: startAnm.value,
          aniEnd: endAnm.value
        }),
        e: common_vendor.sr(myLucky, "d9dd54e4-0", {
          "k": "myLucky"
        }),
        f: common_vendor.o(turntableStart),
        g: common_vendor.o(endCallBack),
        h: common_vendor.p({
          width: "486rpx",
          height: "486rpx",
          prizes: common_vendor.unref(prizes),
          buttons: common_vendor.unref(buttons)
        }),
        i: common_vendor.n(removeAnm.value && "no-animation"),
        j: common_vendor.n("lucky-btn-" + data.status),
        k: common_vendor.o(turntableStart),
        l: common_vendor.o(openRule),
        m: data.status === 1
      }, data.status === 1 ? common_vendor.e({
        n: common_vendor.unref(prizes)[data.award].icon,
        o: common_vendor.t(common_vendor.unref(prizes)[data.award].title),
        p: common_vendor.t(common_vendor.unref(prizes)[data.award].award_desc),
        q: common_vendor.unref(prizes)[data.award].award_use_status === 0
      }, common_vendor.unref(prizes)[data.award].award_use_status === 0 ? {
        r: common_vendor.o(toAppPage)
      } : {}) : {}, {
        s: popupType.value === 1
      }, popupType.value === 1 ? {
        t: common_vendor.o(closePopup)
      } : popupType.value === 2 ? {
        w: common_vendor.o(closePopup),
        x: common_vendor.o(toAppPage),
        y: common_vendor.p({
          curAwaid: common_vendor.unref(prizes)[data.award]
        })
      } : {}, {
        v: popupType.value === 2,
        z: common_vendor.sr(rulePopup, "d9dd54e4-1", {
          "k": "rulePopup"
        }),
        A: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9dd54e4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/luckyCanvas/luckyCanvas.js.map
