import {ajax} from '../http.js';

//我的收益
const myProfitApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit',
    data: data,
    success: success,
    fail: fail
  })
}
//我的收益-收益明细
const myProfitGroupsApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/groups',
    data: data,
    success: success,
    fail: fail
  })
}
//我的收益-嗨币兑换嗨豆
const hiIconExchangeApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/hi_coin_exchange',
    data: data,
    success: success,
    fail: fail
  })
}
//我的收益-收益明细-群明细
const profitIncomeDetailApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/detail',
    data: data,
    success: success,
    fail: fail
  })
}

//我的收益-交易记录
const profitWithdrawalsApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/withdrawals',
    data: data,
    success: success,
    fail: fail
  })
}

//我的收益-提现-获取结算信息
const withdrawalsInfoApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/withdrawals_info',
    data: data,
    success: success,
    fail: fail
  })
}

//我的收益-提现-提交提现申请
const withdrawalsCreateApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/withdrawals_create',
    data: data,
    success: success,
    fail: fail
  })
}

//我的收益-提现-实名认证
const yunzhanghuVerifyApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/test/yunzhanghu_verify',
    data: data,
    success: success,
    fail: fail
  })
}
//我的收益-提现-获取真人验证 URL
const idCardVerifyPreApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/user/id_card_verify_pre',
    data: data,
    success: success,
    fail: fail
  })
}

const contractYunzhanghuApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/user/contract/yunzhanghu',
    data: data,
    success: success,
    fail: fail
  })
}
// 嗨币结算列表
const hiCoinLogApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/profit/hi_coin_exchange_log',
    data: data,
    success: success,
    fail: fail
  })
}


export {
  myProfitApi,
  myProfitGroupsApi,
  hiIconExchangeApi,
  profitIncomeDetailApi,
  profitWithdrawalsApi,
  withdrawalsInfoApi,
  withdrawalsCreateApi,
  yunzhanghuVerifyApi,
  idCardVerifyPreApi,
  contractYunzhanghuApi,
  hiCoinLogApi
}