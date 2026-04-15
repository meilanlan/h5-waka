"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "EvanSwitch",
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    activeColor: {
      type: String,
      default: "#108ee9"
    },
    inactiveColor: {
      type: String,
      default: "#fff"
    },
    size: {
      type: Number,
      default: 30
    },
    disabled: {
      type: Boolean,
      default: false
    },
    activeValue: {
      type: [String, Number, Boolean],
      default: true
    },
    inactiveValue: {
      type: [String, Number, Boolean],
      default: false
    },
    beforeChange: {
      type: Function,
      default: null
    },
    extraData: null,
    contextLevel: {
      type: Number,
      default: 1
    }
  },
  computed: {
    switchHeight() {
      return this.size + "px";
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        common_vendor.index.__f__("log", "at components/uni-evan-switch/evan-switch.vue:63", value, "value");
        this.currentValue = value;
      }
    }
  },
  data() {
    return {
      currentValue: false
    };
  },
  methods: {
    toggle() {
      var _a;
      if (!this.disabled) {
        if (this.beforeChange && typeof this.beforeChange === "function") {
          let context = this;
          for (let i = 0; i < this.contextLevel; i++) {
            context = (_a = context == null ? void 0 : context.$options) == null ? void 0 : _a.parent;
          }
          const result = this.beforeChange(
            this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue,
            this.extraData,
            context
          );
          if (typeof result === "object") {
            result.then(() => {
              this.toggleValue();
            }).catch(() => {
            });
          } else if (typeof result === "boolean" && result) {
            this.toggleValue();
          }
        } else {
          this.toggleValue();
        }
      }
    },
    toggleValue() {
      this.currentValue = this.currentValue === this.activeValue ? this.inactiveValue : this.activeValue;
      this.$emit("input", this.currentValue);
      this.$emit("change", this.currentValue);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.size + "px",
    b: $props.size + "px",
    c: $data.currentValue === $props.activeValue ? `translateX(${$props.size}px)` : `translateX(0)`,
    d: common_vendor.o((...args) => $options.toggle && $options.toggle(...args)),
    e: $props.disabled ? 1 : "",
    f: 2 * $props.size + "px",
    g: $options.switchHeight,
    h: $props.size + "px",
    i: $data.currentValue === $props.activeValue ? $props.activeColor : $props.inactiveColor
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-022c7b8a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-evan-switch/evan-switch.js.map
