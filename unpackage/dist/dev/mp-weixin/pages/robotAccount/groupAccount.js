"use strict";
const common_vendor = require("../../common/vendor.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
const uniTable = () => "../../components/uni-table/components/uni-table/uni-table.js";
const uniTbody = () => "../../components/uni-table/components/uni-tbody/uni-tbody.js";
const uniTd = () => "../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../components/uni-table/components/uni-tr/uni-tr.js";
const _sfc_main = {
  components: { uniTable, uniTbody, uniTd, uniTh, uniTr },
  data() {
    return {
      loading: false,
      w1: common_vendor.index.upx2px(120),
      w2: common_vendor.index.upx2px(210),
      tableInfo: [],
      robot_id: "",
      total: 0
    };
  },
  onLoad(option) {
    this.robot_id = option.robot_id;
    this.init();
  },
  methods: {
    init() {
      service_robotAccount_index.groupIncomeListData({ robot_id: this.robot_id }, (res) => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            res.data.forEach((item, i) => {
              item["index"] = i + 1;
              this.total += item.income;
            });
            this.tableInfo = res.data;
          }
          this.loading = false;
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
          this.loading = false;
        }
      });
    },
    changeTable(e) {
      let key = "month";
      let contents = JSON.parse(JSON.stringify(this.tableInfo));
      if (e.order === "ascending") {
        contents = contents.sort((a, b) => {
          if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
            return a[key] - b[key];
          }
        });
      } else {
        contents = contents.sort((a, b) => {
          if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
            return b[key] - a[key];
          }
        });
      }
      this.tableInfo = contents;
    }
  }
};
if (!Array) {
  const _component_uni_th = common_vendor.resolveComponent("uni-th");
  const _component_uni_tr = common_vendor.resolveComponent("uni-tr");
  const _component_uni_td = common_vendor.resolveComponent("uni-td");
  const _component_uni_tbody = common_vendor.resolveComponent("uni-tbody");
  const _component_uni_table = common_vendor.resolveComponent("uni-table");
  (_component_uni_th + _component_uni_tr + _component_uni_td + _component_uni_tbody + _component_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.changeTable),
    b: common_vendor.p({
      width: $data.w1,
      align: "center",
      sortable: true
    }),
    c: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    d: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    e: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    f: common_vendor.f($data.tableInfo, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.month),
        b: "f77a4259-8-" + i0 + "," + ("f77a4259-7-" + i0),
        c: common_vendor.t(item.recharge),
        d: "f77a4259-9-" + i0 + "," + ("f77a4259-7-" + i0),
        e: common_vendor.t(item.order_num),
        f: "f77a4259-10-" + i0 + "," + ("f77a4259-7-" + i0),
        g: common_vendor.t(item.income),
        h: "f77a4259-11-" + i0 + "," + ("f77a4259-7-" + i0),
        i: item.index,
        j: "f77a4259-7-" + i0 + ",f77a4259-6"
      };
    }),
    g: common_vendor.p({
      width: $data.w1,
      align: "center"
    }),
    h: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    i: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    j: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    k: common_vendor.sr("tableList", "f77a4259-0"),
    l: common_vendor.p({
      loading: $data.loading,
      emptyText: "暂无数据",
      border: true
    }),
    m: common_vendor.t($data.total)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f77a4259"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/groupAccount.js.map
