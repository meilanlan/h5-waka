<template>
  <view class="wrapper">
   <!-- <myCustomNavbar
    :navStyle="{background:'#ffffff',color:'#000000'}"
     backIcon="../../static/image/btn_back.png" 
     @backPage="backPage"
     ></myCustomNavbar> -->
    <myCustomNavbar title="" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-box">
        <image src="/static/image/fraudPrevention/01.jpg" mode="widthFix"></image>
        <image src="/static/image/fraudPrevention/02.jpg" mode="widthFix"></image>
        <image src="/static/image/fraudPrevention/03.jpg" mode="widthFix"></image>
        <image src="/static/image/fraudPrevention/04.jpg" mode="widthFix"></image>
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