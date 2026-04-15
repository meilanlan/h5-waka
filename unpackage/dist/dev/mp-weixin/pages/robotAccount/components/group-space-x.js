"use strict";
const common_vendor = require("../../../common/vendor.js");
const unit_filters = require("../../../unit/filters.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  (uniTh + uniTr + uniTd + uniTable)();
}
const uniTable = () => "../../../components/uni-table/components/uni-table/uni-table.js";
const uniTd = () => "../../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../../components/uni-table/components/uni-tr/uni-tr.js";
const _sfc_main = {
  __name: "group-space-x",
  setup(__props) {
    const menuList = common_vendor.ref([
      { id: 1, name: "群成员", type: 1 },
      { id: 4, name: "金币", type: 1 },
      { id: 5, name: "魅力", type: 1 },
      // {id: 2, name: '金砖'},
      // {id: 3, name: '水晶'},
      // {id: 4, name: '金币'},
      // {id: 5, name: '魅力'},
      { id: 6, name: "签到", type: 1 },
      { id: 7, name: "婚姻", type: 2 },
      { id: 8, name: "头衔", type: 3 },
      { id: 9, name: "门派", type: 4 },
      { id: 10, name: "群管", type: 1 }
    ]);
    const tableWidth = common_vendor.ref(common_vendor.index.upx2px(114));
    common_vendor.ref(common_vendor.index.upx2px(148));
    const tableWidth3 = common_vendor.ref(common_vendor.index.upx2px(40));
    const tableData = common_vendor.ref([]);
    const marriageInfo = common_vendor.ref([]);
    const titInfo = common_vendor.ref([]);
    const sectInfo = common_vendor.ref([]);
    const adminInfo = common_vendor.ref([]);
    const parentInfo = common_vendor.inject("parentGroupInfo");
    const menuIndex = common_vendor.ref(0);
    const loading = common_vendor.ref(false);
    const thList = {
      1: [
        { name: "序号", key: "index", sort: true, arr: "tableData" },
        { name: "群昵称", key: "", sort: false, arr: "tableData" },
        { name: "入群时间", key: "", sort: false, arr: "tableData" }
      ],
      2: [
        { name: "序号", key: "index", sort: true, arr: "tableData", arr: "tableData" },
        { name: "群昵称", key: "", sort: false, arr: "tableData", arr: "tableData" },
        { name: "金币", key: "gold_coin", sort: true, arr: "tableData", arr: "tableData" }
      ],
      3: [
        { name: "序号", key: "index", sort: true, arr: "tableData" },
        { name: "群昵称", key: "", sort: false, arr: "tableData" },
        { name: "魅力", key: "fans_val", sort: true, arr: "tableData" }
      ],
      // 4: [
      //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
      //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
      //   {name: '金砖',key: '',sort: false, arr: 'tableData'},
      //   // {name: '金砖',key: 'total_brick',sort: true, arr: 'tableData'},
      // ],
      // 5: [
      //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
      //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
      //   {name: '水晶',key: '',sort: false, arr: 'tableData'},
      //   // {name: '水晶',key: 'total_brick',sort: true, arr: 'tableData'},
      // ],
      4: [
        { name: "序号", key: "index", sort: true, arr: "tableData" },
        { name: "群昵称", key: "", sort: false, arr: "tableData" },
        { name: "累计", key: "total_check_in", sort: true, arr: "tableData" },
        { name: "连续", key: "continuous_check_in", sort: true, arr: "tableData" }
      ],
      5: [
        { name: "序号", key: "index", sort: true, arr: "marriageInfo" },
        { name: "群昵称", key: "", sort: false, arr: "marriageInfo" },
        { name: "天数", key: "marriage_days", sort: true, arr: "marriageInfo" },
        { name: "恩爱值", key: "love_value", sort: true, arr: "marriageInfo" }
      ],
      6: [
        { name: "序号", key: "index", sort: true, arr: "titInfo" },
        { name: "群昵称", key: "", sort: false, arr: "titInfo" },
        { name: "头衔名称", key: "", sort: false, arr: "titInfo" }
      ],
      7: [
        { name: "序号", key: "index", sort: true, arr: "sectInfo" },
        { name: "群昵称", key: "", sort: false, arr: "sectInfo" },
        { name: "门派", key: "", sort: false, arr: "sectInfo" }
      ],
      8: [
        { name: "序号", key: "index", sort: true, arr: "adminInfo" },
        { name: "群昵称", key: "", sort: false, arr: "adminInfo" },
        { name: "群管级别", key: "", sort: false, arr: "adminInfo" }
      ]
    };
    loading.value = true;
    groupUserInfo(1);
    function changeTable(e, i) {
      const refMap = {
        "tableData": tableData.value,
        "marriageInfo": marriageInfo.value,
        "titInfo": titInfo.value,
        "sectInfo": sectInfo.value,
        "adminInfo": adminInfo.value
      };
      let key = thList[menuIndex.value + 1][i].key;
      let contents = JSON.parse(JSON.stringify(refMap[thList[menuIndex.value + 1][i].arr]));
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
      if (thList[menuIndex.value + 1][i].arr === "tableData") {
        tableData.value = contents;
      } else if (thList[menuIndex.value + 1][i].arr === "marriageInfo") {
        marriageInfo.value = contents;
      } else if (thList[menuIndex.value + 1][i].arr === "titInfo") {
        titInfo.value = contents;
      } else if (thList[menuIndex.value + 1][i].arr === "sectInfo") {
        sectInfo.value = contents;
      } else if (thList[menuIndex.value + 1][i].arr === "adminInfo") {
        adminInfo.value = contents;
      }
    }
    function groupUserInfo(type) {
      if (menuIndex.value === 0 && type === 1 || type !== 1) {
        loading.value = true;
        service_robotAccount_index.groupUserData({ group_id: parentInfo.group_id, type }, (res) => {
          if (res.code === 0) {
            if (res.data && res.data.length > 0) {
              res.data.forEach((item, i) => {
                item["index"] = i + 1;
              });
            }
            if (type === 1) {
              tableData.value = res.data;
            }
            if (menuIndex.value === 4) {
              marriageInfo.value = res.data;
            } else if (menuIndex.value === 5) {
              titInfo.value = res.data;
            } else if (menuIndex.value === 6) {
              sectInfo.value = res.data;
            }
            loading.value = false;
            common_vendor.index.hideLoading();
          } else {
            if (res.code != -10002) {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none"
              });
            }
            common_vendor.index.hideLoading();
            loading.value = false;
          }
        });
      }
    }
    function switchMenu(item, i) {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/group-space-x.vue:358", i, "ooo");
      if (menuIndex.value != i) {
        menuIndex.value = i;
        groupUserInfo(item.type);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(menuList.value, (item, index, i0) => {
          return {
            a: common_vendor.n("box-img-" + (index + 1)),
            b: common_vendor.t(item.name),
            c: common_vendor.n(menuIndex.value === index ? "active" : ""),
            d: item.id,
            e: common_vendor.o(($event) => switchMenu(item, index), item.id)
          };
        }),
        b: common_vendor.f(thList[menuIndex.value + 1], (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.o(($event) => changeTable($event, index), index),
            d: "22adb081-2-" + i0 + ",22adb081-1",
            e: common_vendor.p({
              width: index == 0 ? tableWidth3.value : tableWidth.value,
              align: index === 0 ? "left" : index + 1 === thList[menuIndex.value + 1].length ? "right" : "center",
              sortable: item.sort
            })
          };
        }),
        c: menuIndex.value != 4 && menuIndex.value != 5 && menuIndex.value != 6
      }, menuIndex.value != 4 && menuIndex.value != 5 && menuIndex.value != 6 ? {
        d: common_vendor.f(tableData.value, (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.index <= 9 ? "0" + item.index : item.index),
            b: "22adb081-4-" + i0 + "," + ("22adb081-3-" + i0),
            c: common_vendor.t(item.nick_name),
            d: "22adb081-5-" + i0 + "," + ("22adb081-3-" + i0),
            e: common_vendor.t(item.created_at),
            f: "22adb081-6-" + i0 + "," + ("22adb081-3-" + i0),
            g: common_vendor.t(common_vendor.unref(unit_filters.filterMoney)(item.gold_coin)),
            h: "22adb081-7-" + i0 + "," + ("22adb081-3-" + i0),
            i: common_vendor.t(item.fans_val),
            j: "22adb081-8-" + i0 + "," + ("22adb081-3-" + i0)
          }, menuIndex.value === 3 ? {
            k: common_vendor.t(item.total_check_in),
            l: "22adb081-9-" + i0 + "," + ("22adb081-3-" + i0),
            m: common_vendor.p({
              align: "center"
            }),
            n: common_vendor.t(item.continuous_check_in),
            o: "22adb081-10-" + i0 + "," + ("22adb081-3-" + i0),
            p: common_vendor.p({
              align: "right"
            })
          } : menuIndex.value === 7 ? {
            q: common_vendor.t(item.flag === 1 ? "超级管理员" : "普通管理员"),
            r: "22adb081-11-" + i0 + "," + ("22adb081-3-" + i0),
            s: common_vendor.p({
              align: "right"
            })
          } : {}, {
            t: i,
            v: "22adb081-3-" + i0 + ",22adb081-0"
          });
        }),
        e: common_vendor.p({
          width: tableWidth3.value,
          align: "left",
          sortable: true
        }),
        f: menuIndex.value != 6,
        g: common_vendor.p({
          align: "center"
        }),
        h: menuIndex.value === 0,
        i: common_vendor.p({
          align: "right"
        }),
        j: menuIndex.value === 1,
        k: common_vendor.p({
          align: "right"
        }),
        l: menuIndex.value === 2,
        m: common_vendor.p({
          align: "right"
        }),
        n: menuIndex.value === 3,
        o: menuIndex.value === 7
      } : menuIndex.value === 4 ? {
        q: common_vendor.f(marriageInfo.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.index <= 9 ? "0" + item.index : item.index),
            b: "22adb081-13-" + i0 + "," + ("22adb081-12-" + i0),
            c: common_vendor.t(item.display_name_1),
            d: common_vendor.t(item.display_name_2),
            e: "22adb081-14-" + i0 + "," + ("22adb081-12-" + i0),
            f: common_vendor.t(item.marriage_days),
            g: "22adb081-15-" + i0 + "," + ("22adb081-12-" + i0),
            h: common_vendor.t(item.love_value),
            i: "22adb081-16-" + i0 + "," + ("22adb081-12-" + i0),
            j: i,
            k: "22adb081-12-" + i0 + ",22adb081-0"
          };
        }),
        r: common_vendor.p({
          width: tableWidth3.value,
          align: "left"
        }),
        s: common_vendor.p({
          align: "center"
        }),
        t: common_vendor.p({
          align: "center"
        }),
        v: common_vendor.p({
          align: "right"
        })
      } : menuIndex.value === 5 ? {
        x: common_vendor.f(titInfo.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.index <= 9 ? "0" + item.index : item.index),
            b: "22adb081-18-" + i0 + "," + ("22adb081-17-" + i0),
            c: common_vendor.t(item.display_name),
            d: "22adb081-19-" + i0 + "," + ("22adb081-17-" + i0),
            e: common_vendor.t(item.title),
            f: "22adb081-20-" + i0 + "," + ("22adb081-17-" + i0),
            g: i,
            h: "22adb081-17-" + i0 + ",22adb081-0"
          };
        }),
        y: common_vendor.p({
          width: tableWidth3.value,
          align: "left"
        }),
        z: common_vendor.p({
          align: "center"
        }),
        A: common_vendor.p({
          align: "right"
        })
      } : menuIndex.value === 6 ? {
        C: common_vendor.f(sectInfo.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.index <= 9 ? "0" + item.index : item.index),
            b: "22adb081-22-" + i0 + "," + ("22adb081-21-" + i0),
            c: common_vendor.t(item.display_name),
            d: "22adb081-23-" + i0 + "," + ("22adb081-21-" + i0),
            e: common_vendor.t(item.sect_name),
            f: "22adb081-24-" + i0 + "," + ("22adb081-21-" + i0),
            g: i,
            h: "22adb081-21-" + i0 + ",22adb081-0"
          };
        }),
        D: common_vendor.p({
          width: tableWidth3.value,
          align: "left"
        }),
        E: common_vendor.p({
          align: "center"
        }),
        F: common_vendor.p({
          align: "right"
        })
      } : {
        G: common_vendor.f(adminInfo.value, (item, i, i0) => {
          return {
            a: common_vendor.t(item.index <= 9 ? "0" + item.index : item.index),
            b: "22adb081-26-" + i0 + "," + ("22adb081-25-" + i0),
            c: common_vendor.t(item.display_name),
            d: "22adb081-27-" + i0 + "," + ("22adb081-25-" + i0),
            e: common_vendor.t(item.flag === 1 ? "超级管理员" : "普通管理员"),
            f: "22adb081-28-" + i0 + "," + ("22adb081-25-" + i0),
            g: i,
            h: "22adb081-25-" + i0 + ",22adb081-0"
          };
        }),
        H: common_vendor.p({
          width: tableWidth3.value,
          align: "left"
        }),
        I: common_vendor.p({
          align: "center"
        }),
        J: common_vendor.p({
          align: "right"
        })
      }, {
        p: menuIndex.value === 4,
        w: menuIndex.value === 5,
        B: menuIndex.value === 6,
        K: common_vendor.sr("tableList", "22adb081-0"),
        L: common_vendor.p({
          loading: loading.value,
          emptyText: "暂无数据"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22adb081"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/group-space-x.js.map
