
<template>
  <view class="custom-navbar">
    <image v-if="props.navBg" ref="top" :src="props.navBg" :style="props.navBgStyle" class="nav-bg"></image>
    <!-- 左侧返回按钮 -->
    <view class="nav-wrapper" :style="{
      paddingTop: statusBarHeight + 'px',
      ...props.navStyle
    }">
      <view class="nav-box" >
      <!-- <view class="nav-box" :style="{
          paddingTop: statusBarHeight + 'px',
          ...props.navStyle
        }"> -->
        <view ref="top" v-if="props.showBack===true" @click="handleBack" class="return-btn">
          <image :src="props.backIcon?props.backIcon:defaultBackIcon"></image>
        </view>
        <!-- 自定义左侧区域 -->
        <slot name="leftTitle"></slot>
        <!-- 居中标题 -->
        <view class="nav-title">{{ title }}</view>
        <!-- 右侧操作区 -->
        <!-- <view class="nav-right" v-if="showRightIcon"> -->
        <view class="nav-right">
          <slot></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import defaultBackIcon from '@/static/image/btn_back.png'

const props = defineProps({
  navBg: String,
  navBgStyle: Object,
  backgroundColor: Object,
  navStyle: Object,
  title: String,
  backIcon: String,
  showBack: {
    type: Boolean,
    default: true
  }
})

const statusBarHeight = ref(0)
const emits = defineEmits(['backPage'])


statusBarHeight.value = uni.getStorageSync('paddingTop')

const handleBack = () => {
  emits('backPage')
}

// const handleRefresh = () => {
//   emits('refresh')
// }
</script>

<style scoped lang="scss">
.custom-navbar {
  .nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-size: 100% auto !important;
  }
  .nav-box {
    height: 88rpx;
    line-height: 88rpx;
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    // z-index: 99;
    text-align: center;
    position: relative;
  }
  .nav-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
}
.return-btn {
  width: 48rpx;
  height: 48rpx;
  position: absolute;
  left: 32rpx;
  top: 50%;
  transform: translateY(-50%);
  image {
    width: 48rpx;
    height: 48rpx;
    display: inline;
  }
}
.nav-title {
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
  font-size: 32rpx;
}
</style>
