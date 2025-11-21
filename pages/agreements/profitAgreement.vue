<template>
  <view class="profitAgreement">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="社群运营收益协议" @backPage="backPage" />
    <profitAgreementX :showTitle="false" />
  </view>
</template>

<script setup>
  import profitAgreementX from '@/pages/robotAccount/components/profit-agreement-x.vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  function backPage() {
    window.client.closeWebview()
  }
</script>

<style scoped>
  .profitAgreement {
    padding: 120rpx 32rpx;
    background-color: #ffffff;
  }
</style>