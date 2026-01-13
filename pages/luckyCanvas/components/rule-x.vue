<template>
  <view class="rule-popup">
    <image src="/static/image/rule-bg.png" class="rule-bg" mode="widthFix"></image>
    <view class="tit">活动规则</view>
    <image class="close" src="/static/image/close-1.png" @click="closePopup"></image>
    <view class="rule-cont">
      <view>一、活动时间： 即日起至2026年03月01日结束，活动时间如有调整平台运营将第一时间发布通知，请及时留意。 </view>
      <view>二、活动规则：</view>
      <view>1、本次活动仅为首次注册APP的用户提供福利，每一位新用户都有一次免费获得福利的机会，领取奖品后请前往我的背包查看或使用奖品，新手福利不得交易和转交他人使用。</view>
      <view>2、参与方式为免费，抽奖完毕后会在页面中显示抽奖结果，请您留意，并及时使用。 </view>
      <view>3、开奖时间：抽中后立即开奖 </view>
      <view>三、奖品明说：</view> 
      <view>1、大转盘奖品一共有8个品类分别是，限定红包皮肤、季度版机器人、能量助力60个、Vip体验卡3个月、Svip体验卡1个月、现金红包、限定聊天气泡。</view> 
      <view>2、限定红包皮肤、季度版机器人、能量助力60个、Vip体验卡3个月、Svip体验卡1个月、限定聊天气泡需要激活后才能激活使用。 </view>
      <view>3、现金红包需要联系官方客服后，将中奖截图发给客服，由客服发放。</view> 
      <view>四、概率说明： 福利大转盘整体中奖率为100% </view>
      <view>1、限定红包皮肤1个：20% </view>
      <view>2、Hi币20个：5% </view>
      <view>3、季度版机器人：5% </view>
      <view>4、能量助力60个：20% </view>
      <view>5、Vip体验卡3月：15% </view>
      <view>6、sVip体验卡1月：10% </view>
      <view>7、现金红包20元：5%</view> 
      <view>8、限定聊天气泡：10% </view>
      <view>五、其它说明： </view>
      <view>1、您应持续具有完全民事行为能力并使用合法有权的自有账号参与活动，否则您的参与行为可以能将被视为无效且无权参与本活动。 </view>
      <view>2、请合法、理性的参与活动，不得利用本活动开展任何赌博或其他违法犯罪行为。</view> 
      <view>3、如平台发现用户存在欺诈、作弊以及其他不正当手段参与活动，whack社群平台有权根据其自身判断单方面取消用户参与资格、获奖资格等，并有权停发、取消该用户账户使用。 </view>
      <view>4、鉴于互联网存在诸多不确定性因素，如因不可抗力、网络、通讯线路故障等原因，导致活动出现异常，平台有权采取包括但不限于通过各种方式消除异常情况或调整、暂停、取消本活动等措施，因此对用户造成的损失，平台不承担任何责任。</view>
    </view>
  </view>
</template>

<script setup>
  const emit = defineEmits(['closePopup'])
  function closePopup(){
    emit('closePopup')
  }
</script>

<style lang="scss" scoped>
  .rule-popup {
    position: relative;
    padding: 28rpx 30rpx 0 34rpx;
    width: 590rpx;
    height: 762rpx;
    background: #4375FF;
    border-radius: 24rpx;
    border: 2px solid transparent;
    background: 
      linear-gradient(#4375FF, #4375FF) padding-box,
      linear-gradient(180deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.18)) border-box;
    background-clip: padding-box, border-box;
    .rule-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .tit {
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 36rpx;
      color: #FFFFFF;
      line-height: 48rpx;
    }
    .close {
      position: absolute;
      top: 32rpx;
      right: 30rpx;
      width: 33rpx;
      height: 33rpx;
    }
    .rule-cont {
      height: 652rpx;
      overflow-y: scroll;
      margin-top: 24rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(255,255,255,0.6);
      line-height: 48rpx;
    }
  }
</style>