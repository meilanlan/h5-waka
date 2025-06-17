import {ajax} from '../http.js';

const robotDetailApi = '/v1/robot_detail';
const validOrderApi = '/v1/get_valid_order_list';
const userOrderApi = '/v1/use_order';
const serviesStApi = '/v1/group_service_status';
const groupDetailApi = '/v1/group_detail';
const groupUserApi = '/v1/group_user';
const groupMarriageApi = '/v1/group_marriage';
const groupTitApi = '/v1/group_title';
const groupAdminApi = '/v1/group_admin';
const groupLoginApi = '/v1/group_admin_login';
const groupSummaryApi = '/v1/group_data_summary';
const groupPawApi = '/v1/group_admin_password';
const groupClearApi = '/v1/group_data_clear';
const groupAudiotApi = '/v1/group_welcome_audio';
const groupEmojiApi = '/v1/group_welcome_emoji';
const groupCmdApi = '/v1/group_cmd_config_list';
const groupSetCmdApi = '/v1/set_group_cmd_config';
const groupConfigApi = '/v1/group_config_get';
const groupSetConfigApi = '/v1/group_config_set';
const groupGetRangeApi = '/v1/group_data_range_get';
const groupSynListApi = '/v1/group_can_syn_list';
const groupSynStartApi = '/v1/group_start_syn';
const groupUserDataApi = '/v1/group_user_data';
const groupResApi = '/v1/group_res_list';
const groupSectApi = '/v1/group_sect';
const groupTaskListApi = '/v1/group_taskgift_list';
const groupIncomeListApi = '/v1/group_income_list';
const groupWordDelApi = '/v1/group_wrod_del';
const groupDataApi = '/v1/group_data_update';
const friendListApi = '/v1/robot_friendlist';
const setFriendApi = '/v1/robot_setting_servicer';
const lotteryConfigApi = '/v1/group_lottery_config_get';
const lotteryDelApi = '/v1/group_lottery_del';
const lotterySetApi = '/v1/group_lottery_config_set';
const lotteryAddApi = '/v1/group_lottery_add';
const lotteryLogApi = '/v1/group_lottery_log';
const switchGroupListApi = '/v1/switch_group_list';
const switchGroupApi = '/v1/switch_group';
const switchV2GroupApi = '/v2/switch_group';
const switchRobotApi = '/v1/switch_robot';
const recoveryGroupApi = '/v1/recovery_group_service';
const lotteryEditApi = '/v1/group_lottery_edit';
const adminEditApi = '/v1/group_add_admin';
const delGroupApi = '/v1/group_del';
const nobleNameApi = '/v1/title_rename';
const nobleNameDelApi = '/v1/title_del';
const giftEditApi = '/v1/coin_gift/gift_rename';
const giftDelApi = '/v1/coin_gift/gift_del';
const exchangeApi = '/v1/exchange/use';
const addYuanBaoApi = '/v1/add_yuanbao';


// 机器人账号
const robotDetailData = (data, success, fail) => {
  ajax({
    url: robotDetailApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 获取入驻/续费列表
const validOrderData = (data, success, fail) => {
  ajax({
    url: validOrderApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 入驻套餐---使用套餐
const userOrderData = (data, success, fail) => {
  ajax({
    url: userOrderApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 修改群状态
const serviesStData = (data, success, fail) => {
  ajax({
    url: serviesStApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 群空间：群信息
const groupDetailData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupDetailApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 群空间
// const groupUserData = (data, success, fail) => {
//   ajax({
//     noAuth: true,
//     url: groupUserApi,
//     data: data,
//     success: success,
//     fail: fail
//   })
// }
const groupUserData = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: '/h5/space/data_list',
    data: data,
    success: success,
    fail: fail
  })
}
// 婚姻
const groupMarriageData = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: groupMarriageApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 头衔
const groupTitData = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: groupTitApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 门派
const groupSectData = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: groupSectApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 群管
const groupAdminData = (data, success, fail) => {
  ajax({
    noAuth: true,
    url: groupAdminApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 管理员登录
const groupLoginData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupLoginApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 管理员设置密码
const groupPawData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupPawApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 概要数据
const groupSummaryData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/group_summary',
    data: data,
    success: success,
    fail: fail
  })
}

// 成员
const groupClearData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/user_list_clean',
    data: data,
    success: success,
    fail: fail
  })
}

// 获取群指令列表
const groupCmdData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/cmd_config_get',
    data: data,
    success: success,
    fail: fail
  })
}

// 设置命令开关
const groupSetCmdData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/cmd_config_set',
    data: data,
    success: success,
    fail: fail
  })
}

// 获取默认配置信息
const groupConfigData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/group_config_get',
    data: data,
    success: success,
    fail: fail
  })
}

// 设置默认配置信息
const groupSetConfigData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/group_config_set',
    data: data,
    success: success,
    fail: fail
  })
}

// 获取同步的微信群列表
const groupSynListData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupSynListApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 开始同步
const groupSynStartData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupSynStartApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 清理用户列表
const groupUserDataData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/user_list',
    data: data,
    success: success,
    fail: fail
  })
}

// 获取语音和表情、头衔背景列表
const groupResData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupResApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 获取任务礼物记录
const groupTaskListData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupTaskListApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 获取群主账户列表
const groupIncomeListData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupIncomeListApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 删除词库的词
const groupWordDelData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupWordDelApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 编辑金币/魅力/金砖/水晶
const groupData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: groupDataApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 客服列表
const friendListData = (data, success, fail) => {
  ajax({
    url: friendListApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 设置客服
const setFriendData = (data, success, fail) => {
  ajax({
    url: setFriendApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 抽奖配置及其列表获取接口
const lotteryConfigData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryConfigApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 抽奖奖品删除接口
const lotteryDelData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryDelApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 抽奖配置保存接口(目前用来保存抽奖需要消耗的 金币)
const lotterySetData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: lotterySetApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 抽奖添加接口
const lotteryAddData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryAddApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 抽奖记录：
const lotteryLogData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryLogApi,
    data: data,
    success: success,
    fail: fail
  })
}

//可用更换的群列表
const switchGroupListData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: switchGroupListApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 选择某一个群做更换的接口
const switchGroupData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: switchGroupApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 选择某一个群做更换的接口
const switchV2GroupData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: switchV2GroupApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 更换群助手
const switchRobotData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: switchRobotApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 恢复服务
const recoveryGroupData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: recoveryGroupApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 编辑抽奖盲盒
const lotteryEditData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryEditApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 添加超管、管理
const adminEditData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: adminEditApi,
    data: data,
    success: success,
    fail: fail
  })
}


// 删除群
const delGroupData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: delGroupApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 修改贵族名称
const nobleNameData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: nobleNameApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 删除贵族名称
const nobleNameDelData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: nobleNameDelApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 新增金币礼物
const giftEditData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: giftEditApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 删除金币礼物
const giftDelData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: giftDelApi,
    data: data,
    success: success,
    fail: fail
  })
}
// 使用兑换券
const exchangeData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: exchangeApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 增加元宝数
const addYuanBaoData = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: addYuanBaoApi,
    data: data,
    success: success,
    fail: fail
  })
}

// 顶部群信息的接口
const groupInfoApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/group_info',
    data: data,
    success: success,
    fail: fail
  })
}
// 我的主页
const userProfileApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/user_profile',
    data: data,
    success: success,
    fail: fail
  })
}
// 机器人助手
const spaceRobotApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/robot',
    data: data,
    success: success,
    fail: fail
  })
}
// 群收益
const groupIncomeApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/space/income',
    data: data,
    success: success,
    fail: fail
  })
}
// 能量助力
const groupGrowApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/group/grow',
    data: data,
    success: success,
    fail: fail
  })
}
// 支付宝支付
const alipayOrder = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/alipay/order',
    data: data,
    success: success,
    fail: fail
  })
}

// 我的订单
const billListApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/h5/bill/list',
    data: data,
    success: success,
    fail: fail
  })
}

// 个人的分享
const shareUserApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/share/user',
    data: data,
    success: success,
    fail: fail
  })
}
//社群的分享
const shareGroupApi = (data, success, fail) => {
  ajax({
    noAuth: true,
    adminSet: true,
    url: '/share/group',
    data: data,
    success: success,
    fail: fail
  })
}



export {
  robotDetailData,
  validOrderData,
  userOrderData,
  serviesStData,
  groupDetailData,
  groupUserData,
  groupMarriageData,
  groupTitData,
  groupAdminData,
  groupLoginData,
  groupSummaryData,
  groupPawData,
  groupClearData,
  groupCmdData,
  groupSetCmdData,
  groupConfigData,
  groupSynListData,
  groupSynStartData,
  groupSetConfigData,
  groupUserDataData,
  groupResData,
  groupSectData,
  groupTaskListData,
  groupIncomeListData,
  groupWordDelData,
  groupData,
  friendListData,
  setFriendData,
  lotteryConfigData,
  lotteryDelData,
  lotterySetData,
  lotteryAddData,
  lotteryLogData,
  switchGroupListData,
  switchGroupData,
  switchV2GroupData,
  switchRobotData,
  recoveryGroupData,
  lotteryEditData,
  adminEditData,
  delGroupData,
  nobleNameData,
  nobleNameDelData,
  giftEditData,
  giftDelData,
  exchangeData,
  addYuanBaoData,
  groupInfoApi,
  userProfileApi,
  spaceRobotApi,
  groupIncomeApi,
  groupGrowApi,
  alipayOrder,
  billListApi,
  shareUserApi,
  shareGroupApi
}
