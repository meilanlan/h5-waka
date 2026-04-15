"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "settlement",
  setup(__props) {
    const num = common_vendor.ref("");
    function cutNum() {
      if (num.value) {
        num.value = num.value * 1 - 100;
      }
    }
    function addNum() {
      num.value = num.value * 1 + 100;
    }
    function returnPage() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(returnPage),
        c: common_vendor.n(num.value > 0 && "active"),
        d: common_vendor.o(cutNum),
        e: num.value,
        f: common_vendor.o(($event) => num.value = $event.detail.value),
        g: common_assets._imports_1$1,
        h: common_vendor.o(addNum),
        i: common_vendor.t(num.value / 10),
        j: num.value > 0
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5d0323ac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/settlement.js.map
