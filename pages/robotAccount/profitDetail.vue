<template>
  <view class="common-header">
    <image class="back" src="../../static/image/btn_back.png" @click="returnPage"></image>
    <text>收益明细</text>
  </view>
  <view class="top-timer">
    <view class="team-box" @click="switchIcon">
      <view class="name">{{teamList[teamObj.curTeamIndex].text}}</view>
      <uni-icons :class="['forward',teamObj.show===true&&'active']" type="forward" :size="16"></uni-icons>
    </view>
    <view class="time-wrapper">
      <uni-datetime-picker v-model="range" type="daterange" rangeSeparator="至" @maskClick="maskClick" />
    </view>
  </view>
  <view class="cur-top">
    当月合计收入：<text>55(嗨币)</text>
  </view>
  <view class="list-wrapper">
    <view class="list-box">
      <view class="left">
        <view class="name">交易中</view>
        <view class="time">2024-03-08 16:24</view>
      </view>
      <view class="right">
        <view class="price">¥60</view>
        <view class="time">提成比例：50%</view>
      </view>
    </view>
    <view class="list-box">
      <view class="left">
        <view class="name">交易中</view>
        <view class="time">2024-03-08 16:24</view>
      </view>
      <view class="right">
        <view class="price">¥60</view>
        <view class="time">提成比例：50%</view>
      </view>
    </view>
  </view>
  <view class="no-data">
    <image src="@/static/image/no-data.png" mode=""></image>
    <view>暂无数据</view>
  </view>
  
  
  <!-- 嗨币充值 -->
  <uni-popup ref="teamPopup" type="top" mask-background-color="rgba(255,255,255,0.1)" @maskClick="maskClickTeam">
    <view class="common-popup">
      <view class="list" v-for="(item,index) in teamList" :key="index" @click="switchTeam(item,index)">
        <text>{{item.text}}</text>
        <image v-show="teamObj.curTeamIndex === index" src="@/static/image/choose.png" mode=""></image>
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
  import {ref,reactive} from 'vue'
  // import uniDataSelect from '@/components/uni-data-select/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue'
  import uniIcons from '@/components/uni-icons/components/uni-icons/uni-icons.vue';
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import uniDatetimePicker from '@/components/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue'
  
  const teamPopup = ref(null)
  const teamList = ref([{value: 1, text: '全部社群'},{value: 2, text: '王者荣耀上海战队'},{value: 3, text: '王者荣耀四川战队'}])
  const teamObj = reactive({
    curTeamIndex: 0,
    show: false
  })
  const range = ref(['2021-02-1', '2021-3-28'])
  
  function returnPage(){
    uni.navigateBack();
  }
  
  function maskClick() {
    console.log('范围选择', range.values)
  }
  
  function switchTeam(item, index) {
    teamObj.curTeamIndex = index
    
  }
  
  function maskClickTeam(){
    teamObj.show = false
  }
  
  function switchIcon(){
    teamObj.show = teamObj.show===true?false:true
    if (teamObj.show===true ) teamPopup.value.open()
    else teamPopup.value.close()
    console.log(teamObj.show, 'teamObj.show is')
  }
  
  function change(){}
</script>

<style lang="scss" scoped>
  .common-header {
    background-color: #ffffff;
  }
  .top-timer {
    padding: 16rpx 20rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .team-box {
    padding: 0 12rpx;
    width: 262rpx;
    height: 56rpx;
    background: #F0F3F8;
    border-radius: 276rpx;
    font-family: 'MiSans';
    display: flex;
    justify-content: space-between;
    align-items: center;
    >* {
      flex-shrink: 0;
    }
    .name {
      display: block;
      width: 196rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .forward {
      transform: rotate(90deg);
      transition: transform 300ms;
      &.active {
        color: #22C0FF !important;
        transform: rotate(-90deg);
      }
    }
  }
  .time-wrapper {
    width: 424rpx;
    :deep .uni-date-x--border {
      border: none;
      .uni-date-x {
        background-color: #F0F3F8;
        padding: 10rpx 22rpx;
        border-radius: 276rpx;
        font-size: 28rpx;
        color: #000000;
        .uni-date__x-input {
          height: auto;
          padding: 0;
          line-height: 36rpx;
        }
        .range-separator {
          height: auto;
          line-height: 36rpx;
          color: rgba(0,0,0,0.6);
        }
      }
    }
  }
  .common-popup {
    border-radius: 0 0 30rpx 30rpx;
    margin-top: 176rpx;
    height: auto;
    max-height: 300rpx;
    .list {
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        font-family: 'MiSans';
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
      }
      image {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .cur-top {
    padding: 32rpx;
    font-family: 'MiSans';
    font-weight: 400;
    font-size: 28rpx;
    color: rgba(0,0,0,0.6);
    line-height: 36rpx;
    text {
      color: #22C0FF;
    }
  }
  .list-wrapper {
    padding: 0 20rpx;
    font-family: 'MiSans';
    .list-box {
      margin-bottom: 24rpx;
      padding: 24rpx 32rpx;
      width: 100%;
      height: 64px;
      background: #FFFFFF;
      border-radius: 12px 12px 12px 12px;
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
        text-align: right;
      }
      .price {
        font-weight: 500;
        font-size: 32rpx;
        color: #22C0FF;
        line-height: 40rpx;
      }
    }
  }
  .no-data {
    margin-top: 328rpx;
    text-align: center;
    font-size: 28rpx;
    color: #606163;
    font-weight: 400;
    image {
      margin-bottom: 14rpx;
      width: 366rpx;
      height: 366rpx;
    }
    
  }
</style>