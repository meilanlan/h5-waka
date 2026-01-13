<template>
    <view class="wrap">
      <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="机器人助手" @backPage="backPage" />
      <robotAssistantX :robot_list='spaceRobotData.data.robot_list'></robotAssistantX>
    </view>
</template>

<script setup>
  import {reactive, ref,nextTick,provide} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import robotAssistantX from '../robotAccount/components/robot-assistant-x.vue';
  import {spaceRobotApi} from '@/service/robotAccount/index.js'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  const isiOS = ref(window.isiOS)
  const groupInfo = reactive({group_id:0})
  const page = ref(0)
  const spaceRobotData = reactive(({data:{
    robot_list: [],
    order_list: []
  }}))
  function backPage() {
    if(page.value===1){
      uni.navigateBack()
    } else {
      window.client.closeWebview()
    }
  }
  function getSpaceRobot(){
    uni.showLoading()
    spaceRobotApi({group_id: groupInfo.group_id,channel:isiOS.value?'ios':'android'}, res => {
      if (res.code === 0) {
        spaceRobotData.data = res.data
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
    page.value = option.page*1||0
    uni.showLoading()
    provide('parentGroupInfo', {group_id:0})
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            getSpaceRobot()
        });
    })
  })
  
</script>

<style scoped lang="scss">
  .common-header {
    background-color: #ffffff;
  }
  .wrap {
    padding: 88rpx 20rpx 24rpx;
    :deep .wrapper-box {
      .box {
        width: 348rpx;
        background: #ffffff;
      }
    }
  }
</style>