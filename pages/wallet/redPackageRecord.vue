<template>
  <view class="wrapper">
    <myCustomNavbar
      :navBg="navbarBgImg" 
      backIcon="../../static/image/btn_back_white.png" 
      :navBgStyle="{height: '252rpx'}" 
      @backPage="backPage"
    >
      <template v-slot:leftTitle>
        <view class="tab-box">
          <view :class="['box',curTab===item&&'active']" v-for="item in 2" :key="'box-'+item" @click="switchTab(item)">{{item===1?'收到的红包':'发出的红包'}}</view>
          <view class="line" :style="{left: curTab===1?'50rpx':'240rpx'}"></view>
        </view>
      </template>
        <view class="timer-box">
          <year-picker
            :default-year="year"
            :min-year="2000"
            :max-year="year"
            @confirm="handleYearConfirm" />
        </view>
    </myCustomNavbar>
    <view class="total-data">
      <image src="/static/logo.png" class="headimg"></image>
      <view class="nickname">晚风惬意共{{curTab===1?'收到':'发出'}}</view>
      <view class="price">200.00</view>
      <view class="exp" v-if="curTab===2">发出红包：5个</view>
      <template v-else>
        <view class="exp-2">已存入支付宝余额</view>
        <view class="exp-box">
          <view class="box">收到红包：2</view>
          <view class="line"></view>
          <view class="box">手气最佳：1</view>
        </view>
      </template>
      <!-- <view class="withdraw">去提现</view> -->
      <view class="exp exp-1">收到红包记录</view>
    </view>
    <view class="list-box" v-if="listStyle.listHeight" :style="{height: `calc(100vh - ${listStyle.listHeight}rpx)`}">
      <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
        <view class="box" v-for="item in 20" :key="'list-'+item">
          <view class="left">
            <view class="user">
              <image src="/static/logo.png" class="headimg"></image>
              <view class="user-box">
                <view class="val1">晚风惬意</view>
                <view class="val2">10-22 | 庆祝今天公会战胜利</view>
              </view>
            </view>
          </view>
          <view class="right">
            <view class="val1 val1-1">12.00元</view>
            <view class="zan" v-if="curTab===1">
              <image src="/static/image/zan.png"></image>
              手气最佳
            </view>
            <view class="val2 val2-2" v-else>已领取 10/12</view>
            
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
  
</template>

<script setup>
  import {ref,reactive, onMounted} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import navbarBgImg from '@/static/image/redbag-tit.png'
  import yearPicker from '@/components/year-picker.vue'
  
  const curTab = ref(1)
  const year = ref(new Date().getFullYear())
  const listStyle = reactive({
    listHeight: ""
  })
  
  function getElementHeight(selector){
    const el = document.querySelector(selector);
      if (!el) {
        console.error(`未找到选择器为 ${selector} 的元素`);
        return 0; // 兜底默认值
      }
      // 获取计算样式的高度（带单位），转成纯数字（关键：去掉px单位）
      const heightStr = getComputedStyle(el).height;
      // 处理特殊情况：height为auto/0的场景
      const heightNum = parseFloat(heightStr)*2 + 252;
      console.log(`元素 ${selector} 高度：`, heightNum, 'px');
      return heightNum;
  }
  
  // 计算列表高度的主函数
  function calcListHeight(){
    listStyle.listHeight = getElementHeight('.total-data');
  };
  onMounted(()=>{
    setTimeout(() => {
      calcListHeight()
    }, 100);
  })
  onLoad(option=>{
    curTab.value = (option.id||1)*1
  })
  function onReachBottom(){
    // if(groups.value.length<searchInfo.total) {
    //   // getMyProfitGroups()
    // }
  }
  
  const handleYearConfirm = (year) => {
    calcListHeight()
    year.value = year
  }
  
  function switchTab(item){
    curTab.value = item
  }
  
  function backPage() {
    uni.navigateBack()
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    // height: 100vh;
    height: calc(100vh - 76rpx);
    padding: 164rpx 32rpx 32rpx;
    background-color: #ffffff;
  }
  .tab-box {
    position: absolute;
    left: 104rpx;
    top: 0;
    width: 352rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box {
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(255,255,255,0.6);
      &.active {
        color: #ffffff;
        font-weight: 600;
      }
    }
    .line {
      position: absolute;
      bottom: 12rpx;
      width: 60rpx;
      height: 8rpx;
      background: #FFFFFF;
      border-radius: 4rpx;
      transition: left .2s;
    }
  }
  .timer-box {
    position: absolute;
    right: 24rpx;
    top: 20rpx;
    font-size: 24rpx;
    width: 144rpx;
    height: 48rpx;
    border: 2rpx solid #ffffff;
    border-radius: 8rpx;
    padding: 0 16rpx;
    color: #FFFFFF;
  }
  .total-data {
    padding-top: 48rpx;
    // height: 464rpx;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    .headimg {
      display: block;
      margin: 0 auto;
      width: 72rpx;
      height: 72rpx;
      border-radius: 16rpx;
    }
    .nickname {
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #000000;
      line-height: 32rpx;
      text-align: center;
    }
    .price {
      margin-top: 32rpx;
      font-weight: 700;
      font-size: 96rpx;
      color: #FFA332;
      line-height: 96rpx;
      text-align: center;
    }
    .exp {
      margin-top: 32rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: rgba(0,0,0,0.4);
      line-height: 32rpx;
      text-align: center;
      &.exp-1 {
        margin-top: 48rpx;
        margin-bottom: 24rpx;
        text-align: left;
      }
    }
    .exp-2 {
      margin-top: 32rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #FFA332;
      line-height: 28rpx;
      text-align: center;
    }
    .exp-box {
      margin-top: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .box {
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
      }
      .line {
        margin: 0 32rpx;
        width: 2rpx;
        height: 28rpx;
        background: rgba(0,0,0,0.08);
      }
    }
    .withdraw {
      margin: 32rpx auto 0;
      width: 356rpx;
      height: 68rpx;
      border-radius: 16rpx;
      border: 2rpx solid #FFA332;
      line-height: 68rpx;
      text-align: center;
      font-weight: 400;
      font-size: 28rpx;
      color: #FFA332;
    }
  }
  .list-box {
    background-color: #ffffff;
    // height: calc(100vh - 716rpx);
    .scrollBox {
      height: 100%;
    }
    .box {
      margin-top: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex-shrink: 0;
        .user{
          display: flex;
        }
        .headimg {
          width: 72rpx;
          height: 72rpx;
          border-radius: 16rpx;
          margin-right: 16rpx;
        }
      }
      .val1 {
        font-weight: 400;
        font-size: 24rpx;
        color: #000000;
        line-height: 32rpx;
        &.val1-1 {
          text-align: right;
        }
      }
      .val2 {
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.3);
        line-height: 32rpx;
        &.val2-2 {
          text-align: right;
        }
      }
      .zan {
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #FF4A4A;
        line-height: 32rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        image {
          margin-right: 8rpx;
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
</style>