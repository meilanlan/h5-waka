"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
if (!Math) {
  (energyAssistX + myWallet + vipCenterX + payX)();
}
const energyAssistX = () => "./energy-assist-x.js";
const myWallet = () => "./my-wallet.js";
const vipCenterX = () => "./vip-center-x.js";
const payX = () => "../../../components/pay-x/pay-x.js";
const _sfc_main = {
  __name: "my-home-x",
  props: {
    robotInfo: Object
  },
  setup(__props) {
    const props = __props;
    const tabList = [
      { value: "能量助力", iconUrl: new URL("@/static/image/home-1.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/robotAccount/components/my-home-x.js", document.baseURI).href).href },
      { value: "我的钱包", iconUrl: new URL("@/static/image/home-2.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/robotAccount/components/my-home-x.js", document.baseURI).href).href },
      { value: "会员中心", iconUrl: new URL("@/static/image/home-3.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/robotAccount/components/my-home-x.js", document.baseURI).href).href },
      { value: "Hi币充值", iconUrl: new URL("@/static/image/home-4.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/robotAccount/components/my-home-x.js", document.baseURI).href).href }
    ];
    const infoFlag = common_vendor.ref(false);
    const curTabIndex = common_vendor.ref(0);
    const userInfo = common_vendor.reactive({
      data: {
        energy: {},
        haib: {},
        user: {},
        vip: {},
        wallet: {}
      }
    });
    const parentInfo = common_vendor.inject("parentGroupInfo");
    function updateEnergy(data) {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/my-home-x.vue:81", data, "data");
      userInfo.data.wallet.energy = data;
    }
    function copyId(content) {
      common_vendor.index.setClipboardData({
        data: content,
        success: function() {
          common_vendor.index.__f__("log", "at pages/robotAccount/components/my-home-x.vue:89", "success");
        }
      });
    }
    function switchTab(item, index) {
      curTabIndex.value = index;
    }
    getUserProfile();
    function getUserProfile() {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/my-home-x.vue:101", "come in");
      common_vendor.index.showLoading();
      service_robotAccount_index.userProfileApi({ group_id: parentInfo.group_id }, (res) => {
        if (res.code === 0) {
          userInfo.data = res.data;
          userInfo.data.user.bg_img = "";
          common_vendor.index.__f__("log", "at pages/robotAccount/components/my-home-x.vue:108", userInfo.data, "userInfo.data");
          infoFlag.value = true;
          common_vendor.index.hideLoading();
        } else if (res.code === -20001) {
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.hideLoading();
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.data.user.bg_img || "/static/image/bg-slices/bg.png",
        b: userInfo.data.user.head_img,
        c: common_vendor.t(userInfo.data.user.nick_name),
        d: common_vendor.f(userInfo.data.user.ic_list, (item, k0, i0) => {
          return {
            a: item
          };
        }),
        e: common_vendor.t(userInfo.data.user.location),
        f: common_vendor.t(userInfo.data.user.user_id),
        g: common_vendor.o(($event) => copyId(props.robotInfo.group_id)),
        h: common_assets._imports_0$9,
        i: common_vendor.f(tabList, (item, index, i0) => {
          return {
            a: item.iconUrl,
            b: common_vendor.t(item.value),
            c: common_vendor.n(curTabIndex.value === index && "active"),
            d: "TAB" + index,
            e: common_vendor.o(($event) => switchTab(item, index), "TAB" + index)
          };
        }),
        j: infoFlag.value === true
      }, infoFlag.value === true ? common_vendor.e({
        k: curTabIndex.value === 0
      }, curTabIndex.value === 0 ? {
        l: common_vendor.o(updateEnergy),
        m: common_vendor.p({
          energy: userInfo.data.energy,
          haib: userInfo.data.haib
        })
      } : curTabIndex.value === 1 ? {
        o: common_vendor.p({
          haib: userInfo.data.haib,
          wallet: userInfo.data.wallet,
          robotInfo: props.robotInfo
        })
      } : curTabIndex.value === 2 ? {
        q: common_vendor.p({
          vip: userInfo.data.vip
        })
      } : {
        r: common_vendor.p({
          haib: userInfo.data.haib
        })
      }, {
        n: curTabIndex.value === 1,
        p: curTabIndex.value === 2
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-75de4e58"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/my-home-x.js.map
