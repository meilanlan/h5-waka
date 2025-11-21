<template>
  <view>
    <view class="time-list">
      <view :class="['box', curTimeIndex===index&&'active']" v-for="(item,index) in timeList" :key="index" @click="switchTime(index)">
        {{item}}
      </view>
    </view>
    <view class="trade-list">
      <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
        <view class="box" :style="boxstyle" v-for="(item, index) in list" :key="'index-'+index">
          <view class="left">
            <view class="name">{{item.desc}}</view>
            <view class="time">{{getDateTime(item.created_at*1000)}}</view>
          </view>
          <view class="right">¥{{item.amount}}</view>
        </view>
        <view class="no-data" v-if="!list.length">
          <image src="@/static/image/no-data.png"></image>
          <view>暂无数据</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
  import {ref,reactive} from 'vue'
  import {profitWithdrawalsApi} from '@/service/income/index.js'
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  
  const props = defineProps({
    rangeObject: {
      type:Object,
      default:()=>({
        0:{start_time: '', end_time:''},
        1:{start_time: '', end_time:''},
        2:{start_time: '', end_time:''},
        3:{start_time: '', end_time:''}
      })
    },
    boxstyle:{
      type: Object,
      default:()=>{}
    }
  })
  const loading = ref(false)
  const timeList = ref(['全部','最近1周','最近1个月','最近3个月'])
  const curTimeIndex = ref(2)
  const list = ref([])
  const searchInfo = reactive({
    page_id: 1,
    total: 0
  })
  
  function onReachBottom(){
    if(list.value.length<searchInfo.total) {
      getMyProfitGroups()
    }
  }
  
  function switchTime(index) {
    curTimeIndex.value = index
    searchInfo.page_id = 1
    getList()
  }
  function getList(){
    uni.showLoading()
    let params = {
      page_id: searchInfo.page_id,
      ...props.rangeObject[curTimeIndex.value]
    }
    profitWithdrawalsApi(params,res=>{
      if (~~res.code === 0) {
        if(searchInfo.page_id === 1) {
          list.value = res.data.items||[]
          searchInfo.total = res.data.total
        } else {
          list.value = [...list.value,...res.data.items]
        }
        searchInfo.page_id++
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  getList()
</script>

<style lang="scss" scoped>
  .time-list {
    margin-top: 12rpx;
    display: flex;
    .box {
      flex-shrink: 0;
      margin-right: 24rpx;
      padding: 10rpx 24rpx;
      border-radius: 222rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0,0,0,0.6);
      line-height: 36rpx;
      background-color: #FFFFFF;
      &:last-of-type {
        margin-right: 0;
      }
      &.active {
        background-color: #22C0FF;
        color: #ffffff;
      }
    }
  }
  .trade-list {
    margin-top: 24rpx;
    height: calc(100vh - 666rpx);
    .scrollBox {
      height: 100%;
    }
    .box {
      margin-bottom: 24rpx;
      padding: 24rpx 32rpx;
      width: 100%;
      height: 128rpx;
      // background: #F0F3F8;
      background-color: #ffffff;
      border-radius: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
        color: rgba(0,0,0,0.3);
        line-height: 32rpx;
      }
      .right {
        font-weight: 500;
        font-size: 32rpx;
        color: #22C0FF;
        line-height: 40rpx;
      }
    }
  }
  .no-data {
    margin-top: 0;
  }
</style>