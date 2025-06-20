<template>
  <view class="wrapper">
    <image class="bg" src="/static/image/lucky-bg.jpg" mode="aspectFill"></image>
   
    <lucky-wheel-demo
      ref="myLucky"
        width="600rpx"
        height="600rpx"
        :blocks="blocks1"
        :prizes="prizes1"
        :buttons="buttons1"
        @start="startCallBack"
        @end="endCallBack"
    ></lucky-wheel-demo>

    <view :class="['lucky-btn','lucky-btn-'+awaidNum]" @click="turntableStart"></view>
    <view class="rule-box" @click="openRule">
      <view>活</view>
      <view>动</view>
      <view>规</view>
      <view>则</view>
    </view>
    <view class="wrapper-show">
      <view class="show-box">
        <view class="tit">获得福利展示区</view>
        <view class="box">
          <view class="list" v-if="showList">
            <view class="left">
              <image class="gift" :src="data.awardList[data.award-1].icon"></image>
              <view class="text-box">
                <view class="name">{{data.awardList[data.award-1].title}}</view>
                <view class="exp">请在【我的背包】中激活并使用</view>
              </view>
            </view>
            <view class="right right-1">去激活</view>
          </view>
          <view class="no-lucky" v-else>
            暂无奖品记录~
          </view>
        </view>
      </view>
    </view>
    
    <uni-popup ref="rulePopup" type="center">
      <rule-x v-if="popupType===1" @closePopup="closePopup"></rule-x>
      <result-x v-else-if="popupType===2" :curAwaid="data.awardList[data.award-1]" @closePopup="closePopup"></result-x>
    </uni-popup>
  </view>
</template>
<script setup>
  import { reactive, toRefs, ref } from 'vue';
  import QTurntable from '@/components/q-turntable/components/q-turntable/q-turntable.vue'
  import LuckyWheelDemo from '@/components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/lucky-wheel-demo.vue'
  
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import ruleX from './components/rule-x.vue'
  import resultX from './components/result-x.vue'
  
  let blocks1 = [{ padding: '13px', background: '#617df2' }]
  let prizes1 = [
    { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
  ]
  let buttons1 = [
    { radius: '50px', background: '#617df2' },
    { radius: '45px', background: '#afc8ff' },
    {
      radius: '40px', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始\n抽奖', top: '-20px' }]
    },
  ]
  
  
  const data = reactive({
      award: 1,
      awardList: [
          {
            id: 1,
            title: 'VIP体验卡3个月',
            icon: new URL('@/static/image/lucky/1.png', import.meta.url).href,
          },
          {
            id: 2,
            title: '限定红包皮肤1个',
            icon: new URL('@/static/image/lucky/list-2.png', import.meta.url).href,
          },
          {
            id: 3,
            title: '限定聊天气泡',
            icon: new URL('@/static/image/lucky/3.png', import.meta.url).href,
          },
          {
            id: 4,
            title: 'hi币20个',
            icon: new URL('@/static/image/lucky/4.png', import.meta.url).href,
          },
          {
            id: 5,
            title: '季度版机器人',
            icon: new URL('@/static/image/lucky/5.png', import.meta.url).href,
          },
          {
            id: 6,
            title: '能量助力60个',
            icon: new URL('@/static/image/lucky/6.png', import.meta.url).href,
          },
          {
            id: 7,
            title: 'SVIP体验卡1个月',
            icon: new URL('@/static/image/lucky/7.png', import.meta.url).href,
          },
          {
            id: 8,
            title: '现金红包20元',
            icon: new URL('@/static/image/lucky/8.png', import.meta.url).href,
          }
      ] // 顺时针对应每个奖项
  });
  const showList = ref(false)
  const awaidNum = ref(1)
  const rulePopup = ref()
  const turntable = ref(null);
  const popupType = ref(-1)
  const { award, awardList } = toRefs(data);
  const ptLotteryRef = ref(null)
  
  const myLucky = ref()
  // 点击抽奖按钮触发回调
  function startCallBack () {
    // 先开始旋转
    myLucky.value.play()
    // 使用定时器来模拟请求接口
    setTimeout(() => {
      // 假设后端返回的中奖索引是0
      const index = Math.floor(Math.random() * 8 + 1);
      // 调用stop停止旋转并传递中奖索引
      myLucky.value.stop(index)
    }, 3000)
  }
  // 抽奖结束触发回调
  function endCallBack (prize) {
    // 奖品详情
    console.log(prize,'pize')
  }
  
  
  // 用户点击开始抽奖
  const turntableStart = () => {
      if(awaidNum.value===1) {
        let index = Math.floor(Math.random() * 8 + 1);//前端随机数，这里应该后台返回中奖结果
        data.award = index;
        turntable.value.begin(data.award);
      } else {
        uni.showToast({
            title: '抽奖次数已用完',
            icon: 'none'
        });
      }
  };
  
  // 抽奖完成后操作
  const turntableSuccess = () => {
      const index = data.award - 1;
      popupType.value = 2
      // rulePopup.value.open()
      
      // uni.showToast({
      //     title: `恭喜你获得${data.awardList[index].title}`,
      //     icon: 'none'
      // });
      awaidNum.value = 2
      showList.value = true
      console.log(data.awardList[index].title)
  };
  
  function maskClickTeam(){}
  
  function openRule(){
    popupType.value = 1
    rulePopup.value.open()
  }
  function closePopup(){
    rulePopup.value.close()
    setTimeout(()=>{
      popupType.value = -1
    },200)
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100vh;
    background-color: #4375FF;
    position: relative;
    .bg {
      width: 100%;
      height: 1206rpx;
    }
    .lucky-btn {
      position: relative;
      
      margin: -124rpx auto 0;
      width: 508rpx;
      height: 190rpx;
      &.lucky-btn-1 {
        background: url('@/static/image/lucky-btn-1.png') no-repeat;
        background-size: 100% 100%;
      }
      &.lucky-btn-2 {
        background: url('@/static/image/lucky-btn-2.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .wrapper-show {
      margin: 0 auto;
      padding: 42rpx 32rpx;
      width: 702rpx;
      height: 342rpx;
      border-radius: 24rpx 24rpx 0 0;
      border: 2rpx solid transparent;
      border-top: 2rpx solid transparent;
      border-left: 2rpx solid transparent;
      border-right: 2rpx solid transparent;
      background: 
        linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)) padding-box,
        linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(0, 0, 0, 0)) border-box;
      background-clip: padding-box, border-box;
      box-shadow: 0px 0px 20rpx 0px rgba(255,255,255,0.3) inset;
      .tit {
        margin: 0 auto;
        width: 480rpx;
        background: url('/static/image/text-bg.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        font-weight: 600;
        font-size: 36rpx;
        color: #FFFFFF;
        line-height: 48rpx;
      }
      .box {
        margin-top: 24rpx;
        width: 638rpx;
        height: 144rpx;
        background: #FFFFFF;
        border-radius: 18rpx;
        .list {
          padding: 0 24rpx;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          view{
            flex-shrink: 0;
          }
          .left {
            display: flex;
            align-items: center;
            .gift {
              margin-right: 16rpx;
              width: 80rpx;
              height: 80rpx;
            }
            .name {
              margin-bottom: 6rpx;
              font-weight: 600;
              font-size: 28rpx;
              color: #000000;
              line-height: 38rpx;
            }
            .exp {
              font-weight: 400;
              font-size: 24rpx;
              color: rgba(0,0,0,0.6);
              line-height: 32rpx;
            }
          }
          .right {
            width: 120rpx;
            height: 56rpx;
            border-radius: 50rpx;
            line-height: 56rpx;
            text-align: center;
            font-weight: 500;
            font-size: 28rpx;
            &.right-1 {
              color: #FFFFFF;
              background: #22C0FF;
            }
            &.right-2 {
              color: rgba(0, 0, 0, 0.20);
              background: #F0F3F8;
            }
          }
        }
        .no-lucky {
          height: 100%;
          line-height: 144rpx;
          text-align: center;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.6);
        }
      }
    }
    .rule-box {
      position: absolute;
      top: 178rpx;
      right: 0;
      width: 66rpx;
      height: 200rpx;
      padding-top: 16rpx;
      border-radius: 30rpx 0 0 30rpx;
      background: linear-gradient( 180deg,  0%,  100%);
      border-top: 2rpx solid transparent;
      border-left: 2rpx solid transparent;
      border-bottom: 2rpx solid transparent;
      background: 
        linear-gradient(180deg, #3877FF, #3377FF) padding-box,
        linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.23)) border-box;
      background-clip: padding-box, border-box;
      cursor: pointer;
      view {
        font-weight: 600;
        font-size: 32rpx;
        color: #FFFFFF;
        line-height: 42rpx;
        text-align: center;
      }
    }
  }
  
</style>