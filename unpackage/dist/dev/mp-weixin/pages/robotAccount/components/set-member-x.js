"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
const common_assets = require("../../../common/assets.js");
const uniTable = () => "../../../components/uni-table/components/uni-table/uni-table.js";
const uniTd = () => "../../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../../components/uni-table/components/uni-tr/uni-tr.js";
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const uniNumberBox = () => "../../../components/uni-number-box_1.2.1/components/uni-number-box/uni-number-box.js";
const _sfc_main = {
  // mixins: [scrollToTargetPosition],
  components: { uniPopup, uniTable, uniTd, uniTh, uniTr, uniNumberBox },
  props: {
    group_id: {
      type: Number,
      default: () => {
      }
    },
    robotInfo: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      curData: {
        type: "",
        name: ""
      },
      tabList: [
        { id: 14, name: "本群元宝", i: 1 },
        { id: 1, name: "本群金币", i: 1 },
        { id: 2, name: "本群魅力", i: 2 },
        // {id: 12, name: '本群金砖', i: 3},
        // {id: 13, name: '本群水晶', i: 4},
        { id: 3, name: "退群人员", i: 5 },
        { id: 4, name: "本群活跃", i: 6 },
        { id: 5, name: "本群婚姻", i: 7 },
        { id: 15, name: "本群宝宝", i: 7 },
        { id: 6, name: "本群头衔", i: 8 },
        { id: 7, name: "本群签到", i: 9 },
        { id: 8, name: "本群打劫", i: 10 },
        { id: 9, name: "本群黑名单", i: 11 },
        { id: 10, name: "本群小黑屋", i: 12 },
        { id: 11, name: "本群监狱", i: 13 }
        // '本群金币','本群魅力','本群金砖','本群水晶','本群水晶','本群活跃','本群婚姻','本群头衔','本群签到','本群打劫','本群黑名单','本群小黑屋','本群监狱'
      ],
      thList: {
        1: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "金币", key: "gold_coin", sort: true, arr: "tableData" },
          { name: "操作", key: "", sort: false, arr: "tableData" }
        ],
        2: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "魅力值", key: "fans_val", sort: true, arr: "tableData" },
          { name: "操作", key: "", sort: false, arr: "tableData" }
        ],
        3: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "入群时间", key: "", sort: false, arr: "tableData" },
          { name: "退群时间", key: "", sort: false, arr: "tableData" }
        ],
        4: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "本月发言数", key: "chat_month", sort: true, arr: "tableData" },
          { name: "总发言", key: "", sort: false, arr: "tableData" }
        ],
        5: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "恩爱值", key: "", sort: false, arr: "tableData" },
          { name: "天数", key: "", sort: false, arr: "tableData" },
          { name: "纪念日", key: "", sort: false, arr: "tableData" },
          { name: "操作", key: "", sort: false, arr: "tableData" }
        ],
        6: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "头衔", key: "", sort: false, arr: "tableData" }
        ],
        7: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "累计", key: "", sort: false, arr: "tableData" },
          { name: "连续", key: "", sort: false, arr: "tableData" },
          { name: "上次签到", key: "", sort: false, arr: "tableData" }
        ],
        8: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "今日次数", key: "", sort: false, arr: "tableData" },
          { name: "上次打劫", key: "", sort: false, arr: "tableData" },
          { name: "释放时间", key: "", sort: false, arr: "tableData" }
        ],
        9: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" }
        ],
        10: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "释放时间", key: "", sort: false, arr: "tableData" }
        ],
        11: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "释放时间", key: "", sort: false, arr: "tableData" }
        ],
        // 12: [
        //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
        //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
        //   {name: '金砖',key: 'brick',sort: true, arr: 'tableData'},
        //   {name: '操作',key: '',sort: false, arr: 'tableData'},
        // ],
        // 13: [
        //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
        //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
        //   {name: '水晶',key: '',sort: false, arr: 'tableData'},
        //   {name: '操作',key: '',sort: false, arr: 'tableData'},
        // ],
        14: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "群昵称", key: "", sort: false, arr: "tableData" },
          { name: "元宝", key: "", sort: false, arr: "tableData" }
        ],
        15: [
          { name: "序号", key: "index", sort: true, arr: "tableData" },
          { name: "父母", key: "", sort: false, arr: "tableData" },
          { name: "名称", key: "", sort: false, arr: "tableData" },
          { name: "成长值", key: "", sort: false, arr: "tableData" }
        ]
      },
      tableData: [],
      loading: false,
      tableWidth: common_vendor.index.upx2px(140),
      tableWidth2: common_vendor.index.upx2px(110),
      curType: 1,
      curName: "",
      clearUserids: [],
      isReverse: false,
      isAll: false,
      curItemInfo: {},
      curNumber: 0,
      m_day: 0,
      m_love: 0
    };
  },
  methods: {
    saveMarryData() {
      if (this.m_day === "" || this.m_love === "") {
        common_vendor.index.showToast({
          title: "请输入数值",
          icon: "none"
        });
        return false;
      }
      let params = {
        data_type: this.curType,
        m_id: this.curItemInfo.id,
        m_day: this.m_day,
        m_love: this.m_love
      };
      common_vendor.index.showLoading({
        mask: true
      });
      service_robotAccount_index.groupData(params, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.getUserData(this.curType);
          this.$refs.editMarryPopup.close();
        } else if (res.code === -20001) {
          this.$refs.editMarryPopup.close();
          this.$emit("updateAdminToken");
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          this.$refs.editMarryPopup.close();
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.hideLoading();
        }
      });
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-member-x.vue:384", params);
    },
    changeNumb(v) {
      this.curNumber = v;
    },
    saveData() {
      if (this.curNumber == "") {
        common_vendor.index.showToast({
          title: "请输入数值",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading({
        mask: true
      });
      let params = {
        data_type: this.curType,
        user_id: this.curItemInfo.user_id,
        value: this.curNumber
      };
      service_robotAccount_index.groupData(params, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.getUserData(this.curType);
          this.$refs.editPopup.close();
        } else if (res.code === -20001) {
          this.$refs.editPopup.close();
          this.$emit("updateAdminToken");
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          this.$refs.editPopup.close();
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.hideLoading();
        }
      });
    },
    openMarryEditpopup(item) {
      this.curItemInfo = item;
      this.m_day = item.marriage_days || 0;
      this.m_love = item.love_value || 0;
      this.$refs.editMarryPopup.open();
    },
    openEditpopup(item) {
      this.curItemInfo = item;
      this.curNumber = (this.curType === 1 ? item.gold_coin : this.curType === 2 ? item.fans_val : this.curType === 12 ? item.brick : item.crystel) || 0;
      this.$refs.editPopup.open();
    },
    sureClear() {
      common_vendor.index.showLoading();
      let userids = this.clearUserids.length > 0 ? this.clearUserids.toString(",") : "";
      service_robotAccount_index.groupClearData({ type: this.curType, group_id: this.robotInfo.group_id, userids }, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.getUserData(this.curType);
          this.$refs.clearSurePopup.close();
        } else if (res.code === -20001) {
          this.$refs.clearSurePopup.close();
          this.$refs.clearTable.close();
          this.$emit("updateAdminToken");
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          this.$refs.clearSurePopup.close();
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.hideLoading();
        }
      });
    },
    checkReverse() {
      let newIds = [];
      this.isReverse = !this.isReverse;
      if (this.isReverse === true) {
        this.tableData.forEach((item) => {
          item.ischeck = !item.ischeck;
          item.ischeck === true && newIds.push(item.user_id);
        });
        this.clearUserids = newIds;
      } else {
        this.tableData.forEach((item) => {
          item.ischeck = !item.ischeck;
          item.ischeck === true && newIds.push(item.user_id);
        });
        this.clearUserids = newIds;
      }
      this.isAll = this.clearUserids.length >= this.tableData.length ? true : false;
    },
    checkboxChangeAll(e) {
      this.isReverse = false;
      if (e.detail.value.length > 0) {
        let newIds = [];
        this.tableData.forEach((item) => {
          item.ischeck = true;
          newIds.push(item.user_id);
        });
        this.clearUserids = newIds;
        this.isAll = true;
      } else {
        this.clearUserids = [];
        this.tableData.forEach((item) => item.ischeck = false);
        this.isAll = false;
      }
    },
    checkboxChange(e) {
      this.clearUserids = e.detail.value;
      for (var si = 0; si < this.tableData.length; si++) {
        if (this.clearUserids.length > 0) {
          for (var i = 0; i < this.clearUserids.length; i++) {
            if (this.clearUserids[i] === this.tableData[si].user_id) {
              this.tableData[si].ischeck = true;
              break;
            } else {
              this.tableData[si].ischeck = false;
            }
          }
        } else {
          this.tableData[si].ischeck = false;
        }
      }
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-member-x.vue:521", this.clearUserids, "this.clearUserids is");
    },
    changeTable(e, item) {
      let key = item.key;
      let contents = JSON.parse(JSON.stringify(this.tableData));
      if (e.order === "ascending") {
        contents = contents.sort((a, b) => {
          if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
            return a[key] - b[key];
          }
        });
      } else {
        contents = contents.sort((a, b) => {
          common_vendor.index.__f__("log", "at pages/robotAccount/components/set-member-x.vue:537", a[key], "a[key] ");
          if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
            return b[key] - a[key];
          }
        });
      }
      this.tableData = contents;
    },
    openTablePopup(item) {
      this.curName = item.name;
      this.curType = item.id;
      this.loading = true;
      this.$refs.clearTable.open();
      this.getUserData(item.id);
    },
    getUserData(type) {
      service_robotAccount_index.groupUserDataData({ type, group_id: this.robotInfo.group_id }, (res) => {
        if (res.code === 0) {
          this.clearUserids = [];
          this.isReverse = false;
          this.isAll = false;
          if (res.data && res.data.length > 0) {
            res.data.forEach((item, i) => {
              item["index"] = i + 1;
              item["ischeck"] = false;
              type === 5 && (item["user_id"] = item.id + "");
              if (type === 1)
                item.gold_coin = item.gold_coin || 0;
              if (type === 2)
                item.fans_val = item.fans_val || 0;
              if (type === 4)
                item.chat_month = item.chat_month || 0;
              if (type === 12)
                item.brick = item.brick || 0;
            });
          }
          this.tableData = res.data || [];
          this.loading = false;
        } else if (res.code === -20001) {
          this.$refs.clearTable.close();
          this.$emit("updateAdminToken");
          this.loading = false;
        } else if (res.code != -10002) {
          this.$refs.clearTable.close();
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.loading = false;
        } else {
          this.$refs.clearTable.close();
          this.loading = false;
        }
      });
    }
  }
};
if (!Array) {
  const _component_uni_th = common_vendor.resolveComponent("uni-th");
  const _component_uni_tr = common_vendor.resolveComponent("uni-tr");
  const _component_uni_td = common_vendor.resolveComponent("uni-td");
  const _component_uni_table = common_vendor.resolveComponent("uni-table");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  const _component_uni_number_box = common_vendor.resolveComponent("uni-number-box");
  (_component_uni_th + _component_uni_tr + _component_uni_td + _component_uni_table + _component_uni_popup + _component_uni_number_box)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: common_vendor.n("img-" + item.i),
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.id === 14 ? "查看" : "设置"),
        d: common_vendor.o(($event) => $options.openTablePopup(item), index),
        e: index
      };
    }),
    b: common_vendor.t($data.curType === 14 ? $data.curName : $data.curName + "数据清理"),
    c: common_vendor.f($data.thList[$data.curType], (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.o(($event) => $options.changeTable($event, item), index),
        d: "7e5ed6a5-3-" + i0 + ",7e5ed6a5-2",
        e: common_vendor.p({
          width: $data.curType === 7 || $data.curType === 8 ? $data.tableWidth2 : $data.tableWidth,
          align: index === 0 ? "left" : index === $data.thList[$data.curType].length - 1 ? "right" : "center",
          sortable: item.sort
        })
      };
    }),
    d: common_vendor.f($data.tableData, (item, index, i0) => {
      return common_vendor.e($data.curType != 14 ? {
        a: item.user_id + "",
        b: item.ischeck
      } : {}, {
        c: common_vendor.t(item.index),
        d: "7e5ed6a5-5-" + i0 + "," + ("7e5ed6a5-4-" + i0)
      }, $data.curType === 1 ? {
        e: common_vendor.t(item.nick_name),
        f: "7e5ed6a5-6-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        g: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        h: common_vendor.t(item.gold_coin || 0),
        i: "7e5ed6a5-7-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        j: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        k: common_vendor.o(($event) => $options.openEditpopup(item), index),
        l: common_assets._imports_0$15,
        m: "7e5ed6a5-8-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        n: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 2 ? {
        o: common_vendor.t(item.nick_name),
        p: "7e5ed6a5-9-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        q: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        r: common_vendor.t(item.fans_val || 0),
        s: "7e5ed6a5-10-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        t: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        v: common_vendor.o(($event) => $options.openEditpopup(item), index),
        w: common_assets._imports_0$15,
        x: "7e5ed6a5-11-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        y: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 3 ? {
        z: common_vendor.t(item.nick_name),
        A: "7e5ed6a5-12-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        B: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        C: common_vendor.t(item.join_group_time),
        D: "7e5ed6a5-13-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        E: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        F: common_vendor.t(item.Leave_group_time),
        G: "7e5ed6a5-14-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        H: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 4 ? {
        I: common_vendor.t(item.nick_name),
        J: "7e5ed6a5-15-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        K: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        L: common_vendor.t(item.chat_month || 0),
        M: "7e5ed6a5-16-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        N: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        O: common_vendor.t(item.chat_total || 0),
        P: "7e5ed6a5-17-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        Q: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 5 ? {
        R: common_vendor.t(item.display_name_1),
        S: common_vendor.t(item.display_name_2),
        T: "7e5ed6a5-18-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        U: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        V: common_vendor.t(item.love_value),
        W: "7e5ed6a5-19-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        X: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        Y: common_vendor.t(item.marriage_days),
        Z: "7e5ed6a5-20-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aa: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        ab: common_vendor.t(item.marriage_time),
        ac: "7e5ed6a5-21-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        ad: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        }),
        ae: common_vendor.o(($event) => $options.openMarryEditpopup(item), index),
        af: common_assets._imports_0$15,
        ag: "7e5ed6a5-22-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        ah: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 6 ? {
        ai: common_vendor.t(item.nick_name),
        aj: "7e5ed6a5-23-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        ak: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        al: common_vendor.t(item.title),
        am: "7e5ed6a5-24-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        an: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 7 ? {
        ao: common_vendor.t(item.nick_name),
        ap: "7e5ed6a5-25-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aq: common_vendor.p({
          width: $data.tableWidth2,
          align: "center"
        }),
        ar: common_vendor.t(item.total_check_in),
        as: "7e5ed6a5-26-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        at: common_vendor.p({
          width: $data.tableWidth2,
          align: "center"
        }),
        av: common_vendor.t(item.continuous_check_in),
        aw: "7e5ed6a5-27-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        ax: common_vendor.p({
          width: $data.tableWidth2,
          align: "center"
        }),
        ay: common_vendor.t(item.last_check_in_time),
        az: "7e5ed6a5-28-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aA: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 8 ? {
        aB: common_vendor.t(item.nick_name),
        aC: "7e5ed6a5-29-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aD: common_vendor.p({
          width: $data.tableWidth2,
          align: "center"
        }),
        aE: common_vendor.t(item.today_rob_count),
        aF: "7e5ed6a5-30-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aG: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        aH: common_vendor.t(item.last_rob_time),
        aI: "7e5ed6a5-31-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aJ: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        aK: common_vendor.t(item.rob_release_time),
        aL: "7e5ed6a5-32-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aM: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 9 ? {
        aN: common_vendor.t(item.nick_name),
        aO: "7e5ed6a5-33-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aP: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        })
      } : $data.curType === 10 ? {
        aQ: common_vendor.t(item.nick_name),
        aR: "7e5ed6a5-34-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aS: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        aT: common_vendor.t(item.time),
        aU: "7e5ed6a5-35-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aV: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 11 ? {
        aW: common_vendor.t(item.nick_name),
        aX: "7e5ed6a5-36-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        aY: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        aZ: common_vendor.t(item.time),
        ba: "7e5ed6a5-37-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bb: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 12 ? {
        bc: common_vendor.t(item.nick_name),
        bd: "7e5ed6a5-38-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        be: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bf: common_vendor.t(item.brick || 0),
        bg: "7e5ed6a5-39-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bh: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bi: common_vendor.o(($event) => $options.openEditpopup(item), index),
        bj: common_assets._imports_0$15,
        bk: "7e5ed6a5-40-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bl: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 13 ? {
        bm: common_vendor.t(item.nick_name),
        bn: "7e5ed6a5-41-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bo: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bp: common_vendor.t(item.crystel || 0),
        bq: "7e5ed6a5-42-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        br: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bs: common_vendor.o(($event) => $options.openEditpopup(item), index),
        bt: common_assets._imports_0$15,
        bv: "7e5ed6a5-43-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bw: common_vendor.p({
          width: $data.tableWidth,
          align: "right"
        })
      } : $data.curType === 14 ? {
        bx: common_vendor.t(item.nick_name),
        by: "7e5ed6a5-44-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bz: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bA: common_vendor.t(item.yuanBao),
        bB: "7e5ed6a5-45-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bC: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        })
      } : $data.curType === 15 ? {
        bD: common_vendor.t(item.display_name_1),
        bE: common_vendor.t(item.display_name_2),
        bF: "7e5ed6a5-46-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bG: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bH: common_vendor.t(item.baby_name),
        bI: "7e5ed6a5-47-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bJ: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        }),
        bK: common_vendor.t(item.baby_grow),
        bL: "7e5ed6a5-48-" + i0 + "," + ("7e5ed6a5-4-" + i0),
        bM: common_vendor.p({
          width: $data.tableWidth,
          align: "center"
        })
      } : {}, {
        bN: index,
        bO: "7e5ed6a5-4-" + i0 + ",7e5ed6a5-1"
      });
    }),
    e: $data.curType != 14,
    f: common_vendor.p({
      width: $data.tableWidth,
      align: "left",
      sortable: $data.curType != 14 ? true : false
    }),
    g: $data.curType === 1,
    h: $data.curType === 2,
    i: $data.curType === 3,
    j: $data.curType === 4,
    k: $data.curType === 5,
    l: $data.curType === 6,
    m: $data.curType === 7,
    n: $data.curType === 8,
    o: $data.curType === 9,
    p: $data.curType === 10,
    q: $data.curType === 11,
    r: $data.curType === 12,
    s: $data.curType === 13,
    t: $data.curType === 14,
    v: $data.curType === 15,
    w: common_vendor.sr("table", "7e5ed6a5-1,7e5ed6a5-0"),
    x: common_vendor.p({
      loading: $data.loading,
      emptyText: "暂无更多数据"
    }),
    y: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    z: $data.curType != 14
  }, $data.curType != 14 ? {
    A: $data.isAll,
    B: common_vendor.o((...args) => $options.checkboxChangeAll && $options.checkboxChangeAll(...args)),
    C: common_assets._imports_1$11,
    D: $data.isReverse === false,
    E: common_assets._imports_2$7,
    F: $data.isReverse === true,
    G: common_vendor.n($data.isReverse === true ? "active" : ""),
    H: common_vendor.o((...args) => $options.checkReverse && $options.checkReverse(...args)),
    I: common_vendor.t($data.clearUserids.length > 0 ? "清除所选" : "清除全部"),
    J: common_vendor.o(($event) => $data.tableData.length > 0 ? _ctx.$refs.clearSurePopup.open() : null)
  } : {}, {
    K: common_vendor.sr("clearTable", "7e5ed6a5-0"),
    L: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#ffffff"
    }),
    M: common_vendor.o(($event) => _ctx.$refs.clearSurePopup.close()),
    N: common_vendor.o((...args) => $options.sureClear && $options.sureClear(...args)),
    O: common_vendor.sr("clearSurePopup", "7e5ed6a5-49"),
    P: common_vendor.p({
      type: "center",
      ["is-mask-click"]: false
    }),
    Q: common_vendor.t($data.curType === 1 ? "金币值" : $data.curType === 2 ? "魅力值" : $data.curType === 12 ? "金砖值" : "水晶值"),
    R: common_vendor.o($options.changeNumb),
    S: common_vendor.o(($event) => $data.curNumber = $event),
    T: common_vendor.p({
      min: 0,
      max: 1e16,
      modelValue: $data.curNumber
    }),
    U: common_vendor.o(($event) => _ctx.$refs.editPopup.close()),
    V: common_vendor.o((...args) => $options.saveData && $options.saveData(...args)),
    W: common_vendor.sr("editPopup", "7e5ed6a5-50"),
    X: common_vendor.p({
      type: "center",
      ["is-mask-click"]: false
    }),
    Y: common_vendor.o(($event) => $data.m_day = $event),
    Z: common_vendor.p({
      min: 0,
      max: 1e16,
      modelValue: $data.m_day
    }),
    aa: common_vendor.o(($event) => $data.m_love = $event),
    ab: common_vendor.p({
      min: 0,
      max: 1e16,
      modelValue: $data.m_love
    }),
    ac: common_vendor.o(($event) => _ctx.$refs.editMarryPopup.close()),
    ad: common_vendor.o((...args) => $options.saveMarryData && $options.saveMarryData(...args)),
    ae: common_vendor.sr("editMarryPopup", "7e5ed6a5-52"),
    af: common_vendor.p({
      type: "center",
      ["is-mask-click"]: false
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7e5ed6a5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-member-x.js.map
