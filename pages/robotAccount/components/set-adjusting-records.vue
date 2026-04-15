<template>
  <view class="text-exp">
    调整记录仅保存近30日内
  </view>
  <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
    <view class="list-box" v-for="item in logList" :key="item.id">
      <view class="left">
        <image class="headimg" :src="item.op_user.head_img||boyHeadimg" mode=""></image>
        <view class="info-box">
          <view class="nickname">
            {{item.op_user.nick_name}}
          </view>
          <view class="detail">
            调整过：{{item.data_type>=100000&&item.data_type<=109999?'插件开关':item.data_type>=110000&&item.data_type<=119999?'娱乐插件开关':dataTypeObj[item.data_type]}}
          </view>
        </view>
      </view>
      <view class="right">
        {{getDateTime(item.created_at * 1000)}}
      </view>
    </view>
    <view class="no-data" v-if="!logList.length">
      <image src="@/static/image/no-data.png"></image>
      <view>暂无数据</view>
    </view>
  </scroll-view>
  
</template>

<script setup>
  import {ref,reactive} from 'vue'
  import {operationLogApi} from '@/service/robotAccount/index.js'
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  
  const boyHeadimg = new URL("@/static/image/boy.png", import.meta.url).href
  
  const props = defineProps({
    robotInfo: {
      type: Object,
      default: () => {}
    }
  })
  
  const logList = ref([])
  const pageInfo = reactive({
    page_id: 1,
    page_size: 20,
    total: 0
  })
  const dataTypeObj = {
    200001:'入群欢迎语',
    200002:'新人入群欢迎表情',
    200003:'新人入群欢迎语音',
    200004:'整点报时消息',
    200005:'送礼成功提示文案',
    200006:'签到金币范围',
    200007:'打劫概率/获取金币范围',
    200008:'群背景定制图',
    200009:'群推广配置',
    200010:'设置群规文案',
    200011:'词库添加',
    200012:'设置群公告',
    200013:'自动加金币兑换设置',
    200014:'恩爱值',
    200015:'求婚消耗魅力值自定义',
    200016:'逼婚概率/消费金币范围',
    200017:'创业',
    200020:'前世预测消耗金币',
    200021:'刮刮乐消耗金币',
    200022:'拍一拍后台设置',
    200023:'贵族头衔',
    200024:'金币礼物',
    200025:'护群助手',
  }
  
  function onReachBottom(){
    if(logList.value.length<pageInfo.total) {
      getLogList()
    }
  }
  
  getLogList()
  function getLogList(){
    uni.showLoading()
    let param = {
      group_id: props.robotInfo.group_id,
      page_id: pageInfo.page_id,
      page_size: pageInfo.page_size
    }
    operationLogApi(param, res=>{
      if (~~res.code === 0) {
        if(pageInfo.page_id === 1) {
          logList.value = res.data.items||[]
          pageInfo.total = res.data.total
        } else {
          logList.value = [...logList.value,...res.data.items]
        }
        pageInfo.page_id++
        uni.hideLoading()
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  
</script>

<style lang="scss" scoped>
  .text-exp {
    padding: 24rpx 0;
    color: #c5ccd5;
    font-size: 28rpx;
    text-align: center;
  }
  .scrollBox {
    height: calc(100vh - 628rpx);
  }
  .list-box {
    margin-bottom: 10rpx;
    padding: 24rpx 0 24rpx;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    font-size: 28rpx;
    color: #333333;
    border-bottom: 1px solid #EEF0F4;
    &:last-of-type {
      border: none;
    }
    view {
      flex-shrink: 0;
    }
    .left {
      // border: 1px solid red;
      display: flex;
      // align-items: center;
    }
    .headimg {
      margin-right: 10rpx;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
    .info-box {
      width: 350rpx;
      .nickname {
        width: 100%;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 隐藏溢出的内容 */
        text-overflow: ellipsis; /* 显示省略号 */
        font-weight: bold;
      }
      .detail {
        line-height: 1.2;
        margin-top: 10rpx;
        color: #606178;
      }
    }
    
    .right {
      font-size: 24rpx;
      width: 150rpx;
      color: #606178;
    }
  }
  .no-data {
    margin-top: 0;
  }
</style>