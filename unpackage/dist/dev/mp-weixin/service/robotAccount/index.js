"use strict";
const service_http = require("../http.js");
const groupPawApi = "/v1/group_admin_password";
const groupSynListApi = "/v1/group_can_syn_list";
const groupSynStartApi = "/v1/group_start_syn";
const groupResApi = "/v1/group_res_list";
const groupTaskListApi = "/v1/group_taskgift_list";
const groupIncomeListApi = "/v1/group_income_list";
const groupWordDelApi = "/v1/group_wrod_del";
const groupDataApi = "/v1/group_data_update";
const lotteryConfigApi = "/v1/group_lottery_config_get";
const lotteryDelApi = "/v1/group_lottery_del";
const lotterySetApi = "/v1/group_lottery_config_set";
const lotteryAddApi = "/v1/group_lottery_add";
const lotteryLogApi = "/v1/group_lottery_log";
const lotteryEditApi = "/v1/group_lottery_edit";
const nobleNameApi = "/v1/title_rename";
const nobleNameDelApi = "/v1/title_del";
const giftEditApi = "/v1/coin_gift/gift_rename";
const giftDelApi = "/v1/coin_gift/gift_del";
const groupUserData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    url: "/h5/space/data_list",
    data,
    success,
    fail
  });
};
const groupPawData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupPawApi,
    data,
    success,
    fail
  });
};
const groupSummaryData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/group_summary",
    data,
    success,
    fail
  });
};
const groupClearData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/user_list_clean",
    data,
    success,
    fail
  });
};
const groupCmdData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/cmd_config_get",
    data,
    success,
    fail
  });
};
const groupSetCmdData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/cmd_config_set",
    data,
    success,
    fail
  });
};
const groupConfigData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/group_config_get",
    data,
    success,
    fail
  });
};
const groupSetConfigData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/group_config_set",
    data,
    success,
    fail
  });
};
const groupSynListData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupSynListApi,
    data,
    success,
    fail
  });
};
const groupSynStartData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupSynStartApi,
    data,
    success,
    fail
  });
};
const groupUserDataData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/user_list",
    data,
    success,
    fail
  });
};
const groupResData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupResApi,
    data,
    success,
    fail
  });
};
const groupTaskListData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupTaskListApi,
    data,
    success,
    fail
  });
};
const groupIncomeListData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupIncomeListApi,
    data,
    success,
    fail
  });
};
const groupWordDelData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupWordDelApi,
    data,
    success,
    fail
  });
};
const groupData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: groupDataApi,
    data,
    success,
    fail
  });
};
const lotteryConfigData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryConfigApi,
    data,
    success,
    fail
  });
};
const lotteryDelData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryDelApi,
    data,
    success,
    fail
  });
};
const lotterySetData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: lotterySetApi,
    data,
    success,
    fail
  });
};
const lotteryAddData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryAddApi,
    data,
    success,
    fail
  });
};
const lotteryLogData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryLogApi,
    data,
    success,
    fail
  });
};
const lotteryEditData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: lotteryEditApi,
    data,
    success,
    fail
  });
};
const nobleNameData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: nobleNameApi,
    data,
    success,
    fail
  });
};
const nobleNameDelData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: nobleNameDelApi,
    data,
    success,
    fail
  });
};
const giftEditData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: giftEditApi,
    data,
    success,
    fail
  });
};
const giftDelData = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: giftDelApi,
    data,
    success,
    fail
  });
};
const groupInfoApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/group_info",
    data,
    success,
    fail
  });
};
const userProfileApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/user_profile",
    data,
    success,
    fail
  });
};
const spaceRobotApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/robot",
    data,
    success,
    fail
  });
};
const groupIncomeApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/space/income",
    data,
    success,
    fail
  });
};
const groupGrowApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/group/grow",
    data,
    success,
    fail
  });
};
const alipayOrder = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/alipay/order",
    data,
    success,
    fail
  });
};
const robotProdDoApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/robot/prod_do",
    data,
    success,
    fail
  });
};
const billListApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/bill/list",
    data,
    success,
    fail
  });
};
const shareUserApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/share/user",
    data,
    success,
    fail
  });
};
const shareGroupApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/share/group",
    data,
    success,
    fail
  });
};
const checkAwardStApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/newcomer/check_award_status",
    data,
    success,
    fail
  });
};
const awardTakeApi = (data, success, fail) => {
  service_http.ajax({
    noAuth: true,
    adminSet: true,
    url: "/h5/newcomer/award_take",
    data,
    success,
    fail
  });
};
exports.alipayOrder = alipayOrder;
exports.awardTakeApi = awardTakeApi;
exports.billListApi = billListApi;
exports.checkAwardStApi = checkAwardStApi;
exports.giftDelData = giftDelData;
exports.giftEditData = giftEditData;
exports.groupClearData = groupClearData;
exports.groupCmdData = groupCmdData;
exports.groupConfigData = groupConfigData;
exports.groupData = groupData;
exports.groupGrowApi = groupGrowApi;
exports.groupIncomeApi = groupIncomeApi;
exports.groupIncomeListData = groupIncomeListData;
exports.groupInfoApi = groupInfoApi;
exports.groupPawData = groupPawData;
exports.groupResData = groupResData;
exports.groupSetCmdData = groupSetCmdData;
exports.groupSetConfigData = groupSetConfigData;
exports.groupSummaryData = groupSummaryData;
exports.groupSynListData = groupSynListData;
exports.groupSynStartData = groupSynStartData;
exports.groupTaskListData = groupTaskListData;
exports.groupUserData = groupUserData;
exports.groupUserDataData = groupUserDataData;
exports.groupWordDelData = groupWordDelData;
exports.lotteryAddData = lotteryAddData;
exports.lotteryConfigData = lotteryConfigData;
exports.lotteryDelData = lotteryDelData;
exports.lotteryEditData = lotteryEditData;
exports.lotteryLogData = lotteryLogData;
exports.lotterySetData = lotterySetData;
exports.nobleNameData = nobleNameData;
exports.nobleNameDelData = nobleNameDelData;
exports.robotProdDoApi = robotProdDoApi;
exports.shareGroupApi = shareGroupApi;
exports.shareUserApi = shareUserApi;
exports.spaceRobotApi = spaceRobotApi;
exports.userProfileApi = userProfileApi;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/service/robotAccount/index.js.map
