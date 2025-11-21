import {ajax} from '../http.js';

//充值明细
const rechargeOrderApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/order/list',
    data: data,
    success: success,
    fail: fail
  })
}

export {
  rechargeOrderApi
}