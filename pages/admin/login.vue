<template>
  <view class="content">
    <image src="../../static/image/login-bg.png" class="login-bg"></image>
    <image src="../../static/image/login-logo.png" class="logo"></image>
    <view class="text1">微信群服务机器人</view>
    <view class="title">{{loginType===1?"验证码登录":"密码登录"}}</view>
    <view class="inpt-box inpt-box-1">
      <text class="text2">手机号</text>  
      <input class="input" type="number" maxlength="11" placeholder="请输入手机号" placeholder-style="color:#C5CCD5" v-model="phone">
      <view class="clear">
        <image src="../../static/image/clear.png" v-show="phone" @click="clearInfo('phone')"></image>
      </view>
    </view>
    <template v-if="loginType === 1">
      <view class="inpt-box">
        <text class="text2">验证码</text>
        <input type="number" class="input" maxlength="6" placeholder="验证码" placeholder-style="color:#C5CCD5;" v-model="code">
        <view class="clear">
          <image src="../../static/image/clear.png" v-show="code" @click="clearInfo('code')"></image>
        </view>
        <view :class="['code-text', ((/^1[0-9]{10,10}$/).test(phone)&&!timer)?'active':'']" @click="sendCode">
          <text v-show="timer">{{count}}s</text>
          {{codeText}}
        </view>
      </view>
      <view class="inpt-box inpt-box-1" v-if="is_new != ''&&is_new*1 === 1">
        <text class="text2" space="nbsp">密&nbsp;&nbsp;&nbsp;码</text>  
        <input class="input" type="password" maxlength="12" placeholder="请设置6-12位下次登录密码" placeholder-style="color:#C5CCD5;" v-model="paw">
        <view class="clear">
          <image src="../../static/image/clear.png" v-show="paw" @click="clearInfo('paw')"></image>
        </view>
      </view> 
    </template>
    <template v-else>
      <view class="inpt-box inpt-box-1">
        <text class="text2" space="nbsp">密&nbsp;&nbsp;&nbsp;码</text>  
        <input class="input" type="password" maxlength="12" placeholder="请输入6-12位登录密码" placeholder-style="color:#C5CCD5;" v-model="paw">
        <view class="clear">
          <image src="../../static/image/clear.png" v-show="paw" @click="clearInfo('paw')"></image>
        </view>
      </view>
    </template>
    
    <text class="text3" v-show="failText">{{failText}}</text>
    <!-- <view :class="['sub-btn', (/^1[0-9]{10,10}$/).test(phone)&&code?'active':'']" @click="login">登录</view> -->
    <view class="sub-btn active" @click="login">登录</view>
    <text class="text4" @click="checkLoginType">{{loginType===1?"密码登录":"验证码登录"}}</text>
    <!-- <view class="text6">重置密码请联系客服</view> -->
  </view>
</template>

<script>
  import {loginSmsHttp,sendLoginSms,loginPawHttp} from '@/service/login/index.js'
  export default {
    data() {
      return {
        phone: '',
        code: '',
        paw: '',
        loginType: 2,
        is_new: '',
        codeText: '发送验证码',
        failText: '',
        timer: null,
        count: 60,
        from: null,
      }
    },
    onLoad(option) {
      this.from = option.from
      uni.getStorageSync('sales_key')&&(this.loginType = 1)
    },
    onShow() {
      if (uni.getStorageSync('user-token')) {
        uni.showToast({
          title: '您已登录！',
          duration: 1000,
          success: () => {
            setTimeout(() => {
              if (this.from) {
                // #ifdef H5
                window.open(decodeURIComponent(this.from), '_self');
                // #endif
              } else {
                uni.switchTab({
                  url: '/pages/index/index'
                })
              }
            }, 1500)
          }
        })
      }
    },
    methods: {
      login() {
        // if (!this.phone || !this.code || !this.paw) {
        //   uni.showToast({
        //     title: "请输入完整信息",
        //     icon: 'none'
        //   });
        //   return false
        // }
        if (this.phone && this.phone.length>=11 && this.verPhone()) {
          if (this.loginType === 1) {
            if (this.is_new != ''&&this.is_new*1 === 1 &&(!this.code || !this.verPaw())) {
              uni.showToast({
                title: "请输入完整信息",
                icon: 'none'
              });
              return false
            } else if (!this.code) {
              uni.showToast({
                title: "请输入完整信息",
                icon: 'none'
              });
              return false
            }
            uni.showLoading()
            this.loginSms()
          } else {
            if (this.verPaw()) {
              uni.showLoading()
              this.loginPaw()
            }
          }
        } else {
          uni.showToast({
            title: "请输入完整信息",
            icon: 'none'
          });
        }
      },
      loginSms() {
        let params = {
          mobile: this.phone,
          code: this.code,
          sales_key: uni.getStorageSync('sales_key')
        }
        if (this.is_new != ''&&this.is_new*1 === 1) {
          params['password'] = this.paw
        }
        loginSmsHttp(params, (res) => {
          if (res.code == 0) {
            uni.showToast({
              title: '登录成功！',
              duration: 2000,
              success: () => {
                uni.setStorageSync('user-id',res.data.user_id)
                uni.setStorageSync('show-guide',res.data.show_guide)
                uni.setStorageSync('read',false) // 是否阅读过新手引导
                
                uni.setStorage({
                  key: 'user-token',
                  data: res.data.token,
                  success: () => {
                      setTimeout(() => {
                        if (this.from) {
                          // #ifdef H5
                          window.open(decodeURIComponent(this.from), '_self');
                          // #endif
                        } else {
                          uni.switchTab({
                            url: '/pages/index/index'
                          })
                        }
                      }, 1500)
                  }
                })
              }
            })
            // this.creatorData = res.data;
          } else {
            if (res.code != -10002){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            }
          }
        })
      },
      loginPaw() {
        let params = {
          mobile: this.phone,
          password: this.paw
        }
        loginPawHttp(params, (res) => {
          if (res.code == 0) {
            uni.showToast({
              title: '登录成功！',
              duration: 2000,
              success: () => {
                uni.setStorageSync('user-id',res.data.user_id)
                uni.setStorageSync('show-guide',res.data.show_guide)
                uni.setStorageSync('read',false) // 是否阅读过新手引导
                
                uni.setStorage({
                  key: 'user-token',
                  data: res.data.token,
                  success: () => {
                      setTimeout(() => {
                        if (this.from) {
                          // #ifdef H5
                          window.open(decodeURIComponent(this.from), '_self');
                          // #endif
                        } else {
                          uni.switchTab({
                            url: '/pages/index/index'
                          })
                        }
                      }, 1500)
                  }
                })
              }
            })
            // this.creatorData = res.data;
          } else {
            if (res.code != -10002){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            }
          }
        })
      },
      clearInfo(type) {
        this[type] = ''
      },
      sendCode() {
        if (this.phone.length>= 11 && this.verPhone()) {
          uni.showLoading()
          let params = {
            mobile: this.phone
          }
          sendLoginSms(params, (res) => {
            if (res.code == 0) {
              if (!this.timer) {
                this.codeText = '后重新发送'
                this.timer = setInterval(() => {
                if (this.count === 0) {
                  this.codeText = '重新发送'
                  clearInterval(this.timer)
                  this.count = 60
                  this.timer = null
                  return false
                }
                this.count--;
                }, 1000)
              }
              this.is_new = res.data.is_new
            }else{
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });	
            }
            uni.hideLoading()
          })
        }
      },
      verPhone() {
        let reg = /^1[0-9]{10,10}$/;
        if (!reg.test(this.phone)) {
          uni.showToast({
            title: '手机号有误，请重新输入',
            icon: 'none'
          });
          return false;
        }
        return true
      },
      verPaw() {
        if(!this.paw) {
          uni.showToast({
            title: "请输入完整信息",
            icon: 'none'
          });
          return false
        } else if (this.paw.length<6 || this.paw.length>12) {
          uni.showToast({
            title: "请输入6-12位登录密码",
            icon: 'none'
          });
          return false
        }
        return true
      },
      checkLoginType() {
        uni.showLoading()
        this.code = ''
        this.paw = ''
        this.loginType = this.loginType === 1 ? 2 : 1
        setTimeout(()=>{
          uni.hideLoading()
        },300)
      }
    }
  }
</script>

<style scoped lang="scss">
.content {
  padding: 0 80rpx;
  font-size: 32rpx;
  background-color: #ffffff;
  height: 100vh;
  position: relative;
  .login-bg {
    width: 343rpx;
    height: 457rpx;
    position: absolute;
    right: 0;
    top: 0;
  }
  .logo {
    width: 248rpx;
    height: 136rpx;
    margin: 100rpx 0 10rpx 0;
  }
  .text1 {
    color: #606178;
    font-size: 32rpx;
    line-height: 32rpx;
  }
  .title {
    font-size: 56rpx;
    color: #0E1B2E;
    margin: 100rpx 0 60rpx;
    font-weight: 500;
  }
  .inpt-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F4F5F7;
    height: 112rpx;
    border-radius: 20rpx;
    margin-bottom: 40rpx;
    padding: 0 30rpx;
    >*{
      flex-shrink: 0;
    }
    .text2 {
      color: #606178;
      margin-right: 20rpx;
    }
    .input {
      width: 176rpx;
      height: 100%;
      font-weight: 500;
      font-size: 32rpx;
    }
    .clear {
      width: 48rpx;
      height: 48rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .code-text {
      color: #9DA9B9;
      &.active {
        color: #1675FE;
      }
      text {
        color: #1675FE;
      }
    }
    &.inpt-box-1 {
      .input {
        width: 376rpx;
      }
    }
  }
  .text3 {
    display: block;
    color: #F56C6C;
    font-size: 24rpx;
    margin-top: -10rpx;
  }
  .text4 {
    display: block;
    text-align: center;
    font-size: 36rpx;
    margin-top: 80rpx;
    color: #1675FE;
  }
  .text6 {
    position: fixed;
    bottom: 60rpx;
    left: 0;
    width: 100%;
    text-align: center;
    color: #c5ccd5;
    font-size: 32rpx;
  }
  .sub-btn {
    margin-top: 50rpx;
    border-radius: 20rpx;
    background-color: #C5CCD5;
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
    color: #FFFFFF;
    &.active {
      background-color: #1675FE;
    }
  }
}
</style>
