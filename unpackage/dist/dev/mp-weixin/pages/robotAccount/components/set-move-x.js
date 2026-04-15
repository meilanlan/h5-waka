"use strict";
const common_vendor = require("../../../common/vendor.js");
const service_robotAccount_index = require("../../../service/robotAccount/index.js");
const common_assets = require("../../../common/assets.js");
const uniPopup = () => "../../../components/uni-popup/components/uni-popup/uni-popup.js";
const TipsX = () => "../../../components/tips-x/tips-x.js";
const _sfc_main = {
  props: {
    robotInfo: {
      type: Object,
      default: () => {
      }
    },
    robot_id: {
      type: String,
      default: () => {
      }
    }
  },
  // mixins: [scrollToTargetPosition],
  components: { uniPopup, TipsX },
  data() {
    return {
      list: [],
      dataType: [],
      curGroupId: "",
      curGroupIndex: -1,
      curGroupInfo: {
        group_id: "",
        cover: "",
        group_name: "",
        status_name: ""
      },
      sureText: "",
      errorText: "",
      checkMember: false
    };
  },
  methods: {
    draw() {
      common_vendor.index.showLoading();
      let param = {
        data_type: this.dataType.length > 1 ? 3 : this.dataType[0],
        syn_group_id: this.curGroupInfo.group_id,
        robot_id: this.robot_id,
        syn_robot_id: this.curGroupInfo.robot_wx_id
      };
      service_robotAccount_index.groupSynStartData(param, (res) => {
        if (~~res.code === 0) {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        } else if (res.code === -20001) {
          common_vendor.index.hideLoading();
          this.$emit("updateAdminToken");
        } else if (res.code === -3e4) {
          this.errorText = res.msg;
          this.$refs.closePopPopup.open();
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        } else {
          common_vendor.index.hideLoading();
        }
        this.$refs.surePopup.close();
      });
    },
    startDraw() {
      if (!this.curGroupInfo.group_id) {
        common_vendor.index.showToast({
          title: "请添加同步的微信群",
          icon: "none"
        });
        return false;
      } else if (this.dataType.length <= 0) {
        common_vendor.index.showToast({
          title: "请选择需要同步的配置",
          icon: "none"
        });
        return false;
      }
      this.sureText = this.dataType.length >= 2 ? "【群成员数据和群设置】" : this.dataType[0] == 1 ? "【群设置】" : "【群成员数据】";
      this.$refs.surePopup.open();
    },
    know() {
      this.$refs.closePopPopup.close();
    },
    checkboxChange(e) {
      common_vendor.index.__f__("log", "at pages/robotAccount/components/set-move-x.vue:178", e.detail.value, "uiu");
      this.dataType = e.detail.value;
    },
    sureGroup() {
      if (this.curGroupIndex === -1) {
        common_vendor.index.showToast({
          title: "请选择微信群",
          icon: "none"
        });
        return false;
      }
      this.curGroupInfo = this.list[this.curGroupIndex];
      this.$refs.groupPopup.close();
    },
    radioChange(e) {
      this.curGroupId = e.detail.value;
      for (var key in this.list) {
        if (this.list[key].group_id === e.detail.value) {
          this.curGroupIndex = key;
          break;
        }
      }
    },
    openPopup() {
      this.getgroupSynListData();
    },
    getgroupSynListData() {
      common_vendor.index.showLoading();
      service_robotAccount_index.groupSynListData({ group_id: this.robotInfo.group_id }, (res) => {
        if (~~res.code === 0) {
          this.list = res.data || [];
          this.$refs.groupPopup.open();
          common_vendor.index.hideLoading();
        } else if (res.code === -20001) {
          common_vendor.index.hideLoading();
          this.$emit("updateAdminToken");
        } else if (res.code === -3e4) {
          this.errorText = res.msg;
          this.$refs.closePopPopup.open();
          common_vendor.index.hideLoading();
        } else if (res.code != -10002) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: res.msg,
            icon: "none"
          });
        } else {
          common_vendor.index.hideLoading();
        }
      });
    }
  }
};
if (!Array) {
  const _component_uni_popup = common_vendor.resolveComponent("uni-popup");
  const _easycom_tips_x2 = common_vendor.resolveComponent("tips-x");
  (_component_uni_popup + _easycom_tips_x2)();
}
const _easycom_tips_x = () => "../../../components/tips-x/tips-x.js";
if (!Math) {
  _easycom_tips_x();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.robotInfo.group_cover,
    b: common_vendor.t($props.robotInfo.group_name),
    c: common_assets._imports_0$16,
    d: $data.curGroupInfo.cover
  }, $data.curGroupInfo.cover ? {
    e: $data.curGroupInfo.cover
  } : {
    f: common_assets._imports_1$12
  }, {
    g: !$data.curGroupInfo.cover
  }, !$data.curGroupInfo.cover ? {} : {
    h: common_assets._imports_2$8
  }, {
    i: common_vendor.o((...args) => $options.openPopup && $options.openPopup(...args)),
    j: $data.checkMember,
    k: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    l: common_vendor.o((...args) => $options.startDraw && $options.startDraw(...args)),
    m: $data.list.length > 0
  }, $data.list.length > 0 ? {
    n: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.group_name),
        c: common_vendor.t(item.status_name),
        d: item.group_id,
        e: item.group_id == $data.curGroupId,
        f: index
      };
    }),
    o: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args))
  } : {
    p: common_assets._imports_3$1
  }, {
    q: common_vendor.o((...args) => $options.sureGroup && $options.sureGroup(...args)),
    r: common_vendor.sr("groupPopup", "426a262e-0"),
    s: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#ffffff"
    }),
    t: common_vendor.t($props.robotInfo.group_name),
    v: common_vendor.t($data.sureText),
    w: common_vendor.t($data.curGroupInfo.group_name),
    x: common_vendor.o(($event) => _ctx.$refs.surePopup.close()),
    y: common_vendor.o((...args) => $options.draw && $options.draw(...args)),
    z: common_vendor.sr("surePopup", "426a262e-1"),
    A: common_vendor.p({
      type: "center"
    }),
    B: common_vendor.o($options.know),
    C: common_vendor.p({
      value: $data.errorText
    }),
    D: common_vendor.sr("closePopPopup", "426a262e-2"),
    E: common_vendor.p({
      type: "center",
      ["is-mask-click"]: false
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-426a262e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/robotAccount/components/set-move-x.js.map
