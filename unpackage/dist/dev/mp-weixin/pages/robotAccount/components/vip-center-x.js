"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
if (!Math) {
  (uniTh + uniTr + uniTd + uniTable + uniPopup + vipAgreementXVue)();
}
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const uniTable = () => "../../../components/uni-table/components/uni-table/uni-table.js";
const uniTd = () => "../../../components/uni-table/components/uni-td/uni-td.js";
const uniTh = () => "../../../components/uni-table/components/uni-th/uni-th.js";
const uniTr = () => "../../../components/uni-table/components/uni-tr/uni-tr.js";
const vipAgreementXVue = () => "./vip-agreement-x.js";
const _sfc_main = {
  __name: "vip-center-x",
  props: {
    vip: Object
  },
  setup(__props) {
    const props = __props;
    const parentInfo = common_vendor.reactive({ data: {} });
    parentInfo.data = common_vendor.inject("parentGroupInfo");
    const payPopup = common_vendor.ref(null);
    const curPay = common_vendor.ref("1");
    const curTab = common_vendor.ref(0);
    const curVipIndex = common_vendor.ref(0);
    const agaree = common_vendor.ref(false);
    common_vendor.ref([]);
    const curVipInfo = common_vendor.ref();
    const tableWidth = common_vendor.ref(common_vendor.index.upx2px(200));
    const tableWidth2 = common_vendor.ref(common_vendor.index.upx2px(100));
    const agreementPopup = common_vendor.ref(null);
    const payLock = common_vendor.ref(false);
    curVipInfo.value = props.vip.tab_list[curTab.value].data;
    function switchVip(item, index) {
      curVipIndex.value = index;
      common_vendor.index.__f__("log", "at pages/robotAccount/components/vip-center-x.vue:136", curVipInfo.value.list[index]);
    }
    function switchTab(item, index) {
      curVipIndex.value = 0;
      curTab.value = index;
      curVipInfo.value = item.data;
    }
    function toPay() {
      if (payLock.value === false) {
        payLock.value = true;
        common_vendor.index.showLoading({ mask: true });
        let returnUrl = encodeURIComponent(window.location.origin + `/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`);
        service_robotAccount_index.alipayOrder({ prod_id: curVipInfo.value.list[curVipIndex.value].id, return_url: returnUrl }, (res) => {
          if (res.code === 0) {
            payPopup.value.close();
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
    function openPayPopup() {
      payPopup.value.open();
    }
    function radioPayChange() {
    }
    function openAgreement(type) {
      type === 1 && agreementPopup.value.open();
      type === 2 && agreementPopup.value.close();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(props.vip.tab_list, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.title),
            c: common_vendor.n("box-" + (index + 1)),
            d: common_vendor.n(curTab.value === index ? "active" : "gray"),
            e: "tab-" + index,
            f: common_vendor.o(($event) => switchTab(item, index), "tab-" + index)
          };
        }),
        b: common_vendor.t(curVipInfo.value.desc),
        c: common_vendor.f(curVipInfo.value.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.price),
            c: common_vendor.t(item.desc),
            d: common_vendor.t(item.discount),
            e: common_vendor.t(item.tag),
            f: common_vendor.n(curVipIndex.value === index && "active"),
            g: "vip-" + item.id,
            h: common_vendor.o(($event) => switchVip(item, index), "vip-" + item.id)
          };
        }),
        d: common_vendor.p({
          width: tableWidth.value,
          align: "center"
        }),
        e: curTab.value === 0
      }, curTab.value === 0 ? {
        f: common_vendor.p({
          width: tableWidth2.value,
          align: "center"
        })
      } : {}, {
        g: common_assets._imports_0$4,
        h: common_vendor.p({
          width: tableWidth2.value,
          align: "center"
        }),
        i: curTab.value === 1
      }, curTab.value === 1 ? {
        j: common_assets._imports_1$9,
        k: common_vendor.p({
          width: tableWidth2.value,
          align: "center"
        })
      } : {}, {
        l: common_vendor.f(props.vip.rights_desc, (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: "f2468e5b-7-" + i0 + "," + ("f2468e5b-6-" + i0),
            c: common_vendor.p({
              width: i === 0 ? tableWidth.value : tableWidth2.value,
              align: "center"
            })
          }, curTab.value === 0 ? {
            d: common_vendor.t(item.novip),
            e: "f2468e5b-8-" + i0 + "," + ("f2468e5b-6-" + i0),
            f: common_vendor.p({
              width: i === 0 ? tableWidth.value : tableWidth2.value,
              align: "center"
            })
          } : {}, {
            g: common_vendor.t(item.vip),
            h: "f2468e5b-9-" + i0 + "," + ("f2468e5b-6-" + i0),
            i: common_vendor.p({
              width: i === 0 ? tableWidth.value : tableWidth2.value,
              align: "center"
            })
          }, curTab.value === 1 ? {
            j: common_vendor.t(item.svip),
            k: "f2468e5b-10-" + i0 + "," + ("f2468e5b-6-" + i0),
            l: common_vendor.p({
              width: i === 0 ? tableWidth.value : tableWidth2.value,
              align: "center"
            })
          } : {}, {
            m: i,
            n: "f2468e5b-6-" + i0 + ",f2468e5b-0"
          });
        }),
        m: curTab.value === 0,
        n: curTab.value === 1,
        o: common_vendor.sr("tableList", "f2468e5b-0"),
        p: common_vendor.p({
          emptyText: "暂无数据"
        }),
        q: common_vendor.t(curVipInfo.value.list[curVipIndex.value].price),
        r: common_vendor.o(openPayPopup),
        s: common_vendor.n(agaree.value === false && "active"),
        t: common_vendor.o(($event) => openAgreement(1)),
        v: common_vendor.o(($event) => agaree.value = !agaree.value),
        w: common_assets._imports_1$8,
        x: curPay.value === "1",
        y: common_assets._imports_2$5,
        z: curPay.value === "2",
        A: common_vendor.o(radioPayChange),
        B: common_vendor.o(toPay),
        C: common_vendor.sr(payPopup, "f2468e5b-11", {
          "k": "payPopup"
        }),
        D: common_vendor.p({
          type: "bottom"
        }),
        E: common_vendor.o(($event) => openAgreement(2)),
        F: common_assets._imports_0$7,
        G: common_vendor.sr(agreementPopup, "f2468e5b-12", {
          "k": "agreementPopup"
        }),
        H: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f2468e5b"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/vip-center-x.js.map
