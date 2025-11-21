<template>
  <view class="wrapper">
   <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="数据同步" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-select">
      <text class="label">小嗨机器人</text>
      <view class="select-box" @click="openSelectCont1">
        <view class="left">
          <image :src="robotIndex===-1?staticImg1:robotList[robotIndex].img"></image>
          <text>{{robotIndex===-1?'选择小嗨微信助手':robotList[robotIndex].name}}</text>
        </view>
        <image :class="['next-icon',selectBox1&&'active']" src="/static/image/next-2.png"></image>
      </view>
      <view class="selectDialog" v-if="selectBox1 === true">
        <view class="mask" @click="openSelectCont1"></view>
        <view class="dialogBox">
          <scroll-view class="boxScroll" scroll-y="true" >
            <view :class="['box','box-'+index]" v-for="(item,index) in robotList" :key="'box-'+index" @click="chooseRobotObj(index)">
              <image class="headimg" :src="item.img"></image>
              <view class="info">
                <view class="name">
                  <text>{{item.name}}</text>
                  <image class="icon" src="/static/image/icon_vip.png" mode=""></image>
                </view>
                <view class="people">
                  <image class="group" src="/static/image/group.png"></image> <text>1200人</text>
                  <text class="id">ID:88888888</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    <view class="wrapper-select" v-if="robotIndex != -1">
      <text class="label">微信群名</text>
      <view class="select-box" @click="openSelectCont2">
        <view class="left">
          <image :src="groupIndex===-1?staticImg2:groupList[groupIndex].img"></image>
          <text>{{groupIndex===-1?'选择社群':groupList[groupIndex].name}}</text>
        </view>
        <image :class="['next-icon',selectBox2&&'active']" src="/static/image/next-2.png"></image>
      </view>
      <view class="selectDialog" v-if="selectBox2 === true">
        <view class="mask" @click="openSelectCont2"></view>
        <view class="dialogBox">
          <scroll-view class="boxScroll" scroll-y="true" >
            <view :class="['box','box-'+index]" v-for="(item,index) in groupList" :key="'box-'+index" @click="chooseGroupObj(index)">
              <image class="headimg" :src="item.img"></image>
              <view class="info">
                <view class="name">
                  <text>{{item.name}}</text>
                  <image class="icon" src="/static/image/icon_vip.png" mode=""></image>
                </view>
                <view class="people">
                  <image class="group" src="/static/image/group.png"></image> <text>1200人</text>
                  <text class="id">ID:88888888</text>
                </view>
              </view>
              
            </view>
          </scroll-view>
        </view>
      </view>
    
      <view class="sync-img">
        
      </view>
      
      <view class="box choose-box" v-if="groupIndex!=-1">
        <view class="left">
          <image class="headimg" :src="groupList[groupIndex].img"></image>
          <view class="info">
            <view class="name">
              <text>{{groupList[groupIndex].name}}</text>
              <image class="icon" src="/static/image/icon_vip.png" mode=""></image>
            </view>
            <view class="people">
              <image class="group" src="/static/image/group.png"></image> <text>1200人</text>
              <text class="id">ID:88888888</text>
            </view>
          </view>
        </view>
        <view class="btn btn-1" @click="toAsync">
          同步
        </view>
      </view>
    </view>
    
    <!-- 嗨币充值 -->
    <uni-popup ref="joinPopup" type="center">
      <view class="common-popup">
        <view class="title">
          社群数据同步
        </view>
        <!-- <view class="text">
          入驻后机器人订单视为已使用
        </view> -->
        <view class="btn-list">
          <view class="cancel" @click="joinPopup.close()">
            取消
          </view>
          <view class="sure" @click="sureSync">
            确定
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  let isIos = ''
  if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
      isIos = true;
  } else {
    isIos = false;
  }
  
  const selectBox1 = ref(false)
  const selectBox2 = ref(false)
  const robotIndex = ref(-1)
  const groupIndex = ref(-1)
  const joinPopup = ref(null)
  const robotList = ref([
    {id:1,name: '微信1', img: new URL("@/static/image/noble-bg.png", import.meta.url).href},
    {id:2,name: '微信2', img: new URL("@/static/image/vip.png", import.meta.url).href},
    {id:3,name: '微信3', img: new URL("@/static/image/noble-bg.png", import.meta.url).href},
  ])
  const groupList = ref([
    {id:1,name: '群1', img: new URL("@/static/image/noble-bg.png", import.meta.url).href},
    {id:2,name: '群2', img: new URL("@/static/image/vip.png", import.meta.url).href},
    {id:3,name: '群3', img: new URL("@/static/image/noble-bg.png", import.meta.url).href},
  ])
  const staticImg1 = new URL("@/static/image/robot-icon.png", import.meta.url).href;
  const staticImg2 = new URL("@/static/image/main-group.png", import.meta.url).href;
  
  function sureSync(){
    joinPopup.value.close()
  }
  
  function toAsync(){
    joinPopup.value.open()
  }
  
  function chooseGroupObj(index) {
    groupIndex.value = index
    selectBox2.value = false
  }
  
  function chooseRobotObj(index) {
    robotIndex.value = index
    selectBox1.value = false
  }
  
  function openSelectCont1(){
    selectBox1.value = !selectBox1.value
  }
  function openSelectCont2(){
    selectBox2.value = !selectBox2.value
  }
  
  function backPage() {
    uni.navigateBack();
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding-top: 88rpx;
    min-height: calc(100vh - 88rpx);
    background-color: #ffffff;
  }
  .wrapper-select {
    padding: 32rpx 32rpx 0;
    position: relative;
    .label {
      font-weight: 400;
      font-size: 24rpx;
      color: rgba(0,0,0,0.4);
      line-height: 32rpx;
    }
    .select-box {
      width: 100%;
      height: 96rpx;
      background: #F0F3F8;
      border-radius: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 20rpx;
      padding-right: 32rpx;
      margin-top: 16rpx;
      >* {
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items:center;
        
        image {
          width: 56rpx;
          height: 56rpx;
          margin-right: 18rpx;
        }
        text {
          font-weight: 400;
          font-size: 28rpx;
          color: #000000;
          line-height: 36rpx;
        }
      }
      .next-icon {
        width: 32rpx;
        height: 32rpx;
        transition: transform .2s;
        &.active {
          transform: rotate(180deg);
        }
      }
    }
    .selectDialog {
      padding: 0 32rpx;
      .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        border: 1px solid green;
      }
      .dialogBox {
        position: absolute;
        top: 180rpx;
        left: 32rpx;
        width: 686rpx;
        height: 600rpx;
        background-color: #ffffff;
        z-index: 99;
        // background-color: #F0F3F8;
        // border: 1px solid rgba(0,0,0,.1);
        border-top: none;
        box-shadow: 0 6rpx 10rpx rgba(0,0,0,.1);
        .boxScroll {
          height: 100%;
        }
        
      }
    }
  }
  .box {
    display: flex;
    align-items: center;
    padding: 24rpx;
    border-bottom: 1px solid rgba(0,0,0,.1);
    &.box-0 {
      padding-top: 40rpx;
    }
    .left {
      display: flex;
      align-items: center;
    }
    .headimg {
      width: 80rpx;
      height: 80rpx;
      margin-right: 16rpx;
    }
    .name {
      font-weight: 600;
      font-size: 32rpx;
      color: #000000;
      line-height: 40rpx;
    }
    .icon {
      width: auto;
      height: 32rpx;
    }
    .group {
      width: 28rpx;
      height: 28rpx;
      margin-right: 8rpx;
    }
    .people {
      margin-top: 10rpx;
      display: flex;
      align-items: center;
      text {
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.4);
        line-height: 24rpx;
        &.id {
          margin-left: 18rpx;
        }
      }
    }
    .btn {
      padding: 16rpx 12rpx;
      border-radius: 222rpx;
      font-weight: 500;
      font-size: 24rpx;
      &.btn-1 {
        background-color: #22C0FF;
        color: #ffffff;
      }
      &.btn-2 {
        background-color: #FFFFFF;
        color: #BDC6D2;
      }
    }
    &.choose-box {
      border: none;
      background-color: #F0F3F8;
      border-radius: 16rpx;
      justify-content: space-between;
    }
  }
  .sync-img {
    margin: 34rpx auto 24rpx;
    width: 190rpx;
    height: 176rpx;
    background-color: steelblue;
  }
  .common-popup {
    width: 640rpx;
    height: 268rpx;
    border-radius: 32rpx;
    text-align: center;
    position: relative;
    .title {
      margin-top: 16rpx;
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
      line-height: 48rpx;
    }
    .text {
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #898989;
      line-height: 36rpx;
    }
    .btn-list {
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      border-top: 1rpx solid rgba(0, 0, 0, 0.10);
      >view {
        width: 320rpx;
        height: 88rpx;
        line-height: 88rpx;
        font-weight: 400;
        font-size: 32rpx;
        color: #666666;
        &.cancel {
          border-right: 1rpx solid rgba(0, 0, 0, 0.10);
        }
        &.sure {
          color: #22C0FF;
        }
      }
    }
  }
</style>