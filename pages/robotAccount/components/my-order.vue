<template>
  <view class="wrapper">
    <view class="box" v-for="(item, index) in props.order_list" :key="index">
      <view class="left">
        <view class="icon">
          <image :src="item.robot_cover"></image>
        </view>
        <view class="info">
          <view class="name">
            {{item.robot_name}}
          </view>
          <view class="time">
            {{item.order_desc}}
          </view>
        </view>
      </view>
      <view :class="['right','right-'+item.order_status]" @click="toJoin">
        {{item.order_status===1?'已使用':'待使用'}}
      </view>
    </view>
    
    <!-- 嗨币充值 -->
    <uni-popup ref="joinPopup" type="center">
      <view class="common-popup">
        <view class="title">
          小海娱乐版机器人入驻社群
        </view>
        <view class="text">
          入驻后机器人订单视为已使用
        </view>
        <view class="btn-list">
          <view class="cancel" @click="joinPopup.close()">
            取消
          </view>
          <view class="sure" @click="sureJoin">
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
  
  const props = defineProps({
    order_list: Array
  })
  
  const joinPopup = ref(null)
  
  function sureJoin() {
    joinPopup.value.close()
  }
  
  function toJoin(){
    joinPopup.value.open()
  }
  
</script>

<style lang="scss" scoped>
  .wrapper {
    margin-top: 32rpx;
    font-family: 'MiSans';
    .box {
      margin-bottom: 24rpx;
      padding: 24rpx;
      width: 100%;
      height: 128rpx;
      background: #F0F3F8;
      border-radius: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 16rpx;
          width: 80rpx;
          height: 80rpx;
          background: #D4F1FF;
          border-radius: 16rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          image {
            width: 44rpx;
            height: 44rpx;
          }
        }
        .name {
          font-weight: 400;
          font-size: 32rpx;
          color: #000000;
          line-height: 40rpx;
        }
        .time {
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.4);
          line-height: 32rpx;
        }
      }
      .right {
        width: 132rpx;
        height: 56rpx;
        border-radius: 222rpx;
        text-align: center;
        line-height: 56rpx;
        font-weight: 400;
        font-size: 28rpx;
        &.right-1 {
          background: #FFFFFF;
          color: rgba(0,0,0,0.2);
        }
        &.right-2 {
          background: #22C0FF;
          color: #ffffff;
        }
      }
    }
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