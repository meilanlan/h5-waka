<template>
    <view class="wrapper">
      <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="选择入驻社群" @backPage="backPage"></myCustomNavbar>
      <view class="scroll-box">
        <scroll-view scroll-y="true" class="scroll" @scrolltolower="onReachBottom">
          <view class="list-wrapper" v-for="(item,index) in listInfo" :key="'box-'+index">
            <view class="box choose-box">
              <view class="left">
                <image class="headimg" :src="item.group_cover"></image>
                <view class="info">
                  <view class="name">
                    <text class="tit">{{item.group_name}}</text><text>({{item.group_user_count}})</text>
                    <!-- <image class="icon" src="/static/image/icon_vip.png" mode="heightFix"></image> -->
                    <image v-for="(ic,icIdx) in item.ic_list" :key="'ic'+icIdx" :src="getImage(ic)" mode="heightFix"></image>
                  </view>
                  <view class="people">
                    <text class="id">{{item.energy.current}}/{{item.energy.total}} 能量值</text>
                    <view class="process">
                      <view class="process-box" :style="{width: item.energy.progress+'%'}"></view>
                      <!-- <view class="process-box" :style="{width: item.energy.progress/item.energy.total*100+'%'}"></view> -->
                    </view>
                  </view>
                </view>
              </view>
              <!-- <view :class="['btn','btn-'+item.g_status]" @click="toSettleIn(item,index)">{{item.g_status===0?'入驻':'使用中'}}</view> -->
              <view class="btn btn-0" @click="toSettleIn(item,index)">入驻</view>
            </view>
            <view class="robot-list" v-if="item.robot_list">
              <view class="robot-list-box" v-for="rob in item.robot_list" :key="rob.robot_id">
                <image :src="rob.robot_cover" mode="aspectFill"></image>
                <view class="info">
                  <view class="tit">{{rob.robot_name}}({{rob.robot_enable?'启用':'暂停使用'}})</view>
                  <view class="date">到期时间：{{rob.expiration_time}}</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
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
  
  const searchInfo = reactive({
    page_id: 1,
    page_size: 20,
    total: 0
  })
  
  function onReachBottom(){
    if(listInfo.value.length<searchInfo.total) {
      getownerSuperGroups()
    }
  }
  
  function getImage(level){
    return new URL(`/static/image/group-level/${level.split('_')[2]}.png`, import.meta.url).href
  }
  
  function toSettleIn(item,index){
    // if(item.g_status==0) {
      //入驻
      uni.showLoading()
      robotBindGroupApi({robot_id: robotId.value,group_id: item.group_id},res=>{
        if (res.code === 0) {
          listInfo.value[index].g_status = 1 //已入驻
          uni.showToast({
            title: '入驻成功',
            icon: 'none',
            mask: true,
            success:()=>{
              setTimeout(()=>{
                uni.navigateBack()
              },1000)
            }
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
    // }
  }
  
  function backPage() {
    uni.navigateBack();
  }
  function getownerSuperGroups(){
    ownerSuperGroupsApi({page_id:searchInfo.page_id,page_size:searchInfo.page_size}, res => {
      if (res.code === 0) {
        if(searchInfo.page_id === 1) {
          listInfo.value = res.data.list||[]
          searchInfo.total = res.data.total
        } else {
          listInfo.value = [...listInfo.value,...res.data.list]
        }
        searchInfo.page_id++
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
  .scroll-box {
    height: calc(100vh - 112rpx - 44px);
    .scroll {
      height: 100%;
    }
  }
  .list-wrapper {
    margin-bottom: 24rpx;
    padding: 24rpx;
    background-color: #ffffff;
    border-radius: 24rpx;
  }
  .box {
    display: flex;
    align-items: center;
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
      image {
        height: 32rpx;
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
  .robot-list{
    margin-top: 24rpx;
    padding-top: 24rpx;
    border-top: 1px solid rgba(0,0,0,0.08);
    .robot-list-box {
      margin-bottom: 32rpx;
      display: flex;
      align-items: center;
      image {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
      }
      .info {
        margin-left: 24rpx;
        .tit {
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(0,0,0,0.6);
          line-height: 36rpx;
        }
        .date {
          margin-top: 12rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.2);
          line-height: 24rpx;
        }
      }
      &:last-of-type{
        margin-bottom: 0;
      }
    }
  }
</style>