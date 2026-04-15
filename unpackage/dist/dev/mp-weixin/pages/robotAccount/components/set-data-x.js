"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    toPage(url) {
      this.$emit("toNextPage", url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$17,
    b: common_vendor.t($props.info.total_user),
    c: common_vendor.t($props.info.today_new_user),
    d: common_vendor.t($props.info.last_new_user_name || "-"),
    e: common_assets._imports_1$13,
    f: common_vendor.t($props.info.total_active),
    g: common_vendor.t($props.info.day_active),
    h: common_vendor.t($props.info.month_active),
    i: common_assets._imports_2$9,
    j: common_vendor.t($props.info.total_chat),
    k: common_vendor.t($props.info.day_chat),
    l: common_vendor.t($props.info.month_chat),
    m: common_vendor.t($props.info.total_chat),
    n: common_assets._imports_3$2,
    o: common_vendor.t($props.info.total_check_in),
    p: common_vendor.t($props.info.day_check_in),
    q: common_vendor.t($props.info.month_check_in),
    r: common_assets._imports_4,
    s: common_vendor.t($props.info.total_coin),
    t: common_vendor.t($props.info.user_name_max_coin),
    v: common_vendor.t($props.info.user_max_coin),
    w: common_assets._imports_5,
    x: common_vendor.t($props.info.total_charm),
    y: common_vendor.t($props.info.user_name_max_charm),
    z: common_vendor.t($props.info.user_max_charm),
    A: common_assets._imports_6,
    B: common_vendor.t($props.info.switch_group * 1 > 999 ? "不计次数" : $props.info.switch_group + "次"),
    C: common_vendor.t($props.info.yuanbao),
    D: common_vendor.t($props.info.syn_count * 1 > 999 ? "不计次数" : $props.info.syn_count + "次"),
    E: common_vendor.t($props.info.switch_robot),
    F: common_vendor.t($props.info.super_admin),
    G: common_vendor.t($props.info.admin),
    H: common_vendor.t($props.info.start_time || "-"),
    I: common_vendor.t($props.info.term_time || "-"),
    J: common_assets._imports_7,
    K: common_assets._imports_8,
    L: common_vendor.o(($event) => $options.toPage("/pages/robotAccount/taskGiftRecord")),
    M: common_assets._imports_9,
    N: common_assets._imports_8,
    O: common_vendor.o(($event) => $options.toPage("/pages/robotAccount/groupAccount"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f58d6ea1"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-data-x.js.map
