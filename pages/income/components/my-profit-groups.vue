<template>
  <view class="profit-groups-wrapper">
    <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
      <view class="profit-groups" v-for="(item,index) in groups" :key="item.group_id">
        <view class="group">
          <image :src="item.group_cover" class="left" mode=""></image>
          <view class="info">
            <view class="name">
              <text class="tit">{{item.group_name}}</text><text>({{item.member_num}})</text>
              <image class="icon" :src="getImage(item.g_level)" mode="heightFix"></image>
            </view>
            <view class="people">
              <text class="id">{{item.energy.progress}}/{{item.energy.total}} 能量值</text>
              <view class="process">
                <view class="process-box" :style="{width: item.energy.progress/item.energy.total*100+'%'}"></view>
              </view>
            </view>
          </view>
        </view>
        <view class="group-detail">
          <view>
            <text class="text1">当月累计消费：</text>
            <text class="text2">{{item.month_amount}}（嗨币）</text>
          </view>
          <view class="right" @click="toPage(item)">
            <text class="text3">消费明细</text>
            <image src="@/static/image/btn_right.png" class="arrow"></image>
          </view>
        </view>
        <view class="group-detail group-detail-1">
          <view>
            <text class="text1">提成比例：</text>
            <text class="text2">{{item.p_ratio*100}}%</text>
          </view>
        </view>
      </view>
      <view class="no-data" v-if="!groups.length">
        <image src="@/static/image/no-data.png"></image>
        <view>暂无数据</view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
  import {reactive, ref} from 'vue'
  import {myProfitGroupsApi} from '@/service/income/index.js'
  
  const groups = ref([])
  const searchInfo = reactive({
    page_id: 1,
    total: 0
  })
  
  function onReachBottom(){
    if(groups.value.length<searchInfo.total) {
      getMyProfitGroups()
    }
  }
  
  function getMyProfitGroups(){
    uni.showLoading()
    myProfitGroupsApi({page_id:searchInfo.page_id},res=>{
      if (~~res.code === 0) {
        
        if(searchInfo.page_id === 1) {
          groups.value = res.data.items||[]
          searchInfo.total = res.data.total
        } else {
          groups.value = [...groups.value,...res.data.items]
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
  getMyProfitGroups()
  
  function getImage(level){
    return new URL(`/static/image/group-level/${level}.png`, import.meta.url).href
  }
  
  function toPage(item){
    uni.navigateTo({
      url: '/pages/income/profitDetail?show_title=0&group_id='+item.group_id
    })
  }
</script>

<style lang="scss" scoped>
  .profit-groups-wrapper {
    height: calc(100vh - 628rpx);
    .scrollBox {
      height: 100%;
    }
  }
  .profit-groups {
    padding: 24rpx;
    margin-bottom: 24rpx;
    background-color: #ffffff;
    // background-color: #F0F3F8;
    border-radius: 24rpx;
    .group {
      padding-bottom: 16rpx;
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid rgba(0,0,0,0.07);
      >* {
        flex-shrink: 0;
      }
    }
    .left {
      width: 96rpx;
      height: 96rpx;
      margin-right: 24rpx;
      border-radius: 16rpx;
    }
    .info {
      .name {
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
        display: flex;
        align-items: center;
        .tit {
          max-width: 228rpx;
          overflow: hidden; /* 隐藏溢出的内容 */
          white-space: nowrap; /* 禁止文本换行 */
          text-overflow: ellipsis; /* 显示省略号 */
        }
      }
      .icon {
        margin-left: 8rpx;
        width: auto;
        height: 32rpx;
      }
      .group {
        width: 28rpx;
        height: 28rpx;
        margin-right: 8rpx;
      }
      .people {
        margin-top: 8rpx;
        text {
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.3);
          line-height: 32rpx;
        }
        .process {
          margin-top: 8rpx;
          width: 320rpx;
          height: 6rpx;
          background: rgba(34, 192, 255, 0.2);
          border-radius: 298rpx;
          overflow-x: hidden;
          position: relative;
          .process-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 10%;
            height: 6rpx;
            background: #22C0FF;
            border-radius: 298rpx;
          }
        }
      }
    }
    .group-detail {
      margin-top: 10rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      &.group-detail-1 {
        margin-top: 2rpx;
      }
      .text1 {
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
      }
      .text2 {
        font-weight: 400;
        font-size: 24rpx;
        color: #22C0FF;
        line-height: 32rpx;
      }
      .text3 {
        font-weight: 400;
        font-size: 28rpx;
        color: #22C0FF;
        line-height: 44rpx;
      }
      .right {
        display: flex;
        align-items: center;
      }
      .arrow {
        margin-left: 8rpx;
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .no-data {
    margin-top: 0;
  }
</style>