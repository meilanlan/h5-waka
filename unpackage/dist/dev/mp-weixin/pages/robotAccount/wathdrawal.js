"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "wathdrawal",
  setup(__props) {
    const num = common_vendor.ref("");
    function returnPage() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(returnPage),
        c: common_assets._imports_1$2,
        d: common_assets._imports_2$1,
        e: num.value,
        f: common_vendor.o(($event) => num.value = $event.detail.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b3344a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/wathdrawal.js.map
