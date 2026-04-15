"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  uniPopup();
}
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  __name: "robot-assistant-x",
  props: {
    robot_list: Array
  },
  setup(__props) {
    const curPay = common_vendor.ref("1");
    const payLock = common_vendor.ref(false);
    const curRobotInfo = common_vendor.reactive({ data: {} });
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    const props = __props;
    const payMethodsRef = common_vendor.ref(null);
    function openMethods(item) {
      if (item.prod_status === 0) {
        curRobotInfo.data = item;
        payMethodsRef.value.open();
      }
    }
    function toPay() {
      if (payLock.value === false) {
        payLock.value = true;
        let params = {
          group_id: parentInfo.data.group_id,
          prod_id: curRobotInfo.data.id,
          action: 1
        };
        common_vendor.index.showLoading({ mask: true });
        service_robotAccount_index.robotProdDoApi(params, (res) => {
          if (res.data) {
            if (res.data.request_params) {
              location.href = res.data.request_params;
            } else {
              curRobotInfo.data.prod_status = res.data.prod_status;
            }
            payMethodsRef.value.close();
            common_vendor.index.hideLoading();
            payLock.value = false;
          } else {
            payLock.value = false;
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            common_vendor.index.hideLoading();
            payMethodsRef.value.close();
          }
        });
      }
    }
    function radioPayChange() {
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.robot_list, (item, index, i0) => {
          return {
            a: item.cover_big,
            b: item.cover_small,
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.prod_name),
            e: common_vendor.t(item.prod_develop),
            f: common_vendor.t(item.prod_des),
            g: common_vendor.t(item.prod_price),
            h: common_vendor.t(item.prod_status === 0 ? "获取" : "已安装"),
            i: common_vendor.n("btn-" + item.prod_status),
            j: common_vendor.o(($event) => openMethods(item), index),
            k: index
          };
        }),
        b: common_assets._imports_1$8,
        c: curPay.value === "1",
        d: common_assets._imports_2$5,
        e: curPay.value === "2",
        f: common_vendor.o(radioPayChange),
        g: common_vendor.o(toPay),
        h: common_vendor.sr(payMethodsRef, "e7048daa-0", {
          "k": "payMethodsRef"
        }),
        i: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e7048daa"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/robot-assistant-x.js.map
