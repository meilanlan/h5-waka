"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
const _sfc_main = {
  __name: "sharePerson",
  setup(__props) {
    common_vendor.ref(1);
    const userId = common_vendor.ref();
    const userInfo = common_vendor.reactive({ data: {} });
    function getShareInfo() {
      common_vendor.index.showLoading();
      service_robotAccount_index.shareUserApi({ user_id: userId.value }, (res) => {
        if (res.code === 0) {
          userInfo.data = res.data;
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
      userId.value = option.user_id * 1;
      getShareInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$3,
        c: userInfo.data.head_img || common_vendor.unref(common_assets.defaultimg),
        d: common_vendor.t(userInfo.data.nick_name),
        e: common_assets._imports_2$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9bb0a714"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shareh5/sharePerson.js.map
