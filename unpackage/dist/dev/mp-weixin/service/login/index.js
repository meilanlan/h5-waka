"use strict";
const service_http = require("../http.js");
const loginSms = "/v1/login_sms";
const sms = "/v1/send_sms";
const loginPawApi = "/v1/login_password";
const loginSmsHttp = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    url: loginSms,
    data,
    success,
    fail
  });
};
const loginPawHttp = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    url: loginPawApi,
    data,
    success,
    fail
  });
};
const sendLoginSms = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    url: sms,
    data,
    success,
    fail
  });
};
exports.loginPawHttp = loginPawHttp;
exports.loginSmsHttp = loginSmsHttp;
exports.sendLoginSms = sendLoginSms;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/service/login/index.js.map
