"use strict";
const common_vendor = require("../../common/vendor.js");
const service_login_index = require("../../service/login/index.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      phone: "",
      code: "",
      paw: "",
      loginType: 2,
      is_new: "",
      codeText: "发送验证码",
      failText: "",
      timer: null,
      count: 60,
      from: null
    };
  },
  onLoad(option) {
    this.from = option.from;
    common_vendor.index.getStorageSync("sales_key") && (this.loginType = 1);
  },
  onShow() {
    if (common_vendor.index.getStorageSync("user-token")) {
      common_vendor.index.showToast({
        title: "您已登录！",
        duration: 1e3,
        success: () => {
          setTimeout(() => {
            if (this.from)
              ;
            else {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }
          }, 1500);
        }
      });
    }
  },
  methods: {
    login() {
      if (this.phone && this.phone.length >= 11 && this.verPhone()) {
        if (this.loginType === 1) {
          if (this.is_new != "" && this.is_new * 1 === 1 && (!this.code || !this.verPaw())) {
            common_vendor.index.showToast({
              title: "请输入完整信息",
              icon: "none"
            });
            return false;
          } else if (!this.code) {
            common_vendor.index.showToast({
              title: "请输入完整信息",
              icon: "none"
            });
            return false;
          }
          common_vendor.index.showLoading();
          this.loginSms();
        } else {
          if (this.verPaw()) {
            common_vendor.index.showLoading();
            this.loginPaw();
          }
        }
      } else {
        common_vendor.index.showToast({
          title: "请输入完整信息",
          icon: "none"
        });
      }
    },
    loginSms() {
      let params = {
        mobile: this.phone,
        code: this.code,
        sales_key: common_vendor.index.getStorageSync("sales_key")
      };
      if (this.is_new != "" && this.is_new * 1 === 1) {
        params["password"] = this.paw;
      }
      service_login_index.loginSmsHttp(params, (res) => {
        if (res.code == 0) {
          common_vendor.index.showToast({
            title: "登录成功！",
            duration: 2e3,
            success: () => {
              common_vendor.index.setStorageSync("user-id", res.data.user_id);
              common_vendor.index.setStorageSync("show-guide", res.data.show_guide);
              common_vendor.index.setStorageSync("read", false);
              common_vendor.index.setStorage({
                key: "user-token",
                data: res.data.token,
                success: () => {
                  setTimeout(() => {
                    if (this.from)
                      ;
                    else {
                      common_vendor.index.switchTab({
                        url: "/pages/index/index"
                      });
                    }
                  }, 1500);
                }
              });
            }
          });
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }
      });
    },
    loginPaw() {
      let params = {
        mobile: this.phone,
        password: this.paw
      };
      service_login_index.loginPawHttp(params, (res) => {
        if (res.code == 0) {
          common_vendor.index.showToast({
            title: "登录成功！",
            duration: 2e3,
            success: () => {
              common_vendor.index.setStorageSync("user-id", res.data.user_id);
              common_vendor.index.setStorageSync("show-guide", res.data.show_guide);
              common_vendor.index.setStorageSync("read", false);
              common_vendor.index.setStorage({
                key: "user-token",
                data: res.data.token,
                success: () => {
                  setTimeout(() => {
                    if (this.from)
                      ;
                    else {
                      common_vendor.index.switchTab({
                        url: "/pages/index/index"
                      });
                    }
                  }, 1500);
                }
              });
            }
          });
        } else {
          if (res.code != -10002) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
        }
      });
    },
    clearInfo(type) {
      this[type] = "";
    },
    sendCode() {
      if (this.phone.length >= 11 && this.verPhone()) {
        common_vendor.index.showLoading();
        let params = {
          mobile: this.phone
        };
        service_login_index.sendLoginSms(params, (res) => {
          if (res.code == 0) {
            if (!this.timer) {
              this.codeText = "后重新发送";
              this.timer = setInterval(() => {
                if (this.count === 0) {
                  this.codeText = "重新发送";
                  clearInterval(this.timer);
                  this.count = 60;
                  this.timer = null;
                  return false;
                }
                this.count--;
              }, 1e3);
            }
            this.is_new = res.data.is_new;
          } else {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none"
            });
          }
          common_vendor.index.hideLoading();
        });
      }
    },
    verPhone() {
      let reg = /^1[0-9]{10,10}$/;
      if (!reg.test(this.phone)) {
        common_vendor.index.showToast({
          title: "手机号有误，请重新输入",
          icon: "none"
        });
        return false;
      }
      return true;
    },
    verPaw() {
      if (!this.paw) {
        common_vendor.index.showToast({
          title: "请输入完整信息",
          icon: "none"
        });
        return false;
      } else if (this.paw.length < 6 || this.paw.length > 12) {
        common_vendor.index.showToast({
          title: "请输入6-12位登录密码",
          icon: "none"
        });
        return false;
      }
      return true;
    },
    checkLoginType() {
      common_vendor.index.showLoading();
      this.code = "";
      this.paw = "";
      this.loginType = this.loginType === 1 ? 2 : 1;
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 300);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$5,
    b: common_assets._imports_1$5,
    c: common_vendor.t($data.loginType === 1 ? "验证码登录" : "密码登录"),
    d: $data.phone,
    e: common_vendor.o(($event) => $data.phone = $event.detail.value),
    f: common_assets._imports_2$4,
    g: $data.phone,
    h: common_vendor.o(($event) => $options.clearInfo("phone")),
    i: $data.loginType === 1
  }, $data.loginType === 1 ? common_vendor.e({
    j: $data.code,
    k: common_vendor.o(($event) => $data.code = $event.detail.value),
    l: common_assets._imports_2$4,
    m: $data.code,
    n: common_vendor.o(($event) => $options.clearInfo("code")),
    o: common_vendor.t($data.count),
    p: $data.timer,
    q: common_vendor.t($data.codeText),
    r: common_vendor.n(/^1[0-9]{10,10}$/.test($data.phone) && !$data.timer ? "active" : ""),
    s: common_vendor.o((...args) => $options.sendCode && $options.sendCode(...args)),
    t: $data.is_new != "" && $data.is_new * 1 === 1
  }, $data.is_new != "" && $data.is_new * 1 === 1 ? {
    v: $data.paw,
    w: common_vendor.o(($event) => $data.paw = $event.detail.value),
    x: common_assets._imports_2$4,
    y: $data.paw,
    z: common_vendor.o(($event) => $options.clearInfo("paw"))
  } : {}) : {
    A: $data.paw,
    B: common_vendor.o(($event) => $data.paw = $event.detail.value),
    C: common_assets._imports_2$4,
    D: $data.paw,
    E: common_vendor.o(($event) => $options.clearInfo("paw"))
  }, {
    F: common_vendor.t($data.failText),
    G: $data.failText,
    H: common_vendor.o((...args) => $options.login && $options.login(...args)),
    I: common_vendor.t($data.loginType === 1 ? "密码登录" : "验证码登录"),
    J: common_vendor.o((...args) => $options.checkLoginType && $options.checkLoginType(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3190821f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/admin/login.js.map
