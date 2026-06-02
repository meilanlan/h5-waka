<template>
  <view class="wrapper">
    <myCustomNavbar backIcon="../../static/image/btn_back_white.png" title="" @backPage="backPage">
      <image class="kingsLogo" src="/static/image/kings/kingsLogo.png" mode="widthFix"></image>
      <image class="share-btn" src="/static/image/kings/share.png" mode="widthFix" @click="openSharePopup"></image>
    </myCustomNavbar>
    <!-- <image class="kingsLogo" src="/static/image/kings/kingsLogo.png" mode="widthFix"></image> -->
    <image class="img" src="/static/image/kings/bg.jpg" mode="widthFix"></image>
    <image class="img img-1" src="/static/image/kings/cont.png" mode="widthFix"></image>
    <!-- <image class="share-btn" src="/static/image/kings/share.png" mode="widthFix" @click="openSharePopup"></image> -->
    <view class="btn" @click="openPage">
      <image src="/static/image/kings/btn.png" mode="widthFix"></image>
    </view>
    
    <uni-popup ref="sharePopup" type="bottom" :safe-area="false">
      <view class="common-popup">
        <view class="popup-tit">
          <view class="title">分享到</view>
          <image src="/static/image/close.png" class="close" @click="sharePopup.close()"></image>
        </view>
        <view class="popup-cont">
          <!-- <view class="box" @click="shareToWechat(1)">
            <image src="/static/image/kings/wx.png" mode="widthFix"></image>
            微信好友
          </view>
          <view class="box" @click="shareToWechat(2)">
            <image src="/static/image/kings/friend.png" mode="widthFix"></image>
            朋友圈
          </view> -->
          <view class="box" @click="copyLink">
            <image src="/static/image/kings/line.png" mode="widthFix"></image>
            复制链接
          </view>
          <view class="box" @click="drawCanvas">
            <image src="/static/image/kings/line.png" mode="widthFix"></image>
            生成海报
          </view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="imagePopup" type="center" :safe-area="false">
      <view class="poster-popup">
        <image src="/static/image/close.png" class="close-btn" @click="closePosterPopup"></image>
        <view class="poster-container">
          <image v-if="posterImage" :src="posterImage" class="poster-image" mode="widthFix"></image>
          <canvas v-else canvas-id="posterCanvas" id="posterCanvas" class="poster-canvas"></canvas>
        </view>
        <view class="save-btn">截图保存</view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import { wechatShareApi } from '@/service/robotAccount/index'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  const sharePopup = ref(null)
  const imagePopup = ref(null)
  const currentUrl = ref(window.location.href.split('#')[0] + '#/pages/shareh5/kingsRegistration?show_title=0')
  const shareTitle = ref('Whack王者杯')
  const shareDesc = ref('王者荣耀全民赛事报名')
  const shareImg = ref(window.location.origin + '/static/image/kings/bg.jpg')
  const wxReady = ref(false)
  const posterImage = ref('')
  // 缓存海报图片地址
  let cachedPosterImage = ''
  
  function backPage() {
    window.client.closeWebview()
  }
  
  function openPage(){
    window.location.href='https://h5.nes.smoba.qq.com/pvpesport.next.user/views/match/match-detail-index?childid=76323602&adtag=wxsharechat'
    // window.client.openPage()
  }
  
  function drawCanvas() {
    sharePopup.value.close()
    imagePopup.value.open()
    // 如果有缓存的海报，直接显示
    if (cachedPosterImage) {
    //   posterImage.value = cachedPosterImage
      return
    }
    
    // 显示loading
    uni.showLoading({ title: '海报生成中' })
    
    // 等待弹窗渲染完成
    setTimeout(() => {
      generatePoster()
    }, 300)
  }
  
  /**
   * 生成海报
   */
  function generatePoster() {
    const mainImg = '/static/image/kings/bg-2.jpg'
    
    uni.getImageInfo({
      src: mainImg,
      success: (imgInfo) => {
        const imgWidth = imgInfo.width
        const imgHeight = imgInfo.height
        // console.log('图片原始尺寸:', imgWidth, imgHeight)
        
        // 获取屏幕信息
        const systemInfo = uni.getSystemInfoSync()
        const screenWidth = systemInfo.windowWidth
        const dpr = systemInfo.pixelRatio || 2
        
        // 计算画布尺寸（弹窗宽度85%）
        const canvasWidth = screenWidth * 0.85
        const canvasHeight = (canvasWidth / imgWidth) * imgHeight
        
        // console.log('画布尺寸:', canvasWidth, canvasHeight)
        
        // 创建一个脱离DOM的canvas来绘制
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // 设置canvas实际像素尺寸（考虑设备像素比）
        canvas.width = canvasWidth * dpr
        canvas.height = canvasHeight * dpr
        // console.log(canvas.height,'canvas.height')
        // 设置缩放
        ctx.scale(dpr, dpr)
        
        // 绘制白色背景
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        
        // 加载图片并绘制
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          // 按画布尺寸完整绘制图片
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
          // console.log('图片绘制完成')
          
          // 导出为base64
          const dataURL = canvas.toDataURL('image/png')
          // console.log('导出成功，base64长度:', dataURL.length)
          
          cachedPosterImage = dataURL
          posterImage.value = dataURL
          uni.hideLoading()
        }
        img.onerror = () => {
          // console.error('图片加载失败')
          uni.hideLoading()
          uni.showToast({ title: '生成海报失败', icon: 'none' })
        }
        img.src = mainImg
      },
      fail: () => {
        console.error('获取图片信息失败')
        // 直接用固定尺寸
        generatePosterFallback(mainImg)
      }
    })
  }
  
  /**
   *使用固定尺寸生成海报
   */
  function generatePosterFallback(imgSrc) {
    const systemInfo = uni.getSystemInfoSync()
    const screenWidth = systemInfo.windowWidth
    const dpr = systemInfo.pixelRatio || 2
    
    // 使用固定宽度，高度按比例估算
    const canvasWidth = screenWidth * 0.85
    const canvasHeight = canvasWidth * 1.5  // 假设图片比例约为2:3
    
    console.log('降级方案 - 画布尺寸:', canvasWidth, canvasHeight)
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    ctx.scale(dpr, dpr)
    
    // 绘制白色背景
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // 确保图片完整显示
      const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height)
      const drawWidth = img.width * scale
      const drawHeight = img.height * scale
      const drawX = (canvasWidth - drawWidth) / 2
      const drawY = (canvasHeight - drawHeight) / 2
      
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
      
      const dataURL = canvas.toDataURL('image/png')
      cachedPosterImage = dataURL
      posterImage.value = dataURL
      uni.hideLoading()
    }
    img.onerror = () => {
      console.error('图片加载失败')
      uni.hideLoading()
      uni.showToast({ title: '生成海报失败', icon: 'none' })
    }
    img.src = imgSrc
  }
  
  /**
   * 保存海报
   */
  function savePoster() {
    if (!posterImage.value) {
      uni.showToast({ title: '请先生成海报', icon: 'none' })
      return
    }
    uni.showLoading({ title: '保存中...' })

    // 方案2: 使用uni-app API
    downloadImageDirectly(posterImage.value)
  }

  /**
   * 直接下载图片（创建下载链接）
   */
  function downloadImageDirectly(imageUrl) {
    // 创建隐藏的可下载链接
    const eleLink = document.createElement('a')
    eleLink.download = 'poster_' + Date.now() + '.png'
    eleLink.style.display = 'none'
    
    // 判断图片格式
    // if (imageUrl.startsWith('data:image/')) {
    //     console.log(imageUrl,'imageUrl')
    //   // base64格式：直接作为href使用，浏览器原生支持data URL下载
    //   eleLink.href = imageUrl
    // } else {
      // 其他格式：转为blob
      // 将base64转为真正的二进制数据
      const byteString = atob(imageUrl.split(',')[1])
      const mimeType = imageUrl.split(',')[0].match(/:(.*?);/)[1]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], { type: mimeType })
      console.log(blob,'blob')
      eleLink.href = URL.createObjectURL(blob)
    // }
    
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 移除
    document.body.removeChild(eleLink)
    
    uni.hideLoading()
    uni.showToast({ 
      title: '图片已下载，请在文件管理中查找', 
      icon: 'none',
      duration: 2000
    })
  }
  
  /**
   * 关闭海报弹窗
   */
  function closePosterPopup() {
    imagePopup.value.close()
  }
  
 
  /**
   * 复制链接
   */
  function copyLink() {
    sharePopup.value.close()
    copyToClipboard(currentUrl.value)
  }
  
  /**
   * 复制到剪贴板
   */
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;'
    document.body.appendChild(textarea)
    textarea.select()
    textarea.setSelectionRange(0, 99999)
    
    try {
      const successful = document.execCommand('copy')
      uni.showToast({
        title: successful ? '链接已复制' : '复制失败',
        icon: successful ? 'success' : 'none'
      })
    } catch (e) {
      console.error('复制失败:', e)
      uni.showToast({ title: '复制失败，请手动复制', icon: 'none' })
    } finally {
      document.body.removeChild(textarea)
    }
  }
  
  /**
   * 打开分享弹窗
   */
  function openSharePopup() {
    sharePopup.value.open()
  }
  
  onMounted(() => {
    const appPage = document.getElementById('app')
    if (appPage) {
      appPage.style.paddingTop = 0
    }
  })
</script>

<style scoped lang="scss">
  .wrapper {
    padding-bottom: 238rpx;
    width: 100vw;
    min-height: 100vh;
    background-color: #3C5CFF;
    position: relative;
    .kingsLogo {
      width: 423rpx;
      position: absolute;
      top: 50%;
      left: 80rpx;
      transform: translateY(-50%);
    }
    .share-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 40rpx;
      width: 128rpx;
      
    }
    
    .img {
      display: block;
      width: 100vw;
    }
    
    .img-1 {
      margin-top: -116rpx;
    }
    
    .btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 238rpx;
      padding-top: 34rpx;
      background: linear-gradient(180deg, rgba(60, 92, 255, 0) 0%, #3C5CFF 25.64%);
      
      image {
        display: block;
        margin: 0 auto;
        width: 650rpx;
      }
    }
  }
  
  .common-popup {
    background-color: #F0F3F8;
    height: auto;
    padding: 0;
    
    .popup-tit {
      width: 100%;
      text-align: center;
      padding: 28rpx 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      position: relative;
      
      .close {
        position: absolute;
        top: 24rpx;
        right: 24rpx;
        width: 48rpx;
        height: 48rpx;
      }
    }
    
    .popup-cont {
      padding: 48rpx 32rpx;
      display: flex;
      align-items: center;
      
      .box {
        margin-right: 52rpx;
        text-align: center;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.8);
        line-height: 32rpx;
        
        image {
          display: block;
          margin: 0 auto 16rpx;
          width: 96rpx;
          height: 96rpx;
        }
      }
    }
  }
  
  .poster-popup {
    // width: 94vw;
    // max-width: 650rpx;
    width: 80vw;
    max-width: 600rpx;
    // background-color: #ffffff;
    border-radius: 20rpx;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    
    .close-btn {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      width: 48rpx;
      height: 48rpx;
      z-index: 10;
    }
    
    .poster-container {
      width: 100%;
      overflow: hidden;
      
      .poster-canvas {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    .poster-image {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 10rpx;
    }
    .save-wrapper {
        width: 100%;
        padding: 30rpx;
        padding-top: 20rpx;
        box-sizing: border-box;
    }
    .save-btn {
      position: absolute;
      bottom: 15rpx;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: 700;
      letter-spacing: 6rpx;
    }
  }
</style>
