"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
if (!Math) {
  uniPopup();
}
const uniPopup = () => "../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  __name: "leaderSync",
  setup(__props) {
    let isIos = "";
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
      isIos = true;
    } else {
      isIos = false;
    }
    const selectBox1 = common_vendor.ref(false);
    const selectBox2 = common_vendor.ref(false);
    const robotIndex = common_vendor.ref(-1);
    const groupIndex = common_vendor.ref(-1);
    const joinPopup = common_vendor.ref(null);
    const robotList = common_vendor.ref([
      { id: 1, name: "微信1", img: new URL("@/static/image/noble-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href },
      { id: 2, name: "微信2", img: new URL("@/static/image/vip.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href },
      { id: 3, name: "微信3", img: new URL("@/static/image/noble-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href }
    ]);
    const groupList = common_vendor.ref([
      { id: 1, name: "群1", img: new URL("@/static/image/noble-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href },
      { id: 2, name: "群2", img: new URL("@/static/image/vip.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href },
      { id: 3, name: "群3", img: new URL("@/static/image/noble-bg.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href }
    ]);
    const staticImg1 = new URL("@/static/image/robot-icon.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href;
    const staticImg2 = new URL("@/static/image/main-group.png", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("pages/admin/leaderSync.js", document.baseURI).href).href;
    function sureSync() {
      joinPopup.value.close();
    }
    function toAsync() {
      joinPopup.value.open();
    }
    function chooseGroupObj(index) {
      groupIndex.value = index;
      selectBox2.value = false;
    }
    function chooseRobotObj(index) {
      robotIndex.value = index;
      selectBox1.value = false;
    }
    function openSelectCont1() {
      selectBox1.value = !selectBox1.value;
    }
    function openSelectCont2() {
      selectBox2.value = !selectBox2.value;
    }
    function backPage() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => backPage()),
        c: common_vendor.n(common_vendor.unref(isIos) != true ? "safeTop" : ""),
        d: robotIndex.value === -1 ? common_vendor.unref(staticImg1) : robotList.value[robotIndex.value].img,
        e: common_vendor.t(robotIndex.value === -1 ? "选择小嗨微信助手" : robotList.value[robotIndex.value].name),
        f: common_vendor.n(selectBox1.value && "active"),
        g: common_assets._imports_1$4,
        h: common_vendor.o(openSelectCont1),
        i: selectBox1.value === true
      }, selectBox1.value === true ? {
        j: common_vendor.o(openSelectCont1),
        k: common_vendor.f(robotList.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: common_vendor.n("box-" + index),
            d: "box-" + index,
            e: common_vendor.o(($event) => chooseRobotObj(index), "box-" + index)
          };
        }),
        l: common_assets._imports_0$4,
        m: common_assets._imports_3
      } : {}, {
        n: robotIndex.value != -1
      }, robotIndex.value != -1 ? common_vendor.e({
        o: groupIndex.value === -1 ? common_vendor.unref(staticImg2) : groupList.value[groupIndex.value].img,
        p: common_vendor.t(groupIndex.value === -1 ? "选择社群" : groupList.value[groupIndex.value].name),
        q: common_vendor.n(selectBox2.value && "active"),
        r: common_assets._imports_1$4,
        s: common_vendor.o(openSelectCont2),
        t: selectBox2.value === true
      }, selectBox2.value === true ? {
        v: common_vendor.o(openSelectCont2),
        w: common_vendor.f(groupList.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name),
            c: common_vendor.n("box-" + index),
            d: "box-" + index,
            e: common_vendor.o(($event) => chooseGroupObj(index), "box-" + index)
          };
        }),
        x: common_assets._imports_0$4,
        y: common_assets._imports_3
      } : {}, {
        z: groupIndex.value != -1
      }, groupIndex.value != -1 ? {
        A: groupList.value[groupIndex.value].img,
        B: common_vendor.t(groupList.value[groupIndex.value].name),
        C: common_assets._imports_0$4,
        D: common_assets._imports_3,
        E: common_vendor.o(toAsync)
      } : {}) : {}, {
        F: common_vendor.o(($event) => joinPopup.value.close()),
        G: common_vendor.o(sureSync),
        H: common_vendor.sr(joinPopup, "7d5616b5-0", {
          "k": "joinPopup"
        }),
        I: common_vendor.p({
          type: "center"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7d5616b5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/admin/leaderSync.js.map
