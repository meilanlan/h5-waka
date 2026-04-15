"use strict";
const common_vendor = require("../../common/vendor.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
const uniTable = () => "../../components/uni-table/components/uni-table/uni-table.js";
const uniThead = () => "../../components/uni-table/components/uni-thead/uni-thead.js";
const uniTbody = () => "../../components/uni-table/components/uni-tbody/uni-tbody.js";
const uniTd = () => "../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../components/uni-table/components/uni-tr/uni-tr.js";
const _sfc_main = {
  components: { uniTable, uniThead, uniTbody, uniTd, uniTh, uniTr },
  data() {
    return {
      curTab: 1,
      loading: true,
      robot_id: "",
      w1: common_vendor.index.upx2px(100),
      w2: common_vendor.index.upx2px(120),
      w3: common_vendor.index.upx2px(170),
      initInfo: [],
      tableInfo: [],
      totalBrick: 0,
      totalCrystel: 0
    };
  },
  onLoad(option) {
    this.robot_id = option.robot_id;
    this.init();
  },
  methods: {
    init() {
      service_robotAccount_index.groupTaskListData({ robot_id: this.robot_id }, (res) => {
        if (res.code === 0) {
          if (res.data && res.data.length > 0) {
            this.initInfo = res.data;
            this.drawInfo(this.curTab - 1);
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
    drawInfo(tabId) {
      if (this.initInfo[tabId].list && this.initInfo[tabId].list.length > 0) {
        this.initInfo[tabId].list.forEach((item, i) => {
          item["index"] = i + 1;
          this.totalBrick += item.brick;
          this.totalCrystel += item.crystel;
        });
        this.tableInfo = this.initInfo[tabId].list;
      }
      setTimeout(() => {
        this.loading = false;
      }, 300);
    },
    changeTable(e) {
      let key = "index";
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
    },
    switchTab(item) {
      if (this.curTab != item) {
        this.curTab = item;
        this.totalBrick = 0;
        this.totalCrystel = 0;
        this.loading = true;
        if (this.initInfo && this.initInfo.length > 0) {
          this.drawInfo(this.curTab - 1);
        } else {
          this.loading = false;
        }
      }
    }
  }
};
if (!Array) {
  const _component_uni_th = common_vendor.resolveComponent("uni-th");
  const _component_uni_tr = common_vendor.resolveComponent("uni-tr");
  const _component_uni_thead = common_vendor.resolveComponent("uni-thead");
  const _component_uni_td = common_vendor.resolveComponent("uni-td");
  const _component_uni_tbody = common_vendor.resolveComponent("uni-tbody");
  const _component_uni_table = common_vendor.resolveComponent("uni-table");
  (_component_uni_th + _component_uni_tr + _component_uni_thead + _component_uni_td + _component_uni_tbody + _component_uni_table)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(2, (item, k0, i0) => {
      return {
        a: common_vendor.t(item === 1 ? "陪我玩" : "摘星星"),
        b: common_vendor.n("skewed" + item),
        c: common_vendor.n($data.curTab === item ? "active" : ""),
        d: item,
        e: common_vendor.o(($event) => $options.switchTab(item), item)
      };
    }),
    b: common_vendor.o($options.changeTable),
    c: common_vendor.p({
      width: $data.w1,
      align: "center",
      sortable: true
    }),
    d: common_vendor.p({
      width: $data.w2,
      align: "center"
    }),
    e: common_vendor.p({
      width: $data.w2,
      align: "center"
    }),
    f: common_vendor.p({
      width: $data.w2,
      align: "center"
    }),
    g: common_vendor.p({
      width: $data.w2,
      align: "center"
    }),
    h: common_vendor.p({
      width: $data.w3,
      align: "right"
    }),
    i: common_vendor.f($data.tableInfo, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.index),
        b: "1517f609-11-" + i0 + "," + ("1517f609-10-" + i0),
        c: common_vendor.t(item.from),
        d: "1517f609-12-" + i0 + "," + ("1517f609-10-" + i0),
        e: common_vendor.t(item.brick),
        f: "1517f609-13-" + i0 + "," + ("1517f609-10-" + i0),
        g: common_vendor.t(item.to),
        h: "1517f609-14-" + i0 + "," + ("1517f609-10-" + i0),
        i: common_vendor.t(item.crystel),
        j: "1517f609-15-" + i0 + "," + ("1517f609-10-" + i0),
        k: common_vendor.t(item.time),
        l: "1517f609-16-" + i0 + "," + ("1517f609-10-" + i0),
        m: item.index,
        n: "1517f609-10-" + i0 + ",1517f609-9"
      };
    }),
    j: common_vendor.p({
      width: $data.w1,
      align: "center"
    }),
    k: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    l: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    m: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    n: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    o: common_vendor.p({
      width: $data.w3,
      align: "right"
    }),
    p: common_vendor.p({
      width: $data.w1,
      align: "center"
    }),
    q: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    r: common_vendor.t($data.totalBrick),
    s: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    t: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    v: common_vendor.t($data.totalCrystel),
    w: common_vendor.p({
      width: $data.w2,
      align: "left"
    }),
    x: common_vendor.p({
      width: $data.w3,
      align: "right"
    }),
    y: common_vendor.sr("tableList", "1517f609-0"),
    z: common_vendor.p({
      loading: $data.loading,
      emptyText: "暂无数据",
      border: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1517f609"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/taskGiftRecord.js.map
