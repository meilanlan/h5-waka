<template>
  <view class="wrapper">
    <view class="box" v-for="(item, index) in props.order_list" :key="index">
      <view class="left">
        <image class="icon" :src="item.robot_cover"></image>
        <view class="info">
          <view class="name">
            {{item.robot_name}}
          </view>
          <view class="time">
            {{item.order_desc}}
          </view>
        </view>
      </view>
      <view :class="['right','right-'+item.order_status]" @click="drawThings(item)">
        {{item.order_status===1?'待支付':item.order_status===2?'待使用':item.order_status===3?'支付超时':'取消支付'}}
      </view>
    </view>
    <view class="box" v-for="(item, index) in props.user_robot_list" :key="index">
      <view class="left">
        <image class="icon" :src="item.prod_icon"></image>
        <view class="info">
          <view class="name">
            {{item.prod_name}}
          </view>
          <view class="time">
            <text class="time-text" v-if="item.start_time&&item.end_time">
              {{item.robot_status===0?getDateTime(item.start_time*1000):getDateTime(item.end_time*1000)}}
            </text>
            {{item.prod_price==='免费'?item.prod_price:'¥'+item.prod_price}}
          </view>
        </view>
      </view>
      <view :class="['right',item.robot_status<=1?('robot-right-'+item.robot_status):'robot-right']" @click="toJoin(item)">
        {{item.robot_status===0?'待使用':item.robot_status===1?'已使用':'已过期'}}
      </view>
    </view>
    <view class="common-empty" v-if="!props.order_list.length && !props.user_robot_list.length">
      <image src="@/static/image/empty.png" mode=""></image>
      暂无订单
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
  import {ref,inject,reactive} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  
  const props = defineProps({
    order_list: Array,
    user_robot_list: Array
  })
  const parentInfo = reactive({data:{}})
  parentInfo.data = inject('parentGroupInfo')
  const joinPopup = ref(null)
  
  function sureJoin(item) {
    if(item.order_status!=1) {
      joinPopup.value.close()
    }
  }
  
  function drawThings(item){
    if(item.order_status === 1) {
      //待支付
      
    } else if(item.order_status === 2) {
      //已支付待使用--入驻列表
      uni.navigateTo({
        url: '/pages/robotShop/joinGroup?robot_id='+item.id+'&show_title=0'
      })
    }
  }
  
  function toJoin(item){
    if(item.robot_status != 1) {
      //入驻列表
      uni.navigateTo({
        url: '/pages/robotShop/joinGroup?robot_id='+item.id+'&show_title=0'
      })
    }
    // joinPopup.value.open()
  }
  
</script>

<style lang="scss" scoped>
  .wrapper {
    margin-top: 32rpx;
    // font-family: 'MiSans';
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
        }
        .name {
          font-weight: 400;
          font-size: 32rpx;
          color: #000000;
          line-height: 40rpx;
        }
        .time {
          margin-top: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.4);
          line-height: 32rpx;
          .time-text {
            margin-right: 16rpx;
          }
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
        background: #FFFFFF;
        color: rgba(0, 0, 0, 0.2);
        &.robot-right {
          background: #FFA332;
          color: #FFFFFF;
        }
        &.robot-right-0 {
          background: #22C0FF;
          color: #FFFFFF;
        }
        &.robot-right-1 {
          background: #FFFFFF;
          color: rgba(0, 0, 0, 0.2);
        }
        &.right-1 {
          background: #FFA332;
          color: #ffffff;
          
        }
        &.right-2 {
          background: #22C0FF;
          color: #FFFFFF;
          // background: #FFFFFF;
          // color: rgba(0, 0, 0, 0.2);
        }
        // &.right-3 {
        //   background: #FFA332;
        //   color: #ffffff;
        // }
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