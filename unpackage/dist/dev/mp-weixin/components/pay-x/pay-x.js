"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
if (!Math) {
  (userAgreementXVue + uniPopup)();
}
const uniPopup = () => "../uni-popup/components/uni-popup/uni-popup.js";
const userAgreementXVue = () => "../../pages/robotAccount/components/user-agreement-x.js";
const _sfc_main = {
  __name: "pay-x",
  props: {
    haib: Object
  },
  setup(__props) {
    const props = __props;
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    common_vendor.index.__f__("log", "at components/pay-x/pay-x.vue:61", encodeURIComponent(window.location.origin + `/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`), "url");
    const agreementPopup = common_vendor.ref(null);
    const curPay = common_vendor.ref("1");
    common_vendor.ref(-1);
    const curIndex = common_vendor.ref(-1);
    const payLock = common_vendor.ref(false);
    function switchHi(item, index) {
      curIndex.value = index;
      common_vendor.index.__f__("log", "at components/pay-x/pay-x.vue:79", props.haib.list[index], "jkjk");
    }
    function toPay() {
      if (payLock.value === false) {
        payLock.value = true;
        common_vendor.index.showLoading({ mask: true });
        let returnUrl = encodeURIComponent(window.location.origin + `/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`);
        service_robotAccount_index.alipayOrder({ prod_id: props.haib.list[curIndex.value].id, return_url: returnUrl }, (res) => {
          if (res.code === 0) {
            location.href = res.data.request_params;
            payLock.value = false;
            common_vendor.index.hideLoading();
          } else {
            payLock.value = false;
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            common_vendor.index.hideLoading();
          }
        });
      }
    }
    function radioChange() {
    }
    function openAgreement(type) {
      type === 1 && agreementPopup.value.open();
      type === 2 && agreementPopup.value.close();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.haib.banlance),
        b: common_assets._imports_0$11,
        c: common_vendor.f(props.haib.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.haib),
            b: common_vendor.t(item.cash),
            c: common_vendor.n(curIndex.value === index && "active"),
            d: "hi" + index,
            e: common_vendor.o(($event) => switchHi(item, index), "hi" + index)
          };
        }),
        d: common_assets._imports_0$11,
        e: common_assets._imports_1$8,
        f: curPay.value === "1",
        g: common_assets._imports_2$5,
        h: curPay.value === "2",
        i: common_vendor.o(radioChange),
        j: curIndex.value != -1
      }, curIndex.value != -1 ? {
        k: common_vendor.t(props.haib.list[curIndex.value].cash)
      } : {}, {
        l: common_vendor.n(curIndex.value != -1 && "active"),
        m: common_vendor.o(toPay),
        n: common_vendor.o(($event) => openAgreement(1)),
        o: common_vendor.o(($event) => openAgreement(2)),
        p: common_assets._imports_0$7,
        q: common_vendor.sr(agreementPopup, "bec9b944-0", {
          "k": "agreementPopup"
        }),
        r: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bec9b944"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/pay-x/pay-x.js.map
