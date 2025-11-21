<template>
  <view class="wrapper" >
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="会员中心" @backPage="backPage" />
    <template v-if="infoFlag===true">
      <view class="robotList">
        <view class="list">
          <view class="left">
            <view class="headimg">
              <image :src="userInfo.data.user?.head_img || gender" mode="aspectFill"></image>
            </view>
            <view class="info">
              <view class="">
                <view class="name textEllipsis">
                  <text>{{userInfo.data.user?.nick_name}}</text>
                  <image v-for="(img,imgIdx) in userInfo.data.user?.ic_list" :key="imgIdx" class="cv" :src="img" mode="heightFix"></image>
                </view>
              </view>
              <view class="ing">
                <text class="date" v-if="curTabCompont===0&&userInfo.data.user.vip_endtime>0">
                  有效期至：{{ getCurDate(userInfo.data.user.vip_endtime) }} ｜
                </text>
                <text class="date" v-else-if="curTabCompont===1&&userInfo.data.user.svip_endtime>0">
                  有效期至：{{ getCurDate(userInfo.data.user.svip_endtime) }} ｜
                </text>
                <text class="ing-text">{{userInfo.data.energy?.banlance}}能量</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <image class="bg" src="../../static/image/bg_wxq_2.jpg" mode=""></image>
      <view class="wrapper-cont">
        <vipCenterX :vip="userInfo.data.vip" @checkTab="checkTab"></vipCenterX>
      </view>
    </template>
  </view>
</template>

<script setup>
  import { reactive,ref,nextTick,provide } from 'vue';
  import {onLoad} from '@dcloudio/uni-app'
  import {userProfileApi} from '@/service/robotAccount/index.js'
  import vipCenterX from '../robotAccount/components/vip-center-x.vue';
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  // import {getDate} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  
  const boyHeadimg = new URL("@/static/image/boy.png", import.meta.url).href
  const girlHeadimg = new URL("@/static/image/girl.png", import.meta.url).href
  const infoFlag = ref(false)
  const userInfo = reactive({data:{}})
  const curTabCompont = ref(0)
  const gender = ref()
  provide('parentGroupInfo',{group_id: 0})
  
  function backPage() {
    window.client.closeWebview()
  }
  
  function getCurDate(timestamp){
    const dd = new Date(timestamp * 1000);  // 转换为毫秒
    const year = dd.getFullYear();
    const month = String(dd.getMonth() + 1).padStart(2, '0');
    const day = String(dd.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  function checkTab(i){
    curTabCompont.value = i || 0
  }
  
  function getUserProfile(){
    uni.showLoading()
    
    userProfileApi({group_id: 0,channel:window.isiOS?'ios':'android'}, res => {
      if (res.code === 0) {
        userInfo.data = res.data
        infoFlag.value = true
        uni.hideLoading()
      } else{
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  onLoad(option=>{
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            gender.value = window.userinfo.user.gender===1?boyHeadimg:girlHeadimg
            getUserProfile()
        });
    })
  })
  
</script>

<style scoped lang="scss">
  .wrapper {
    padding-top: 88rpx;
    min-height: 100vh;
    background-color: #ffffff;
    :deep .wrapper {
      padding-top: 0;
      .tab-list {
        margin-top: 48rpx;
      }
    }
    .bg {
      display: block;
      width: 686rpx;
      height: 272rpx;
      margin: 0 auto;
      border-radius: 24rpx;
      // position: absolute;
      // top: 0;
      // left: 0;
    }
    .wrapper-cont {
      // padding-top: 314rpx;
      padding: 0 32rpx;
      position: relative;
    }
    .list {
      box-shadow: none;
      border-radius: 0;
      height: auto;
      padding: 18rpx 32rpx;
      margin-bottom: 14rpx;
      .headimg {
        width: 112rpx;
        height: 112rpx;
      }
      .info {
        .name {
          // width: 400rpx;
        }
        .ing {
          margin-top: 20rpx;
          font-size: 28rpx;
          .date {
            color: rgba(0, 0, 0, 0.6);
          }
          .ing-text {
            color: #22C0FF;
          }
        }
        .time {
          display: inline-block;
          margin-top: 15rpx;
          padding: 0 10rpx;
          height: 40rpx;
          background: rgba(0,0,0,.2);
          border-radius: 4rpx;
          text-align: center;
          line-height: 40rpx;
          font-size: 24rpx;
        }
        .cv {
          margin-left: 8rpx;
        }
      }
    }
  }
</style>