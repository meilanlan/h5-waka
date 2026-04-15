"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
const _sfc_main = {
  __name: "myBill",
  setup(__props) {
    const curTab = common_vendor.ref(1);
    const curPage = common_vendor.ref(0);
    const group_id = common_vendor.ref();
    const billList = common_vendor.ref([]);
    const isIos = common_vendor.ref(window.isiOS);
    function lower(e) {
      curPage.value = curPage.value + 1;
      getBillList();
    }
    function switchTab(item) {
      curTab.value = item;
      curPage.value = 0;
      getBillList();
    }
    function backPage() {
      common_vendor.index.navigateBack();
    }
    function getBillList() {
      common_vendor.index.showLoading({ mask: true });
      service_robotAccount_index.billListApi({ type: curTab.value, last_id: curPage.value }, (res) => {
        if (res.code === 0) {
          billList.value = res.data;
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        }
      });
    }
    common_vendor.onLoad((option) => {
      curTab.value = option.accountId * 1 || 1;
      group_id.value = option.group_id;
      common_vendor.nextTick$1(() => {
        window.client.getUserinfo((res) => {
          common_vendor.index.__f__("log", "at pages/robotAccount/myBill.vue:110", res, "resresres");
          getBillList();
        });
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => backPage()),
        c: common_vendor.n(isIos.value != true ? "safeTop" : ""),
        d: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: common_vendor.t(item === 1 ? "获得嗨币" : item === 2 ? "使用记录" : "兑换"),
            b: common_vendor.n(curTab.value === item && "active"),
            c: "tab-" + item,
            d: common_vendor.o(($event) => switchTab(item), "tab-" + item)
          };
        }),
        e: !billList.value.length
      }, !billList.value.length ? {
        f: common_assets._imports_1
      } : {}, {
        g: common_vendor.f(billList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.time),
            c: common_vendor.t(item.desc),
            d: "bill-" + index
          };
        }),
        h: common_vendor.o(lower)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-88666216"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/myBill.js.map
