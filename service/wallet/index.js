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
//福袋记录
const luckyBagStatApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/lucky/bag/stat',
    data: data,
    success: success,
    fail: fail
  })
}
//福气袋
const rewardBagListApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/user/reward_bag_list',
    data: data,
    success: success,
    fail: fail
  })
}
//使用福气袋
const useRewardApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/user/use_reward',
    data: data,
    success: success,
    fail: fail
  })
}
//红包提现记录
const alipayRpStatApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/alipay_rp/stat',
    data: data,
    success: success,
    fail: fail
  })
}
//提现信息
const luckyWithdrawalsInfoApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/withdrawals/info',
    data: data,
    success: success,
    fail: fail
  })
}
//提现
const luckyWithdrawalsApplyApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/withdrawals/apply',
    data: data,
    success: success,
    fail: fail
  })
}

export {
  rechargeOrderApi,
  luckyBagStatApi,
  rewardBagListApi,
  useRewardApi,
  alipayRpStatApi,
  luckyWithdrawalsInfoApi,
  luckyWithdrawalsApplyApi
}