<template>
  <view class="robot-wrapper">
    <view class="tab-list">
      <view :class="['box', 'box-'+item, curTab===item?'active':'gray', ]" v-for="item in 2" :key="'tab-'+item" @click="switchTab(item)">
        {{item===1?'机器人助手':'我的订单'}}
      </view>
    </view>
    <!-- 机器人助手 -->
    <robot-assistant-x v-if="curTab === 1"></robot-assistant-x>
    <!-- 我的订单 -->
    <my-order v-else></my-order>
    
  </view>
  
</template>

<script setup>
  import {ref} from 'vue'
  import robotAssistantX from './robot-assistant-x.vue';
  import myOrder from './my-order.vue';
  
  
  const curTab = ref(1)
  
  function switchTab(item){
    curTab.value = item
  }
</script>

<style lang="scss" scoped>
  .robot-wrapper {
    padding: 0 32rpx;
  }
  .tab-list {
    margin-top: 32rpx;
    background: #F0F3F8;
    border-radius: 16rpx;
    font-family: 'MiSans';
    display: flex;
    .box {
      width: 342rpx;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 28rpx;
      color: rgba(0,0,0,0.3);
      background: #F0F3F8;
      // border-radius: 16rpx;
      &.box-1 {
        &.gray {
          margin-right: -14rpx;
          border-radius: 16rpx 0 16rpx 16rpx;
          z-index: 10;
        }
        &.active {
          width: 360rpx;
          background-color: #22C0FF;
          border-radius: 16rpx 30rpx 0 16rpx;
          color: #ffffff;
        }
      }
      &.box-2 {
        &.gray {
          margin-left: -14rpx;
          border-radius: 0 16rpx 16rpx 16rpx;
        }
        &.active {
          width: 360rpx;
          background-color: #22C0FF;
          border-radius: 30rpx 16rpx 16rpx 0;
          color: #ffffff;
        }
      }
      
    }
  }
</style>