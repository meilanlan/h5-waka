"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
const common_assets = require("../../../common/assets.js");
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  // mixins: [scrollToTargetPosition],
  props: {
    group_id: {
      type: String,
      default: () => {
      }
    },
    welcome: {
      type: Object,
      default: () => {
        return {
          data: "",
          data_type: 1
        };
      }
    },
    emoji: {
      type: Object,
      default: () => {
        return {
          data_type: 2,
          res_id: "",
          title: "",
          url: ""
        };
      }
    },
    audio: {
      type: Object,
      default: () => {
        return {
          data_type: 3,
          res_id: "",
          title: "",
          url: ""
        };
      }
    },
    rule: {
      type: Object,
      default: () => {
        return {
          data_type: 10,
          data: ""
        };
      }
    },
    notice: {
      type: Object,
      default: () => {
        return {
          data_type: 12,
          data: ""
        };
      }
    },
    paipaiData: {
      type: Object,
      default: () => {
        return {
          data_type: 22,
          pai_type: "",
          pai_price: "",
          pai_rate: ""
        };
      }
    },
    protectData: {
      type: Object,
      default: () => {
        return {
          data_type: 25,
          protect_config: {
            max_warnning_num: 5,
            violation_words: "",
            violation_alert: "",
            tick_alert: ""
          }
        };
      }
    }
  },
  components: { uniPopup },
  data() {
    return {
      defaultInfo: {},
      audioList: [],
      emojiList: [],
      curAudioState: 0,
      //1:播放中 0:微未播放
      curListAudioState: 0,
      //1:播放中 0:微未播放
      curEmojInfo: {
        res_id: "",
        title: "",
        url: ""
      },
      curAudioInfo: {
        res_id: "",
        title: "",
        url: ""
      },
      innerAudioContext: null,
      listAudioContext: null,
      paipaiNewData: {
        data_type: 22,
        pai_type: "",
        pai_price: "",
        pai_rate: []
      },
      initType: null,
      paipaiZero: 100
    };
  },
  mounted() {
    this.innerAudioContext = common_vendor.index.createInnerAudioContext();
    this.listAudioContext = common_vendor.index.createInnerAudioContext();
    this.innerAudioContext.obeyMuteSwitch = false;
    this.listAudioContext.obeyMuteSwitch = false;
    this.paipaiNewData = JSON.parse(JSON.stringify(this.paipaiData));
    let newArr = this.paipaiData.pai_rate.split(",");
    let arr = [];
    for (var i = 0; i < newArr.length; i++) {
      let obj = {};
      obj[`number${i}`] = newArr[i];
      arr.push(obj);
    }
    this.paipaiNewData.pai_rate = arr;
  },
  destroyed() {
    this.innerAudioContext.destroy();
    this.listAudioContext.destroy();
  },
  methods: {
    saveProtect() {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-manage-x.vue:379", this.protectData.protect_config, "this.protectData.protect_config.violation_alert");
      if (this.protectData.protect_config.violation_alert && this.protectData.protect_config.tick_alert) {
        let params = {
          type: 25,
          group_id: this.group_id,
          max_warnning_num: this.protectData.protect_config.max_warnning_num,
          tick_alert: this.protectData.protect_config.tick_alert,
          violation_alert: this.protectData.protect_config.violation_alert,
          violation_words: this.protectData.protect_config.violation_words.replace(/｜/g, "|").replace(/\s/g, "")
        };
        this.setConfig(params);
      } else {
        common_vendor.index.showToast({
          title: "请输入完整信息",
          icon: "none"
        });
      }
    },
    savePaipai() {
      let params = {
        type: this.paipaiNewData.data_type,
        group_id: this.group_id,
        pai_type: this.paipaiNewData.pai_type,
        pai_price: this.paipaiNewData.pai_price,
        pai_rate: ""
      };
      let pai_rate = [];
      this.paipaiNewData.pai_rate.forEach((item, i) => {
        pai_rate.push(item["number" + i]);
      });
      params.pai_rate = pai_rate.join(",");
      this.setConfig(params);
    },
    watchNumber(e, i) {
      if (e.detail.value * 1 > 100) {
        this.$set(this.paipaiNewData.pai_rate, i, { ["number" + i]: 100 });
      } else if (e.detail.value * 1 < 1) {
        this.$set(this.paipaiNewData.pai_rate, i, { ["number" + i]: 1 });
      }
    },
    switchPai(i) {
      if (this.paipaiNewData.pai_type != i) {
        this.paipaiNewData.pai_type = i;
        if (i === this.paipaiData.pai_type) {
          this.paipaiNewData.pai_price = this.paipaiData.pai_price;
        } else {
          this.paipaiNewData.pai_price = 0;
        }
      }
    },
    closeRadioList() {
      if (!this.listAudioContext.paused)
        this.listAudioContext.stop();
    },
    openListAudio(item, index) {
      if (!this.innerAudioContext.paused) {
        this.curAudioState = 0;
        this.innerAudioContext.stop();
      }
      item.isPlay = item.isPlay === false ? true : false;
      item.isPlay === true && this.playListAudio(item, index);
      item.isPlay === false && this.listAudioContext.pause();
      this.audioList.forEach((obj, i) => {
        if (item.res_id != obj.res_id) {
          this.audioList[i].isPlay = false;
        }
      });
    },
    playListAudio(item, i) {
      this.listAudioContext.src = item.url;
      this.listAudioContext.play();
      this.listAudioContext.onEnded(() => {
        this.audioList[i].isPlay = false;
        this.listAudioContext.stop();
      });
      this.listAudioContext.onError((res) => {
        common_vendor.index.showToast({
          title: res.errMsg,
          icon: "none"
        });
        common_vendor.index.__f__("log", "at pages/robotAccount/components/set-manage-x.vue:461", res.errMsg);
        common_vendor.index.__f__("log", "at pages/robotAccount/components/set-manage-x.vue:462", res.errCode);
      });
    },
    openCurAudio() {
      this.curAudioState = this.curAudioState === 0 ? 1 : 0;
      this.curAudioState === 1 && this.playAudio(this.audio);
      this.curAudioState === 0 && this.innerAudioContext.pause();
    },
    playAudio(item) {
      this.innerAudioContext.src = item.url;
      this.innerAudioContext.play();
      this.innerAudioContext.onEnded(() => {
        this.innerAudioContext.stop();
        this.curAudioState = 0;
      });
      this.innerAudioContext.onError((res) => {
        common_vendor.index.showToast({
          title: res.errMsg,
          icon: "none"
        });
        common_vendor.index.__f__("log", "at pages/robotAccount/components/set-manage-x.vue:483", res.errMsg);
        common_vendor.index.__f__("log", "at pages/robotAccount/components/set-manage-x.vue:484", res.errCode);
      });
    },
    setConfig(param, ref) {
      service_robotAccount_index.groupSetConfigData(param, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.$emit("updateConfig");
          ref && this.$refs[ref].close();
          if (!this.listAudioContext.paused)
            this.listAudioContext.stop();
          if (!this.innerAudioContext.paused) {
            this.innerAudioContext.stop();
            this.curAudioState = 0;
          }
          common_vendor.index.hideLoading();
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.hideLoading();
        }
      });
    },
    closeSurePopup() {
      this.$refs.makesurePopup.close();
      this.$emit("setDefaultData", this.initType);
    },
    initData(type) {
      this.initType = type;
      this.$refs.makesurePopup.open();
    },
    toConfig(type) {
      common_vendor.index.showLoading();
      this.curEmojInfo = this.emoji;
      this.curAudioInfo = this.audio;
      type === 1 ? this.$refs.chooseEmojiPopup.open() : this.$refs.chooseAudioPopup.open();
      service_robotAccount_index.groupResData({ res_type: type }, (res) => {
        if (res.code === 0) {
          if (type === 1) {
            this.emojiList = res.data || [];
          } else {
            res.data.forEach((item) => item["isPlay"] = false);
            this.audioList = res.data || [];
          }
          common_vendor.index.hideLoading();
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
          this.$refs.chooseEmojiPopup.close();
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          common_vendor.index.hideLoading();
        } else {
          common_vendor.index.hideLoading();
        }
      });
    },
    sureNotice() {
      this.setConfig({ type: 12, text: this.notice.data, group_id: this.group_id });
    },
    checkEmoj(item) {
      this.curEmojInfo = item;
    },
    checkAudio(item) {
      this.curAudioInfo = item;
    },
    sureEmoj() {
      this.setConfig({ type: 2, res_id: this.curEmojInfo.res_id, group_id: this.group_id }, "chooseEmojiPopup");
    },
    sureAudio() {
      this.setConfig({ type: 3, res_id: this.curAudioInfo.res_id, group_id: this.group_id }, "chooseAudioPopup");
    },
    sureRule() {
      common_vendor.index.showLoading();
      this.setConfig({ type: 10, text: this.rule.data, group_id: this.group_id });
    },
    sureWelcome() {
      if (this.welcome.data) {
        if (this.welcome.data.length > 2e3) {
          common_vendor.index.showToast({
            title: "欢迎语不能超过2000个字符",
            icon: "none"
          });
          return false;
        }
        common_vendor.index.showLoading();
        this.setConfig({ type: 1, welcome: this.welcome.data, group_id: this.group_id });
      }
    }
  }
};
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  _component_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$18,
    b: $props.notice.data,
    c: common_vendor.o(($event) => $props.notice.data = $event.detail.value),
    d: common_vendor.o((...args) => $options.sureNotice && $options.sureNotice(...args)),
    e: common_assets._imports_0$18,
    f: $props.rule.data,
    g: common_vendor.o(($event) => $props.rule.data = $event.detail.value),
    h: common_vendor.o((...args) => $options.sureRule && $options.sureRule(...args)),
    i: common_assets._imports_0$18,
    j: common_assets._imports_5$2,
    k: common_vendor.o(($event) => $options.initData(1)),
    l: $props.welcome.data,
    m: common_vendor.o(($event) => $props.welcome.data = $event.detail.value),
    n: common_vendor.o((...args) => $options.sureWelcome && $options.sureWelcome(...args)),
    o: common_assets._imports_2$10,
    p: $props.emoji.url
  }, $props.emoji.url ? {
    q: $props.emoji.url
  } : {}, {
    r: common_vendor.o(($event) => $options.toConfig(1)),
    s: common_assets._imports_3$3,
    t: $props.audio.url
  }, $props.audio.url ? {
    v: common_assets._imports_4$1,
    w: $data.curAudioState === 0,
    x: common_assets._imports_5$1,
    y: $data.curAudioState === 1,
    z: common_vendor.o((...args) => $options.openCurAudio && $options.openCurAudio(...args))
  } : {}, {
    A: common_vendor.o(($event) => $options.toConfig(2)),
    B: common_assets._imports_6$1,
    C: common_vendor.f(2, (item, i, i0) => {
      return {
        a: common_vendor.t(i === 1 ? "金砖" : "金币"),
        b: $data.paipaiNewData.pai_type === i,
        c: common_vendor.o(($event) => $data.paipaiNewData.pai_price = $event.detail.value, "p-" + i),
        d: common_vendor.n($data.paipaiNewData.pai_type === i ? "active" : ""),
        e: "p-" + i,
        f: common_vendor.o(($event) => $options.switchPai(i), "p-" + i)
      };
    }),
    D: $data.paipaiNewData.pai_price,
    E: $data.paipaiZero,
    F: common_vendor.o(($event) => $data.paipaiZero = $event.detail.value),
    G: common_vendor.f($data.paipaiNewData.pai_rate, (item, i, i0) => {
      return {
        a: common_vendor.t(i + 1),
        b: common_vendor.o(($event) => $options.watchNumber($event, i), "rate-" + i),
        c: item["number" + i],
        d: common_vendor.o(($event) => item["number" + i] = $event.detail.value, "rate-" + i),
        e: "rate-" + i
      };
    }),
    H: common_vendor.o((...args) => $options.savePaipai && $options.savePaipai(...args)),
    I: common_assets._imports_0$18,
    J: $props.protectData.protect_config.violation_words,
    K: common_vendor.o(($event) => $props.protectData.protect_config.violation_words = $event.detail.value),
    L: $props.protectData.protect_config.violation_alert,
    M: common_vendor.o(($event) => $props.protectData.protect_config.violation_alert = $event.detail.value),
    N: $props.protectData.protect_config.tick_alert,
    O: common_vendor.o(($event) => $props.protectData.protect_config.tick_alert = $event.detail.value),
    P: $props.protectData.protect_config.max_warnning_num,
    Q: common_vendor.o(($event) => $props.protectData.protect_config.max_warnning_num = $event.detail.value),
    R: common_vendor.o((...args) => $options.saveProtect && $options.saveProtect(...args)),
    S: common_assets._imports_19,
    T: common_vendor.n(!$data.curEmojInfo.res_id ? "active" : ""),
    U: common_vendor.o(($event) => $options.checkEmoj({
      res_id: "",
      title: "",
      url: ""
    })),
    V: common_vendor.n(!$data.curEmojInfo.res_id ? "active" : ""),
    W: common_vendor.f($data.emojiList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.n($data.curEmojInfo.res_id === item.res_id ? "active" : ""),
        c: common_vendor.o(($event) => $options.checkEmoj(item), index),
        d: common_vendor.t(item.title),
        e: common_vendor.n($data.curEmojInfo.res_id === item.res_id ? "active" : ""),
        f: index
      };
    }),
    X: common_vendor.o((...args) => $options.sureEmoj && $options.sureEmoj(...args)),
    Y: common_vendor.sr("chooseEmojiPopup", "4aee70fe-0"),
    Z: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#ffffff"
    }),
    aa: common_assets._imports_19,
    ab: common_vendor.n(!$data.curAudioInfo.res_id ? "active" : ""),
    ac: common_vendor.o(($event) => $options.checkAudio({
      res_id: "",
      title: "",
      url: ""
    })),
    ad: $data.audioList.length <= 0
  }, $data.audioList.length <= 0 ? {} : {}, {
    ae: common_vendor.f($data.audioList, (item, index, i0) => {
      return {
        a: item.isPlay === false,
        b: item.isPlay === true,
        c: common_vendor.o(($event) => $options.openListAudio(item, index), index),
        d: common_vendor.t(item.title),
        e: common_vendor.t(item.content),
        f: common_vendor.n($data.curAudioInfo.res_id === item.res_id ? "active" : ""),
        g: index,
        h: common_vendor.o(($event) => $options.checkAudio(item), index)
      };
    }),
    af: common_assets._imports_4$1,
    ag: common_assets._imports_5$1,
    ah: common_vendor.o((...args) => $options.sureAudio && $options.sureAudio(...args)),
    ai: common_vendor.sr("chooseAudioPopup", "4aee70fe-1"),
    aj: common_vendor.o($options.closeRadioList),
    ak: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#ffffff"
    }),
    al: common_vendor.o((...args) => $options.closeSurePopup && $options.closeSurePopup(...args)),
    am: common_vendor.sr("makesurePopup", "4aee70fe-2"),
    an: common_vendor.p({
      type: "center",
      ["is-mask-click"]: false
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4aee70fe"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-manage-x.js.map
