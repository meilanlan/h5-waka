"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  (payX + uniPopup)();
}
const payX = () => "../../../components/pay-x/pay-x.js";
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  __name: "my-wallet",
  props: {
    wallet: Object,
    haib: Object,
    robotInfo: Object
  },
  setup(__props) {
    const payPopup = common_vendor.ref(null);
    const props = __props;
    function openPayHi() {
      payPopup.value.open();
    }
    function toPage() {
      common_vendor.index.navigateTo({
        url: `/pages/robotAccount/myBill?accountId=1&group_id=${props.robotInfo.group_id}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$11,
        b: common_vendor.t(props.haib.banlance),
        c: common_vendor.o(openPayHi),
        d: common_vendor.t(props.wallet.energy),
        e: common_vendor.t(props.wallet.yuanqi),
        f: common_vendor.t(props.wallet.charm),
        g: common_assets._imports_1$10,
        h: common_assets._imports_2$6,
        i: common_vendor.o(toPage),
        j: common_vendor.p({
          haib: props.haib
        }),
        k: common_vendor.sr(payPopup, "bab84deb-0", {
          "k": "payPopup"
        }),
        l: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bab84deb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/my-wallet.js.map
