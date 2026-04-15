"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "rule-x",
  emits: ["closePopup"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function closePopup() {
      emit("closePopup");
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$12,
        b: common_assets._imports_0$13,
        c: common_vendor.o(closePopup)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c9b0d594"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/luckyCanvas/components/rule-x.js.map
