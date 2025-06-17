<template>
  <view>
    <view :class="['common-header',isiOS!=true?'safeTop':'']">
      <image class="back" src="@/static/image/btn_back.png" @click="backPage()"></image>
      <text>机器人助手</text>
    </view>
    <view class="wrap">
      <robot-assistant-x :robot_list='list'></robot-assistant-x>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import robotAssistantX from '../robotAccount/components/robot-assistant-x.vue';
  
  const isiOS = ref(window.isiOS)
  
  const list = [
    {
        "id": 1001,
        "cover_big": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/xiaohai/ic_xh_base.png",
        "cover_small": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/icon/ic_ai.jpg",
        "title": "小嗨机器人群助手（基础版）",
        "prod_name": "Hi AI Group Chat",
        "prod_develop": "开发者: wakagroup",
        "prod_des": "创建超级社群后，每个社群都会自带基础班小嗨智能机器人群助于，它可以帮助群主更便捷的管理社群入群欢迎、退群提醒、改名提醒、签到、天气、潜水统计等功能",
        "prod_price": "永久免费",
        "prod_status": 1
    },
    {
        "id": 1002,
        "cover_big": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/xiaohai/ic_xh_ad.png",
        "cover_small": "https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/icon/ic_ai.jpg",
        "title": "小嗨机器人群助手（娱乐版）",
        "prod_name": "Hi AI Group Chat",
        "prod_develop": "开发者: wakagroup",
        "prod_des": "功能介绍：创建超级社群后，每个社群都会自带基础班小嗨智能机器人群助于，它可以帮助群主更便捷的管理社群入群欢迎、退群提醒、改名提醒、签到、天气、潜水统计等功能",
        "prod_price": "288/年",
        "prod_status": 0
    }
]
</script>

<style scoped lang="scss">
  .common-header {
    background-color: #ffffff;
  }
  .wrap {
    padding: 0 20rpx 24rpx;
    :deep .wrapper-box {
      .box {
        width: 348rpx;
        background: #ffffff;
      }
    }
  }
</style>