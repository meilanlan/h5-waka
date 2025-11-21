<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="续费管理" @backPage="backPage"></myCustomNavbar>
      <view class="box" v-for="(item,index) in list" :key="index">
        <view class="tit-box">
          <view class="left">
            <image src="/static/image/vip.png" mode=""></image>
            <text>咓咔超级会员</text>
          </view>
          <view class="date">1个月</view>
        </view>
        <view class="list">
          <text class="left">会员到期时间：</text>
          <text class="right">2024-03-08 16:24</text>
        </view>
        <view class="list">
          <text class="left">会员开通时间：</text>
          <text class="right">{{item.pay_time}}</text>
        </view>
        <view class="list">
          <text class="left">开通方式：</text>
          <text class="right">{{item.channel === 1?'苹果应用内购买':item.channel === 2?'支付宝应用内购买':'微信应用内购买'}}</text>
        </view>
        <view class="list">
          <text class="left">开通来源：</text>
          <text class="right">自动续费</text>
        </view>
        <view class="btn" @click="openDialog">
          续费管理
        </view>
      </view>
      
      <view class="common-empty" v-if="!list.length">
        <image src="@/static/image/empty.png" mode=""></image>
        暂无数据~
      </view>
    <uni-popup ref="expPopup" type="center">
      <view class="common-popup">
        <view class="tit">
          如何关闭AppleID的自动续费
        </view>
        <view class="exp">
          弹框的提示内容，弹框的提示内容，这里是弹框的提示内容，我弹框的提示内容，弹框的提示内容
        </view>
        <view class="sure" @click="expPopup.close()">
          确定
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script setup>
  import {ref, nextTick, reactive} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import {rechargeOrderApi} from '@/service/wallet/index.js'
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  const expPopup = ref()
  const searchData = reactive({
    page_id: 1,
  })
  const total = ref(0)
  const list = ref([])
  
  function backPage() {
    uni.navigateBack();
  }
  
  function openDialog(){
    expPopup.value.open()
  }
  function onRefresherRefresh(){
    searchData.page_id = 1
    list.value = []
    getRechargeOrder()
  }
  
  function onReachBottom(){
    if(list.value.length<total.value) {
      getRechargeOrder()
    }
  }
  function getRechargeOrder(){
    uni.showLoading()
    let param = {
      type: 'subscribe',
      ...searchData
    }
    rechargeOrderApi(param,res=>{
      if (res.code === 0) {
        if(searchData.page_id === 1) {
          list.value = res.data.items || []
          total.value = res.data.total
        } else {
          list.value = [...list.value,...res.data.items]
        }
        searchData.page_id++
        uni.hideLoading()
      } else{
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  onLoad(option=>{
    nextTick(()=>{
      window.client.getUserinfo((res) => {
          getRechargeOrder()
      });
    })
  })
  
  
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 112rpx 20rpx 24rpx;
    .box {
      margin-bottom: 24rpx;
      width: 100%;
      // height: 498rpx;
      padding: 0 32rpx 32rpx;
      background: #FFFFFF;
      border-radius: 24rpx;
      .tit-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 32rpx 0;
        margin-bottom: 32rpx;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        font-size: 32rpx;
        .left {
          display: flex;
          align-items: center;
          image {
            margin-right: 16rpx;
            width: 40rpx;
            height: 40rpx;
          }
          text {
            font-weight: 400;
            color: #000000;
            line-height: 40rpx;
          }
        }
        .date {
          font-weight: 500;
          color: #22C0FF;
          line-height: 40rpx;
        }
      }
      .list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24rpx;
        .left {
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(0,0,0,0.6);
          line-height: 36rpx;
        }
        .right {
          font-weight: 400;
          font-size: 28rpx;
          color: #000000;
          line-height: 36rpx;
        }
      }
      .btn {
        margin-top: 32rpx;
        width: 100%;
        height: 80rpx;
        background: #F0F3F8;
        border-radius: 16rpx;
        text-align: center;
        line-height: 80rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0,0,0,0.6);
      }
    }
  }
  .common-popup {
    width: 640rpx;
    height: 304rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 48rpx 0;
    .tit {
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
      line-height: 48rpx;
      text-align: center;
    }
    .exp {
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #898989;
      line-height: 36rpx;
      padding: 0 32rpx;
    }
    .sure {
      margin-top: 32rpx;
      width: 100%;
      height: 88rpx;
      box-shadow: 0px -1px 0px 0px rgba(0,0,0,0.1);
      line-height: 88rpx;
      text-align: center;
      font-weight: 400;
      font-size: 32rpx;
      color: #22C0FF;
    }
  }
  .common-header {
    background-color: #ffffff;
  }
</style>