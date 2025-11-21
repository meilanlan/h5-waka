<template>
    <view class="wrapper">
      <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="选择入驻社群" @backPage="backPage"></myCustomNavbar>
      <view class="box choose-box" v-for="(item,index) in listInfo" :key="'box-'+index">
        <view class="left">
          <image class="headimg" :src="item.group_cover"></image>
          <view class="info">
            <view class="name">
              <text class="tit">{{item.group_name}}</text><text>({{item.group_user_count}})</text>
              <!-- <image class="icon" src="/static/image/icon_vip.png" mode="heightFix"></image> -->
              <image v-for="(ic,icIdx) in item.ic_list" :key="'ic'+icIdx" :src="ic" mode="heightFix"></image>
            </view>
            <view class="people">
              <text class="id">{{item.g_level.progress}}/{{item.g_level.total}} 能量值</text>
              <view class="process">
                <view class="process-box" :style="{width: item.g_level.progress/item.g_level.total*100+'%'}"></view>
              </view>
            </view>
          </view>
        </view>
        <view :class="['btn','btn-'+item.g_status]" @click="toSettleIn(item,index)">{{item.g_status===0?'入驻':'使用中'}}</view>
      </view>
    </view>
</template>

<script setup>
  import {reactive, ref, nextTick} from 'vue'
  import {ownerSuperGroupsApi,robotBindGroupApi} from '@/service/robotAccount/index.js'
  import {onLoad} from '@dcloudio/uni-app'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  const robotId = ref()
  const listInfo = ref([])
  
  function toSettleIn(item,index){
    if(item.g_status==0) {
      //入驻
      uni.showLoading()
      robotBindGroupApi({robot_id: robotId.value,group_id: item.group_id},res=>{
        if (res.code === 0) {
          listInfo.value[index].g_status = 1 //已入驻
          uni.showToast({
            title: '入驻成功',
            icon: 'none'
          });
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
  }
  
  function backPage() {
    uni.navigateBack();
  }
  function getownerSuperGroups(){
    ownerSuperGroupsApi({}, res => {
      if (res.code === 0) {
        listInfo.value = res.data || []
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
    robotId.value = option.robot_id||0
    uni.showLoading()
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            getownerSuperGroups()
        });
    })
  })
</script>

<style scoped lang="scss">
  .wrapper {
    padding: 112rpx 20rpx 24rpx;
  }
  .box {
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    padding: 24rpx;
    background-color: #ffffff;
    border-radius: 24rpx;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
    }
    .headimg {
      width: 96rpx;
      height: 96rpx;
      margin-right: 24rpx;
      border-radius: 16rpx;
    }
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
    .btn {
      padding: 12rpx 16rpx;
      width: 104rpx;
      border-radius: 222rpx;
      font-weight: 500;
      font-size: 24rpx;
      text-align: center;
      background-color: #F0F3F8;
      color: rgba(0,0,0,0.2);
      &.btn-0 {
        background-color: #22C0FF;
        color: #ffffff;
      }
      &.btn-1 {
        background-color: #F0F3F8;
        color: rgba(0,0,0,0.2);
      }
    }
  }
</style>