"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (profitAgreementXVue + uniPopup)();
}
const uniPopup = () => "../../components/uni-popup/components/uni-popup/uni-popup.js";
const profitAgreementXVue = () => "../robotAccount/components/profit-agreement-x.js";
const _sfc_main = {
  __name: "income",
  setup(__props) {
    const agreementPopup = common_vendor.ref(null);
    const tabIndex = common_vendor.ref(1);
    const timeList = common_vendor.ref(["全部", "最近1周", "最近1个月", "最近3个月"]);
    const curTimeIndex = common_vendor.ref(0);
    const isIos = common_vendor.ref(window.isiOS);
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
    function backPage() {
      common_vendor.index.navigateBack();
    }
    function switchTab(item) {
      tabIndex.value = item;
    }
    function switchTime(index) {
      curTimeIndex.value = index;
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => backPage()),
        c: common_assets._imports_1$6,
        d: common_vendor.o(($event) => openAgreement(1)),
        e: common_vendor.n(isIos.value != true ? "safeTop" : ""),
        f: common_assets._imports_1$7,
        g: common_vendor.o(($event) => toPage(1)),
        h: common_vendor.o(($event) => toPage(2)),
        i: common_assets._imports_1$7,
        j: common_vendor.o(($event) => toPage(2)),
        k: common_vendor.o(($event) => toPage(3)),
        l: common_vendor.f(2, (item, index, i0) => {
          return {
            a: common_vendor.t(item === 1 ? "收益明细" : "交易记录"),
            b: common_vendor.n(tabIndex.value === item ? "active" : ""),
            c: "tab-" + index,
            d: common_vendor.o(($event) => switchTab(item), "tab-" + index)
          };
        }),
        m: common_vendor.f(timeList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(curTimeIndex.value === index && "active"),
            c: index,
            d: common_vendor.o(($event) => switchTime(index), index)
          };
        }),
        n: common_vendor.o(($event) => openAgreement(2)),
        o: common_assets._imports_0$7,
        p: common_vendor.sr(agreementPopup, "90b5ca22-0", {
          "k": "agreementPopup"
        }),
        q: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-90b5ca22"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/income/income.js.map
