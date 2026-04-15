"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
const common_assets = require("../../../common/assets.js");
const UniEvenSwitch = () => "../../../components/uni-evan-switch/evan-switch.js";
const uniTable = () => "../../../components/uni-table/components/uni-table/uni-table.js";
const uniTd = () => "../../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../../components/uni-table/components/uni-tr/uni-tr.js";
const SetLuckdrawEditX = () => "./set-luckdraw-edit-x.js";
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  // mixins: [scrollToTargetPosition],
  components: { UniEvenSwitch, uniTable, uniTd, uniTh, uniTr, SetLuckdrawEditX, uniPopup },
  data() {
    return {
      curIndex: 0,
      curResultIndex: 0,
      loading: false,
      initFlag: false,
      tableWidth1: common_vendor.index.upx2px(70),
      tableWidth2: common_vendor.index.upx2px(78),
      tableWidth3: common_vendor.index.upx2px(120),
      tableWidth4: common_vendor.index.upx2px(80),
      tableWidth5: common_vendor.index.upx2px(100),
      tableWidth6: common_vendor.index.upx2px(90),
      resultList: [
        { id: 2, text: "开盲盒获得实物价值", award: 100 },
        { id: 3, text: "战队金获得实物价值", award: 100 },
        { id: 0, text: "开盲盒获得金币", award: 100 },
        { id: 1, text: "开盲盒获得魅力", award: 100 }
      ],
      configData: {
        data_type: 18,
        lottery_coin: 0,
        lottery_list: []
      },
      isOpen: false,
      addData: {
        lottery_name: "",
        lottery_type: 0,
        award: 0,
        lottery_rate: 0,
        lottery_num: 0,
        day_limit: 0
      },
      logData: []
    };
  },
  mounted() {
    common_vendor.index.showLoading();
    this.initdata();
  },
  methods: {
    beforeListChange(e, extraData) {
      common_vendor.index.showLoading();
      let params = {
        auto_add: e === true ? 1 : 0,
        data_type: this.configData.data_type,
        lottery_coin: this.configData.lottery_coin
      };
      return new Promise((resolve, reject) => {
        service_robotAccount_index.lotterySetData(params, (res) => {
          if (~~res.code === 0) {
            setTimeout(() => {
              common_vendor.index.showToast({
                title: e === true ? "已开启" : "已关闭",
                icon: "none"
              });
            }, 300);
            resolve();
          } else if (res.code === -20001) {
            common_vendor.index.hideLoading();
            this.$emit("updateAdminToken");
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            reject();
          }
        });
      });
    },
    saveCoin() {
      common_vendor.index.showLoading();
      service_robotAccount_index.lotterySetData({ data_type: this.configData.data_type, lottery_coin: this.configData.lottery_coin }, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }
        common_vendor.index.hideLoading();
      });
    },
    watchCoin() {
      (this.configData.lottery_coin < 0 || !this.configData.lottery_coin) && (this.configData.lottery_coin = 0);
    },
    editLotter(i) {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-luckdraw-x.vue:223", this.configData.lottery_list[i].lottery_type, "type");
      this.addData = {
        lottery_id: this.configData.lottery_list[i].lottery_id,
        lottery_name: this.configData.lottery_list[i].lottery_name,
        lottery_type: this.configData.lottery_list[i].lottery_type || 0,
        award: this.configData.lottery_list[i].award || 0,
        lottery_rate: this.configData.lottery_list[i].rate,
        lottery_num: this.configData.lottery_list[i].total_num,
        day_limit: this.configData.lottery_list[i].user_max_num_day
      };
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-luckdraw-x.vue:233", this.addData, "ui");
      this.$refs.luckyPopup.open();
    },
    delectLotter(i) {
      common_vendor.index.showLoading();
      service_robotAccount_index.lotteryDelData({ lottery_id: this.configData.lottery_list[i].lottery_id }, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.configData.lottery_list.splice(i, 1);
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
        } else {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        }
        common_vendor.index.hideLoading();
      });
    },
    initdata() {
      service_robotAccount_index.lotteryConfigData({}, (res) => {
        if (res.code === 0) {
          this.isOpen = res.data[0].auto_do && res.data[0].auto_do * 1 === 1 ? true : false;
          this.configData = res.data[0];
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }
        common_vendor.index.hideLoading();
        this.initFlag = true;
      });
    },
    initRecord() {
      service_robotAccount_index.lotteryLogData({}, (res) => {
        if (res.code === 0) {
          this.logData = res.data || [];
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }
        common_vendor.index.hideLoading();
      });
    },
    changeTable(e, i) {
      let key = "index";
      let contents = JSON.parse(JSON.stringify(this.logData));
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
      this.logData = contents;
    },
    switchTab(i) {
      if (this.curIndex != i) {
        common_vendor.index.showLoading();
        this.curIndex = i;
        i === 0 && this.initdata();
        i === 1 && this.initRecord();
      }
    },
    clearAdminToken() {
      this.$emit("updateAdminToken");
    }
  }
};
if (!Array) {
  const _component_uni_even_switch = common_vendor.resolveComponent("uni-even-switch");
  const _component_set_luckdraw_edit_x = common_vendor.resolveComponent("set-luckdraw-edit-x");
  const _component_uni_th = common_vendor.resolveComponent("uni-th");
  const _component_uni_tr = common_vendor.resolveComponent("uni-tr");
  const _component_uni_td = common_vendor.resolveComponent("uni-td");
  const _component_uni_table = common_vendor.resolveComponent("uni-table");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_component_uni_even_switch + _component_set_luckdraw_edit_x + _component_uni_th + _component_uni_tr + _component_uni_td + _component_uni_table + _component_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.initFlag
  }, $data.initFlag ? common_vendor.e({
    b: common_vendor.f(2, (item, i, i0) => {
      return {
        a: common_vendor.t(item === 1 ? "盲盒设置" : "盲盒记录"),
        b: common_vendor.n("box-" + item),
        c: common_vendor.n($data.curIndex === i ? "active" : ""),
        d: item,
        e: common_vendor.o(($event) => $options.switchTab(i), item)
      };
    }),
    c: common_vendor.o((...args) => $options.watchCoin && $options.watchCoin(...args)),
    d: $data.configData.lottery_coin,
    e: common_vendor.o(($event) => $data.configData.lottery_coin = $event.detail.value),
    f: common_vendor.o((...args) => $options.saveCoin && $options.saveCoin(...args)),
    g: common_vendor.o(($event) => $data.isOpen = $event),
    h: common_vendor.p({
      size: 20,
      extraData: "0",
      contextLevel: 2,
      activeColor: "#67C23A",
      inactiveColor: "#C1CBDB",
      beforeChange: $options.beforeListChange,
      modelValue: $data.isOpen
    }),
    i: common_vendor.o($options.clearAdminToken),
    j: common_vendor.o($options.initdata),
    k: common_vendor.p({
      type: 1,
      isOpen: $data.isOpen,
      addData: $data.addData
    }),
    l: common_vendor.p({
      align: "center",
      width: $data.tableWidth1
    }),
    m: common_vendor.p({
      width: $data.tableWidth3,
      align: "center"
    }),
    n: common_vendor.p({
      width: $data.tableWidth2,
      align: "center"
    }),
    o: common_vendor.p({
      width: $data.tableWidth3,
      align: "center"
    }),
    p: common_vendor.p({
      width: $data.tableWidth2,
      align: "center"
    }),
    q: common_vendor.p({
      width: $data.tableWidth3,
      align: "center"
    }),
    r: common_vendor.p({
      width: $data.tableWidth1,
      align: "center"
    }),
    s: common_vendor.p({
      width: $data.tableWidth1,
      align: "center"
    }),
    t: common_vendor.f($data.configData.lottery_list, (item, i, i0) => {
      return {
        a: common_vendor.t(i < 9 ? "0" + (i + 1) : i + 1),
        b: "b2d15eeb-13-" + i0 + "," + ("b2d15eeb-12-" + i0),
        c: common_vendor.t(item.lottery_name),
        d: "b2d15eeb-14-" + i0 + "," + ("b2d15eeb-12-" + i0),
        e: common_vendor.t(item.rate || 0),
        f: "b2d15eeb-15-" + i0 + "," + ("b2d15eeb-12-" + i0),
        g: common_vendor.t(item.coin || 0),
        h: "b2d15eeb-16-" + i0 + "," + ("b2d15eeb-12-" + i0),
        i: common_vendor.t(item.total_num || 0),
        j: "b2d15eeb-17-" + i0 + "," + ("b2d15eeb-12-" + i0),
        k: common_vendor.t(item.user_max_num_day || 0),
        l: "b2d15eeb-18-" + i0 + "," + ("b2d15eeb-12-" + i0),
        m: common_vendor.o(($event) => $options.editLotter(i), i),
        n: "b2d15eeb-19-" + i0 + "," + ("b2d15eeb-12-" + i0),
        o: common_vendor.o(($event) => $options.delectLotter(i), i),
        p: "b2d15eeb-20-" + i0 + "," + ("b2d15eeb-12-" + i0),
        q: i,
        r: "b2d15eeb-12-" + i0 + ",b2d15eeb-2"
      };
    }),
    v: common_vendor.p({
      width: $data.tableWidth1,
      align: "center"
    }),
    w: common_vendor.p({
      width: $data.tableWidth3,
      align: "center"
    }),
    x: common_vendor.p({
      width: $data.tableWidth2,
      align: "center"
    }),
    y: common_vendor.p({
      width: $data.tableWidth3,
      align: "center"
    }),
    z: common_vendor.p({
      width: $data.tableWidth2,
      align: "center"
    }),
    A: common_vendor.p({
      width: $data.tableWidth3,
      align: "center"
    }),
    B: common_assets._imports_0$15,
    C: common_vendor.p({
      width: $data.tableWidth1,
      align: "center"
    }),
    D: common_assets._imports_1$15,
    E: common_vendor.p({
      width: $data.tableWidth1,
      align: "center"
    }),
    F: common_vendor.sr("tableList", "b2d15eeb-2"),
    G: common_vendor.p({
      loading: $data.loading,
      emptyText: "暂无数据"
    }),
    H: $data.curIndex === 0,
    I: common_vendor.o(($event) => $options.changeTable($event)),
    J: common_vendor.p({
      align: "center",
      width: $data.tableWidth4,
      sortable: true
    }),
    K: common_vendor.p({
      width: $data.tableWidth6,
      align: "center"
    }),
    L: common_vendor.p({
      width: $data.tableWidth5,
      align: "center"
    }),
    M: common_vendor.p({
      width: $data.tableWidth4,
      align: "center"
    }),
    N: common_vendor.p({
      width: $data.tableWidth4,
      align: "center"
    }),
    O: common_vendor.p({
      width: $data.tableWidth4,
      align: "center"
    }),
    P: common_vendor.f($data.logData, (item, i, i0) => {
      return {
        a: common_vendor.t(i < 9 ? "0" + (i + 1) : i + 1),
        b: "b2d15eeb-30-" + i0 + "," + ("b2d15eeb-29-" + i0),
        c: common_vendor.t(item.nick_name),
        d: "b2d15eeb-31-" + i0 + "," + ("b2d15eeb-29-" + i0),
        e: common_vendor.t(item.lottery_name),
        f: "b2d15eeb-32-" + i0 + "," + ("b2d15eeb-29-" + i0),
        g: common_vendor.t((item.cash ? item.cash.toFixed(2) : item.cash) || 0),
        h: "b2d15eeb-33-" + i0 + "," + ("b2d15eeb-29-" + i0),
        i: common_vendor.t(item.coin_auto || 0),
        j: common_vendor.t(item.coin_manual || 0),
        k: item.coin_manual,
        l: "b2d15eeb-34-" + i0 + "," + ("b2d15eeb-29-" + i0),
        m: common_vendor.t(item.charm_auto || 0),
        n: common_vendor.t(item.charm_manual || 0),
        o: item.charm_manual,
        p: "b2d15eeb-35-" + i0 + "," + ("b2d15eeb-29-" + i0),
        q: i,
        r: "b2d15eeb-29-" + i0 + ",b2d15eeb-21"
      };
    }),
    Q: common_vendor.p({
      width: $data.tableWidth4,
      align: "center",
      sortable: true
    }),
    R: common_vendor.p({
      width: $data.tableWidth6,
      align: "center"
    }),
    S: common_vendor.p({
      width: $data.tableWidth5,
      align: "center"
    }),
    T: common_vendor.p({
      width: $data.tableWidth4,
      align: "center"
    }),
    U: common_vendor.p({
      width: $data.tableWidth4,
      align: "center"
    }),
    V: common_vendor.p({
      width: $data.tableWidth4,
      align: "center"
    }),
    W: common_vendor.sr("tableList", "b2d15eeb-21"),
    X: common_vendor.p({
      loading: $data.loading,
      emptyText: "暂无数据"
    }),
    Y: $data.curIndex === 1,
    Z: this.addData.lottery_id
  }, this.addData.lottery_id ? {
    aa: common_vendor.o($options.clearAdminToken),
    ab: common_vendor.o($options.initdata),
    ac: common_vendor.o(($event) => _ctx.$refs.luckyPopup.close()),
    ad: common_vendor.p({
      type: 2,
      isOpen: $data.isOpen,
      addData: $data.addData
    })
  } : {}, {
    ae: common_vendor.sr("luckyPopup", "b2d15eeb-36"),
    af: common_vendor.p({
      type: "bottom"
    })
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b2d15eeb"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-luckdraw-x.js.map
