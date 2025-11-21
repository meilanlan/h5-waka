<template>
  <view class="wrapper-box">
    <view class="box" v-for="(item,index) in props.robot_list" :key="index">
      <image class="bg" :src="item.cover_big"></image>
      <view class="robot-icon">
        <image :src="item.cover_small"></image>
      </view>
      <view class="info">
        <view class="title textEllipsis">{{item.title}}</view>
        <view class="placeholder-box">
          <view v-if="item.duration>0" :class="['date-box','date-box-'+(item.duration===31536000?2:1)]">
            {{timeObj[item.duration]}}
          </view>
        </view>
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
  import {createOrderApi} from '@/service/robotAccount/index.js'
  
  const timeObj = {
    86400: '1天体验版',
    604800: '1周体验版',
    2592000: '月度版(1个月)',
    7776000: '季度版(3个月)',
    31536000: '年度版(12个月)'
  }
  const curPay = ref('1')
  const payLock = ref(false)
  const curRobotInfo = reactive({data:{}})
  const parentInfo = reactive({data:{}})
  parentInfo.data = inject('parentGroupInfo')
  const props = defineProps({
    robot_list: Array
  })
  const emit = defineEmits(['updateInfo'])
  const payMethodsRef = ref(null)
  
  function openMethods(item){
    // if (item.prod_status === 0) {
    curRobotInfo.data = item
    toPay()
      // payMethodsRef.value.open()
    // }
  }
  
  function toPay(){
    if (payLock.value === false) {
      payLock.value = true
      /*
        action: 1、购买或者续费，2安装，3启用，4暂停
        prod_type： 4(商品类型)
        0:机器人 1:vip 2:svip 3:hi币
      */
     
     if(window.isiOS || curRobotInfo.data.prod_price === '免费'){
       //ios端
       let params = {
         group_id: parentInfo.data.group_id,
         prod_id: curRobotInfo.data.id,
         pay_channel: window.isiOS?'ios':'',
         prod_type: 0,
         action: 1
       }
       createOrderApi(params,res=>{
         if (res.data) {
           if(curRobotInfo.data.prod_price === '免费') {
             // 免费
             curRobotInfo.data.prod_status = res.data.prod_status
           } else {
             //付费
               window.client.BuyRobotJSAction({
                 prodId: curRobotInfo.data.t_id,
                 orderId: res.data.sn,
               },(respon)=>{
                 console.log(respon, 'oooios')
                 if(!respon) {
                   emit('updateInfo')
                   uni.showToast({
                     title: '购买失败，请重新再试',
                     icon: 'none'
                   });
                 } else {
                   emit('updateInfo')
                   uni.showToast({
                     title: '购买成功',
                     icon: 'none'
                   });
                 }
               })
           }
           payLock.value = false
         }else {
           payLock.value = false
           uni.showToast({
             title: res.msg,
             icon: 'none'
           });
           // payMethodsRef.value.close()
         }
       })
     } else {
       /*
          prod_type: 商品类型 (APP:1 ; H5:2;) | (普通商品: 0; Robot:4)  => (如 H5 购买 Robot => 6(2+4))
       */
       window.client.BuyRobotJSAction({
         prod_id: curRobotInfo.data.id,
         prod_type: 0,
         customize: ''
       })
       payLock.value = false
     }
    }  
  }
  
  window.pay_result_after = (res)=>{
    // 唤起支付后，获取客户端返回的结果信息
    let respon = JSON.parse(res)
    console.log(res,'---android---',respon)
    if (respon.isSuccess) emit('updateInfo')
    uni.showToast({
      title: respon.isSuccess?'购买成功':'购买失败，请重新再试',
      icon: 'none'
    });
  }
  function radioPayChange(){
    
  }
</script>

<style lang="scss" scoped>
  
  .wrapper-box {
    margin-top: 24rpx;
    display: flex;
    flex-wrap: wrap;
    // font-family: 'MiSans';
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
        .placeholder-box {
          height: 32rpx;
        }
        .date-box {
          margin: 8rpx 0;
          display: inline-block;
          padding: 0 12rpx;
          height: 100%;
          line-height: 32rpx;
          border-radius: 16rpx;
          // font-family: 'MiSans';
          font-weight: 500;
          font-size: 20rpx;
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
            background: #F0F3F8;
            color: rgba(0,0,0,0.2);
            &.btn-1 {
              background: #F0F3F8;
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
    // font-family: 'MiSans';
    font-weight: 600;
    font-size: 32rpx;
    color: #FFFFFF;
    background: rgba(34, 192, 255, .1);
    &.active {
      background: #22C0FF;
    }
  }
</style>