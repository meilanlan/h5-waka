"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  (setDataX + setManageX + setConfigX + setLuckdrawX + setMemberX + setMoveX)();
}
const setMemberX = () => "./set-member-x.js";
const setMoveX = () => "./set-move-x.js";
const setDataX = () => "./set-data-x.js";
const setManageX = () => "./set-manage-x.js";
const setConfigX = () => "./set-config-x.js";
const setLuckdrawX = () => "./set-luckdraw-x.js";
const _sfc_main = {
  __name: "group-set-x",
  props: {
    robotInfo: Object
  },
  setup(__props) {
    const props = __props;
    const setMenuList = common_vendor.ref([
      { id: 1, name: "群汇总" },
      { id: 2, name: "群数据" },
      { id: 3, name: "群管" },
      { id: 4, name: "配置" },
      { id: 5, name: "盲盒" },
      { id: 6, name: "一键同步" }
    ]);
    const setMenuIndex = common_vendor.ref(0);
    common_vendor.ref("");
    common_vendor.ref("");
    const dataSummary = common_vendor.reactive({ data: {} });
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    const initMember = common_vendor.ref(false);
    const initConfig = common_vendor.ref(false);
    const cmdData = common_vendor.reactive({
      joy_list: [],
      main_list: []
    });
    const configInfo = common_vendor.reactive({ data: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null
    } });
    getGroupSummaryInfo();
    function getGroupInfo() {
    }
    function groupConfigInfo(type) {
      service_robotAccount_index.groupConfigData({ default: type, group_id: parentInfo.data.group_id }, (res) => {
        if (res.code === 0) {
          let newInfo = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null, 11: null, 12: null, 13: null, 14: null, 15: null, 16: null, 17: { business_config_list: [] }, 18: null, 19: null, 20: null, 21: null, 22: null, 23: { title_list: [] }, 24: { coin_gift_list: [] } };
          if (res.data && res.data.length > 0) {
            for (var key in res.data) {
              newInfo[res.data[key].data_type] = res.data[key];
            }
          }
          configInfo.data = JSON.parse(JSON.stringify(newInfo));
          common_vendor.index.__f__("log", "at pages/robotAccount/components/group-set-x.vue:710", configInfo.data, "configInfo.data is");
          if (!configInfo.data[11]) {
            configInfo.data[11] = {
              data_type: 11,
              list: [{ title: "", content: "" }]
            };
          }
          if (!configInfo.data[23].title_list.length) {
            configInfo.data[23].title_list.push({ id: "", name: "", res_id: -1 });
          }
          if (!configInfo.data[24].coin_gift_list.length) {
            configInfo.data[24].coin_gift_list.push({ id: "", name: "", coin: "", charm: "" });
          } else {
            configInfo.data[24]["coin_gift_list"].forEach((t, i) => {
              if (t.name.length > 8)
                t.name = t.name.slice(0, 8) + "...";
            });
          }
          setMenuIndex.value === 2 ? initMember.value = true : initConfig.value = true;
          common_vendor.index.__f__("log", "at pages/robotAccount/components/group-set-x.vue:730", configInfo.data, "遇见");
        } else if (res.code === -20001)
          ;
        else if (res.code != -10002) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        }
        common_vendor.index.hideLoading();
      });
    }
    function setDefaultData(type) {
    }
    function updateConfig() {
    }
    function topage(url) {
      common_vendor.index.navigateTo({
        url: url + "?group_id=" + parentInfo.data.group_id + "&robot_id=" + parentInfo.data.robot_id
      });
    }
    function clearAdminToken() {
    }
    function getGroupSummaryInfo() {
      common_vendor.index.showLoading();
      service_robotAccount_index.groupSummaryData({ group_id: parentInfo.data.group_id }, (res) => {
        if (res.code === 0) {
          dataSummary.data = res.data || {};
          common_vendor.index.hideLoading();
        } else if (res.code === -20001) {
          common_vendor.index.hideLoading();
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            common_vendor.index.hideLoading();
          } else {
            common_vendor.index.hideLoading();
            if (JSON.stringify(dataSummary.data) == "{}") {
              common_vendor.index.showLoading({
                title: "小嗨正在努力加载中...",
                icon: "none"
              });
              setTimeout(() => {
                getGroupSummaryInfo();
              }, 3e3);
            }
          }
        }
      });
    }
    function getGroupCmdData() {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/group-set-x.vue:841", "纯纯粹粹", parentInfo);
      common_vendor.index.__f__("log", "at pages/robotAccount/components/group-set-x.vue:843", "++++++!");
      service_robotAccount_index.groupCmdData({ group_id: parentInfo.data.group_id }, (res) => {
        if (res.code === 0) {
          cmdData.main_list = res.data.main_list;
          cmdData.joy_list = res.data.joy_list;
        } else if (res.code === -20001)
          ;
        else if (res.code != -10002) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        }
        common_vendor.index.hideLoading();
      });
    }
    function switchSetMenu(item, i) {
      if (setMenuIndex.value != i) {
        setMenuIndex.value = i;
        i === 0 && common_vendor.index.showLoading() && getGroupSummaryInfo();
        if (i === 2) {
          common_vendor.index.showLoading();
          if (!configInfo.data[1])
            groupConfigInfo(2);
          else {
            initMember.value = true;
            common_vendor.index.hideLoading();
          }
        } else if (i === 3) {
          common_vendor.index.showLoading();
          getGroupCmdData();
          if (!configInfo.data[1])
            groupConfigInfo(2);
          else {
            initConfig.value = true;
            common_vendor.index.hideLoading();
          }
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(setMenuList.value, (item, index, i0) => {
          return {
            a: common_vendor.n("box-img-" + (index + 1)),
            b: common_vendor.t(item.name),
            c: common_vendor.n(setMenuIndex.value === index ? "active" : ""),
            d: item.id,
            e: common_vendor.o(($event) => switchSetMenu(item, index), item.id)
          };
        }),
        b: setMenuIndex.value === 0
      }, setMenuIndex.value === 0 ? {
        c: common_vendor.o(topage),
        d: common_vendor.p({
          info: dataSummary.data
        })
      } : setMenuIndex.value === 2 && initMember.value === true ? {
        f: common_vendor.o(clearAdminToken),
        g: common_vendor.o(setDefaultData),
        h: common_vendor.o(updateConfig),
        i: common_vendor.p({
          group_id: parentInfo.data.group_id,
          welcome: configInfo.data[1],
          emoji: configInfo.data[2],
          audio: configInfo.data[3],
          rule: configInfo.data[10],
          notice: configInfo.data[12],
          paipaiData: configInfo.data[22],
          protectData: configInfo.data[25]
        })
      } : setMenuIndex.value === 3 && initConfig.value === true ? {
        k: common_vendor.o(clearAdminToken),
        l: common_vendor.o(setDefaultData),
        m: common_vendor.o(updateConfig),
        n: common_vendor.o(getGroupInfo),
        o: common_vendor.p({
          group_id: parentInfo.data.group_id,
          robotInfo: props.robotInfo,
          cmdData,
          timerMsg: configInfo.data[4],
          sendGift: configInfo.data[5],
          signInfo: configInfo.data[6],
          lootInfo: configInfo.data[7],
          groupTopBg: configInfo.data[8],
          groupTopAd: configInfo.data[9],
          groupword: configInfo.data[11],
          coinRate: configInfo.data[13],
          propose: configInfo.data[15],
          loveing: configInfo.data[14],
          force: configInfo.data[16],
          businessList: configInfo.data[17],
          preLife: configInfo.data[20],
          happlyInfo: configInfo.data[21],
          nobleInfo: configInfo.data[23],
          giftInfo: configInfo.data[24]
        })
      } : setMenuIndex.value === 4 ? {
        q: common_vendor.o(clearAdminToken)
      } : {}, {
        e: setMenuIndex.value === 2 && initMember.value === true,
        j: setMenuIndex.value === 3 && initConfig.value === true,
        p: setMenuIndex.value === 4,
        r: setMenuIndex.value === 1
      }, setMenuIndex.value === 1 ? {
        s: common_vendor.o(clearAdminToken),
        t: common_vendor.p({
          robotInfo: props.robotInfo
        })
      } : setMenuIndex.value === 5 ? {
        w: common_vendor.o(clearAdminToken),
        x: common_vendor.p({
          robotInfo: props.robotInfo
        })
      } : {}, {
        v: setMenuIndex.value === 5
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5b059ca6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/group-set-x.js.map
