"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
const common_assets = require("../../../common/assets.js");
const UniEvenSwitch = () => "../../../components/uni-evan-switch/evan-switch.js";
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const _sfc_main = {
  props: {
    robotInfo: {
      type: Object,
      default: () => {
      }
    },
    group_id: {
      type: String,
      default: () => {
      }
    },
    cmdData: {
      type: Object,
      default: () => {
        return {
          joy_list: [],
          main_list: []
        };
      }
    },
    timerMsg: {
      type: Object,
      default: () => {
        return {
          data: "",
          data_type: 4
        };
      }
    },
    sendGift: {
      type: Object,
      default: () => {
        return {
          data: "",
          data_type: 5
        };
      }
    },
    signInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 6,
          obtain_max: "",
          obtain_min: ""
        };
      }
    },
    lootInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 7,
          lose_max: "",
          lose_min: "",
          obtain_max: "",
          obtain_min: "",
          success_ratio: ""
        };
      }
    },
    groupTopBg: {
      type: Object,
      default: () => {
        return {
          data_type: 8,
          group_top_bg: ""
        };
      }
    },
    groupTopAd: {
      type: Object,
      default: () => {
        return {
          data_type: 9,
          group_top_ad: "",
          group_top_ad_jump_url: ""
        };
      }
    },
    groupword: {
      type: Object,
      default: () => {
        return {
          data_type: 11,
          list: []
        };
      }
    },
    coinRate: {
      type: Object,
      default: () => {
        return {
          data_type: 13,
          coin_rate: 0
        };
      }
    },
    propose: {
      type: Object,
      default: () => {
        return {
          data_type: 15,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0
        };
      }
    },
    loveing: {
      type: Object,
      default: () => {
        return {
          data_type: 14,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0
        };
      }
    },
    force: {
      type: Object,
      default: () => {
        return {
          data_type: 0,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0
        };
      }
    },
    businessList: {
      type: Object,
      default: () => {
        return {
          data_type: 0,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0,
          business_config_list: []
        };
      }
    },
    preLife: {
      type: Object,
      default: () => {
        return {
          data_type: 20,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0,
          business_config_list: [],
          coin: 0
        };
      }
    },
    happlyInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 21,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0,
          business_config_list: [],
          coin: 0
        };
      }
    },
    nobleInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 23,
          title_list: []
        };
      }
    },
    giftInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 24,
          list: []
        };
      }
    }
  },
  components: { UniEvenSwitch, uniPopup },
  data() {
    return {
      isShowSwitch: true,
      isShowPlay: true,
      isShowNoble: true,
      isShowGift: true,
      paw: "",
      againPaw: "",
      initType: "",
      emptyFlag: false,
      giftFlag: false,
      newGroupWord: {
        data_type: 11,
        list: []
      },
      newNobleInfo: {
        data_type: 23,
        title_list: []
      },
      newGiftInfo: {
        data_type: 24,
        coin_gift_list: []
      },
      nobleBgList: [],
      newNobleList: [],
      newNobleInfoIndex: 0
    };
  },
  watch: {
    groupword: {
      immediate: true,
      handler(value) {
        this.newGroupWord = JSON.parse(JSON.stringify(value));
      }
    },
    nobleInfo: {
      immediate: true,
      handler(value) {
        let arr = [...value.title_list, ...this.newNobleInfo.title_list];
        let newArr = [];
        let obj = {};
        for (var i = 0; i < arr.length; i++) {
          if (!arr[i].id == "") {
            if (!obj[arr[i].id]) {
              newArr.push(arr[i]);
              obj[arr[i].id] = true;
            }
          } else {
            newArr.push(arr[i]);
            obj[arr[i].id] = true;
          }
        }
        this.newNobleInfo.title_list = newArr;
      }
    },
    giftInfo: {
      immediate: true,
      handler(value) {
        common_vendor.index.__f__("log", "at pages/robotAccount/components/set-config-x.vue:782", value, "value", this.newGiftInfo.coin_gift_list);
        let arr = [...value.coin_gift_list, ...this.newGiftInfo.coin_gift_list];
        let newArr = [];
        let obj = {};
        for (var i = 0; i < arr.length; i++) {
          if (!arr[i].id == "") {
            if (!obj[arr[i].id]) {
              newArr.push(arr[i]);
              obj[arr[i].id] = true;
            }
          } else {
            newArr.push(arr[i]);
            obj[arr[i].id] = true;
          }
        }
        this.newGiftInfo.coin_gift_list = newArr;
      }
    },
    "newNobleInfo.title_list": {
      immediate: true,
      handler(value) {
        this.getEmptyFlag(value);
      }
    },
    "newGiftInfo.coin_gift_list": {
      immediate: true,
      handler(value) {
        this.getGiftFlag(value);
      }
    }
  },
  methods: {
    sureNoble() {
      this.$refs.chooseNobleBgPopup.close();
      this.newNobleInfo.title_list = JSON.parse(JSON.stringify(this.newNobleList));
    },
    checkNoble(item) {
      this.newNobleList[this.newNobleInfoIndex]["res_id"] = item.res_id;
      this.newNobleList[this.newNobleInfoIndex]["url"] = item.url;
    },
    openNoble(i) {
      this.newNobleInfoIndex = i;
      this.newNobleList = JSON.parse(JSON.stringify(this.newNobleInfo.title_list));
      common_vendor.index.showLoading();
      this.$refs.chooseNobleBgPopup.open();
      service_robotAccount_index.groupResData({ res_type: 3 }, (res) => {
        if (res.code === 0) {
          res.data.forEach((item) => item["isPlay"] = false);
          this.nobleBgList = res.data || [];
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
    saveGift(item, i) {
      if (item.name && item.coin != "" && item.charm != "") {
        common_vendor.index.showLoading();
        let params = {
          id: item.id,
          name: item.name,
          coin: item.coin,
          charm: item.charm
        };
        service_robotAccount_index.giftEditData(params, (res) => {
          if (res.code === 0) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            this.$emit("updateConfig");
            this.newGiftInfo.coin_gift_list.splice(i, 1);
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
      }
    },
    addGift() {
      if (this.giftFlag === true) {
        let obj = { id: "", name: "", coin: "", charm: "" };
        this.newGiftInfo.coin_gift_list.push(obj);
      }
    },
    delGift(item, i) {
      if (this.newGiftInfo.coin_gift_list.length > 0) {
        if (item.id != "") {
          common_vendor.index.showLoading();
          service_robotAccount_index.giftDelData({ id: this.newGiftInfo.coin_gift_list[i].id }, (res) => {
            if (res.code === 0) {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none",
                duration: 2e3
              });
              this.newGiftInfo.coin_gift_list.splice(i, 1);
              this.giftInfo.coin_gift_list.splice(i, 1);
              if (this.newGiftInfo.coin_gift_list.length <= 0) {
                this.newGiftInfo.coin_gift_list.push({ id: "", name: "", coin: "", charm: "" });
                this.giftInfo.coin_gift_list.push({ id: "", name: "", coin: "", charm: "" });
              }
              common_vendor.index.hideLoading();
            } else if (res.code === -20001) {
              this.$emit("updateAdminToken");
              common_vendor.index.hideLoading();
            } else {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none"
              });
              common_vendor.index.hideLoading();
            }
          });
        } else if (item.id == "" && this.newGiftInfo.coin_gift_list.length > 1) {
          this.newGiftInfo.coin_gift_list.splice(i, 1);
        }
      }
    },
    watchGift(e, i) {
      this.getGiftFlag(this.newGiftInfo.coin_gift_list);
    },
    getGiftFlag(value) {
      let emptyNum = 0;
      for (var i = 0; i < value.length; i++) {
        if (!value[i].name || value[i].coin == "" || value[i].charm == "") {
          this.giftFlag = false;
        } else {
          emptyNum = emptyNum + 1;
        }
      }
      if (emptyNum === value.length) {
        this.giftFlag = true;
      }
    },
    getEmptyFlag(value) {
      let emptyNum = 0;
      for (var i = 0; i < value.length; i++) {
        if (!value[i].name) {
          this.emptyFlag = false;
        } else {
          emptyNum = emptyNum + 1;
        }
      }
      if (emptyNum === value.length) {
        this.emptyFlag = true;
      }
    },
    watchInpt(e, i) {
      this.getEmptyFlag(this.newNobleInfo.title_list);
    },
    delectNoble(item, i) {
      if (this.newNobleInfo.title_list.length > 0) {
        if (item.id != "") {
          common_vendor.index.showLoading();
          service_robotAccount_index.nobleNameDelData({ id: this.newNobleInfo.title_list[i].id }, (res) => {
            if (res.code === 0) {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none",
                duration: 2e3
              });
              this.newNobleInfo.title_list.splice(i, 1);
              this.nobleInfo.title_list.splice(i, 1);
              if (this.newNobleInfo.title_list.length <= 0) {
                this.newNobleInfo.title_list.push({ id: "", name: "", res_id: -1 });
                this.nobleInfo.title_list.push({ id: "", name: "", res_id: -1 });
              }
              common_vendor.index.hideLoading();
            } else if (res.code === -20001) {
              this.$emit("updateAdminToken");
              common_vendor.index.hideLoading();
            } else {
              common_vendor.index.showToast({
                title: res.msg,
                icon: "none"
              });
              common_vendor.index.hideLoading();
            }
          });
        } else if (item.id == "" && this.newNobleInfo.title_list.length > 1) {
          this.newNobleInfo.title_list.splice(i, 1);
        }
      }
    },
    addNoble() {
      if (this.emptyFlag === true) {
        let obj = { id: "", name: "", res_id: -1 };
        this.newNobleInfo.title_list.push(obj);
      }
    },
    saveNoble(item, i) {
      if (item.name) {
        common_vendor.index.showLoading();
        let params = {
          id: item.id,
          name: item.name,
          res_id: !item.res_id ? "-1" : item.res_id * 1
        };
        common_vendor.index.__f__("log", "at pages/robotAccount/components/set-config-x.vue:1004", params.res_id, "------", item.res_id);
        service_robotAccount_index.nobleNameData(params, (res) => {
          if (res.code === 0) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            this.newNobleInfo.title_list.splice(i, 1);
            this.$emit("updateConfig");
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
      }
    },
    setConfig(param, updateConfig, updateGroupInfo) {
      service_robotAccount_index.groupSetConfigData(param, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          updateGroupInfo === true && this.$emit("updateGroupInfo");
          if (updateConfig === true) {
            this.$emit("updateConfig");
          } else {
            this.groupword.list.push({ title: param.title, content: param.content });
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
    saveSendBusiness() {
      let rate = [];
      this.businessList.business_config_list.forEach((item) => {
        rate.push(item.rate);
      });
      let params = {
        type: 17,
        business_rate: rate.join(","),
        group_id: this.robotInfo.group_id
      };
      this.setConfig(params, true, false);
    },
    addWord() {
      let obj = {
        title: "",
        content: ""
      };
      this.newGroupWord.list.push(obj);
    },
    delectWord(item, index) {
      if (index < 1 && !this.groupword.list[index].title) {
        this.newGroupWord.list[index].title = "";
        this.newGroupWord.list[index].content = "";
        return false;
      } else if (index + 1 > this.groupword.list.length) {
        this.newGroupWord.list.splice(index, 1);
        common_vendor.index.hideLoading();
        return false;
      }
      common_vendor.index.showLoading();
      service_robotAccount_index.groupWordDelData({ title: item.title, group_id: this.group_id }, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
          this.newGroupWord.list.splice(index, 1);
          this.groupword.list.splice(index, 1);
          if (this.groupword.list.length <= 0) {
            this.groupword.list = [{ title: "", content: "" }];
            this.newGroupWord.list = [{ title: "", content: "" }];
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
    saveWord(item) {
      if (!item.title) {
        common_vendor.index.showToast({
          title: "请输入指令问题",
          icon: "none"
        });
        return false;
      } else if (!item.content) {
        common_vendor.index.showToast({
          title: "请输入答案",
          icon: "none"
        });
        return false;
      }
      let params = {
        type: 11,
        title: item.title,
        content: item.content,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(params, true, false);
    },
    closeSurePopup() {
      this.$refs.makesurePopup.close();
      this.$emit("setDefaultData", this.initType);
    },
    initData(type) {
      this.initType = type;
      this.$refs.makesurePopup.open();
    },
    watchBusiness(e, i) {
      (this.businessList.business_config_list[i].rate === "" || this.businessList.business_config_list[i].rate < 0) && (this.businessList.business_config_list[i].rate = 0);
      this.businessList.business_config_list[i].rate > 100 && (this.businessList.business_config_list[i].rate = 100);
    },
    watchForceRatio() {
      this.force.force_rate < 10 && (this.force.force_rate = 10);
      this.force.force_rate > 70 && (this.force.force_rate = 70);
    },
    watchCoinRate() {
      this.coinRate.coin_rate < 0 && (this.coinRate.coin_rate = 0);
      this.coinRate.coin_rate > 1e7 && (this.coinRate.coin_rate = 9999999);
    },
    watchRatio() {
      this.lootInfo.success_ratio < 0 && (this.lootInfo.success_ratio = 0);
      this.lootInfo.success_ratio > 100 && (this.lootInfo.success_ratio = 100);
    },
    watchObtainMin() {
      this.lootInfo.obtain_min < 0 && (this.lootInfo.obtain_min = 1);
      if (this.lootInfo.obtain_min && this.lootInfo.obtain_max) {
        if (this.lootInfo.obtain_min >= this.lootInfo.obtain_max) {
          this.lootInfo.obtain_min = this.lootInfo.obtain_max - 1;
        }
        this.lootInfo.obtain_min = this.lootInfo.obtain_min * 1;
      }
    },
    watchObtainMax() {
      this.lootInfo.obtain_max < 0 && (this.lootInfo.obtain_max = 1);
      if (this.lootInfo.obtain_min && this.lootInfo.obtain_max) {
        if (this.lootInfo.obtain_max <= this.lootInfo.obtain_min) {
          this.lootInfo.obtain_max = this.lootInfo.obtain_min + 1;
        }
        this.lootInfo.obtain_max = this.lootInfo.obtain_max * 1;
      }
    },
    watchLoserMin() {
      this.lootInfo.lose_min < 0 && (this.lootInfo.lose_min = 1);
      if (this.lootInfo.lose_min && this.lootInfo.lose_max) {
        if (this.lootInfo.lose_min >= this.lootInfo.lose_max) {
          this.lootInfo.lose_min = this.lootInfo.lose_max - 1;
        }
        this.lootInfo.lose_min = this.lootInfo.lose_min * 1;
      }
    },
    watchForceMin() {
      this.force.force_coin_min < 0 && (this.force.force_coin_min = 1);
      if (this.force.force_coin_min && this.force.force_coin_max) {
        if (this.force.force_coin_min >= this.force.force_coin_max) {
          this.force.force_coin_min = this.force.force_coin_max - 1;
        }
        this.force.force_coin_min = this.force.force_coin_min * 1;
      }
    },
    watchForceMax() {
      this.force.force_coin_max < 0 && (this.force.force_coin_max = 1);
      if (this.force.force_coin_min && this.force.force_coin_max) {
        if (this.force.force_coin_max <= this.force.force_coin_min) {
          this.force.force_coin_max = this.force.force_coin_min + 1;
        }
        this.force.lose_max = this.force.lose_max * 1;
      }
    },
    watchLoserMax() {
      this.lootInfo.lose_max < 0 && (this.lootInfo.lose_max = 1);
      if (this.lootInfo.lose_min && this.lootInfo.lose_max) {
        if (this.lootInfo.lose_max <= this.lootInfo.lose_min) {
          this.lootInfo.lose_max = this.lootInfo.lose_min + 1;
        }
        this.lootInfo.lose_max = this.lootInfo.lose_max * 1;
      }
    },
    saveLoot() {
      common_vendor.index.showLoading();
      let param = {
        type: 7,
        success_ratio: this.lootInfo.success_ratio,
        obtain_min: this.lootInfo.obtain_min,
        obtain_max: this.lootInfo.obtain_max,
        lose_min: this.lootInfo.lose_min,
        lose_max: this.lootInfo.lose_max,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    saveForce() {
      common_vendor.index.showLoading();
      let param = {
        type: 16,
        force_rate: this.force.force_rate,
        force_coin_min: this.force.force_coin_min,
        force_coin_max: this.force.force_coin_max,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    saveCoin() {
      if (this.coinRate.coin_rate == "") {
        common_vendor.index.showToast({
          title: "请输入比例值",
          icon: "none"
        });
        return false;
      }
      this.setConfig({ type: 13, coin_rate: this.coinRate.coin_rate, group_id: this.robotInfo.group_id }, true, false);
    },
    watchMinNumber() {
      this.signInfo.obtain_min < 0 && (this.signInfo.obtain_min = 1);
      if (this.signInfo.obtain_min && this.signInfo.obtain_max) {
        if (this.signInfo.obtain_min >= this.signInfo.obtain_max) {
          this.signInfo.obtain_min = this.signInfo.obtain_max - 1;
        }
        this.signInfo.obtain_min = this.signInfo.obtain_min * 1;
      }
    },
    watchMaxNumber() {
      this.signInfo.obtain_max < 0 && (this.signInfo.obtain_max = 1);
      if (this.signInfo.obtain_min && this.signInfo.obtain_max) {
        if (this.signInfo.obtain_max <= this.signInfo.obtain_min) {
          this.signInfo.obtain_max = this.signInfo.obtain_min + 1;
        }
        this.signInfo.obtain_max = this.signInfo.obtain_max * 1;
      }
    },
    watchLifeNumber() {
      this.preLife.coin < 0 && (this.preLife.coin = 0);
      if (this.preLife.coin > 1e9) {
        this.preLife.coin = 999999999;
      }
    },
    watchHapplyNumber() {
      this.happlyInfo.coin < 0 && (this.happlyInfo.coin = 0);
      if (this.happlyInfo.coin > 1e9) {
        this.happlyInfo.coin = 999999999;
      }
    },
    saveSign() {
      common_vendor.index.showLoading();
      let param = {
        type: 6,
        obtain_min: this.signInfo.obtain_min,
        obtain_max: this.signInfo.obtain_max,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    savePropose() {
      common_vendor.index.showLoading();
      if (this.propose.req_marriage_charm == "") {
        common_vendor.index.showToast({
          title: "请输入最大值",
          icon: "none"
        });
        return false;
      }
      let param = {
        type: 15,
        req_marriage_charm: this.propose.req_marriage_charm,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    savePreLife() {
      common_vendor.index.showLoading();
      if (this.preLife.coin == "") {
        common_vendor.index.showToast({
          title: "请输入消耗金币",
          icon: "none"
        });
        return false;
      }
      let param = {
        type: 20,
        coin: this.preLife.coin,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    saveHapply() {
      common_vendor.index.showLoading();
      if (this.happlyInfo.coin == "") {
        common_vendor.index.showToast({
          title: "请输入消耗金币",
          icon: "none"
        });
        return false;
      }
      let param = {
        type: 21,
        coin: this.happlyInfo.coin,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    saveLoveing() {
      common_vendor.index.showLoading();
      let param = {
        type: 14,
        love_min: this.loveing.love_min,
        love_max: this.loveing.love_max,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    saveSendGift() {
      if (!this.sendGift.data) {
        common_vendor.index.showToast({
          title: "请输入自定义内容",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading();
      this.setConfig({ type: 5, text: this.sendGift.data, group_id: this.robotInfo.group_id }, true, false);
    },
    saveBg() {
      common_vendor.index.showLoading();
      let path = this.groupTopBg.group_top_bg;
      let reg = /(http|https):\/\/\S*/;
      if (path && !reg.test(path)) {
        common_vendor.index.showToast({
          title: "请输入带有http符号的链接",
          icon: "none"
        });
        return false;
      }
      path = path ? path.replace("https", "http") : path;
      this.setConfig({ data_type: 8, group_top_bg: path, group_id: this.group_id }, true, true);
    },
    saveAd() {
      common_vendor.index.showLoading();
      let reg = /(http|https):\/\/\S*/;
      if (this.groupTopAd.group_top_ad && !reg.test(this.groupTopAd.group_top_ad) || this.groupTopAd.group_top_ad_jump_url && !reg.test(this.groupTopAd.group_top_ad_jump_url)) {
        common_vendor.index.showToast({
          title: "请输入带有http符号的链接",
          icon: "none"
        });
        return false;
      }
      this.groupTopAd.group_top_ad = this.groupTopAd.group_top_ad ? this.groupTopAd.group_top_ad.replace("https", "http") : this.groupTopAd.group_top_ad;
      this.groupTopAd.group_top_ad_jump_url = this.groupTopAd.group_top_ad_jump_url ? this.groupTopAd.group_top_ad_jump_url.replace("https", "http") : this.groupTopAd.group_top_ad_jump_url;
      this.setConfig({ data_type: 9, group_top_ad: this.groupTopAd.group_top_ad, group_top_ad_jump_url: this.groupTopAd.group_top_ad_jump_url, group_id: this.group_id }, true, true);
    },
    saveTimerMsg() {
      if (!this.timerMsg.data) {
        common_vendor.index.showToast({
          title: "请输入自定义内容",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading();
      let param = {
        type: 4,
        text: this.timerMsg.data,
        group_id: this.robotInfo.group_id
      };
      this.setConfig(param, true, false);
    },
    drawSwitch(params, e) {
      return new Promise((resolve, reject) => {
        service_robotAccount_index.groupSetCmdData(params, (res) => {
          if (~~res.code === 0) {
            setTimeout(() => {
              common_vendor.index.showToast({
                title: e === true ? "插件已开启" : "插件已关闭",
                icon: "none"
              });
            }, 300);
            resolve();
          } else if (res.code === -20001) {
            common_vendor.index.hideLoading();
            this.$emit("updateAdminToken");
          } else if (res.code != -10002) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            reject();
          } else {
            common_vendor.index.hideLoading();
          }
        });
      });
    },
    beforeListChange(e, extraData) {
      common_vendor.index.showLoading();
      let params = {
        group_id: this.robotInfo.group_id,
        cmd_id: this.cmdData.main_list[extraData].cmd_id,
        cmd_open: e === true ? 1 : 0,
        cmd_type: ""
      };
      return new Promise((resolve, reject) => {
        service_robotAccount_index.groupSetCmdData(params, (res) => {
          if (~~res.code === 0) {
            setTimeout(() => {
              common_vendor.index.showToast({
                title: e === true ? "插件已开启" : "插件已关闭",
                icon: "none"
              });
            }, 300);
            resolve();
          } else if (res.code === -20001) {
            common_vendor.index.hideLoading();
            this.$emit("updateAdminToken");
          } else if (res.code != -10002) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            reject();
          } else {
            common_vendor.index.hideLoading();
          }
        });
      });
    },
    beforePlayChange(e, extraData) {
      common_vendor.index.showLoading();
      let params = {
        group_id: this.robotInfo.group_id,
        cmd_id: this.cmdData.joy_list[extraData].cmd_id,
        cmd_open: e === true ? 1 : 0,
        cmd_type: "joy"
      };
      return new Promise((resolve, reject) => {
        service_robotAccount_index.groupSetCmdData(params, (res) => {
          if (~~res.code === 0) {
            setTimeout(() => {
              common_vendor.index.showToast({
                title: e === true ? "插件已开启" : "插件已关闭",
                icon: "none"
              });
            }, 300);
            resolve();
          } else if (res.code === -20001) {
            common_vendor.index.hideLoading();
            this.$emit("updateAdminToken");
          } else if (res.code != -10002) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
            reject();
          } else {
            common_vendor.index.hideLoading();
          }
        });
      });
    },
    setPaw() {
      if (!this.paw || !this.againPaw) {
        common_vendor.index.showToast({
          title: "请输入密码",
          icon: "none"
        });
        return false;
      } else if (this.paw !== this.againPaw) {
        common_vendor.index.showToast({
          title: "密码不一致，请重新输入",
          icon: "none"
        });
        return false;
      }
      common_vendor.index.showLoading();
      service_robotAccount_index.groupPawData({ pwd: this.paw }, (res) => {
        if (res.code === 0) {
          common_vendor.index.showToast({
            title: "密码设置成功",
            duration: 1e3,
            success: () => {
              setTimeout(() => {
                this.$emit("updateAdminToken");
              }, 1200);
            }
          });
        } else if (res.code === -20001) {
          this.$emit("updateAdminToken");
        } else if (res.code != -10002) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        }
      });
    },
    switchShow(data) {
      this[data] = !this[data];
    }
  }
};
if (!Array) {
  const _component_uni_even_switch = common_vendor.resolveComponent("uni-even-switch");
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  (_component_uni_even_switch + _component_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$19,
    b: $data.paw,
    c: common_vendor.o(($event) => $data.paw = $event.detail.value),
    d: $data.againPaw,
    e: common_vendor.o(($event) => $data.againPaw = $event.detail.value),
    f: common_vendor.o((...args) => $options.setPaw && $options.setPaw(...args)),
    g: common_assets._imports_1$14,
    h: common_vendor.n($data.isShowSwitch === false ? "hide" : ""),
    i: common_assets._imports_2$11,
    j: common_vendor.t($data.isShowSwitch === true ? "收起" : "打开"),
    k: common_vendor.o(($event) => $options.switchShow("isShowSwitch")),
    l: common_vendor.f($props.cmdData.main_list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.cmd_name),
        b: "69593aee-0-" + i0,
        c: common_vendor.p({
          value: item.cmd_is_open,
          size: 20,
          extraData: index,
          contextLevel: 2,
          activeColor: "#67C23A",
          inactiveColor: "#C1CBDB",
          beforeChange: $options.beforeListChange
        }),
        d: item.cmd_id
      };
    }),
    m: common_vendor.n($data.isShowSwitch === true ? "show" : "hide"),
    n: common_assets._imports_3$4,
    o: common_vendor.n($data.isShowPlay === false ? "hide" : ""),
    p: common_assets._imports_2$11,
    q: common_vendor.t($data.isShowPlay === true ? "收起" : "打开"),
    r: common_vendor.o(($event) => $options.switchShow("isShowPlay")),
    s: common_vendor.f($props.cmdData.joy_list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.cmd_name),
        b: "69593aee-1-" + i0,
        c: common_vendor.p({
          value: item.cmd_is_open,
          size: 20,
          extraData: index,
          contextLevel: 2,
          activeColor: "#67C23A",
          inactiveColor: "#C1CBDB",
          beforeChange: $options.beforePlayChange
        }),
        d: item.cmd_id
      };
    }),
    t: common_vendor.n($data.isShowPlay === true ? "show" : "hide"),
    v: common_assets._imports_4$2,
    w: common_assets._imports_5$2,
    x: common_vendor.o(($event) => $options.initData(6)),
    y: common_vendor.o((...args) => $options.watchMinNumber && $options.watchMinNumber(...args)),
    z: $props.signInfo.obtain_min,
    A: common_vendor.o(($event) => $props.signInfo.obtain_min = $event.detail.value),
    B: common_vendor.o((...args) => $options.watchMaxNumber && $options.watchMaxNumber(...args)),
    C: $props.signInfo.obtain_max,
    D: common_vendor.o(($event) => $props.signInfo.obtain_max = $event.detail.value),
    E: common_vendor.o((...args) => $options.saveSign && $options.saveSign(...args)),
    F: common_assets._imports_4$2,
    G: common_assets._imports_5$2,
    H: common_vendor.o(($event) => $options.initData(15)),
    I: $props.propose.req_marriage_charm,
    J: common_vendor.o(($event) => $props.propose.req_marriage_charm = $event.detail.value),
    K: common_vendor.o((...args) => $options.savePropose && $options.savePropose(...args)),
    L: common_assets._imports_4$2,
    M: common_assets._imports_5$2,
    N: common_vendor.o(($event) => $options.initData(20)),
    O: common_vendor.o((...args) => $options.watchLifeNumber && $options.watchLifeNumber(...args)),
    P: $props.preLife.coin,
    Q: common_vendor.o(($event) => $props.preLife.coin = $event.detail.value),
    R: common_vendor.o((...args) => $options.savePreLife && $options.savePreLife(...args)),
    S: common_assets._imports_4$2,
    T: common_assets._imports_5$2,
    U: common_vendor.o(($event) => $options.initData(21)),
    V: common_vendor.o((...args) => $options.watchHapplyNumber && $options.watchHapplyNumber(...args)),
    W: $props.happlyInfo.coin,
    X: common_vendor.o(($event) => $props.happlyInfo.coin = $event.detail.value),
    Y: common_vendor.o((...args) => $options.saveHapply && $options.saveHapply(...args)),
    Z: common_assets._imports_4$2,
    aa: common_assets._imports_5$2,
    ab: common_vendor.o(($event) => $options.initData(14)),
    ac: $props.loveing.love_min,
    ad: common_vendor.o(($event) => $props.loveing.love_min = $event.detail.value),
    ae: $props.loveing.love_max,
    af: common_vendor.o(($event) => $props.loveing.love_max = $event.detail.value),
    ag: common_vendor.o((...args) => $options.saveLoveing && $options.saveLoveing(...args)),
    ah: common_assets._imports_6$2,
    ai: common_assets._imports_5$2,
    aj: common_vendor.o(($event) => $options.initData(7)),
    ak: common_vendor.o((...args) => $options.watchRatio && $options.watchRatio(...args)),
    al: $props.lootInfo.success_ratio,
    am: common_vendor.o(($event) => $props.lootInfo.success_ratio = $event.detail.value),
    an: common_vendor.o((...args) => $options.watchObtainMin && $options.watchObtainMin(...args)),
    ao: $props.lootInfo.obtain_min,
    ap: common_vendor.o(($event) => $props.lootInfo.obtain_min = $event.detail.value),
    aq: common_vendor.o((...args) => $options.watchObtainMax && $options.watchObtainMax(...args)),
    ar: $props.lootInfo.obtain_max,
    as: common_vendor.o(($event) => $props.lootInfo.obtain_max = $event.detail.value),
    at: common_vendor.o((...args) => $options.watchLoserMin && $options.watchLoserMin(...args)),
    av: $props.lootInfo.lose_min,
    aw: common_vendor.o(($event) => $props.lootInfo.lose_min = $event.detail.value),
    ax: common_vendor.o((...args) => $options.watchLoserMax && $options.watchLoserMax(...args)),
    ay: $props.lootInfo.lose_max,
    az: common_vendor.o(($event) => $props.lootInfo.lose_max = $event.detail.value),
    aA: common_vendor.o((...args) => $options.saveLoot && $options.saveLoot(...args)),
    aB: common_assets._imports_6$2,
    aC: common_assets._imports_5$2,
    aD: common_vendor.o(($event) => $options.initData(16)),
    aE: common_vendor.o((...args) => $options.watchForceRatio && $options.watchForceRatio(...args)),
    aF: $props.force.force_rate,
    aG: common_vendor.o(($event) => $props.force.force_rate = $event.detail.value),
    aH: common_vendor.o((...args) => $options.watchForceMin && $options.watchForceMin(...args)),
    aI: $props.force.force_coin_min,
    aJ: common_vendor.o(($event) => $props.force.force_coin_min = $event.detail.value),
    aK: common_vendor.o((...args) => $options.watchForceMax && $options.watchForceMax(...args)),
    aL: $props.force.force_coin_max,
    aM: common_vendor.o(($event) => $props.force.force_coin_max = $event.detail.value),
    aN: common_vendor.o((...args) => $options.saveForce && $options.saveForce(...args)),
    aO: common_assets._imports_7$1,
    aP: common_assets._imports_5$2,
    aQ: common_vendor.o(($event) => $options.initData(13)),
    aR: common_vendor.o((...args) => $options.watchCoinRate && $options.watchCoinRate(...args)),
    aS: $props.coinRate.coin_rate,
    aT: common_vendor.o(($event) => $props.coinRate.coin_rate = $event.detail.value),
    aU: common_vendor.o((...args) => $options.saveCoin && $options.saveCoin(...args)),
    aV: common_assets._imports_8$1,
    aW: common_assets._imports_5$2,
    aX: common_vendor.o(($event) => $options.initData(4)),
    aY: $props.timerMsg.data,
    aZ: common_vendor.o(($event) => $props.timerMsg.data = $event.detail.value),
    ba: common_vendor.o((...args) => $options.saveTimerMsg && $options.saveTimerMsg(...args)),
    bb: common_assets._imports_9$1,
    bc: common_assets._imports_5$2,
    bd: common_vendor.o(($event) => $options.initData(5)),
    be: $props.sendGift.data,
    bf: common_vendor.o(($event) => $props.sendGift.data = $event.detail.value),
    bg: common_vendor.o((...args) => $options.saveSendGift && $options.saveSendGift(...args)),
    bh: common_assets._imports_10,
    bi: common_vendor.f($props.businessList.business_config_list, (item, i, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.o(($event) => $options.watchBusiness($event, i), item.id),
        c: item.rate,
        d: common_vendor.o(($event) => item.rate = $event.detail.value, item.id),
        e: item.id
      };
    }),
    bj: common_vendor.o((...args) => $options.saveSendBusiness && $options.saveSendBusiness(...args)),
    bk: common_vendor.f($data.newGroupWord.list, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.delectWord(item, index), index),
        b: item.title,
        c: common_vendor.o(($event) => item.title = $event.detail.value, index),
        d: item.content,
        e: common_vendor.o(($event) => item.content = $event.detail.value, index),
        f: common_vendor.o(($event) => $options.saveWord(item), index),
        g: common_vendor.o((...args) => $options.addWord && $options.addWord(...args), index),
        h: index + 1 === $data.newGroupWord.list.length,
        i: index
      };
    }),
    bl: common_assets._imports_11,
    bm: common_assets._imports_0$7,
    bn: common_assets._imports_13,
    bo: common_assets._imports_14,
    bp: common_vendor.n($data.isShowNoble === false ? "hide" : ""),
    bq: common_assets._imports_2$11,
    br: common_vendor.t($data.isShowNoble === true ? "收起" : "打开"),
    bs: common_vendor.o(($event) => $options.switchShow("isShowNoble")),
    bt: common_vendor.f($data.newNobleInfo.title_list, (item, i, i0) => {
      return common_vendor.e({
        a: common_vendor.o([($event) => item.name = $event.detail.value, ($event) => $options.watchInpt($event, i)], "name-" + i),
        b: item.name,
        c: item.res_id * 1 === -1
      }, item.res_id * 1 === -1 ? {
        d: common_assets._imports_15
      } : item.url === "no" || item.res_id === "no" || item.res_id * 1 === 0 ? {
        f: common_assets._imports_19
      } : {
        g: item.url
      }, {
        e: item.url === "no" || item.res_id === "no" || item.res_id * 1 === 0,
        h: common_vendor.o(($event) => $options.openNoble(i), "name-" + i),
        i: common_vendor.n(!item.name && "gray"),
        j: common_vendor.o(($event) => $options.saveNoble(item, i), "name-" + i),
        k: common_vendor.n(item.id == "" && $data.newNobleInfo.title_list.length <= 1 ? "gray" : ""),
        l: common_vendor.o(($event) => $options.delectNoble(item, i), "name-" + i),
        m: "name-" + i
      });
    }),
    bv: common_assets._imports_17,
    bw: common_assets._imports_1$15,
    bx: common_assets._imports_13,
    by: common_vendor.n($data.emptyFlag === false && "gray"),
    bz: common_vendor.o((...args) => $options.addNoble && $options.addNoble(...args)),
    bA: common_vendor.n($data.isShowNoble === true ? "show" : "hide"),
    bB: common_assets._imports_14,
    bC: common_vendor.n($data.isShowGift === false ? "hide" : ""),
    bD: common_assets._imports_2$11,
    bE: common_vendor.t($data.isShowGift === true ? "收起" : "打开"),
    bF: common_vendor.o(($event) => $options.switchShow("isShowGift")),
    bG: common_vendor.f($data.newGiftInfo.coin_gift_list, (item, i, i0) => {
      return {
        a: common_vendor.o([($event) => item.name = $event.detail.value, ($event) => $options.watchGift($event, i)], "gift-" + i),
        b: item.name,
        c: common_vendor.o([($event) => item.coin = $event.detail.value, ($event) => $options.watchGift($event, i)], "gift-" + i),
        d: item.coin,
        e: common_vendor.o([($event) => item.charm = $event.detail.value, ($event) => $options.watchGift($event, i)], "gift-" + i),
        f: item.charm,
        g: common_vendor.n(!item.name || item.coin == "" || item.charm == "" ? "gray" : ""),
        h: common_vendor.o(($event) => $options.saveGift(item, i), "gift-" + i),
        i: common_vendor.n(item.id == "" && $data.newGiftInfo.coin_gift_list.length <= 1 && "gray"),
        j: common_vendor.o(($event) => $options.delGift(item, i), "gift-" + i),
        k: "gift-" + i
      };
    }),
    bH: common_assets._imports_17,
    bI: common_assets._imports_1$15,
    bJ: common_assets._imports_13,
    bK: common_vendor.n($data.giftFlag === false && "gray"),
    bL: common_vendor.o((...args) => $options.addGift && $options.addGift(...args)),
    bM: common_vendor.n($data.isShowGift === true ? "show" : "hide"),
    bN: common_vendor.o((...args) => $options.closeSurePopup && $options.closeSurePopup(...args)),
    bO: common_vendor.sr("makesurePopup", "69593aee-2"),
    bP: common_vendor.p({
      type: "center",
      ["is-mask-click"]: false
    }),
    bQ: $data.newNobleList.length
  }, $data.newNobleList.length ? {
    bR: common_assets._imports_19,
    bS: common_vendor.n($data.newNobleList[$data.newNobleInfoIndex].url === "no" || $data.newNobleList[$data.newNobleInfoIndex].res_id === "no" || $data.newNobleList[$data.newNobleInfoIndex].res_id * 1 === 0 ? "active" : ""),
    bT: common_vendor.o(($event) => $options.checkNoble({
      res_id: "0",
      title: "",
      url: ""
    })),
    bU: common_vendor.n($data.newNobleList[$data.newNobleInfoIndex].url === "no" || $data.newNobleList[$data.newNobleInfoIndex].res_id === "no" || $data.newNobleList[$data.newNobleInfoIndex].res_id * 1 === 0 ? "active" : ""),
    bV: common_vendor.f($data.nobleBgList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.n($data.newNobleList[$data.newNobleInfoIndex].res_id === item.res_id ? "active" : ""),
        c: common_vendor.o(($event) => $options.checkNoble(item), index),
        d: common_vendor.t(item.title),
        e: common_vendor.n($data.newNobleList[$data.newNobleInfoIndex].res_id === item.res_id ? "active" : ""),
        f: index
      };
    })
  } : {}, {
    bW: common_vendor.o((...args) => $options.sureNoble && $options.sureNoble(...args)),
    bX: common_vendor.sr("chooseNobleBgPopup", "69593aee-3"),
    bY: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#ffffff"
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69593aee"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-config-x.js.map
