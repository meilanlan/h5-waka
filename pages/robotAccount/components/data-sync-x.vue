<template>
  <view class="sync-box">
    <template v-if="curSyncType===0">
      <view class="sync-btn sync-btn-1" @click="switchSyncType(1)">微信数据同步到Whack</view>
      <view class="sync-btn sync-btn-2" @click="switchSyncType(2)">Whack群内数据同步</view>
    </template>
    <template v-else>
      <image src="/static/image/btn_back.png" class="back" @click="switchSyncType(0)"></image>
      <view class="list-box">
        <view class="group-list">
          <view class="left">
            <image class="img" :src="robotInfo.group_cover" mode="aspectFill"></image>
            <view class="h1">{{robotInfo.group_name}}</view>
            <view class="h2">当前Whack群</view>
          </view>
          <image class="move-icon" src="@/static/image/set/g-1.png" mode=""></image>
          <view class="right" @click="openPopup">
            <image v-if="sureGroupInfo.data.cover" class="img" :src="sureGroupInfo.data.cover" mode="aspectFill"></image>
            <view class="img act" v-else>
              <image class="add" src="@/static/image/set/g-add.png" mode=""></image>
            </view>
            <view class="h1" v-if="!sureGroupInfo.data.group_id">点击添加</view>
            <view class="h1" v-else><image src="@/static/image/set/g-refresh.png" mode=""></image>{{sureGroupInfo.data.group_name}}</view>
            <view class="h2">{{curSyncType===1?'输入原群ID':'同步到Whack群'}}</view>
          </view>
        </view>
        <checkbox-group class="checkbox-list" @change="checkboxChange">
          <label>
            <checkbox value="1" :checked="configFlag" />群成员数据
          </label>
          <label class="checkbox-2">
            <checkbox value="2"  :checked="setFlag" />群设置
          </label>
        </checkbox-group>
        <view class="btn-start" @click="startDraw">开始同步</view>
        <!-- 封群提示 -->
       <!-- <uni-popup ref="closePopPopup" type="center" :is-mask-click="false">
          <tips-x :value="errorText" @know="know"></tips-x>
        </uni-popup> -->
      </view>
    </template>
    
    <!-- 请选择需同步的微信群 -->
    <uni-popup ref="groupPopup" type="bottom" background-color="#ffffff">
      <view class="groupPopup">
        <view class="title">{{curSyncType===1?'请选择需同步的微信群':'请选择需同步的Whack群'}}</view>
        <view class="scroll-box">
          <template v-if="curSyncType===1">
            <view class="title-box">
              在原群空间顶部找到群ID
            </view>
            <view class="inpt">
              <input class="inpt-1" v-model="wxGroupId" @blur="searchId" placeholder="输入原群ID" placeholder-style="color:#C5CCD5;fontWeight:normal">
            </view>
            <view class="robotList" v-if="curGroupInfo.data.group_id">
              <view class="title-box">
                核对原群信息
              </view>
              <view class="list">
                <!-- <view class="left"> -->
                  <view class="headimg">
                    <image :src="curGroupInfo.data.cover"></image>
                  </view>
                  <view class="info">
                    <view class="name textEllipsis">
                      <text>群名：{{curGroupInfo.data.group_name}}</text>
                    </view>
                    <view class="ing">
                      群人数: {{curGroupInfo.data.member_count}}人
                    </view>
                    <view class="ing">
                      机器人有效期：{{curGroupInfo.data.robot_end_time}}
                    </view>
                  </view>
                <!-- </view> -->
              </view>
            </view>
            
            <view class="common-empty" v-if="emptyFlag===1">
              <image src="@/static/image/empty.png" mode=""></image>
              搜索不到原群数据，请核对群ID重新尝试
            </view>
          </template>
          <template v-else>
            <scroll-view scroll-y="true" class="scroll" @scrolltolower="onReachBottom">
              <view class="robotList robotList-1" v-for="(item,index) in listInfo" :key="item.group_id">
                  <radio-group class="list" @change="radioPayChange">
                      <label class="uni-list-cell uni-list-cell-pd">
                        <view class="left">
                          <view class="headimg">
                            <image :src="item.group_cover"></image>
                          </view>
                          <view class="info">
                            <view class="name">
                              <text class="textEllipsis">{{item.group_name}}</text>
                              <image class="level" v-for="(img,imgIdx) in item.ic_list" :key="'img-'+imgIdx" :src="getImage(img)" mode="heightFix"></image>
                            </view>
                          </view>
                        </view>
                        <view class="right">
                          <radio :value="item.group_id+''" :checked="curGroupIndex === index" color="#22c0ff" />
                        </view>
                    </label>
                  </radio-group>
              </view>
              <view class="no-data" v-if="!listInfo.length">
                <image src="@/static/image/no-data.png"></image>
                <view>暂无其他Whack群数据</view>
              </view>
            </scroll-view>
            
          </template>
          
          
        </view>
        <view class="btn-sure-1" @click="sureGroup">
          <view>确认</view>
        </view>
        
      </view>
    </uni-popup>
    
    <!-- 二次确认弹窗 -->
    <uni-popup ref="surePopup" type="center">
      <view class="clearSurePopup">
        <view class="clearText" v-if="curSyncType===1">
          是否确认将 「{{curGroupInfo.data.group_name}}」的{{sureText}}同步到 「{{robotInfo.group_name}}」？
        </view>
        <view class="clearText" v-else>
          是否确认将 「{{robotInfo.group_name}}」的{{sureText}}同步到 「{{sureGroupInfo.data.group_name}}」？
        </view>
        <view class="btn-box">
          <view class="btn" @click="surePopup.close()">取消</view>
          <view class="btn btn-sure" @click="draw">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
  
</template>

<script setup>
  import { ref, reactive, provide, nextTick} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import TipsX from '@/components/tips-x/tips-x.vue'
  import {glxGroupSyncApi,glxGroupQueryApi} from '@/service/robotAccount/index.js'
  import {ownerSuperGroupsApi} from '@/service/robotAccount/index.js'
  
  const props = defineProps({
    robotInfo: {
      type: Object,
      default: () => {}
    },
    robot_id: String
  })
  const list = ref([])
  const dataType = ref([])
  const curGroupId = ref(0)
  const curGroupIndex = ref(-1)
  const emptyFlag = ref(0)
  const curGroupInfo =reactive({data: {}})
  const sureGroupInfo = reactive({data:{}})
  const sureText = ref('')
  const errorText = ref('')
  const groupPopup = ref(null)
  const surePopup = ref(null)
  const wxGroupId = ref()
  const configFlag = ref(false)
  const setFlag = ref(false)
  const curSyncType = ref(0)
  const listInfo = ref([])
  const pageInfo = reactive({
    page_id: 1,
    page_size: 20,
    total: 0
  })
  
  function onReachBottom(){
    if((listInfo.value.length+1)<pageInfo.total) {
      initWhackGroup()
    }
  }
  function initWhackGroup(){
    ownerSuperGroupsApi({page_id:pageInfo.page_id}, res => {
      if (res.code === 0) {
        res.data.list.forEach((item,index)=>{
          if(item.group_id === props.robotInfo.group_id) {
            res.data.list.splice(index,1)
          }
        })
        if(pageInfo.page_id === 1) {
          listInfo.value = res.data.list||[]
          pageInfo.total = res.data.total
        } else {
          listInfo.value = [...listInfo.value,...res.data.list]
        }
        if(sureGroupInfo.data.group_id) {
          curGroupIndex.value = listInfo.value.findIndex(item=>item.group_id === sureGroupInfo.data.group_id)
        } else {
          curGroupIndex.value = -1
        }
        pageInfo.page_id++        
        uni.hideLoading()
      } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
      }
    })
  }
  
  function radioPayChange(e){
    curGroupIndex.value = listInfo.value.findIndex(element => (element.group_id+'') === e.detail.value);
  }
  
  function getImage(level){
    return new URL(`/static/image/group-level/${level.split('_')[2]}.png`, import.meta.url).href
  }
  
  function switchSyncType(type){
    curSyncType.value = type
    wxGroupId.value = ''
    emptyFlag.value = 0
    curGroupInfo.data = {}
    curGroupIndex.value = -1
    sureGroupInfo.data = {}
    dataType.value = []
    configFlag.value = false
    setFlag.value = false
  }
  
  function searchId(){
    if(wxGroupId.value) {
      uni.showLoading()
      let id = wxGroupId.value.split('@')
      let params = {
        group_id: id[0]*1
      }
      glxGroupQueryApi(params,res=>{
        if (~~res.code === 0) {
          emptyFlag.value = 0
          curGroupInfo.data = res.data || {}
          curGroupInfo.data['group_id'] = id[0]*1
        }else {
          emptyFlag.value = 1
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
      })
    }
  }
  
  function draw() {
    uni.showLoading()
    let param = {
      group_id: props.robotInfo.group_id,
      type: curSyncType.value===1?'wx':'whack',
      glx_group_id: sureGroupInfo.data.group_id,
      sync_members: dataType.value.find(item=>item==='1')>=1?true: false,
      sync_config: dataType.value.find(item=>item==='2')>=1?true: false
    }
    glxGroupSyncApi(param, res => {
      if (~~res.code === 0) {
        uni.showToast({
          title: res.msg||'提交成功，同步结果会通过系统消息通知',
          icon: 'none'
        });
        sureGroupInfo.data = {}
        dataType.value = []
        configFlag.value = false
        setFlag.value = false
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
      surePopup.value.close()
    })
  }
  function startDraw() {
    
    if (!sureGroupInfo.data.group_id) {
      uni.showToast({
        title: curSyncType.value===1?'请添加同步的微信群':'请添加同步的Whack群',
        icon: 'none'
      });
      return false
    } else if (dataType.value.length<=0) {
      uni.showToast({
        title: '请选择需要同步的配置',
        icon: 'none'
      });
      return false
    }
    sureText.value = dataType.value.length>=2 ? '【群成员数据和群设置】' : dataType.value[0] == '1' ? '【群成员数据】' : '【群设置】';
    surePopup.value.open()
  }
  function know() {
    // this.$refs.closePopPopup.close()
  }
  function checkboxChange(e){
    dataType.value = e.detail.value
    configFlag.value = false
    setFlag.value = false
    for(let i = 0; i<e.detail.value.length; i++) {
      if(e.detail.value[i]=='1'){
        configFlag.value = true
      } else if(e.detail.value[i]=='2'){
        setFlag.value = true
      }
    }
  }
  function sureGroup() {
    if(curSyncType.value === 1) {
      if (curGroupInfo.data.group_id) {
        sureGroupInfo.data = curGroupInfo.data
        groupPopup.value.close()
      }
    } else if (curSyncType.value === 2){
      if(curGroupIndex.value != -1) {
        sureGroupInfo.data = {...listInfo.value[curGroupIndex.value]}
        sureGroupInfo.data.cover = listInfo.value[curGroupIndex.value].group_cover
        groupPopup.value.close()
      }
    }
  }
  function openPopup() {
    getgroupSynListData()
  }
  function getgroupSynListData() {
    wxGroupId.value = ''
    emptyFlag.value = 0
    curGroupInfo.data = {}
    groupPopup.value.open()
    if(curSyncType.value === 2) {
      if(!listInfo.value.length){
        initWhackGroup()
      } else {
        if(sureGroupInfo.data.group_id) {
          curGroupIndex.value = listInfo.value.findIndex(item=>item.group_id === sureGroupInfo.data.group_id)
        } else {
          curGroupIndex.value = -1
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sync-box {
    min-height: calc(100vh - 689rpx);
  }
  .list-box {
    padding: 86rpx 32rpx 60rpx;
    // margin: 32rpx 30rpx;
    background-color: #ffffff;
    // box-shadow: 0 0 20rpx 1px rgba(197, 204, 213, 0.2);
    border-radius: 20rpx;
    .group-list {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .img {
        width: 200rpx;
        height: 200rpx;
        line-height: 220rpx;
        border-radius: 10rpx;
        .add {
          width: 40rpx;
          height: 40rpx;
        }
      }
      .h1 {
        margin-top: 20rpx;
        font-weight: 500;
        font-size: 28rpx;
      }
      .h2 {
        margin-top: 12rpx;
        font-size: 24rpx;
        color: #606178;
      }
      
      .move-icon {
        width: 60rpx;
        height: 60rpx;
        margin: -80rpx 35rpx 0;
      }
      .right {
        .img {
          background: rgba(22, 117, 254, 0.1);
          border-radius: 10rpx;
          &.act {
            border: 1px solid #1675FE;
          }
        }
        .h1 {
          color: #1675FE;
          line-height: 32rpx;
          image {
            width: 32rpx;
            height: 32rpx;
            vertical-align: top;
            margin-right: 10rpx;
          }
        }
      }
      
    }
    .checkbox-list {
      margin-top: 60rpx;
      text-align: center;
      color: #000000;
      font-size: 28rpx;
      .checkbox-2 {
        margin-left: 100rpx;
      }
      :deep uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
          background-color: #1675FE;
      }
      :deep uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
        // border-color: #d1d1d1;
      }
    }
  }
  .btn-start {
    width: 100%;
    height: 80rpx;
    background-color: #1675FE;
    line-height: 80rpx;
    text-align: center;
    color: #ffffff;
    font-size: 28rpx;
    border-radius: 10rpx;
    margin-top: 60rpx;
  }
  .groupPopup {
    padding: 50rpx 30rpx 20rpx;
    background-color: #ffffff;
    border-radius: 30rpx 30rpx 0 0;
    box-sizing: content-box;
    .title {
      font-size: 32rpx;
      color: #000000;
      font-weight: 500;
    }
    .title-box {
      font-size: 28rpx;
      margin-top: 50rpx;
      color: #606178;
    }
    .inpt {
      margin-top: 24rpx;
      padding: 0 30rpx;
      width: 100%;
      height: 80rpx;
      background: #F4F5F7;
      border-radius: 8rpx;
      display: flex;
      align-items: center;
      .inpt-1 {
        width: 100%;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
    .scroll-box {
      margin-top: 28rpx;
      height: 600rpx;
      .scroll {
        height: 100%;
          // .list {
          //   display: flex;
          //   align-items: center;
          //   padding: 30rpx 0;
          //   // border-bottom: 1rpx solid #EEF0F4;
          //   &:last-of-type {
          //     border-bottom: none;
          //   }
          //   >* {
          //     flex-shrink: 0;
          //   }
          //   .ing {
          //     margin-top: 20rpx;
          //   }
          //   .info {
          //     margin-left: 0;
          //   }
          // }
      }
    }
    .btn-sure-1 {
      padding: 30rpx 0 0;
      >view {
        width: 100%;
        height: 80rpx;
        background-color: #1675FE;
        line-height: 80rpx;
        text-align: center;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 10rpx;
      }
    }
  }
  :deep .uni-popup .uni-popup__wrapper{
    border-radius: 30rpx 30rpx 0 0;
  }
  .robotList {
    .list {
      margin-top: 32rpx;
      background-color: #F4F5F7;
      justify-content: flex-start;
      .ing {
        margin-top: 10rpx;
      }
      .headimg {
        border-radius: 10rpx;
        image {
          border-radius: 10rpx;
        }
      }
    }
    &.robotList-1 {
      .list {
        width: 100%;
        padding: 24rpx 24rpx;
        height: auto;
        .headimg {
          width: 96rpx;
          height: 96rpx;
        }
        .info {
          .level {
            margin-left: 8rpx;
            width: auto;
            height: 32rpx;
          }
          .name {
            text {
              max-width: 300rpx;
            }
          }
        }
        
        .uni-list-cell {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
  .common-empty {
    margin-top: 40rpx;
  }
  
  .back {
    margin: 20rpx 20rpx;
    width: 56rpx;
    height: 56rpx;
  }
  .sync-btn {
    width: 462rpx;
    height: 88rpx;
    border-radius: 20rpx;
    font-weight: 500;
    text-align: center;
    line-height: 88rpx;
    &.sync-btn-1 {
      margin: 120rpx auto 0;
      border: 1px solid #1675FE;
      color: #1675FE;
    }
    &.sync-btn-2 {
      margin: 50rpx auto 0;
      background: #1675FE;
      color: #FFFFFF;
    }
  }
  .no-data {
    margin-top: 0;
  }
</style>