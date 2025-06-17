<template>
  <view class="content need_scroll_top_view">
    <image class="bg" :src="robotInfo.data.bg_img_url||'../../static/image/bg_wxq.jpg'" @error="imgError"></image>
    <view class="top navBar">
      <view class="common-header">
        <image class="back" src="@/static/image/btn_back_white.png" @click="backPage"></image>
        <!-- <text>群空间</text> -->
      </view>
      <view class="robotList">
        <view class="list">
          <view class="left" v-if="robotInfo.data.group_id">
            <view class="headimg">
              <image :src="robotInfo.data.group_cover" mode=""></image>
              <!-- <view class="off-text" v-show="!robotInfo.is_alive">离线</view> -->
            </view>
            <view class="info">
              <view class="">
                <view class="name textEllipsis">
                  <text>{{robotInfo.data.group_name}}</text>
                  <image v-show="robotInfo.data.ic_list.length" class="cv" :src="robotInfo.data.ic_list[0]" mode="aspectFit"></image>
                </view>
              </view>
              <view class="ing">
                <div class="ing-box">
                  <image class="ing-icon" src="@/static/image/group.png"></image>{{robotInfo.data.group_user_count}}人
                </div>
                ID:{{robotInfo.data.group_id}}
              </view>
              <!-- <view class="time">{{robotInfo.data.service_time}}</view> -->
              <!-- <view class="medal">
                群勋章:
                <image src="@/static/image/grade.png"></image>
                <image src="@/static/image/grade.png"></image>
              </view> -->
            </view>
          </view>
        </view>
      </view>
    </view>
  
    
    <view :class="['groupList navBar', groupInfo.tabId === 3 && 'newBgColor']">
      <view class="ad" v-if="robotInfo.data.ad_img_url" @click="openPage">
        <image :src="robotInfo.data.ad_img_url" mode=""></image>
      </view>
      <!-- tab切换的组件 -->
      <tab-x :tabId="groupInfo.tabId" @switchTab="switchTab"></tab-x>
      <template v-if="flagLock">
          <!-- 群空间 -->
          <group-space-x v-if="groupInfo.tabId === 1"></group-space-x>
          <!-- 群指令 -->
          <instruction-x v-else-if="groupInfo.tabId === 2"></instruction-x>
          <!-- 我的主页 -->
          <my-home-x v-else-if="groupInfo.tabId === 3" :robotInfo="robotInfo.data"></my-home-x>
          <!-- 机器人 -->
          <robot-x v-else-if="groupInfo.tabId === 4"></robot-x>
          <!-- 群收益 -->
          <group-profit-x v-else-if="groupInfo.tabId === 5"></group-profit-x>
          <!-- 群设置 -->
          <group-set-x v-else-if="groupInfo.tabId === 6 && robotInfo.data.group_id" :robotInfo="robotInfo.data"></group-set-x>
      </template>
      
    </view>
  
  </view>
</template>

<script setup>
  import {defineComponent, ref, reactive, provide, nextTick} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  // import {scrollToTargetPosition} from '@/mixin/index.mixin.js'
  import {groupDetailData,groupInfoApi} from '@/service/robotAccount/index.js'
  import TabX from './components/tab-x.vue'
  import groupSpaceX from './components/group-space-x.vue'
  import instructionX from './components/instruction-x.vue'
  import myHomeX from './components/my-home-x.vue'
  import robotX from './components/robot-x.vue'
  import groupProfitX from './components/group-profit-x.vue'
  import groupSetX from './components/group-set-x.vue'
  // defineComponent({
  //   mixins: [scrollToTargetPosition]
  // })
  const robotInfo = reactive({data:{
    ad_img_url: "",
    ad_jump_url: "",
    bg_img_url: "",
    group_cover: "",
    group_id: "",
    group_name: "",
    member_count: 0,
    service_name: "",
    service_status: 0,
    service_time: ""
  }})

  const groupInfo = reactive({
    robot_id: '',
    group_id: '',
    tabId: '',
    origin: 1,// 1: 买家端进入群设置   2: 群空间进入群设置
    loading: false,
    defaultTopBg: new URL("@/static/image/bg_wxq.jpg", import.meta.url).href,
    lineLeft: "8%",
  })
  const adminConfigInfo=ref(null)
  const adminToken = ref('')
  const flagLock = ref(false)
  
  function openPage() {
    if (robotInfo.data.ad_jump_url) {
      window.open(decodeURIComponent(robotInfo.data.ad_jump_url), '_self');
    }
  }
  
  function initPageData(){
    // this.lineLeft = this.tabId === 1? '8%' : this.tabId === 2 ? '26%' : '44%'
    if(groupInfo.tabId === 1) {
      // this.menuIndex=0
      // groupUserInfo()
    } else {
      // this.setMenuIndex = 0
      // if(groupInfo.tabId === 3 && (this.adminToken || (this.origin===1&&this.userToken))) this.getGroupSummaryInfo()
    }
  }
  
  async function getGroupInfo() { //获取群主页的信息
    await groupInfoApi({group_id: groupInfo.group_id}, res => {
      if (~~res.code === 0) {
        robotInfo.data = res.data
        provide('parentRobotInfo',robotInfo.data )
        groupInfo.loading = false
        uni.hideLoading()
      }else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
        groupInfo.loading = false
      }
    })
    // await groupDetailData({group_id: groupInfo.group_id}, res => {
    //   if (~~res.code === 0) {
    //     robotInfo.data = res.data
    //     provide('parentRobotInfo',robotInfo.data )
    //     groupInfo.loading = false
    //     uni.hideLoading()
    //   }else {
    //     if (res.code != -10002){
    //       uni.showToast({
    //         title: res.msg,
    //         icon: 'none'
    //       });
    //     }
    //     uni.hideLoading()
    //     groupInfo.loading = false
    //   }
    // })
  }
  function back () {
    uni.navigateBack();
  }
  
  function switchTab(tabId) {
    groupInfo.tabId = tabId
    console.log(tabId, 'tabId is')
  }
  
  
  onLoad(option=>{
    uni.showLoading()
    
    // groupInfo.robot_id = option.robot_id
    groupInfo.group_id = option.group_id
    provide('parentGroupInfo', {group_id:groupInfo.group_id})
    groupInfo.tabId = option.pid*1 || 1
    groupInfo.origin = option.origin*1 || 1
    // if (option.key && option.kid) {
    //   uni.setStorageSync('user-id',option.kid)
    //   uni.setStorageSync('user-token',option.key)
    // }
    // adminConfigInfo.value = uni.getStorageSync('ADMIN_CONFIG') || {}
    // if (!adminConfigInfo.value[option.group_id] && option.origin === 2) {
    //   adminToken.value = ''
    //   adminConfigInfo.value[option.group_id] = {"group_id": groupInfo.group_id,"admin_token": '',"robot_id": option.robot_id}
    //   uni.setStorageSync('ADMIN_CONFIG', adminConfigInfo.value)
    // } else {
    //   adminConfigInfo.value[groupInfo.group_id]&&(adminToken.value = adminConfigInfo.value[groupInfo.group_id]['admin_token'])
    // }
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            flagLock.value = true
            // initPageData()
            getGroupInfo()
        });
    })
    
    // this.groupUserInfo()
  })
  
  function imgError(e) {
    robotInfo.data.bg_img_url = groupInfo.defaultTopBg
  }
  
  function backPage() {
    window.client.closeWebview()
    // uni.navigateTo({
    // 	url: `/pages/robotAccount/index?wx_id=${groupInfo.robot_id}`
    // });
  }
  
</script>

<style lang="scss" scoped>
  .content {
    position: relative;
    .bg {
      width: 100%;
      height: 460rpx;
      position: absolute;
      top: 0;
      left: 0;
    }
    .top {
      width: 100vw;
      // height: 264rpx;
      position: relative;
      
      .common-header {
        justify-content: center;
        text {
          color: #FFFFFF;
          z-index: 10;
        }
        .back {
          
        }
      }
      
      .robotList {
        margin-top: 128rpx;
        .list {
          box-shadow: none;
          .info {
            .name {
              // width: 400rpx;
            }
            .ing {
              margin-top: 20rpx;
              // font-size: 24rpx;
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
          }
        }
      }
      &.navBar {
        // height: 440rpx;
        position: relative;
        padding-top: 88rpx;
        .common-header {
          .back {
            // top: 100rpx;
          }
        }
      }
    }
    .groupList {
      width: 100%;
      min-height: calc(100vh - 400rpx);
      background: #ffffff;
      border-top-left-radius: 24rpx;
      border-top-right-radius: 24rpx;
      padding: 32rpx 0;
      box-sizing: border-box;
      &.newBgColor {
        background: linear-gradient(to bottom, #ffffff, #F4F5F7);
      }
      // &.navBar {
      //   top: 370rpx;
      // }
      
      .ad {
        // padding: 0 30rpx;
        margin-bottom: 46rpx;
        width: 100%;
        height: 180rpx;
        position: relative;
        cursor: pointer;
        // &::after {
        //   content: '广告';
        //   width: 100rpx;
        //   height: 44rpx;
        //   background: rgba(0,0,0,.2);
        //   border-radius: 0 20rpx 0 20rpx;
        //   border: 1px solid rgba(255,255,255,.2);;
        //   text-align: center;
        //   line-height: 44rpx;
        //   color: #ffffff;
        //   font-size: 24rpx;
        //   position: absolute;
        //   right: 30rpx;
        //   top: 0;
        // }
        image {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
    }
    
  }
</style>