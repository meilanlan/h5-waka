<template>
  <view class="wrapper">
    <myCustomNavbar backIcon="../../static/image/btn_back_white.png" :navStyle="{background:'rgba(255,255,255,0)',color:'#ffffff'}" title="" @backPage="backPage"></myCustomNavbar>
    <image class="bg" src="/static/image/lucky-bg.jpg" mode="aspectFill"></image>
    <!-- <view class="lucky-wheel-bg"></view> -->
    <view class="aperture">
      <!-- <view :class="['aperture-anmi',startAnm===true&&'aniStar']"></view> -->
      <view :class="['aperture-anmi',{aniStar: startAnm, aniEnd: endAnm}]"></view>
    </view>
    <view class="circle">
      <!-- <view :class="['circle-anmi-1',startAnm===true&&'aniStar']" ></view>
      <view :class="['circle-anmi-2',startAnm===true&&'aniStar']"></view> -->
     <view :class="['circle-anmi-1',{aniStar: startAnm, aniEnd: endAnm}]" ></view>
      <view :class="['circle-anmi-2',{aniStar: startAnm, aniEnd: endAnm}]"></view>
    </view>
    
    <lucky-wheel
      ref="myLucky"
      width="486rpx"
      height="486rpx"
      :prizes="prizes"
      :buttons="buttons"
      @start="turntableStart"
      @end="endCallBack"
    ></lucky-wheel>
    <view class="lucky-btn-box">
      <view :class="['lucky-btn',removeAnm&&'no-animation','scaleAnimation','lucky-btn-'+data.status]" @click="turntableStart"></view>
    </view>
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
          <view class="list" v-if="data.status === 1">
            <view class="left">
              <image class="gift" :src="prizes[data.award].icon" mode="aspectFit"></image>
              <view class="text-box">
                <view class="name">{{prizes[data.award].title}}</view>
                <view class="exp">{{prizes[data.award].award_desc}}</view>
              </view>
            </view>
            <view class="right right-1" v-if="prizes[data.award].award_use_status===0" @click="toAppPage">去激活</view>
            <view class="right right-2" v-else>已使用</view>
          </view>
          <view class="no-lucky" v-else>
            暂无奖品记录~
          </view>
        </view>
      </view>
    </view>
    
    <uni-popup ref="rulePopup" type="center">
      <rule-x v-if="popupType===1" @closePopup="closePopup"></rule-x>
      <result-x v-else-if="popupType===2" :curAwaid="prizes[data.award]" @closePopup="closePopup" @toApp="toAppPage"></result-x>
    </uni-popup>
  </view>
</template>
<script setup>
  import { reactive, toRefs, ref, nextTick,onMounted } from 'vue';
  import {onLoad} from '@dcloudio/uni-app'
  import LuckyWheel from '@/components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/lucky-wheel.vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import ruleX from './components/rule-x.vue'
  import resultX from './components/result-x.vue'
  import {checkAwardStApi,awardTakeApi} from '@/service/robotAccount/index.js'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'

  let prizes = [
    { id: 3,action:{id:'',trace_id:'',param:''},award_type: 3,award_use_status:0,title: 'VIP体验卡3个月',icon: new URL('@/static/image/lucky/1.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid1-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}]},
    { id: 2,action:{id:'',trace_id:'',param:''},award_type: 6,award_use_status:0,title: '限定红包皮肤1个',icon: new URL('@/static/image/lucky/list-2.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid2-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}]},
    { id: 5,action:{id:'',trace_id:'',param:''},award_type: 5,award_use_status:0,title: '限定聊天气泡',icon: new URL('@/static/image/lucky/3.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid3-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}]},
    { id: 7,action:{id:'',trace_id:'',param:''},award_type: 2,award_use_status:0,title: 'hi币20个',icon: new URL('@/static/image/lucky/4.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid4-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}]},
    { id: 6,action:{id:'',trace_id:'',param:''},award_type: 7,award_use_status:0,title: '季度版机器人',icon: new URL('@/static/image/lucky/5.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid5-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}]},
    { id: 1,action:{id:'',trace_id:'',param:''},award_type: 8,award_use_status:0,title: '能量助力60个',icon: new URL('@/static/image/lucky/6.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid6-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}] },
    { id: 4,action:{id:'',trace_id:'',param:''},award_type: 4,award_use_status:0,title: 'SVIP体验卡1个月',icon: new URL('@/static/image/lucky/7.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid7-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}] },
    { id: 8,action:{id:'',trace_id:'',param:''},award_type: 1,award_use_status:0,title: '现金红包20元',icon: new URL('@/static/image/lucky/8.png', import.meta.url).href,fonts: [{ text: '', top: '10%'}],imgs:[{src: new URL('@/static/image/lucky/awaid8-bg.png', import.meta.url).href,award_desc:'',width: '174rpx',height: '218rpx'}] },
  ]
  let buttons = [
        { radius: '117rpx' },
        {imgs: [{src: new URL('@/static/image/pointer.png', import.meta.url).href,width: '234rpx',height: '234rpx',top: '-115rpx'}]},
        {fonts: [{ text: '新人福利', top: '-20px', fontSize: '28rpx',fontColor: '#ffffff',fontWeight:600,lineHeight:'38rpx' }],},
        {fonts: [{ text: '免费1次', top: '6rpx', fontSize: '24rpx',fontColor: 'rgba(255,255,255,0.6)',fontWeight:600,lineHeight:'32rpx' }],},
        // { radius: '66rpx', background: '#afc8ff' },
      ]
  
  const data = reactive({
      award: 1,
      status: 0,//是否已领取奖品
  });
  const rulePopup = ref()
  const popupType = ref(-1)
  const removeAnm = ref(false)
  const startAnm = ref(false)
  const endAnm = ref(false)
  const myLucky = ref()
  
  onMounted(()=>{
    const appPage = document.getElementById('app');
    appPage.style.paddingTop = 0;
  })
  
  function backPage() {
    window.client.closeWebview()
  }
  
  function toAppPage(){
    window.client.JSAction({
      id: prizes[data.award].action.id,
      // param: {index: parseInt(1)}
    })
    closePopup()
  }
  
  // 用户点击开始抽奖
  const turntableStart = () => {
    if(data.status!=1) {
      removeAnm.value = true
      startAnm.value =true
      // 先开始旋转
      myLucky.value.play()
      // 使用定时器来模拟请求接口
      
      awardTakeApi({},res=>{
        if(res.code === 0){
          setTimeout(() => {
            // 获取中奖id的index
            data.award = prizes.findIndex(item=>item.award_type===res.data.award_type)
            prizes[ data.award].action = res.data.action
            prizes[ data.award].award_desc = res.data.award_desc
            prizes[ data.award].award_use_status = res.data.award_use_status
            // 调用stop停止旋转并传递中奖索引
            myLucky.value.stop(data.award)
          }, 3000)
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      })
    } else {
      uni.showToast({
          title: '抽奖次数已用完',
          icon: 'none'
      });
    }
  };
  
  // 抽奖结束触发回调
  function endCallBack (prize) {
    // 奖品详情
    popupType.value = 2
    setTimeout(()=>{
      rulePopup.value.open()
    },800)
    data.status = 1
    endAnm.value =true
    
  }
  
  function checkAwardSt(){
    checkAwardStApi({},res=>{
      if(res.code === 0){
        data.status = res.data.status
        if(res.data.award) {
          data.award = prizes.findIndex(item=>item.award_type===res.data.award.award_type)
          prizes[ data.award].action = res.data.award.action
          prizes[ data.award].award_desc = res.data.award.award_desc
          prizes[ data.award].award_use_status = res.data.award.award_use_status
        }
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  }
  
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
  
  onLoad(()=>{
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            checkAwardSt()
        });
    })
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100vh;
    // height: 100vh;
    // overflow-y: auto;
    background-color: #4375FF;
    position: relative;
    .bg {
      width: 100%;
      height: 1206rpx;
      // position: fixed;
      // top: 0;
      // left: 0;
    }
    .lucky-wheel-bg {
      position: absolute;
      top: 487rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 486rpx;
      height: 486rpx;
      background: linear-gradient(to bottom,#3460cb,#2e3dca);
      border-radius: 50%;
      z-index: 9;
    }
    .aperture {
      position: absolute;
      top: 487rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 486rpx;
      height: 486rpx;
      z-index: 8;
      .aperture-anmi {
        width: 486rpx;
        height: 486rpx;
        border-radius: 50%;
        background: #438FF2; /* 使用rgba设置半透明 */
        filter: blur(5px); /* 边缘虚化效果 */
        position: absolute;
        z-index: 8;
        opacity: 0;
        &.aniStar {
          animation: scaleFade 1.7s linear 3 forwards;
          animation-delay: .9s;
        }
        &.aniEnd {
          animation: animateEnd3 1.2s linear forwards,
          
        }
      }
    }
    .circle {
      width: 606rpx;
      height: 606rpx;
      border-radius: 50%;
      position: absolute;
      top: 430rpx;
      left: 50%;
      transform: translateX(-50%);
      .circle-anmi-1 {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        border-style: solid;
        color: #eaecff;
        // color: #fdfc93;
        border-color: currentColor transparent transparent currentColor;
        border-width: 0.4em 0.4em 0em 0em;
        filter: blur(2px);
        --deg: -45deg;
        animation-direction: normal;
        opacity: 0;
        &.aniStar {
          animation: animate 1.8s linear infinite forwards;
          animation-delay: 1.5s;
        }
        &.aniEnd {
          animation: animateEnd 1.2s linear forwards,
        }
      }
      .circle-anmi-2 {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        border-style: solid;
        color: #eaecff;
        border-color: currentColor transparent transparent currentColor;
        border-width: 0.4em 0.4em 0em 0em;
        filter: blur(2px);
        --deg: -45deg;
        animation-direction: normal‌;
        opacity: 0;
        &.aniStar {
          animation: animateTwon 1.8s linear infinite forwards;
          animation-delay: 1.5s;
        }
        &.aniEnd {
          animation: animateEnd2 1.2s linear forwards,
        }
      }
    }
    .lucky-btn-box {
      // position: fixed;
      // top: 1082rpx;
      // left: 50%;
      // transform: translateX(-50%);
      // width: 100%;
    }
    .lucky-btn {
      // margin: 0 auto;
      margin: -124rpx auto 0;
      width: 508rpx;
      height: 190rpx;
      
      &.scaleAnimation {
        animation: breathing 2s ease-in-out infinite;
      }
      &.no-animation {
        animation: none;
      }
      &.lucky-btn-0 {
        background: url('@/static/image/lucky-btn-1.png') no-repeat;
        background-size: 100% 100%;
      }
      &.lucky-btn-1 {
        background: url('@/static/image/lucky-btn-2.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .wrapper-show {
      // position: fixed;
      // top: 1282rpx;
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
  
  /* 呼吸动画关键帧 */
  @keyframes breathing {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
  
  @keyframes scaleFade {
  
    0% {
      transform: scale(1);
      opacity: 1;
    }
    20%{
      opacity: 0.8;
    }
    40% {
      transform: scale(1.8);
      opacity: 0;
      filter: blur(6px);
    }
    41% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  
  
  @keyframes animate {
    0% {
      transform: rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: rotate(180deg);
      opacity: 0.5;
    }
    100%{
      transform: rotate(360deg);
      opacity: 0;
    }
  }

  
  @keyframes animateTwon {
    0% {
      transform: rotate(180deg);
      opacity: 0.5;
    }
    50% {
      transform: rotate(360deg);
      opacity: 1;
    }
    
    100%{
      transform: rotate(540deg);
      opacity: 0;
    }
  }
  
  @keyframes animateEnd {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0;
    }
    100%{
      transform: rotate(180deg);
      opacity: 0;
    }
  }

   @keyframes animateEnd2 {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 0;
      }
      100%{
        transform: rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes animateEnd3 {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 0;
      }
      100%{
        transform: scale(1.8);
        opacity: 0;
      }
    }
</style>