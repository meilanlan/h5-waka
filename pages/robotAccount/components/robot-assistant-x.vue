<template>
  <view class="wrapper-box">
    <view class="box" v-for="(item,index) in props.robot_list" :key="index">
      <image class="bg" :src="item.cover_big"></image>
      <view class="robot-icon">
        <image :src="item.cover_small"></image>
      </view>
      <view class="info">
        <view class="title textEllipsis">{{item.title}}</view>
        <view class="date-box date-box-1">季度版(3个月)</view>
        <!-- <view class="date-box date-box-2">季度版(12个月)</view> -->
        <view class="text text2">{{item.prod_name}}</view>
        <view class="text">{{item.prod_develop}}</view>
        <view class="text1 text3Ellipsis">
          {{item.prod_des}}
        </view>
        <view class="btn-list">
          <view class="left">{{item.prod_price}}</view>
          <view :class="['btn','btn-'+item.prod_status]" @click="openMethods(item)">{{item.prod_status===0?'获取':'已安装'}}</view>
        </view>
      </view>
    </view>
    <!-- 获取支付方式 -->
    <!-- :is-mask-click="false" -->
    <!-- <uni-popup ref="payMethodsRef" type="bottom" >
      <view class="common-popup">
        <view class="wrapper-header">
          支付方式
          <image @click="payMethodsRef.close()" class="close" src="../../../static/image/close.png"></image>
        </view>
      </view>
    </uni-popup> -->
    <uni-popup ref="payMethodsRef" type="bottom">
      <view class="common-popup">
        <view class="methods">
          <radio-group @change="radioPayChange">
              <label class="uni-list-cell uni-list-cell-pd">
                  <view class="left">
                    <image src="../../../static/image/zfb.png"></image>支付宝
                  </view>
                  <radio value="1" :checked="curPay === '1'" color="#22c0ff" />
              </label>
              <label class="uni-list-cell uni-list-cell-pd visibility-none">
                  <view class="left">
                    <image src="../../../static/image/wx.png"></image>微信
                  </view>
                  <radio value="2" :checked="curPay === '2'" color="#22c0ff" />
              </label>
            </radio-group>
        </view>
        <view class="now-pay active" @click="toPay">
          立即支付
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref,reactive,inject} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import payMethodsX from '../../../components/pay-methods-x/pay-methods-x.vue';
  import {alipayOrder,robotProdDoApi} from '@/service/robotAccount/index.js'
  
  const curPay = ref('1')
  const payLock = ref(false)
  const curRobotInfo = reactive({data:{}})
  const parentInfo = reactive({data:{}})
  parentInfo.data = inject('parentGroupInfo')
  const props = defineProps({
    robot_list: Array
  })
  const payMethodsRef = ref(null)
  
  function openMethods(item){
    if (item.prod_status === 0) {
      curRobotInfo.data = item
      payMethodsRef.value.open()
    }
  }
  
  function toPay(){
    if (payLock.value === false) {
      payLock.value = true
      
      // action: 1、购买或者续费，2安装，3启用，4暂停
      let params = {
        group_id: parentInfo.data.group_id,
        prod_id: curRobotInfo.data.id,
        action: 1
      }
      uni.showLoading({mask: true})
      // let res = {
      //     "group_id": 15112564338,
      //     "prod_id": 1000002,
      //     "prod_status": 3,
      //     "sn": "",
      //     "request_params": ""
      // }
      // let res = {
      //     "group_id": 15112564338,
      //     "prod_id": 1000001,
      //     "prod_status": 0,
      //     "sn": "286644375554",
      //     "request_params": "app_id=2021004161602824&biz_content=%7B%22out_trade_no%22%3A%22286644375554%22%2C%22product_code%22%3A%22FAST_INSTANT_TRADE_PAY%22%2C%22subject%22%3A%22%E5%B0%8F%E5%97%A8%E6%9C%BA%E5%99%A8%E4%BA%BA%E7%BE%A4%E5%8A%A9%E6%89%8B%EF%BC%88%E5%A8%B1%E4%B9%90%E7%89%88%EF%BC%89%22%2C%22total_amount%22%3A%22288%22%7D&charset=utf-8&format=JSON&method=alipay.trade.app.pay&notify_url=http%3A%2F%2F110.40.170.35%3A9898%2Falipay%2Fcallback_v1&sign=FWEYr9gFnKQ61bcNgeggkNeLr4QZHMRnDfVl9%2Fa26Y%2BlmEVUEZbqCNQWgrHkQloAv18rlRbGv2b3orx1pagd8e3GaJt%2Ba52%2B%2BkA%2FgalogKkGQfejKTizD7bHmVUgy7kEUZfOGnPpfDlNOQzz8%2FVyO90ZCe7TK9KOICQc9jfnWriIk5sL9Dnij4yBUsGLmgu1d3fYTudPMetrXKO0gn8zliO0ilu46DgFBdtHKoXT2OzWrRl5IZ7CxFlJXONc7fueik2NWFj507%2BTXo4p41KKoh8KLt0zdaO7f0OamKRampYE7pMxzJqVAcCy%2FmCZ5mpQQhd2K%2B2OAV%2FVBIAnjNoX3g%3D%3D&sign_type=RSA2&timestamp=2025-07-29+15%3A40%3A12&version=1.0"
      // }
      // location.href = res.request_params
      robotProdDoApi(params,res=>{
        if (res.data) {
          if(res.data.request_params) {
            //付费
            location.href = res.data.request_params
          } else {
            // 免费
            curRobotInfo.data.prod_status = res.data.prod_status
          }
          payMethodsRef.value.close()
          uni.hideLoading()
          payLock.value = false
        }else {
          payLock.value = false
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
          payMethodsRef.value.close()
        }
      })
      
      // return false
      // uni.showLoading({mask: true})
      // let returnUrl=encodeURIComponent(window.location.origin+`/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=4&show_title=0`)
      // alipayOrder({prod_id: curRobotInfo.data.id,return_url:returnUrl}, res => {
      //   if (res.code === 0) {
      //     location.href = res.data.request_params
      //     payLock.value = false
      //     uni.hideLoading()
      //   } else {
      //     payLock.value = false
      //     uni.showToast({
      //       title: res.msg,
      //       icon: 'none'
      //     });
      //     uni.hideLoading()
      //   }
      // })
    }  
  }
  function radioPayChange(){
    
  }
</script>

<style lang="scss" scoped>
  
  .wrapper-box {
    margin-top: 24rpx;
    display: flex;
    flex-wrap: wrap;
    font-family: 'MiSans';
    .box {
      margin-bottom: 24rpx;
      margin-right: 14rpx;
      width: 336rpx;
      padding-bottom: 20rpx;
      // height: 548rpx;
      background: #F0F3F8;
      border-radius: 24rpx;
      position: relative;
      &:nth-of-type(2n) {
        margin-right: 0;
      }
      .bg {
        width: 100%;
        height: 216rpx;
        border-radius: 24rpx 24rpx 0 0;
      }
      .robot-icon {
        position: absolute;
        left: 16rpx;
        top: 164rpx;
        width: 72rpx;
        height: 72rpx;
        border: 4rpx solid #F0F3F8;
        border-radius: 16rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 12rpx;
        }
      }
      .info {
        padding: 40rpx 16rpx 0;
        font-size: 24rpx;
        .title {
          color: #000000;
          font-weight: 500;
          line-height: 24rpx;
        }
        .date-box {
          margin: 8rpx 0;
          display: inline-block;
          padding: 0 12rpx;
          height: 32rpx;
          line-height: 32rpx;
          border-radius: 16rpx;
          font-family: MiSans, MiSans;
          font-weight: 500;
          font-size: 20rpx;
          line-height: 32rpx;
          &.date-box-1 {
            background: #D4F1FF;
            color: #4599FF;
          }
          &.date-box-2 {
            background: #FFF1CF;
            color: #FF6F31;
          }
        }
        .text {
          font-weight: 400;
          color: rgba(0,0,0,0.4);
          line-height: 32rpx;
        }
        .text2 {
          margin-top: 8rpx;
        }
        .text1 {
          margin-top: 16rpx;
          font-weight: 400;
          color: rgba(0,0,0,0.6);
          line-height: 32rpx;
        }
        .btn-list {
          margin-top: 16rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            font-weight: 500;
            color: #000000;
            line-height: 24rpx;
          }
          .btn {
            width: 112rpx;
            height: 48rpx;
            border-radius: 46rpx;
            text-align: center;
            line-height: 48rpx;
            font-weight: 400;
            font-size: 24rpx;
            &.btn-1 {
              background: #FFFFFF;
              color: rgba(0,0,0,0.2);
            }
            &.btn-0 {
              background: #22C0FF;
              color: #ffffff;
            }
          }
        }
      }
    }
    
  }
  .wrapper-header {
    position: relative;
    width: 100%;
    height: 96rpx;
    background: #FFFFFF;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    text-align: center;
    line-height: 96rpx;
    .close {
      width: 48rpx;
      height: 48rpx;
      position: absolute;
      top: 24rpx;
      right: 24rpx;
    }
  }
  .common-popup {
    height: 400rpx;
  }
  .methods {
    margin-top: 20rpx;
    .uni-list-cell {
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      image {
        margin-right: 16rpx;
        width: 56rpx;
        height: 56rpx;
      }
      .left {
        display: flex;
        align-items: center;
      }
    }
  }
  .now-pay {
    width: 686rpx;
    height: 96rpx;
    border-radius: 16rpx;
    text-align: center;
    line-height: 96rpx;
    font-family: 'MiSans';
    font-weight: 600;
    font-size: 32rpx;
    color: #FFFFFF;
    background: rgba(34, 192, 255, .1);
    &.active {
      background: #22C0FF;
    }
  }
</style>