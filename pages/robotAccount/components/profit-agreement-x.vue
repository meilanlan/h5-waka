<template>
  <view class="agreement-wrapper">
    <scroll-view scroll-y="true" >
      <view class="title" v-if="props.showTitle===true">社群运营收益协议</view>
      
      <view class="content">
        <view>1、收益范围说明：</view>
        
        <view>您在使用Whack APP运营社群时，可以获得各类能够兑换成为嗨豆的社群收益嗨币（包括但不限于社群贵族礼物、群内游戏互动、社群PK战、宝宝升级等），收益嗨币需要转换为嗨豆后才能提现，转换比例为10嗨币等于1嗨豆，您可在我的-收益页面中查看账户信息并进行提现操作。</view>
        
        <view>2、收益账户说明：</view>
        
        <view>（1）收益嗨币账户：社群成员在社群内消费的嗨币，按照平台分成比例计入社群的收益嗨币账户，收益嗨币可以根据比例兑换成为提现使用的嗨豆。群主通过充值获得的嗨币，不能直接兑换成嗨豆。</view>
        <view>（2）嗨豆账户：账户中的嗨豆是通过社群收益嗨币兑换获得，嗨豆账户余额可以提交提现申请。 </view>
        <view>（1）提现账户：通过嗨豆申请提现后，提现账户显示提现金额，嗨豆兑换人民币比例为1:1，平台审核完成后进行打款流程。</view>
        
        <view>3、提现规则说明：</view>
        <view>（1）提现时间：每天可以提交一次提现申请，由于财务审核、遇节假日、不可抗力等原因，部分时间段将无法支持提现操作，具体请以提现页面信息为准。</view>
        <view>（2）提现额度：除另有约定外，单笔提现不少于10嗨豆，Whack可能会根据法律法规或第三方支付渠道（如支付宝）要求设置每日提现上限，具体请以提现页面信息为准。</view>
        <view>（3）提现时限：除另有约定外，每天可以提交提现申请，提交申请后5个工作日内进行打款。</view>
        <view>（4）到账时间：<span class="font-bold">具体以第三方支付渠道（如支付宝、银行）为准，请耐心等待。</span></view>
        <view>（5）税费说明：Whack将会为您代缴个税，用户在提现时会显示需要扣除的税费金额。</view>
        <view>（6）提现条件：您应满足嗨豆提现的前置条件，并根据提现页面提示的流程、规范进行提现操作。如因您自身原因导致提现失败（包括但不限于未按提现要求操作、未完成实名认证、未绑定收款账号、实名认证信息有误或已绑定其他Whack账号、实名认证信息/预留的收款账号信息/第三方支付渠道账号不一致、已与第三方支付渠道解绑账号等），Whack无需承担任何责任。</view>
        <view>（7）承诺与保证：您理解并同意，如您存在违反法律法规、《Whack用户协议》及其他Whack协议规范、活动规则的行为，或通过任何不正当、违反诚实信用原则的方式（包括但不限于提供虚假信息、反复注销注册、利用机器人软件/蜘蛛软件等技术手段）进行提现，Whack有权单方面中止/终止向您提供全部或部分Whack服务（包括但不限于获取嗨豆收益的资格），并有权拒绝您的嗨豆提现申请或要求您返还已提现嗨豆收益。</view>
        
      </view>
    </scroll-view>
  </view>
    
</template>

<script setup>
  
  const props = defineProps({
    showTitle:{
      type: Boolean,
      default:true
    }
  })
</script>

<style lang="scss" scoped>
  .agreement-wrapper {
    height: 100%;
    // font-family: 'MiSans';
    uni-scroll-view {
      height: 100%;
    }
    .title {
      font-weight: 700;
      font-size: 40rpx;
      color: #000000;
      line-height: 40rpx;
      text-align: center;
      padding: 20rpx 0 30rpx;
    }
  }
 
  .content {
    view {
      margin-bottom: 20rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0,0,0,0.8);
      line-height: 48rpx;
    }
    .mt32 {
      margin-top: 60rpx;
    }
    
    .text-right {
      text-align: right;
    }
    .text-indent {
      text-indent: 66rpx;
    }
    .font-bold {
      font-weight: bold;
    }
  }
</style>