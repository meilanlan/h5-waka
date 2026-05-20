<template>
  <view class="wrapper">
    <myCustomNavbar title="" @backPage="backPage"></myCustomNavbar>
    <image src="/static/image/fraudPrevention/01.jpg" mode="widthFix"></image>
    <image src="/static/image/fraudPrevention/02.jpg" mode="widthFix"></image>
    <image src="/static/image/fraudPrevention/03.jpg" mode="widthFix"></image>
    <image src="/static/image/fraudPrevention/04.jpg" mode="widthFix"></image>
  </view>
</template>

<script setup>
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import {onMounted } from 'vue';
  
  function backPage() {
    window.client.closeWebview()
  }
  onMounted(()=>{
    const appPage = document.getElementById('app');
    appPage.style.paddingTop = 0;
  })
</script>

<style scoped>
  .wrapper {
    width:100vw;
  }
  image {
    width: 100vw;
    display: block;
  }
</style>