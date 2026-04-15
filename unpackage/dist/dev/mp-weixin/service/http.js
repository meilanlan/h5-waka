"use strict";
const common_vendor = require("../common/vendor.js");
const service_env = require("./env.js");
const unit_common = require("../unit/common.js");
const ajax = (opt) => {
  var _a, _b;
  const from = window.location.href.split("#")[0];
  try {
    const token = ((_a = window.userinfo) == null ? void 0 : _a.user.auth_token) || window.urlToken;
    const userId = (_b = window.userinfo) == null ? void 0 : _b.user.user_id;
    const groupId = unit_common.getUrlParam("group_id");
    const robotId = unit_common.getUrlParam("robot_id");
    const adminConfigInfo = common_vendor.index.getStorageSync("ADMIN_CONFIG") || {};
    if (token || !token && opt.noAuth) {
      opt = opt || {};
      opt.url = opt.url || "";
      opt.data = unit_common.processParams(opt.data) || null;
      opt.method = opt.method || "POST";
      if (opt.method === "POST") {
        opt.data = common_vendor.qs.stringify(unit_common.processParams(opt.data));
      }
      opt.header = opt.header || {
        "Content-Type": "application/x-www-form-urlencoded",
        // 'user-token': token,
        // 'user-id': userId,
        "Authorization": token
      };
      if (opt.adminSet === true) {
        opt.header = {
          ...opt.header
        };
      }
      opt.ApiUrl = opt.apiUrl || service_env.ApiUrl;
      common_vendor.index.__f__("log", "at service/http.js:50", opt.ApiUrl, "opt.ApiUrl");
      opt.success = opt.success || function() {
      };
      opt.fail = opt.fail || function() {
      };
      common_vendor.index.request({
        url: opt.ApiUrl + opt.url,
        data: opt.data,
        method: opt.method,
        header: opt.header,
        responseType: opt.responseType ? "arraybuffer" : "text",
        dataType: "json",
        success: function(res) {
          if (~~res.data.code === -10001) {
          } else {
            opt.success(res.data);
          }
        },
        fail: function() {
          common_vendor.index.hideLoading();
          opt.fail();
        }
      });
    } else {
      common_vendor.index.hideLoading();
      common_vendor.index.showToast({
        title: "请先登录！",
        icon: "none",
        success: () => {
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/login/index" + (from ? "?from=" + from : "")
            });
          }, 2e3);
        }
      });
    }
  } catch (e) {
    common_vendor.index.hideLoading();
    common_vendor.index.showToast({
      title: "系统错误，请稍后重试",
      icon: "none",
      success: () => {
      }
    });
  }
};
exports.ajax = ajax;
//# sourceMappingURL=../../.sourcemap/mp-weixin/service/http.js.map
