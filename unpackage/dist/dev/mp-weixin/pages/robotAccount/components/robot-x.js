"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  (robotAssistantX + myOrder)();
}
const robotAssistantX = () => "./robot-assistant-x.js";
const myOrder = () => "./my-order.js";
const _sfc_main = {
  __name: "robot-x",
  setup(__props) {
    const curTab = common_vendor.ref(1);
    common_vendor.ref(false);
    const flagLock = common_vendor.ref(false);
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    const spaceRobotData = common_vendor.reactive({ data: {
      robot_list: [],
      order_list: []
    } });
    function switchTab(item) {
      curTab.value = item;
    }
    common_vendor.index.__f__("log", "at pages/robotAccount/components/robot-x.vue:39", parentInfo.data, "parentInfo.data is");
    getSpaceRobot();
    function getSpaceRobot() {
      common_vendor.index.showLoading();
      service_robotAccount_index.spaceRobotApi({ group_id: parentInfo.data.group_id }, (res) => {
        if (res.code === 0) {
          spaceRobotData.data = res.data;
          flagLock.value = true;
          common_vendor.index.hideLoading();
        } else if (res.code === -20001) {
          clearAdminToken();
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(2, (item, k0, i0) => {
          return {
            a: common_vendor.t(item === 1 ? "机器人助手" : "我的订单"),
            b: common_vendor.n("box-" + item),
            c: common_vendor.n(curTab.value === item ? "active" : "gray"),
            d: "tab-" + item,
            e: common_vendor.o(($event) => switchTab(item), "tab-" + item)
          };
        }),
        b: flagLock.value === true
      }, flagLock.value === true ? common_vendor.e({
        c: curTab.value === 1
      }, curTab.value === 1 ? {
        d: common_vendor.p({
          robot_list: spaceRobotData.data.robot_list
        })
      } : {
        e: common_vendor.p({
          order_list: spaceRobotData.data.order_list
        })
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00aaf3ae"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/robot-x.js.map
