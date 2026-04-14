<template>
  <view class="contener">
    <!-- 社群分享 -->
    <image class="bg" src="/static/image/community-bg3.jpg"></image>
    <view class="contener-body contener-body-2">
      <image class="group-bg" src="/static/image/bg_wxq_1.jpg" mode=""></image>
      <view class="headimg-box">
        <image :src="infoData.group.group_cover" mode="aspectFill"></image>
      </view>
      <view class="name">{{infoData.group.group_name}}</view>
      <view class="tex3">
        <image src="/static/image/group.png"></image>{{infoData.group.group_user_count}}人
      </view>
      <view class="invite">
        <image :src="infoData.user.head_img || defaultimg" mode=""></image>
        {{infoData.user.nick_name}} 邀请你加入
      </view>
      <button class="invite-btn invite-btn-1" @click="openApp">接受邀请</button>
      <view class="invite-btn invite-btn-2" @click="toDownloadApp">下载Whack App</view>
    </view>
    <image class="logo-share" src="/static/image/logo-share.png"></image>
    
    <uni-popup ref="expPopup" type="top">
      <image src="/static/image/share-exp.png" class="share-img"></image>
    </uni-popup>
    
  </view>
</template>

<script setup>
  import {ref,reactive,onMounted} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import {shareGroupApi} from '@/service/robotAccount/index.js'
  import defaultimg from '../../static/image/logo.jpg'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {jumpApp,downloadApp} from '@/unit/common.js'
  
  const opt = reactive({
    group_id: '',
    user_id: '',
  })
  const infoData = reactive({
    group:{
      group_cover: '',
      group_id: '',
      group_name: '',
      group_user_count: ''
    },
    user: {
      head_img: '',
      nick_name: '',
      user_id: ''
    }
  })
  const expPopup = ref()
  
  function isWeixinBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      return ua.indexOf('micromessenger') !== -1;
  }
  
  function openApp(){
    if (isWeixinBrowser()) {
      //微信浏览器内
      expPopup.value.open()
    } else {
      let param = {
        // iosUniversalLink: `https://h5test-app.whackgroup.com/#/pages/shareh5/shareTransferPage?group_id=${opt.group_id}`,
        iosAppUrl: `whackapp://group-invite?group_id=${opt.group_id}`,
        androidAppUrl: `whackapp://group-invite?group_id=${opt.group_id}`,
      }
      jumpApp(param)
    }
  }
  function toDownloadApp(){
    if (isWeixinBrowser()) {
      expPopup.value.open()
    } else {
      downloadApp()
    }
  }
  
  function getGroupInfo(){
    uni.showLoading()
    shareGroupApi({user_id: opt.user_id,group_id: opt.group_id},res=>{
      if (res.code === 0) {
        infoData.group = res.data.group
        infoData.user = res.data.user
        // userInfo.data = res.data
        uni.hideLoading()
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  
  onLoad(option=>{
    opt.group_id = option.group_id
    opt.user_id = option.user_id
    getGroupInfo()
  })
  onMounted(()=>{
    const appPage = document.getElementById('app');
    appPage.style.paddingTop = 0;
  })
  
</script>

<style lang="scss" scoped>
  .contener {
    // min-height: 100vh;
    width: 100vw;
    height: 100vh;
    position: relative;
    // font-family: MiSans, MiSans;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
    .top-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 112rpx;
      padding: 0 24rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #ffffff;
      >* {
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items: center;
        image {
          width: 72rpx;
          height: 72rpx;
          border-radius: 16rpx;
          margin-right: 16rpx;
        }
        .name {
          font-weight: 500;
          font-size: 32rpx;
          color: #000000;
          line-height: 32rpx;
        }
        .tex {
          margin-top: 8rpx;
          // font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: rgba(0,0,0,0.4);
          line-height: 24rpx;
        }
      }
      .right {
        width: 160rpx;
        height: 56rpx;
        background: #22C0FF;
        border-radius: 222rpx;
        text-align: center;
        font-weight: 500;
        font-size: 28rpx;
        color: #FFFFFF;
        line-height: 56rpx;
      }
    }
    .contener-body {
      position: fixed;
      top: 352rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 550rpx;
      height: 552rpx;
      background: #FFFFFF;
      border-radius: 32rpx;
      padding-top: 48rpx;
      text-align: center;
      
      .community-bg1 {
        display: block;
        width: 320rpx;
        height: 320rpx;
        margin: 0 auto 32rpx;
      }
      .tex1 {
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 48rpx;
      }
      .tex2 {
        margin-top: 12rpx;
        // font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: rgba(0,0,0,0.4);
        line-height: 44rpx;
      }
      &-2 {
        top: 120rpx;
        width: 630rpx;
        height: 940rpx;
        background: #FFFFFF;
        padding-top: 0;
        overflow: hidden;
        .group-bg {
          width: 100%;
          height: 386rpx;
        }
        .headimg-box {
          position: relative;
          width: 160rpx;
          height: 160rpx;
          border-radius: 24rpx;
          overflow: hidden;
          margin: -80rpx auto 0;
          border: 8rpx solid #ffffff;
          image {
            width: 144rpx;
            height: 144rpx;
          }
        }
        .name {
          margin-top: 24rpx;
          font-weight: 600;
          font-size: 32rpx;
          color: #000000;
          line-height: 40rpx;
        }
        .tex3 {
          margin-top: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.4);
          line-height: 24rpx;
          image {
            margin-right: 8rpx;
            width: 28rpx;
            height: 28rpx;
          }
        }
        .invite {
          margin-top: 42rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-size: 24rpx;
          color: #000000;
          line-height: 32rpx;
          image {
            margin-right: 16rpx;
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
          }
        }
        .invite-btn {
          margin: 16rpx auto 0;
          width: 550rpx;
          height: 86rpx;
          border-radius: 16rpx;
          font-weight: 600;
          font-size: 32rpx;
          line-height: 86rpx;
          &.invite-btn-1 {
            color: #FFFFFF;
            background: #22C0FF;
          }
          &.invite-btn-2 {
            margin: 40rpx auto 0;
            border: 1px solid #22C0FF;
            color: #22C0FF;
          }
        }
        
      }
    }
    .download-btn {
      position: absolute;
      bottom: 108rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 300rpx;
      height: 88rpx;
      background: #22C0FF;
      border-radius: 562rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 28rpx;
      color: #FFFFFF;
      .logo {
        width: 54rpx;
        height: 54rpx;
        border-radius: 16rpx;
        border: 2rpx solid #ffffff;
        overflow: hidden;
        margin-right: 12rpx;
        image {
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
    .logo-share {
      position: fixed;
      bottom: 104rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 330rpx;
      height: 72rpx;
    }
  }
  .share-img {
    position: absolute;
    top: 32rpx;
    right: 32rpx;
    width: 430rpx;
    height: 304rpx;
  }
</style>