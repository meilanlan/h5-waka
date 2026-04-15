"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  (payX + uniPopup)();
}
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const payX = () => "../../../components/pay-x/pay-x.js";
const _sfc_main = {
  __name: "energy-assist-x",
  props: {
    energy: Object,
    haib: Object
  },
  emits: ["updateEnergy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const checkEnergyNum = common_vendor.ref(-1);
    const num = common_vendor.ref("");
    const payPopup = common_vendor.ref(null);
    const haveEnergy = common_vendor.ref(0);
    haveEnergy.value = props.energy.banlance;
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    const energyLock = common_vendor.ref(false);
    function checkEnergy(item, index) {
      checkEnergyNum.value = index;
      num.value = item.energy;
    }
    function watchNum() {
      if (num.value) {
        num.value = num.value.replace(/\D/g, "");
        if (num.value.length > 1 && num.value.startsWith("0")) {
          num.value = num.value.slice(1);
        }
        checkEnergyNum.value = -1;
      }
    }
    function helpPay() {
      if (energyLock.value === false) {
        energyLock.value === true;
        common_vendor.index.showLoading({ mask: true });
        service_robotAccount_index.groupGrowApi({ group_id: parentInfo.data.group_id, amount: num.value }, (res) => {
          var _a, _b;
          if (res.code === 0) {
            if (((_a = res.action) == null ? void 0 : _a.id) === 1011) {
              payPopup.value.open();
              common_vendor.index.showToast({
                title: "HI币余额不足",
                icon: "error"
              });
            } else if (res.data) {
              haveEnergy.value = (_b = res.data.rgiths) == null ? void 0 : _b.energy;
              emit("updateEnergy", haveEnergy.value);
              common_vendor.index.hideLoading();
              window.client.JSAction({
                id: 1013,
                param: JSON.stringify(res.action)
              });
              common_vendor.index.showToast({
                title: "能量助力成功",
                icon: "none"
              });
            } else {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none"
              });
            }
            energyLock.value === false;
          } else {
            energyLock.value === false;
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            common_vendor.index.hideLoading();
          }
        });
      }
    }
    common_vendor.onReady(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(haveEnergy.value),
        b: common_assets._imports_0$14,
        c: common_vendor.f(props.energy.list, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.energy),
            b: checkEnergyNum.value === index && item.title
          }, checkEnergyNum.value === index && item.title ? {
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.desc)
          } : {}, {
            e: common_vendor.n(checkEnergyNum.value === index && "active"),
            f: "n" + item.id,
            g: common_vendor.o(($event) => checkEnergy(item, index), "n" + item.id)
          });
        }),
        d: common_assets._imports_0$14,
        e: common_vendor.o([($event) => num.value = $event.detail.value, watchNum]),
        f: num.value,
        g: common_assets._imports_0$14,
        h: common_vendor.n((num.value || checkEnergyNum.value != -1) && "active"),
        i: common_vendor.o(helpPay),
        j: common_vendor.p({
          haib: props.haib
        }),
        k: common_vendor.sr(payPopup, "e0ca763a-0", {
          "k": "payPopup"
        }),
        l: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e0ca763a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/energy-assist-x.js.map
