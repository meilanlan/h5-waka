"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    value: {
      type: String,
      default: () => {
      }
    }
  },
  name: "tips-x",
  data() {
    return {};
  },
  methods: {
    know() {
      this.$emit("know");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.value),
    b: common_vendor.o((...args) => $options.know && $options.know(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5b0a71af"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tips-x/tips-x.js.map
