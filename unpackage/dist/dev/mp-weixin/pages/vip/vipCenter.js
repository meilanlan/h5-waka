"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  vipCenterX();
}
const vipCenterX = () => "../robotAccount/components/vip-center-x.js";
const _sfc_main = {
  __name: "vipCenter",
  setup(__props) {
    let info = {
      tab_list: [
        {
          "title": "咓咔VIP",
          "url": "",
          "icon": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/icon/ic_vip.png",
          "id": 40,
          "data": {
            "list": [
              {
                "id": "1001",
                "title": "1个月",
                "desc": "",
                "price": 0.01,
                "tag": "",
                "discount": ""
              },
              {
                "id": "1003",
                "title": "1年",
                "desc": "每月仅需￥18",
                "price": 216,
                "tag": "超值推荐",
                "discount": "节省40%"
              }
            ],
            "desc": "订阅VIP会员每月获赠50点能量值"
          }
        },
        {
          "title": "咓咔SVIP",
          "url": "",
          "icon": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/icon/ic_svip.png",
          "id": 41,
          "data": {
            "list": [
              {
                "id": "1004",
                "title": "1个月",
                "desc": "",
                "price": 0.01,
                "tag": "",
                "discount": ""
              },
              {
                "id": "1006",
                "title": "1年",
                "desc": "每月仅需￥36",
                "price": 432,
                "tag": "超值推荐",
                "discount": "节省40%"
              }
            ],
            "desc": "订阅SVIP会员每月获赠100点能量值"
          }
        }
      ],
      rights_desc: [
        {
          "title": "会员专属标签",
          "novip": "非会员",
          "vip": "VIP专属",
          "svip": "SVIP专属"
        },
        {
          "title": "个性头像",
          "novip": "图片",
          "vip": "图片/动态头像",
          "svip": "图片/动态头像"
        },
        {
          "title": "创建社群数",
          "novip": "1",
          "vip": "10",
          "svip": "30"
        },
        {
          "title": "每月领取能量",
          "novip": "2点",
          "vip": "50点",
          "svip": "100点"
        },
        {
          "title": "个性主页背景",
          "novip": "默认背景",
          "vip": "自定义/会员专属背景",
          "svip": "自定义/会员专属背景"
        },
        {
          "title": "个性专属名片",
          "novip": "no",
          "vip": "yes",
          "svip": "yes"
        },
        {
          "title": "自定义聊天背景",
          "novip": "no",
          "vip": "yes",
          "svip": "yes"
        },
        {
          "title": "WAKA世界留言",
          "novip": "2条/天",
          "vip": "25条/天",
          "svip": "无上限"
        },
        {
          "title": "AI助手机器人",
          "novip": "5条/天",
          "vip": "100次/天",
          "svip": "100次/天"
        },
        {
          "title": "动态表情贴纸",
          "novip": "no",
          "vip": "yes",
          "svip": "yes"
        },
        {
          "title": "隐身访问",
          "novip": "no",
          "vip": "yes",
          "svip": "yes"
        },
        {
          "title": "隐私特权",
          "novip": "no",
          "vip": "yes",
          "svip": "yes"
        },
        {
          "title": "发布社群动态",
          "novip": "1条/天",
          "vip": "无上限",
          "svip": "无上限"
        }
      ]
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_vendor.p({
          vip: common_vendor.unref(info)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fca53fe"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/vip/vipCenter.js.map
