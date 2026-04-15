"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  myWallet();
}
const myWallet = () => "../robotAccount/components/my-wallet.js";
const _sfc_main = {
  __name: "wallet",
  setup(__props) {
    let userInfo = {
      haib: {
        "banlance": 1000030,
        "list": [
          {
            "id": "3001",
            "cash": "0.01",
            "haib": "10"
          },
          {
            "id": "3002",
            "cash": "6.00",
            "haib": "60"
          },
          {
            "id": "3003",
            "cash": "30.00",
            "haib": "300"
          },
          {
            "id": "3004",
            "cash": "98.00",
            "haib": "980"
          },
          {
            "id": "3005",
            "cash": "298.00",
            "haib": "2980"
          },
          {
            "id": "3006",
            "cash": "588.00",
            "haib": "5880"
          }
        ]
      },
      wallet: {
        "energy": 138,
        "charm": 0,
        "yuanqi": 0
      },
      robotInfo: {}
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_vendor.p({
          haib: common_vendor.unref(userInfo).haib,
          wallet: common_vendor.unref(userInfo).wallet,
          robotInfo: common_vendor.unref(userInfo).robotInfo
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c380209"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/wallet/wallet.js.map
