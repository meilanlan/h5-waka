<template>
  <view class="content need_scroll_top_view " id="navbarHeight">
    <myCustomNavbar 
    :navBg="robotInfo.data.bg_img_url||navbarBgImg" 
    backIcon="../../static/image/btn_back_white.png" 
    :navBgStyle="{height: '460rpx'}" 
    :navStyle="{background: 'url('+(robotInfo.data.bg_img_url||navbarBgImg)+') no-repeat'}"
    @backPage="backPage"
    >
      <image class="share" src="/static/image/share.png" @click="toShare"></image>
    </myCustomNavbar>
    <view class="top navBar">
      <view class="robotList">
        <view class="list">
          <view class="left" v-if="robotInfo.data.group_id">
            <view class="headimg">
              <!-- <image src="https://res.whackgroup.com/user/10000000/group/fc3613383d744280b7d565c045fe1f6b.jpeg" mode="aspectFill"></image> -->
              <image :src="robotInfo.data.group_cover" mode="aspectFill"></image>
              <!-- <view class="off-text" v-show="!robotInfo.is_alive">离线</view> -->
            </view>
            <view class="info">
              <view class="">
                <view class="name textEllipsis">
                  <text>{{robotInfo.data.group_name}}</text>
                  <image v-for="(img,imgIdx) in robotInfo.data.ic_list" :key="imgIdx" class="cv" :src="img" mode="heightFix"></image>
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
          <!-- 数据同步 -->
          <data-sync-x v-else-if="groupInfo.tabId === 6 && robotInfo.data.group_id" :robotInfo="robotInfo.data"></data-sync-x>
          <!-- 群设置 -->
          <group-set-x v-else-if="groupInfo.tabId === 7 && robotInfo.data.group_id" :robotInfo="robotInfo.data"></group-set-x>
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
  import dataSyncX from './components/data-sync-x.vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import navbarBgImg from '@/static/image/bg_wxq.jpg'
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
    lineLeft: "8%",
  })
  const adminConfigInfo=ref(null)
  const adminToken = ref('')
  const flagLock = ref(false)
  
  function toShare(){
    console.log('share img')
  }
  
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
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
        groupInfo.loading = false
      }
    })
  }
  function switchTab(tabId) {
    groupInfo.tabId = tabId
  }
  onLoad(option=>{
    uni.showLoading()
    groupInfo.group_id = option.group_id
    groupInfo.tabId = option.pid*1 || 1
    // groupInfo.origin = option.origin*1 || 1
    provide('parentGroupInfo', {group_id:groupInfo.group_id})
    
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            flagLock.value = true
            getGroupInfo()
        });
    })
  })
  
  function backPage() {
    window.client.closeWebview()
  }
  
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 88rpx;
    min-height: 100vh;
    .top {
      width: 100vw;
      position: relative;
      
      .robotList {
        // margin-top: 128rpx;
        .list {
          box-shadow: none;
          margin-bottom: 0;
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
        position: relative;
        padding-top: 128rpx;
      }
    }
    .groupList {
      margin-top: 24rpx;
      width: 100%;
      // min-height: calc(100vh - 300rpx);
      background: #ffffff;
      border-top-left-radius: 24rpx;
      border-top-right-radius: 24rpx;
      padding: 24rpx 0;
      box-sizing: border-box;
      position: relative;
      &.newBgColor {
        background: linear-gradient(to bottom, #ffffff, #F4F5F7);
      }
      
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
  .share {
    position: absolute;
    right: 32rpx;
    top: 50%;
    transform: translateY(-50%);
    width: 48rpx;
    height: 48rpx;
  }
</style>