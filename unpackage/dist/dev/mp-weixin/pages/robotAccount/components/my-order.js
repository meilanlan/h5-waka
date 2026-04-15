"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  uniPopup();
}
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  __name: "my-order",
  props: {
    order_list: Array
  },
  setup(__props) {
    const props = __props;
    const joinPopup = common_vendor.ref(null);
    function sureJoin(item) {
      if (item.order_status != 1) {
        joinPopup.value.close();
      }
    }
    function toJoin() {
      joinPopup.value.open();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.order_list, (item, index, i0) => {
          return {
            a: item.robot_cover,
            b: common_vendor.t(item.robot_name),
            c: common_vendor.t(item.order_desc),
            d: common_vendor.t(item.order_status === 1 ? "已使用" : "待使用"),
            e: common_vendor.n("right-" + item.order_status),
            f: common_vendor.o(($event) => toJoin(), index),
            g: index
          };
        }),
        b: common_vendor.o(($event) => joinPopup.value.close()),
        c: common_vendor.o(sureJoin),
        d: common_vendor.sr(joinPopup, "ab6230eb-0", {
          "k": "joinPopup"
        }),
        e: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ab6230eb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/my-order.js.map
