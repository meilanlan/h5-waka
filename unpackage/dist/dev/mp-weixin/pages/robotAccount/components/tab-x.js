"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "tab-x",
  props: {
    tabId: {
      type: Number,
      default: 1
    }
  },
  emits: ["switchTab"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tabArr = common_vendor.ref([
      { id: 1, value: "群空间", distance: "4%" },
      { id: 2, value: "群指令", distance: "25%" },
      { id: 3, value: "我的主页", distance: "49%" },
      { id: 4, value: "机器人", distance: "71.5%" },
      { id: 5, value: "群收益", distance: "93%" },
      { id: 6, value: "群设置", distance: "114%" }
    ]);
    const distance = common_vendor.ref(["4%", "25%", "49%", "71.5%", "93%", "114%"]);
    const tabId = common_vendor.ref(props.tabId);
    const lineLeft = common_vendor.ref("4%");
    const scrollLeft = common_vendor.ref(0);
    let index = tabArr.value.findIndex((item) => {
      return item.id === props.tabId;
    });
    lineLeft.value = distance.value[index];
    if (tabId.value >= 6 && tabArr.value.length > 5) {
      scrollLeft.value = 100;
    }
    function switchTab(item, index2) {
      tabId.value = item.id;
      lineLeft.value = distance.value[index2];
      emit("switchTab", tabId.value);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabArr.value, (item, index2, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: "item" + item.id,
            c: common_vendor.n(tabId.value === item.id ? "active" : ""),
            d: "id-" + item.id,
            e: common_vendor.o(($event) => switchTab(item, index2), "id-" + item.id)
          };
        }),
        b: lineLeft.value,
        c: scrollLeft.value
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28d0216a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/tab-x.js.map
