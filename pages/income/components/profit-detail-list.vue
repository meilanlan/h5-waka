<template>
  <view class="list-box" :style="boxstyle" v-for="(item,index) in list" :key="'list-'+index">
    <view class="left">
      <view class="user">
        <image :src="item.user.head_img"></image>
        <text>{{item.user.nick_name}}</text>
      </view>
      <view class="text-exp">
        {{item.desc}}
      </view>
      <view class="date">
        {{getDateTime(item.created_at * 1000)}}
      </view>
    </view>
    <view class="right">
      <text>+</text><text> {{item.amount}}</text>
    </view>
  </view>
</template>

<script setup>
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  const props = defineProps({
    list:{
      type: Array,
      default:()=>[]
    },
    boxstyle: {
      type: Object,
      default:()=>{}
    }
  })
</script>

<style lang="scss" scoped>
  .list-box {
    margin-bottom: 24rpx;
    padding: 24rpx 32rpx 24rpx 24rpx;
    width: 100%;
    background: #FFFFFF;
    border-radius: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >*{
      flex-shrink: 0;
    }
    .right {
      font-family: 'MiSans-Medium', 'PingFang SC-Medium';
      font-weight: 500;
      font-size: 32rpx;
      color: #22C0FF;
      display: flex;
      align-items: center;
      text {
        display: block;
        &:last-of-type{
          margin-left: 2rpx;
        }
      }
    }
    .left {
      .user {
        display: flex;
        align-items: center;
        image {
          margin-right: 16rpx;
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
        }
        text {
          font-family: 'MiSans-Regular', 'PingFang SC-Medium';
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.8);
          line-height: 32rpx;
        }
      }
      .text-exp {
        margin-top: 16rpx;
        font-family: 'MiSans-Regular', 'PingFang SC-Medium';
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
      }
      .date {
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.3);
        line-height: 32rpx;
      }
    }
  }
</style>