"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
const _sfc_main = {
  __name: "wakaGroup",
  setup(__props) {
    const opt = common_vendor.reactive({
      group_id: "",
      user_id: ""
    });
    const infoData = common_vendor.reactive({
      group: {
        group_cover: "",
        group_id: "",
        group_name: "",
        group_user_count: ""
      },
      user: {
        head_img: "",
        nick_name: "",
        user_id: ""
      }
    });
    function getGroupInfo() {
      common_vendor.index.showLoading();
      service_robotAccount_index.shareGroupApi({ user_id: opt.user_id, group_id: opt.group_id }, (res) => {
        if (res.code === 0) {
          infoData.group = res.data.group;
          infoData.user = res.data.user;
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
      opt.group_id = option.group_id;
      opt.user_id = option.user_id;
      getGroupInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: common_assets._imports_1$3,
        c: infoData.group.group_cover,
        d: common_vendor.t(infoData.group.group_name),
        e: common_assets._imports_3,
        f: common_vendor.t(infoData.group.group_user_count),
        g: infoData.user.head_img || common_vendor.unref(common_assets.defaultimg),
        h: common_vendor.t(infoData.user.nick_name),
        i: common_assets._imports_2$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-98b70e70"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shareh5/wakaGroup.js.map
