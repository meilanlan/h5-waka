<template>
  <view class="wrapper">
    <myCustomNavbar backIcon="../../static/image/btn_back_white.png" title="" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-box">
        <image src="/static/image/dayOfLove/01.jpg" mode="widthFix"></image>
        <image src="/static/image/dayOfLove/02.jpg" mode="widthFix"></image>
        <image src="/static/image/dayOfLove/03.jpg" mode="widthFix"></image>
    </view>
    
  </view>
</template>

<script setup>
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  function backPage() {
    window.client.closeWebview()
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    width:100vw;
    height: 100vh;
  }
  .wrapper-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
  }
  image {
    width: 100vw;
    display: block;
  }
</style>