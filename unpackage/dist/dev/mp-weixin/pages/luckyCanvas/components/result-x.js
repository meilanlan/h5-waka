"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "result-x",
  props: {
    curAwaid: Object
  },
  emits: ["closePopup", "toApp"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    common_vendor.index.__f__("log", "at pages/luckyCanvas/components/result-x.vue:19", props.curAwaid, "curAwaid is");
    function closePopup() {
      emit("closePopup");
    }
    function openAppPage() {
      emit("toApp");
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$13,
        b: common_vendor.o(closePopup),
        c: props.curAwaid.icon,
        d: common_vendor.t(props.curAwaid.title),
        e: common_vendor.t(props.curAwaid.award_desc),
        f: common_vendor.o(openAppPage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9d6f143"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/luckyCanvas/components/result-x.js.map
