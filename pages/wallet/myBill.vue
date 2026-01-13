<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="我的账单" @backPage="backPage"></myCustomNavbar>
    <view class="header-tab">
      <view :class="['box',curTab === item&&'active']" v-for="item in 3" :key="'tab-'+item" @click="switchTab(item)">
        {{item === 1 ? '获得嗨币' : item === 2 ? '使用记录':'兑换'}}
      </view>
    </view>
    
    <scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
      <view class="no-data" v-if="!billList.length">
        <image src="@/static/image/no-data.png" mode=""></image>
        <view>暂无数据</view>
      </view>
      <view class="list-box">
        <view class="box" v-for="(item,index) in billList" :key="'bill-'+index">
          <view class="left">
            <view class="tit textEllipsis">{{item.title}}</view>
            <view class="time">{{item.time}}</view>
          </view>
          <view class="right">
            {{item.desc}}
          </view>
        </view>
      </view>
    </scroll-view>
   
  </view>
  
</template>

<script setup>
  import {ref,nextTick} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import {billListApi} from '@/service/robotAccount/index.js'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  const curTab = ref(1)
  const last_id = ref(0)
  const group_id = ref()
  const billList = ref([])
  const isIos = ref(window.isiOS)
  
  function lower(e){
    last_id.value = billList.value[billList.value.length-1].id
    getBillList()
  }
  
  function switchTab(item) {
    curTab.value = item
    last_id.value = 0
    getBillList()
  }
  
  function backPage() {
    uni.navigateBack();
  }
  function getBillList(){
    uni.showLoading({mask: true})
  //   billList.value=billList.value.concat(arr)
    billListApi({type: curTab.value, last_id: last_id.value}, res => {
        if (res.code === 0) {
          if(last_id.value === 0) {
            billList.value=res.data||[]
          } else {
            billList.value = [...billList.value,...res.data]
          }
          uni.hideLoading()
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        }
      })
  }
  onLoad(option=>{
    curTab.value = option.accountId*1 || 1
    group_id.value = option.group_id
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            getBillList()
        });
    })
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    padding-top: 88rpx;
  }
  .header-tab {
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
    display: flex;
    align-items: end;
    .box {
      width: 50%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      color: rgba(0,0,0,.3);
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 10rpx;
        transform: translateX(-50%);
        display: block;
        width: 40rpx;
        height: 8rpx;
        border-radius: 4rpx;
      }
      &.active {
        color: #000000;
        font-weight: 500;
        &::after {
          content: '';
          background: #22C0FF;
        }
      }
    }
  }

  .list-box {
    padding: 32rpx;
    .box {
      margin-bottom: 32rpx;
      width: 100%;
      padding: 30rpx;
      background-color: #ffffff;
      border-radius: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .tit {
          width: 360rpx;
          font-size: 30rpx;
          color: #0E1B2E;
          font-weight: 500;
        }
        .time {
          margin-top: 16rpx;
          font-size: 24rpx;
          color: #8C98A6;
        }
      }
      .right {
        font-size: 30rpx;
        font-weight: 500;
        color: #22C0FF;
      }
    }
  }
  .scroll-Y {
    height: calc(100vh - 256rpx);
    // height: 500rpx;
  }
  .no-data {
    margin-top: 50rpx;
  }
</style>