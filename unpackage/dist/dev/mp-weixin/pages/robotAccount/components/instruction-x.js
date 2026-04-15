"use strict";
const common_vendor = require("../../../common/vendor.js");
const unit_instructions = require("../../../unit/instructions.js");
const uniTable = () => "../../../components/uni-table/components/uni-table/uni-table.js";
const uniTd = () => "../../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../../components/uni-table/components/uni-tr/uni-tr.js";
const _sfc_main = {
  components: { uniTable, uniTd, uniTh, uniTr },
  name: "instruction-x",
  data() {
    return {
      tabItem: ["群员指令", "群管指令", "超管指令", "客服指令", "注意事项"],
      curIndex: 0,
      tableData: {
        jur: "",
        list: []
      },
      w1: common_vendor.index.upx2px(100),
      w2: common_vendor.index.upx2px(290),
      w3: common_vendor.index.upx2px(296)
    };
  },
  mounted() {
    this.tableData = unit_instructions.instData[this.curIndex + 1];
  },
  methods: {
    switchTab(i) {
      if (this.curIndex != i) {
        this.curIndex = i;
        this.tableData = unit_instructions.instData[this.curIndex + 1];
      }
    }
  }
};
if (!Array) {
  const _component_uni_th = common_vendor.resolveComponent("uni-th");
  const _component_uni_tr = common_vendor.resolveComponent("uni-tr");
  const _component_uni_td = common_vendor.resolveComponent("uni-td");
  const _component_uni_table = common_vendor.resolveComponent("uni-table");
  (_component_uni_th + _component_uni_tr + _component_uni_td + _component_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabItem, (item, i, i0) => {
      return {
        a: common_vendor.t(item),
        b: common_vendor.n("box-" + i),
        c: common_vendor.n($data.curIndex === i ? "active" : ""),
        d: i,
        e: common_vendor.o(($event) => $options.switchTab(i), i)
      };
    }),
    b: common_vendor.t($data.tableData.jur),
    c: common_vendor.n("tableTit-" + $data.curIndex),
    d: common_vendor.p({
      align: "center",
      width: $data.w1
    }),
    e: common_vendor.p({
      align: "left",
      width: $data.w2
    }),
    f: common_vendor.p({
      align: "left",
      width: $data.w3
    }),
    g: common_vendor.f($data.tableData.list, (item, i, i0) => {
      return {
        a: common_vendor.t(item.index),
        b: "1367957b-6-" + i0 + "," + ("1367957b-5-" + i0),
        c: common_vendor.t(item.name),
        d: "1367957b-7-" + i0 + "," + ("1367957b-5-" + i0),
        e: common_vendor.t(item.ex),
        f: "1367957b-8-" + i0 + "," + ("1367957b-5-" + i0),
        g: i,
        h: "1367957b-5-" + i0 + ",1367957b-0"
      };
    }),
    h: common_vendor.p({
      align: "center",
      width: $data.w1
    }),
    i: common_vendor.p({
      align: "left",
      width: $data.w2
    }),
    j: common_vendor.p({
      align: "left",
      width: $data.w3
    }),
    k: common_vendor.sr("tableList", "1367957b-0"),
    l: common_vendor.p({
      border: true,
      emptyText: "暂无数据"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1367957b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/instruction-x.js.map
