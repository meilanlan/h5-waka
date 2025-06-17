<template>
  <view class="wrapper">
    <view class="tab-list">
      <view :class="['box', 'box-'+(index+1), curTab===index?'active':'gray', ]" v-for="(item,index) in props.vip.tab_list" :key="'tab-'+index" @click="switchTab(item,index)">
        <image :src="item.icon"></image>
        {{item.title}}
      </view>
    </view>
    <view class="detail">
      <view class="top">
        <text class="text1"></text>开通会员<text class="text2"></text>
      </view>
      <view class="text3">{{curVipInfo.desc}}</view>
      <scroll-view class="vip-scroll" scroll-x="true">
        <view class="vip-detail-list">
          <view :class="['vip-box',curVipIndex === index&&'active']" v-for="(item, index) in curVipInfo.list" :key="'vip-'+item.id" @click="switchVip(item,index)">
            <view class="month">{{item.title}}</view>
            <view class="price">¥{{item.price}}</view>
            <view class="text4">{{item.desc}}</view>
            <view class="text5">{{item.discount}}</view>
            <view class="text6">{{item.tag}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <view class="tableList">
      <uni-table ref="tableList" emptyText="暂无数据">
        <uni-tr>
          <uni-th :width="tableWidth" align="center">特权</uni-th>
          <uni-th :width="tableWidth2" align="center" v-if="curTab===0">非会员</uni-th>
          <uni-th :width="tableWidth2" align="center">
            <image class="vip" src="../../../static/image/icon_vip.png" mode="heightFix"></image>
          </uni-th>
          <uni-th :width="tableWidth2" align="center" v-if="curTab===1">
            <image class="vip" src="../../../static/image/icon_svip.png" mode="heightFix"></image>
          </uni-th>
        </uni-tr>
        <uni-tr v-for="(item,i) in props.vip.rights_desc" :key="i">
          <uni-td :width="i===0?tableWidth:tableWidth2" align="center">{{item.title}}</uni-td>
          <uni-td :width="i===0?tableWidth:tableWidth2" align="center" v-if="curTab===0">{{item.novip}}</uni-td>
          <uni-td :width="i===0?tableWidth:tableWidth2" align="center">{{item.vip}}</uni-td>
          <uni-td :width="i===0?tableWidth:tableWidth2" align="center" v-if="curTab===1">{{item.svip}}</uni-td>
        </uni-tr>
      </uni-table>
    </view>
    
    <view class="foot-wrapper">
      <view class="mask"></view>
      <view class="wrapper-box">
        <view class="foot-wrapper-btn" @click="openPayPopup">
          确定协议并支付{{curVipInfo.list[curVipIndex].price}}元
        </view>
        <view class="sure" @click="agaree=!agaree">
          <!-- <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd">
                <radio value="1" :checked="agaree === '1'" color="#22c0ff" />
            </label>
          </radio-group> -->
          <view :class="['check-box', agaree === false&&'active']" ></view>
            开通前确认 <text @click.stop="openAgreement(1)">《咓咔超级社群会员服务协议》</text>
        </view>
      </view>
      
      
      <!-- 立即支付 -->
      <uni-popup ref="payPopup" type="bottom">
        <view class="common-popup fixed-height">
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
      
      <!-- 咓咔超级社群会员服务协议 -->
      <uni-popup ref="agreementPopup" type="center">
        <view class="common-popup agreement-popup">
          <image @click="openAgreement(2)" class="close" src="/static/image/close.png"></image>
          <vip-agreement-x-vue></vip-agreement-x-vue>
        </view>
      </uni-popup>
      
    </view>
  </view>
    
</template>

<script setup>
  import {ref,reactive,inject} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import vipAgreementXVue from './vip-agreement-x.vue'
  import {alipayOrder} from '@/service/robotAccount/index.js'
  const props = defineProps({
    vip: Object
  })
  const parentInfo = reactive({data:{}})
  parentInfo.data = inject('parentGroupInfo')
  const payPopup = ref(null)
  const curPay = ref('1')
  const curTab = ref(0)
  const curVipIndex = ref(0)
  const agaree = ref(false)
  const vipList = ref([])
  const curVipInfo = ref()
  const tableWidth = ref(uni.upx2px(200))
  const tableWidth2 = ref(uni.upx2px(100))
  const agreementPopup = ref(null)
  const payLock = ref(false)
  
  curVipInfo.value = props.vip.tab_list[curTab.value].data
  function radioChange() {
    agaree.value = agaree.value === '1'?'':'1'
  }
  function switchVip(item, index){
    curVipIndex.value = index
    console.log(curVipInfo.value.list[index])
    
  }
  function switchTab(item,index){
    curVipIndex.value = 0
    curTab.value = index
    curVipInfo.value = item.data
  }
  function toPay(){
    if (payLock.value === false) {
      payLock.value = true
      uni.showLoading({mask: true})
      let returnUrl=encodeURIComponent(window.location.origin+`/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`)
      alipayOrder({prod_id: curVipInfo.value.list[curVipIndex.value].id,return_url:returnUrl}, res => {
        if (res.code === 0) {
          payPopup.value.close()
          // location.href = res.data.request_params+'&redirect_url=' + encodeURIComponent(window.location.origin+`/#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`)
          location.href = res.data.request_params
          payLock.value = false
          uni.hideLoading()
        } else {
          payLock.value = false
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        }
      })
    }
  }
  function openPayPopup(){
    payPopup.value.open()
  }
  function radioPayChange(){
    
  }
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding-bottom: 300rpx;
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
      image {
        margin-right: 16rpx;
        width: 32rpx;
        height: 32rpx;
      }
      
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
  .detail {
    margin-top: 32rpx;
    font-family: 'MiSans';
    .top {
      text-align: center;
      font-size: 32rpx;
      color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        display: block;
        width: 6rpx;
        height: 6rpx;
        border-radius: 50%;
        background: #22C0FF;
      }
      .text1 {
        margin-right: 10rpx;
        position: relative;
        &::before {
          content: '';
          width: 52rpx;
          height: 2rpx;
          background: linear-gradient( 90deg, rgba(34,192,255,0) 0%, #22C0FF 100%);
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
      .text2 {
        margin-left: 10rpx;
        position: relative;
        &::before {
          content: '';
          width: 52rpx;
          height: 2rpx;
          background: linear-gradient( 90deg, #22C0FF 0%, rgba(34,192,255,0) 100%);
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
    .text3 {
      margin-top: 4rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: #22C0FF;
      line-height: 36rpx;
      text-align: center;
    }
    .vip-scroll {
      width: 100%;
    }
    .vip-detail-list {
      width: 100%;
      margin-top: 24rpx;
      display: flex;
      position: relative;
      >*{
        flex-shrink: 0;
      }
      .vip-box {
        padding-top: 64rpx;
        margin-right: 20rpx;
        width: 216rpx;
        height: 280rpx;
        border-radius: 16rpx;
        background-color: #F0F3F8;
        text-align: center;
        color: #000000;
        border: 2px solid transparent;
        .month {
          font-weight: 500;
          font-size: 32rpx;
          line-height: 40rpx;
        }
        .price {
          font-weight: 700;
          font-size: 36rpx;
          line-height: 48rpx;
          margin-top: 10rpx;
        }
        .text4 {
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.3);
          line-height: 36rpx;
        }
        .text5 {
          margin-top: 18rpx;
          font-weight: 400;
          font-size: 28rpx;
          color: #22C0FF;
          line-height: 36rpx;
        }
        .text6 {
          position: absolute;
          top: 0;
          left: 0;
          width: 124rpx;
          height: 40rpx;
          background: #22C0FF;
          border-radius: 16rpx 0 16rpx 0;
          font-family: 'PingFang SC';
          font-weight: 500;
          font-size: 24rpx;
          color: #FFFFFF;
          line-height: 40rpx;
        }
        &.active {
          border-color: #22C0FF;
          background-color: rgba(34, 192, 255, .1);
        }
      }
    }
  }
  .foot-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    .mask {
      width: 100%;
      height: 64rpx;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    }
    .wrapper-box {
      padding: 52rpx 32rpx 74rpx;
      width: 100%;
      background-color: #ffffff;
      .foot-wrapper-btn {
        width: 100%;
        height: 96rpx;
        line-height: 96rpx;
        background: #22C0FF;
        border-radius: 16rpx;
        text-align: center;
        font-weight: 600;
        font-size: 32rpx;
        color: #FFFFFF;
      }
      .sure {
        margin-top: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 24rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
        text {
          color: #22C0FF;
        }
        .check-box {
          margin-right: 8rpx;
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.3);
          &.active {
            border: none;
            background: url('../../../static/image/choose.png') no-repeat;
            background-size: 32rpx 32rpx;
          }
        }
      }
    }
  }
  .common-popup {
    &.fixed-height {
      height: 400rpx;
    }
    &.agreement-popup {
      width: 96vw;
      border-radius: 30rpx;
      position: relative;
      .close {
        width: 48rpx;
        height: 48rpx;
        position: absolute;
        right: 28rpx;
        top: 58rpx;
        z-index: 10;
      }
    }
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
  
  .tableList {
    margin: 32rpx 0;
    border: 1px solid #dee2e5;
    border-radius: 16rpx;
    overflow: hidden;
    // border-top: none;
    // border-bottom: none;
    .vip {
      width: auto;
      height: 32rpx;
    }
    :deep .uni-table-th {
      font-size: 24rpx;
      line-height: 1.2;
      font-weight: 400;
      color: #606178;
      background-color: #f0f4f9;
      // border-right: none;
      border-right: 1px #dee2e5 solid;
      &:last-of-type {
        border-right: none;
      }
    }
    :deep .uni-table-tr {
      .uni-table-td {
        font-size: 24rpx;
        // color: #0E1B2E;
        border-right: 1px #dee2e5 solid;
        border-color: #dee2e5;
        &:last-of-type {
          border-right: none;
          color: #FFA332;
          background-color: rgba(255, 163, 50, 0.1);
        }
      }
      &:last-of-type {
        .uni-table-td {
          border-bottom: none;
        }
      }
    }
  }
</style>