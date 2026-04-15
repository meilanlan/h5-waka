"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const service_robotAccount_index = require("../../service/robotAccount/index.js");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
if (!Math) {
  (TabX + groupSpaceX + instructionX + myHomeX + robotX + groupProfitX + groupSetX)();
}
const TabX = () => "./components/tab-x.js";
const groupSpaceX = () => "./components/group-space-x.js";
const instructionX = () => "./components/instruction-x.js";
const myHomeX = () => "./components/my-home-x.js";
const robotX = () => "./components/robot-x.js";
const groupProfitX = () => "./components/group-profit-x.js";
const groupSetX = () => "./components/group-set-x.js";
const _sfc_main = {
  __name: "robotDetail",
  setup(__props) {
    const robotInfo = common_vendor.reactive({ data: {
      ad_img_url: "",
      ad_jump_url: "",
      bg_img_url: "",
      group_cover: "",
      group_id: "",
      group_name: "",
      member_count: 0,
      service_name: "",
      service_status: 0,
      service_time: ""
    } });
    const groupInfo = common_vendor.reactive({
      robot_id: "",
      group_id: "",
      tabId: "",
      origin: 1,
      // 1: 买家端进入群设置   2: 群空间进入群设置
      loading: false,
      defaultTopBg: new URL("@/static/image/bg_wxq.jpg", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/robotAccount/robotDetail.js", document.baseURI).href).href,
      lineLeft: "8%"
    });
    common_vendor.ref(null);
    common_vendor.ref("");
    const flagLock = common_vendor.ref(false);
    function openPage() {
      if (robotInfo.data.ad_jump_url) {
        window.open(decodeURIComponent(robotInfo.data.ad_jump_url), "_self");
      }
    }
    async function getGroupInfo() {
      await service_robotAccount_index.groupInfoApi({ group_id: groupInfo.group_id }, (res) => {
        if (~~res.code === 0) {
          robotInfo.data = res.data;
          common_vendor.provide("parentRobotInfo", robotInfo.data);
          groupInfo.loading = false;
          common_vendor.index.hideLoading();
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
          common_vendor.index.hideLoading();
          groupInfo.loading = false;
        }
      });
    }
    function switchTab(tabId) {
      groupInfo.tabId = tabId;
      common_vendor.index.__f__("log", "at pages/robotAccount/robotDetail.vue:168", tabId, "tabId is");
    }
    common_vendor.onLoad((option) => {
      common_vendor.index.showLoading();
      groupInfo.group_id = option.group_id;
      common_vendor.provide("parentGroupInfo", { group_id: groupInfo.group_id });
      groupInfo.tabId = option.pid * 1 || 1;
      groupInfo.origin = option.origin * 1 || 1;
      common_vendor.nextTick$1(() => {
        window.client.getUserinfo((res) => {
          common_vendor.index.__f__("log", "at pages/robotAccount/robotDetail.vue:194", res, "resresres");
          flagLock.value = true;
          getGroupInfo();
        });
      });
    });
    function imgError(e) {
      robotInfo.data.bg_img_url = groupInfo.defaultTopBg;
    }
    function backPage() {
      window.client.closeWebview();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: robotInfo.data.bg_img_url || "../../static/image/bg_wxq.jpg",
        b: common_vendor.o(imgError),
        c: common_assets._imports_0,
        d: common_vendor.o(backPage),
        e: robotInfo.data.group_id
      }, robotInfo.data.group_id ? {
        f: robotInfo.data.group_cover,
        g: common_vendor.t(robotInfo.data.group_name),
        h: robotInfo.data.ic_list.length,
        i: robotInfo.data.ic_list[0],
        j: common_assets._imports_3,
        k: common_vendor.t(robotInfo.data.group_user_count),
        l: common_vendor.t(robotInfo.data.group_id)
      } : {}, {
        m: robotInfo.data.ad_img_url
      }, robotInfo.data.ad_img_url ? {
        n: robotInfo.data.ad_img_url,
        o: common_vendor.o(openPage)
      } : {}, {
        p: common_vendor.o(switchTab),
        q: common_vendor.p({
          tabId: groupInfo.tabId
        }),
        r: flagLock.value
      }, flagLock.value ? common_vendor.e({
        s: groupInfo.tabId === 1
      }, groupInfo.tabId === 1 ? {} : groupInfo.tabId === 2 ? {} : groupInfo.tabId === 3 ? {
        w: common_vendor.p({
          robotInfo: robotInfo.data
        })
      } : groupInfo.tabId === 4 ? {} : groupInfo.tabId === 5 ? {} : groupInfo.tabId === 6 && robotInfo.data.group_id ? {
        A: common_vendor.p({
          robotInfo: robotInfo.data
        })
      } : {}, {
        t: groupInfo.tabId === 2,
        v: groupInfo.tabId === 3,
        x: groupInfo.tabId === 4,
        y: groupInfo.tabId === 5,
        z: groupInfo.tabId === 6 && robotInfo.data.group_id
      }) : {}, {
        B: common_vendor.n(groupInfo.tabId === 3 && "newBgColor")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ff3ae5cc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/robotDetail.js.map
