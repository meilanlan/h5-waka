<template>
  <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="使用说明" @backPage="backPage"></myCustomNavbar>
</template>

<script setup>
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  
  function backPage() {
    window.client.closeWebview()
  }
</script>

<style>
</style>