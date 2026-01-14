<template>
  <view>
    <myCustomNavbar  :navStyle="{background:'#ffffff',color:'#000000'}" title="福气袋" @backPage="backPage" />
    <view class="list-box">
      <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
        <view class="box" v-for="(item,index) in list" :key="index">
          <view class="left">
            <view class="left-box">
              <image :src="item.award_icon" mode="aspectFill"></image>
              <view>
                <view class="val1">{{item.award_name}}</view>
                <view class="val2">有效期至{{getDateTime(item.expire_time*1000)}}</view>
              </view>
            </view>
          </view>
          <view :class="['right',item.award_use_status===0&&'active']" @click="useAward(item,index)">
            {{item.award_use_status===0?'使用':item.award_use_status===1?'已使用':'已过期'}}
          </view>
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
  import {ref,reactive, onMounted} from 'vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import {rewardBagListApi,useRewardApi} from '@/service/wallet/index.js'
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  
  const list = ref([])
  const pageInfo = reactive({
    page_id:1,
    page_size:20,
    total: 0
  })
  
  function useAward(item,index){
    if(item.award_use_status===0){
      useRewardApi({award_id: item.award_id},res=>{
        if (~~res.code === 0) {
          list.value[index].award_use_status = 1
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
      })
    }
  }
  
  getList()
  
  function getList(){
    uni.showLoading()
    let params = {
      act_id: 3, //固定参数
      page_id: pageInfo.page_id,
      page_size: pageInfo.page_size
    }
    rewardBagListApi(params,res=>{
      if (~~res.code === 0) {
        if(pageInfo.page_id === 1) {
          list.value = res.data.list||[]
          pageInfo.total = res.data.total
        } else {
          list.value = [...list.value,...res.data.list]
        }
        pageInfo.page_id++
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  
  function onReachBottom(){
    if(list.value.length<pageInfo.total) {
      getList()
    }
  }
  
  function backPage() {
    window.client.closeWebview()
  }
  
</script>

<style lang="scss" scoped>
  .list-box {
    padding: 88rpx 20rpx 0;
    padding-top: 88rpx;
    height: calc(100vh - 88rpx);
    .scrollBox {
      height: 100%;
    }
    .box {
      padding: 24rpx;
      margin-top: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      border-radius: 24rpx;
      .left {
        flex-shrink: 0;
        .left-box {
          display: flex;
          image {
            margin-right: 16rpx;
            width: 80rpx;
            height: 80rpx;
          }
        }
        .val1 {
          font-weight: 400;
          font-size: 32rpx;
          color: #000000;
          line-height: 40rpx;
        }
        .val2 {
          margin-top: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.4);
          line-height: 32rpx;
        }
      }
      .right {
        flex-shrink: 0;
        width: 138rpx;
        height: 56rpx;
        background-color: #F0F3F8;
        border-radius: 222px;
        text-align: center;
        line-height: 56rpx;
        font-weight: 500;
        font-size: 28rpx;
        color: rgba(0,0,0,0.2);
        &.active {
          background-color: #22C0FF;
          color: #ffffff;
        }
      }
    }
  }
</style>