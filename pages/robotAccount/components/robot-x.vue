<template>
  <view class="robot-wrapper">
    <view class="tab-list">
      <view :class="['box', 'box-'+item, curTab===item?'active':'gray', ]" v-for="item in 2" :key="'tab-'+item" @click="switchTab(item)">
        {{item===1?'机器人助手':'我的订单'}}
      </view>
    </view>
    <template v-if="flagLock===true">
      <!-- 机器人助手 -->
      <robot-assistant-x v-if="curTab === 1" :robot_list='spaceRobotData.data.robot_list||[]' @updateInfo="updateGroup"></robot-assistant-x>
      <!-- 我的订单 -->
      <my-order :order_list="spaceRobotData.data.order_list||[]" :user_robot_list="spaceRobotData.data.user_robot_list||[]" v-else></my-order>
    </template>
    
    
  </view>
  
</template>

<script setup>
  import {ref,reactive, inject} from 'vue'
  import robotAssistantX from './robot-assistant-x.vue';
  import myOrder from './my-order.vue';
  import {spaceRobotApi} from '@/service/robotAccount/index.js'
  
  const emit = defineEmits(['updateGroupInfo'])
  const curTab = ref(1)
  const loading = ref(false)
  const flagLock = ref(false)
  const parentInfo = reactive(({data:{}}))
  parentInfo.data = inject('parentGroupInfo')
  const spaceRobotData = reactive(({data:{
    robot_list: [],
    order_list: [],
    user_robot_list: []
  }}))
  
  function switchTab(item){
    curTab.value = item
  }
  function updateGroup(){
    getSpaceRobot()
    emit('updateGroupInfo')
  }
  getSpaceRobot()
  function getSpaceRobot(){
    uni.showLoading()
    
    spaceRobotApi({group_id: parentInfo.data.group_id,channel:window.isiOS?'ios':'android'}, res => {
      if (res.code === 0) {
        spaceRobotData.data = res.data
        flagLock.value = true
        // dataSummary.data = res.data || {}
        uni.hideLoading()
      } 
      // else if (res.code === -20001) {
      //   // uni.showToast({
      //   //   title: '登录失效，请重新登录',
      //   //   icon: 'none'
      //   // });
      //   clearAdminToken()
      //   uni.hideLoading()
      // } 
      else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
        // if (res.code != -10002){
        //   uni.showToast({
        //     title: res.msg,
        //     icon: 'none'
        //   });
        //   uni.hideLoading()
        // } else {
        //   uni.hideLoading()
        //   // if (JSON.stringify(dataSummary.data)== "{}") {
        //   //   uni.showLoading({
        //   //     title: "小嗨正在努力加载中...",
        //   //     icon: 'none'
        //   //   })
        //   //   setTimeout(()=>{
        //   //     getGroupSummaryInfo()
        //   //   },3000)
        //   // }
          
        // }
      }
    })
  }
</script>

<style lang="scss" scoped>
  .robot-wrapper {
    padding: 0 32rpx;
  }
  .tab-list {
    margin-top: 32rpx;
    background: #F0F3F8;
    border-radius: 16rpx;
    // font-family: 'MiSans';
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
  
</style>