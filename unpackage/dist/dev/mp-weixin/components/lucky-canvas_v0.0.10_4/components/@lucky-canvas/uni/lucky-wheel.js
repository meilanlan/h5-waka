"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const components_luckyCanvas_v0_0_10_4_components__luckyCanvas_uni_utils = require("./utils.js");
const components_luckyCanvas_v0_0_10_4_components_luckyCanvas_dist_index_esm = require("../../lucky-canvas/dist/index.esm.js");
const _sfc_main = {
  name: "lucky-wheel",
  data() {
    return {
      imgSrc: "",
      myLucky: null,
      canvas: null,
      isShow: false,
      boxWidth: 100,
      boxHeight: 100,
      btnWidth: 0,
      btnHeight: 0,
      dpr: 1,
      showMyLuckyBtnAnim: false
    };
  },
  props: {
    width: {
      type: String,
      default: "510rpx"
    },
    height: {
      type: String,
      default: "510rpx"
    },
    blocks: {
      type: Array,
      default: () => []
    },
    prizes: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      default: () => []
    },
    defaultConfig: {
      type: Object,
      default: () => ({})
    },
    defaultStyle: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.initLucky();
  },
  watch: {
    blocks(newData) {
      this.myLucky && (this.myLucky.blocks = newData);
    },
    prizes(newData) {
      this.myLucky && (this.myLucky.prizes = newData);
    },
    buttons(newData) {
      this.myLucky && (this.myLucky.buttons = newData);
    },
    defaultStyle(newData) {
      this.myLucky && (this.myLucky.defaultStyle = newData);
    },
    defaultConfig(newData) {
      this.myLucky && (this.myLucky.defaultConfig = newData);
    }
  },
  methods: {
    async imgBindload(res, name, index, i) {
      const img = this[name][index].imgs[i];
      components_luckyCanvas_v0_0_10_4_components__luckyCanvas_uni_utils.resolveImage(img, this.canvas);
    },
    getImage() {
      return components_luckyCanvas_v0_0_10_4_components__luckyCanvas_uni_utils.getImage.call(this, "lucky-wheel", this.canvas);
    },
    hideCanvas() {
      this.getImage().then((res) => {
        this.imgSrc = res.tempFilePath;
      });
    },
    initLucky() {
      this.boxWidth = components_luckyCanvas_v0_0_10_4_components__luckyCanvas_uni_utils.changeUnits(this.width);
      this.boxHeight = components_luckyCanvas_v0_0_10_4_components__luckyCanvas_uni_utils.changeUnits(this.height);
      this.isShow = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.draw();
        });
      });
    },
    draw() {
      const _this = this;
      common_vendor.index.createSelectorQuery().in(this).select("#lucky-wheel").fields({
        node: true,
        size: true
      }).exec((res) => {
        if (!res[0] || !res[0].node)
          return common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/lucky-wheel.vue:162", "lucky-canvas 获取不到 canvas 标签");
        const { node, width, height } = res[0];
        const canvas = this.canvas = node;
        const ctx = this.ctx = canvas.getContext("2d");
        const dpr = this.dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        const Radius = Math.min(width, height) / 2;
        this.myLucky = new components_luckyCanvas_v0_0_10_4_components_luckyCanvas_dist_index_esm.T({
          flag: "MP-WX",
          ctx,
          dpr,
          setTimeout,
          clearTimeout,
          setInterval,
          clearInterval,
          unitFunc: (num, unit) => components_luckyCanvas_v0_0_10_4_components__luckyCanvas_uni_utils.changeUnits(num + unit),
          beforeCreate: function() {
            ctx.translate(Radius, Radius);
          },
          beforeResize: function() {
            ctx.translate(-Radius, -Radius);
          },
          afterInit: function() {
            _this.btnWidth = this.maxBtnRadius * 2;
            _this.btnHeight = this.maxBtnRadius * 2;
            _this.$forceUpdate();
          },
          afterStart: () => {
            this.imgSrc = "";
          }
        }, {
          ...this.$props,
          width,
          height,
          start: (...rest) => {
            this.$emit("start", ...rest);
          },
          end: (...rest) => {
            this.$emit("end", ...rest);
            this.hideCanvas();
          }
        });
      });
    },
    toPlay(e) {
      this.myLucky.startCallback();
    },
    init() {
      this.myLucky.init();
    },
    play(...rest) {
      this.showMyLuckyBtnAnim = true;
      this.myLucky.play(...rest);
    },
    stop(...rest) {
      this.showMyLuckyBtnAnim = false;
      this.myLucky.stop(...rest);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShow
  }, $data.isShow ? common_vendor.e({
    b: $data.boxWidth + "px",
    c: $data.boxHeight + "px",
    d: $data.imgSrc
  }, $data.imgSrc ? {
    e: $data.imgSrc,
    f: common_vendor.o(($event) => $data.myLucky.clearCanvas()),
    g: $data.boxWidth + "px",
    h: $data.boxHeight + "px"
  } : {}, {
    i: common_vendor.n($data.showMyLuckyBtnAnim === true && "active"),
    j: common_vendor.o((...args) => $options.toPlay && $options.toPlay(...args)),
    k: $data.btnWidth + "px",
    l: $data.btnHeight + "px",
    m: $data.myLucky
  }, $data.myLucky ? {
    n: common_vendor.f($props.blocks, (block, index, i0) => {
      return common_vendor.e({
        a: block.imgs
      }, block.imgs ? {
        b: common_vendor.f(block.imgs, (img, i, i1) => {
          return {
            a: i,
            b: img.src,
            c: common_vendor.o((e) => $options.imgBindload(e, "blocks", index, i), i)
          };
        })
      } : {}, {
        c: index
      });
    }),
    o: common_vendor.f($props.prizes, (prize, index, i0) => {
      return common_vendor.e({
        a: prize.imgs
      }, prize.imgs ? {
        b: common_vendor.f(prize.imgs, (img, i, i1) => {
          return {
            a: i,
            b: img.src,
            c: common_vendor.o((e) => $options.imgBindload(e, "prizes", index, i), i)
          };
        })
      } : {}, {
        c: index
      });
    }),
    p: common_vendor.f($props.buttons, (btn, index, i0) => {
      return common_vendor.e({
        a: btn.imgs
      }, btn.imgs ? {
        b: common_vendor.f(btn.imgs, (img, i, i1) => {
          return {
            a: i,
            b: img.src,
            c: common_vendor.o((e) => $options.imgBindload(e, "buttons", index, i), i)
          };
        })
      } : {}, {
        c: index
      });
    })
  } : {}, {
    q: $data.boxWidth + "px",
    r: $data.boxHeight + "px"
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-16a8f7e1"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/lucky-wheel.js.map
