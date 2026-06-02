<template>
  <view class="wrapper">
    <myCustomNavbar title="" @backPage="backPage"></myCustomNavbar>
    <image src="/static/image/upgrade/01.jpg" mode="widthFix"></image>
    <image src="/static/image/upgrade/02.jpg" mode="widthFix"></image>
    <image src="/static/image/upgrade/03.jpg" mode="widthFix"></image>
    <image src="/static/image/upgrade/04.jpg" mode="widthFix"></image>
  </view>
  
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  function backPage() {
    window.client.closeWebview()
  }
  
  onMounted(() => {
    const appPage = document.getElementById('app')
    if (appPage) {
      appPage.style.paddingTop = 0
    }
  })
</script>

<style scoped>
  image {
    display: block;
    width: 100vw;
  }
</style>