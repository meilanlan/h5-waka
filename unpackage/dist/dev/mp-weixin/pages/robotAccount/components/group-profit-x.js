"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  (profitAgreementXVue + uniPopup)();
}
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const profitAgreementXVue = () => "./profit-agreement-x.js";
const _sfc_main = {
  __name: "group-profit-x",
  setup(__props) {
    const timeList = common_vendor.ref(["全部", "最近1周", "最近1个月", "最近3个月"]);
    const curTimeIndex = common_vendor.ref(0);
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    const incomeInfo = common_vendor.reactive({ data: {} });
    const agreementPopup = common_vendor.ref(null);
    getIncome();
    function getIncome() {
      common_vendor.index.showLoading();
      service_robotAccount_index.groupIncomeApi({ group_id: parentInfo.data.group_id }, (res) => {
        if (res.code === 0) {
          incomeInfo.data = res.data.income;
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
    function switchTime(index) {
      curTimeIndex.value = index;
    }
    function toPage(type) {
      let url = type === 1 ? "/pages/robotAccount/profitDetail" : type === 2 ? "/pages/robotAccount/settlement" : "/pages/robotAccount/wathdrawal";
      common_vendor.index.navigateTo({
        url
      });
    }
    function openAgreement(type) {
      type === 1 && agreementPopup.value.open();
      type === 2 && agreementPopup.value.close();
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$10,
        b: common_vendor.o(($event) => openAgreement(1)),
        c: common_vendor.t(incomeInfo.data.today_haib),
        d: common_assets._imports_1$7,
        e: common_vendor.o(($event) => toPage(1)),
        f: common_vendor.t(incomeInfo.data.hold_haib),
        g: common_vendor.o(($event) => toPage(2)),
        h: common_vendor.t(incomeInfo.data.hold_haid),
        i: common_vendor.o(($event) => toPage(3)),
        j: common_vendor.f(timeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(curTimeIndex.value === index && "active"),
            c: index,
            d: common_vendor.o(($event) => switchTime(index), index)
          };
        }),
        k: common_vendor.f(incomeInfo.data.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.order_status),
            b: common_vendor.t(item.order_desc),
            c: common_vendor.t(item.order_num),
            d: "index-" + index
          };
        }),
        l: common_vendor.o(($event) => openAgreement(2)),
        m: common_assets._imports_0$7,
        n: common_vendor.sr(agreementPopup, "ee05be75-0", {
          "k": "agreementPopup"
        }),
        o: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ee05be75"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/group-profit-x.js.map
