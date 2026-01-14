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

export {
  rechargeOrderApi,
  luckyBagStatApi,
  rewardBagListApi,
  useRewardApi
}