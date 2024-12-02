import qs from 'qs';
import { ApiUrl } from './env.js';
import { processParams,getUrlParam } from '@/unit/common.js';
// import store from '@/store';

const ajax = (opt) => {
  const from = window.location.href.split('#')[0];
  try {
    // const token = uni.getStorageSync('user-token');
    // const userId = uni.getStorageSync('user-id');
    // const groupId = getUrlParam('group_id');
    // const robotId = getUrlParam('robot_id');
    const token = window.userinfo?.user.auth_token;
    const userId = window.userinfo?.user.user_id;
    const groupId = getUrlParam('group_id');
    const robotId = getUrlParam('robot_id');
    const adminConfigInfo = uni.getStorageSync('ADMIN_CONFIG') || {};
    if (token || (!token && opt.noAuth)) {
      opt = opt || {};
      opt.url = opt.url || '';
      opt.data = processParams(opt.data) || null;
      // const crypto = require('crypto');
      // const hash = crypto.createHash('md5');
      // opt.data.sign = hash.update(decodeURIComponent(qs.stringify(processParams(opt.data)))).digest('hex');
      opt.method = opt.method || 'POST';
      if (opt.method === 'POST') {
        opt.data = qs.stringify(processParams(opt.data));
      }
      opt.header = opt.header || {
        'Content-Type': 'application/x-www-form-urlencoded',
        'user-token': token,
        'user-id': userId,
      };
      if (opt.adminSet === true) {
        opt.header = {
          ...opt.header,
          ...{
            "group-id": groupId,
            "admin-token": adminConfigInfo[groupId]&&adminConfigInfo[groupId]['admin_token'],
            "robot-id": robotId
          }
        }
      }
      // "robot-id": adminConfigInfo[groupId]&&adminConfigInfo[groupId]['robot_id'] || robotId
      opt.ApiUrl = opt.apiUrl || ApiUrl;
      opt.ApiUrl = 'https://api.glxnetwork.com';
      opt.success = opt.success || function () {};
      opt.fail = opt.fail || function () {};
      uni.request({
        url: opt.ApiUrl + opt.url,
        data: opt.data,
        method: opt.method,
        header: opt.header,
        responseType: opt.responseType ? 'arraybuffer' : 'text',
        dataType: 'json',
        success: function (res) {
          if (~~res.data.code === -10001) { // 未登录状态
            // uni.clearStorageSync()
            // uni.removeStorageSync('user-token')
            // uni.removeStorageSync('user-id')
            // uni.showToast({
            //   title: res.data.msg,
            //   icon: 'none',
            //   success: () => {
            //     setTimeout(() => {
            //       uni.reLaunch({
            //         url: '/pages/login/index' + (from ? ('?from=' + from) : '')
            //       });
            //     }, 2000);
            //   }
            // });
          } else {
            opt.success(res.data);
          }
        },
        fail: function () {
          // uni.showToast({
          //   title: '请稍后重试'
          // });
          uni.hideLoading()
          opt.fail();
        }
      });
    } else {
      uni.hideLoading()
      uni.showToast({
        title: '请先登录！',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/login/index' + (from ? ('?from=' + from) : '')
            });
          }, 2000);
        }
      });
    }
  } catch (e) {
    uni.hideLoading()
    // error
    uni.showToast({
      title: '系统错误，请稍后重试',
      icon: 'none',
      success: () => {
        // setTimeout(() => {
        //   uni.navigateTo({
        //     url: '/pages/login/index' + (from ? ('?from=' + from) : '')
        //   });
        // }, 2000);
      }
    });
  }
};

export {
  ajax
}