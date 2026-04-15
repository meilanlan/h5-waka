"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  robotAssistantX();
}
const robotAssistantX = () => "../robotAccount/components/robot-assistant-x.js";
const _sfc_main = {
  __name: "robotShop",
  setup(__props) {
    const isiOS = common_vendor.ref(window.isiOS);
    const list = [
      {
        "id": 1001,
        "cover_big": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/xiaohai/ic_xh_base.png",
        "cover_small": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/icon/ic_ai.jpg",
        "title": "小嗨机器人群助手（基础版）",
        "prod_name": "Hi AI Group Chat",
        "prod_develop": "开发者: wakagroup",
        "prod_des": "创建超级社群后，每个社群都会自带基础班小嗨智能机器人群助于，它可以帮助群主更便捷的管理社群入群欢迎、退群提醒、改名提醒、签到、天气、潜水统计等功能",
        "prod_price": "永久免费",
        "prod_status": 1
      },
      {
        "id": 1002,
        "cover_big": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/xiaohai/ic_xh_ad.png",
        "cover_small": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/icon/ic_ai.jpg",
        "title": "小嗨机器人群助手（娱乐版）",
        "prod_name": "Hi AI Group Chat",
        "prod_develop": "开发者: wakagroup",
        "prod_des": "功能介绍：创建超级社群后，每个社群都会自带基础班小嗨智能机器人群助于，它可以帮助群主更便捷的管理社群入群欢迎、退群提醒、改名提醒、签到、天气、潜水统计等功能",
        "prod_price": "288/年",
        "prod_status": 0
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => _ctx.backPage()),
        c: common_vendor.n(isiOS.value != true ? "safeTop" : ""),
        d: common_vendor.p({
          robot_list: list
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee037a99"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotShop/robotShop.js.map
