<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="2025年个税新政" @backPage="backPage" />
    
    <view class="mt32">自2025年10月1日起，所有个人用户，凡是涉及提现的收入，都将按照“劳务报酬”项目进行累计预扣个税，适用3%—45%的超额累进税率。</view>
    <view>个人的“劳务报酬”税费规则，根据《国家税务总局关于互联网平台企业为平台内从业人员办理扣缴申报、代办申报若干事项的公告》规定执行，具体可以关注国家税务总局网站了解相关政策。</view>
    <view>税务政策执行并非平台自主决定，而是遵守国家税务总局在2025年6月发布的《关于互联网平台企业为平台内从业人员办理扣缴申报、代办申报若干事项的公告》。</view>
    <view>该政策不仅适用本平台，所有互联网平台的内容创作者、自由职业者和服务提供者都需要按照相关税务政策执行。</view>
    <view>为遵循国家个税新政规定，平台灵活用工人员应完成电子签约。电子签约对于灵活用工人员而言，核心优势在于高效、安全与法律保障。 本平台采用合规第三方电子签约服务平台提供电子签约服务，最快1分钟就能完成签约。可以有效保障平台和灵活用工人员的合法权益，请认真阅读签约条款，确保是在本人清醒、自愿的情况下进行操作，并使用本人真实身份完成认证和签署。</view>
    <view>特此告知。</view>
    <view class="text-right">上海格乐喜网络信息科技有限公司</view>
    <view class="text-right">2025年10月1日</view>
  </view>
</template>

<script setup>
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  function backPage() {
    uni.navigateBack()
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 88rpx 32rpx;
    background-color: #ffffff;
    // font-family: MiSans, MiSans;
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
    .title {
      font-weight: 700;
      font-size: 40rpx;
      color: #000000;
      line-height: 40rpx;
      text-align: center;
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
    .font-line {
      text-decoration: underline;
    }
  }
</style>