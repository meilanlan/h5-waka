import {ajax} from '../http.js';

const loginSms = '/v1/login_sms';
const sms = '/v1/send_sms';
const loginPawApi = '/v1/login_password';

// 群助手-验证码登录
const loginSmsHttp = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: loginSms,
    data: data,
    success: success,
    fail: fail
  })
}

// 群助手-密码登录
const loginPawHttp = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: loginPawApi,
    data: data,
    success: success,
    fail: fail
  })
}

//群助手-发送登录验证码
const sendLoginSms = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: sms,
    data: data,
    success: success,
    fail: fail
  })
}

export {
  loginSmsHttp,
  sendLoginSms,
  loginPawHttp
}
