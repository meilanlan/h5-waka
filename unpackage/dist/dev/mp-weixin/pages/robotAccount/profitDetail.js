"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (uniIcons + uniDatetimePicker + uniPopup)();
}
const uniIcons = () => "../../components/uni-icons/components/uni-icons/uni-icons.js";
const uniPopup = () => "../../components/uni-popup/components/uni-popup/uni-popup.js";
const uniDatetimePicker = () => "../../components/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _sfc_main = {
  __name: "profitDetail",
  setup(__props) {
    const teamPopup = common_vendor.ref(null);
    const teamList = common_vendor.ref([{ value: 1, text: "全部社群" }, { value: 2, text: "王者荣耀上海战队" }, { value: 3, text: "王者荣耀四川战队" }]);
    const teamObj = common_vendor.reactive({
      curTeamIndex: 0,
      show: false
    });
    const range = common_vendor.ref(["2021-02-1", "2021-3-28"]);
    function returnPage() {
      common_vendor.index.navigateBack();
    }
    function maskClick() {
      common_vendor.index.__f__("log", "at pages/robotAccount/profitDetail.vue:77", "范围选择", range.values);
    }
    function switchTeam(item, index) {
      teamObj.curTeamIndex = index;
    }
    function maskClickTeam() {
      teamObj.show = false;
    }
    function switchIcon() {
      teamObj.show = teamObj.show === true ? false : true;
      if (teamObj.show === true)
        teamPopup.value.open();
      else
        teamPopup.value.close();
      common_vendor.index.__f__("log", "at pages/robotAccount/profitDetail.vue:93", teamObj.show, "teamObj.show is");
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(returnPage),
        c: common_vendor.t(teamList.value[teamObj.curTeamIndex].text),
        d: common_vendor.n(teamObj.show === true && "active"),
        e: common_vendor.p({
          type: "forward",
          size: 16
        }),
        f: common_vendor.o(switchIcon),
        g: common_vendor.o(maskClick),
        h: common_vendor.o(($event) => range.value = $event),
        i: common_vendor.p({
          type: "daterange",
          rangeSeparator: "至",
          modelValue: range.value
        }),
        j: common_assets._imports_1,
        k: common_vendor.f(teamList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: teamObj.curTeamIndex === index,
            c: index,
            d: common_vendor.o(($event) => switchTeam(item, index), index)
          };
        }),
        l: common_assets._imports_2,
        m: common_vendor.sr(teamPopup, "2f7dd72b-2", {
          "k": "teamPopup"
        }),
        n: common_vendor.o(maskClickTeam),
        o: common_vendor.p({
          type: "top",
          ["mask-background-color"]: "rgba(255,255,255,0.1)"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f7dd72b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/robotAccount/profitDetail.js.map
