"use strict";
const common_vendor = require("../../../../common/vendor.js");
const tableCheckbox = () => "../uni-tr/table-checkbox.js";
const _sfc_main = {
  name: "uniThead",
  components: {
    tableCheckbox
  },
  options: {
    virtualHost: true
  },
  data() {
    return {
      border: false,
      selection: false,
      rowspan: 1,
      indeterminate: false,
      checked: false
    };
  },
  created() {
    this.root = this.getTable();
    this.border = this.root.border;
    this.selection = this.root.type;
  },
  methods: {
    init(self) {
      this.rowspan++;
    },
    checkboxSelected(e) {
      this.indeterminate = false;
      const backIndexData = this.root.backIndexData;
      const data = this.root.trChildren.filter((v) => !v.disabled && v.keyValue);
      if (backIndexData.length === data.length) {
        this.checked = false;
        this.root.clearSelection();
      } else {
        this.checked = true;
        this.root.selectionAll();
      }
    },
    /**
     * 获取父元素实例
     */
    getTable(name = "uniTable") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/components/uni-table/components/uni-thead/uni-thead.js.map
