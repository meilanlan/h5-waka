<template>
  <view class="contener">
    <!-- 个人的分享 -->
    <image class="bg" src="/static/image/community-bg3.jpg"></image>
    <view class="contener-body contener-body-2">
      <image class="group-bg" src="/static/image/bg_wxq_1.jpg" mode=""></image>
      <view class="headimg-box">
        <image :src="userInfo.data.head_img||defaultimg" mode=""></image>
      </view>
      <view class="name">晚风惬意王者战队</view>
      <view class="invite">
        邀请你加入{{userInfo.data.nick_name}}成为好友
      </view>
      <view class="invite-btn">接受邀请</view>
    </view>
    <image class="logo-share" src="/static/image/logo-share.png"></image>P
  </view>
</template>

<script setup>
  import {ref,reactive} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import {shareUserApi} from '@/service/robotAccount/index.js'
  import defaultimg from '../../static/image/logo.jpg'
  
  const groupType = ref(1)
  const userId = ref()
  const userInfo = reactive({data:{}})
  
  function getShareInfo(){
    uni.showLoading()
    shareUserApi({user_id: userId.value},res=>{
      if (res.code === 0) {
        userInfo.data = res.data
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
    userId.value = option.user_id*1
    getShareInfo()
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
      position: absolute;
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
      position: absolute;
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
        top: 244rpx;
        width: 630rpx;
        height: 888rpx;
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
          margin-top: 82rpx;
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
          margin: 40rpx auto 0;
          width: 550rpx;
          height: 86rpx;
          background: #22C0FF;
          border-radius: 16rpx;
          font-weight: 600;
          font-size: 32rpx;
          color: #FFFFFF;
          line-height: 86rpx;
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
      position: absolute;
      bottom: 104rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 330rpx;
      height: 72rpx;
    }
  }
</style>