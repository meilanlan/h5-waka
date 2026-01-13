<template>
  <view class="contener">
    <!-- 站外动态的分享 -->
    <image class="bg" src="/static/image/community-bg2.jpg"></image>
    <view class="top-box">
      <view class="left">
        <image src="/static/image/logo.jpg"></image>
        <view class="info">
          <view class="name">咓咔社群</view>
          <view class="tex">这就是你想要的超级社群</view>
        </view>
      </view>
      <view class="right" @click="openApp">
        打开看看
      </view>
    </view>
    <view class="contener-body">
      <image class="community-bg1" src="/static/image/community-bg1.png"></image>
      <view class="tex1">仅社区成员可查看</view>
      <view class="tex2">已是成员？打开App查看</view>
    </view>
    <view class="download-btn" @click="openApp">
      <view class="logo">
        <image src="/static/image/logo.jpg" mode=""></image>
      </view>
      App 内打开
    </view>
    <!-- <template v-else>
      <image class="bg" src="/static/image/community-bg3.jpg"></image>
      <view class="contener-body contener-body-2">
        <image class="group-bg" src="/static/image/bg_wxq_1.jpg" mode=""></image>
        <view class="headimg-box">
          <image src="/static/image/logo.jpg" mode=""></image>
        </view>
        <view class="name">晚风惬意王者战队</view>
        <view class="tex3">
          <image src="/static/image/group.png"></image>1200人
        </view>
        <view class="invite">
          <image src="/static/image/logo.jpg" mode=""></image>
          Nichol 邀请你加入
        </view>
        <view class="invite-btn">接受邀请</view>
      </view>
      <image class="logo-share" src="/static/image/logo-share.jpg"></image>
    </template> -->
    
    <uni-popup ref="expPopup" type="top">
      <image src="/static/image/share-exp.png" class="share-img"></image>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref,reactive,onMounted} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {jumpApp} from '@/unit/common.js'
  
  const groupType = ref(1)
  const appInfo = reactive({
    moment_id: '',
    type: ''
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
        iosAppUrl: `whackapp://moment?id=${appInfo.moment_id}&type=${appInfo.type}`,
        androidAppUrl: `whackapp://moment?id=${appInfo.moment_id}&type=${appInfo.type}`,
      }
      jumpApp(param)
      // let iosAppUrl= `whackapp://moment?id=${appInfo.moment_id}&type=${appInfo.type}`
      // let androidAppUrl = `whackapp://moment?id=${appInfo.moment_id}&type=${appInfo.type}`
      // let downloadIos = 'https://apps.apple.com/cn/app/whack/id6752324554'
      // let downloadAnd = 'https://www.whackgroup.com/#/'
      // window.location = window.isiOS?iosAppUrl:androidAppUrl;
      // var clickedAt = +new Date;
      // console.log(clickedAt,'clickedAt is')
      //  setTimeout(function(){
      //    console.log(window.document.webkitHidden,'oooo')
      //     !window.document.webkitHidden && setTimeout(function(){ 
      //            if (+new Date - clickedAt < 2000){  
      //               console.log('come in download')
      //               window.location = window.isiOS?downloadIos:downloadAnd;  
      //            }  
      //     }, 500);       
      //  }, 500) 
    }
  }
  
  onLoad(option=>{
    appInfo.moment_id = option.moment_id*1
    appInfo.type = option.type*1
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
        display: flex;
        align-items: center;
        justify-content: center;
        image {
          width: 54rpx;
          height: 54rpx;
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
  .share-img {
    position: absolute;
    top: 32rpx;
    right: 32rpx;
    width: 430rpx;
    height: 304rpx;
  }
</style>