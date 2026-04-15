"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
const common_assets = require("../../../common/assets.js");
const UniEvenSwitch = () => "../../../components/uni-evan-switch/evan-switch.js";
const _sfc_main = {
  props: {
    type: {
      type: Number,
      default: 1
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    addData: {
      type: Object,
      default: () => {
        return {
          lottery_name: "",
          lottery_type: 0,
          award: 0,
          lottery_rate: 0,
          lottery_num: 0,
          day_limit: 0
        };
      }
    }
  },
  components: { UniEvenSwitch },
  data() {
    return {
      isShowPlay: true,
      curResultIndex: 0,
      resultList: [
        { id: 2, text: "开盲盒获得实物价值", award: 100 },
        { id: 3, text: "战队金获得实物价值", award: 100 },
        { id: 0, text: "开盲盒获得金币", award: 100 },
        { id: 1, text: "开盲盒获得魅力", award: 100 }
      ],
      addDataNew: {
        lottery_name: "",
        lottery_type: 0,
        award: 0,
        lottery_rate: 0,
        lottery_num: 0,
        day_limit: 0
      }
    };
  },
  mounted() {
    this.addDataNew = JSON.parse(JSON.stringify(this.addData));
    if (this.type === 2) {
      this.resultList.forEach((item, i) => {
        item.id === this.addDataNew.lottery_type && (this.curResultIndex = i);
      });
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-luckdraw-edit-x.vue:113", 12);
    }
    common_vendor.index.__f__("log", "at pages/robotAccount/components/set-luckdraw-edit-x.vue:115", this.addDataNew.lottery_type, "tutu", this.addData.lottery_type);
  },
  methods: {
    saveAll() {
      if (!this.addDataNew.lottery_name) {
        common_vendor.index.showToast({
          title: "请输入盲盒的名称",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading();
      this.addDataNew.lottery_type = this.resultList[this.curResultIndex].id;
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-luckdraw-edit-x.vue:128", "ioio", this.resultList[this.curResultIndex].id);
      if (this.type === 1) {
        service_robotAccount_index.lotteryAddData(this.addDataNew, (res) => {
          if (res.code === 0) {
            this.drawData(res);
          } else if (res.code === -20001) {
            this.$emit("clearAdminToken");
          } else {
            if (res.code != -10002) {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none"
              });
            }
          }
          common_vendor.index.hideLoading();
        });
      } else {
        service_robotAccount_index.lotteryEditData(this.addDataNew, (res) => {
          if (res.code === 0) {
            this.drawData(res);
          } else if (res.code === -20001) {
            this.$emit("clearAdminToken");
          } else {
            if (res.code != -10002) {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none"
              });
            }
          }
          common_vendor.index.hideLoading();
        });
      }
    },
    drawData(res) {
      this.$emit("updateData");
      common_vendor.index.showToast({
        title: res.msg,
        icon: "none"
      });
      this.addDataNew = {
        lottery_name: "",
        lottery_type: 0,
        award: 0,
        lottery_rate: 0,
        lottery_num: 0,
        day_limit: 0
      };
      this.curResultIndex = 0;
      this.type != 1 && this.$emit("closePopup");
    },
    watchLotteryDay() {
      this.addDataNew.lottery_num < 0 && (this.addDataNew.lottery_num = 0);
    },
    watchLotteryNum() {
      this.addDataNew.day_limit < 0 && (this.addDataNew.day_limit = 0);
    },
    watchLotteryRate() {
      this.addDataNew.lottery_rate < 0 && (this.addDataNew.lottery_rate = 0);
      this.addDataNew.lottery_rate > 1e3 && (this.addDataNew.lottery_rate = 1e3);
    },
    watchAward() {
      this.addDataNew.award = !this.addDataNew.award ? 0 : this.addDataNew.award;
      if (this.resultList[this.curResultIndex].id != 0 && this.resultList[this.curResultIndex].id != 1) {
        this.addDataNew.award < 0 && (this.addDataNew.award = 0);
      }
    },
    switchResult(i) {
      if (this.curResultIndex != i) {
        this.curResultIndex = i;
        this.addDataNew.award = 0;
      }
    },
    switchShowPlay() {
      this.isShowPlay = !this.isShowPlay;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.type === 1
  }, $props.type === 1 ? {
    b: common_vendor.t($data.isShowPlay === true ? "收起" : "展开"),
    c: common_vendor.n($data.isShowPlay === false ? "hide" : ""),
    d: common_assets._imports_0$20,
    e: common_vendor.o((...args) => $options.switchShowPlay && $options.switchShowPlay(...args))
  } : {}, {
    f: $data.addDataNew.lottery_name,
    g: common_vendor.o(($event) => $data.addDataNew.lottery_name = $event.detail.value),
    h: common_vendor.f($data.resultList, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.text),
        b: $data.curResultIndex === i
      }, $data.curResultIndex === i ? common_vendor.e({
        c: item.id === 0 || item.id === 1
      }, item.id === 0 || item.id === 1 ? {
        d: common_vendor.o((...args) => $options.watchAward && $options.watchAward(...args), item.id),
        e: $data.addDataNew.award,
        f: common_vendor.o(($event) => $data.addDataNew.award = $event.detail.value, item.id)
      } : {
        g: common_vendor.o((...args) => $options.watchAward && $options.watchAward(...args), item.id),
        h: $data.addDataNew.award,
        i: common_vendor.o(($event) => $data.addDataNew.award = $event.detail.value, item.id)
      }) : {}, {
        j: common_vendor.n($data.curResultIndex === i ? "active" : ""),
        k: item.id,
        l: common_vendor.o(($event) => $options.switchResult(i), item.id)
      });
    }),
    i: common_vendor.o((...args) => $options.watchLotteryRate && $options.watchLotteryRate(...args)),
    j: $data.addDataNew.lottery_rate,
    k: common_vendor.o(($event) => $data.addDataNew.lottery_rate = $event.detail.value),
    l: common_vendor.o((...args) => $options.watchLotteryNum && $options.watchLotteryNum(...args)),
    m: $data.addDataNew.lottery_num,
    n: common_vendor.o(($event) => $data.addDataNew.lottery_num = $event.detail.value),
    o: common_vendor.o((...args) => $options.watchLotteryDay && $options.watchLotteryDay(...args)),
    p: $data.addDataNew.day_limit,
    q: common_vendor.o(($event) => $data.addDataNew.day_limit = $event.detail.value),
    r: common_vendor.o((...args) => $options.saveAll && $options.saveAll(...args)),
    s: common_vendor.n($data.isShowPlay === true ? "show" : "hide")
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cca8259a"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-luckdraw-edit-x.js.map
