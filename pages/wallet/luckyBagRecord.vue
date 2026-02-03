<template>
  <view class="wrapper">
    <myCustomNavbar
      :navBg="navbarBgImg" 
      backIcon="../../static/image/btn_back_white.png" 
      :navBgStyle="{height: '252rpx'}" 
      @backPage="backPage"
    >
      <template v-slot:leftTitle>
        <view class="tab-box">
          <view :class="['box',curTab===item.id&&'active']" v-for="item in tabList" :key="'box-'+item" @click="switchTab(item)">{{item.title}}</view>
          <view class="line" :style="{left: curTab===2?'50rpx':'240rpx'}"></view>
        </view>
      </template>
        <view class="timer-box">
          <yearPicker
            :default-year="year"
            :min-year="2000"
            :max-year="year"
            @confirm="handleYearConfirm" />
        </view>
    </myCustomNavbar>
    <view class="total-data">
      <image :src="listInfo.data.user.head_img" class="headimg" mode="aspectFill"></image>
      <view class="nickname">{{listInfo.data.user.nick_name}}{{curTab===2?'共收到':'共发出'}}</view>
      <view class="price">{{formatNumber(listInfo.data.total_amount)}}</view>
      <!-- <view class="price">{{listInfo.data.total_amount.toFixed(2)}}</view> -->
      <view class="exp" v-if="curTab===1">发出福袋：{{listInfo.data.total_send_num||0}}个</view>
      <template v-else>
        <view class="exp-box">
          <view class="box">收到福袋：{{listInfo.data.receive_num||0}}</view>
          <view class="line"></view>
          <view class="box">手气最佳：{{listInfo.data.receive_best_num||0}}</view>
        </view>
        <view class="withdraw" @click="toWathdrawal">去提现</view>
      </template>
      <view class="exp exp-1">{{curTab===2?'收到':'发出'}}福袋记录</view>
    </view>
    <view class="list-box" v-if="listStyle.listHeight" :style="{height: `calc(100vh - ${listStyle.listHeight}rpx)`}">
      <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
        <view class="box" v-for="(item,index) in listInfo.data.list" :key="'list-'+index">
          <view class="left">
            <view class="user">
              <image :src="item.user.head_img" class="headimg" mode="aspectFill"></image>
              <view class="user-box">
                <view class="val1" v-if="curTab===2">{{item.user.nick_name}}</view>
                <view class="val1" v-else>{{item.type===1?'新人福袋':item.type===2?'锦鲤福袋':'定时福袋'}}{{item.sub_type===1?'-拼手气':item.sub_type===2?'-普通':''}}</view>
                <view class="val2">{{getDate(item.timestamp*1000)}} | {{item.msg}}</view>
              </view>
            </view>
          </view>
          <view class="right">
            <template v-if="curTab===2">
              <view class="val1 val1-1" v-if="item.receive_award_type===3">{{item.receive_award_name}}：{{item.receive_award_desc}}</view>
              <view class="val1 val1-1" v-else>{{item.receive_award_name}}：{{item.receive_amount.toFixed(2)}}</view>
            </template>
            <view class="val1 val1-1" v-else>福气值：{{item.send_amount?item.send_amount.toFixed(2):'0.00'}}</view>
            
            <view class="zan" v-if="curTab===2&&item.receive_is_best">
              <image src="/static/image/zan.png"></image>
              手气最佳
            </view>
            <view class="val2 val2-2" v-else-if="curTab===1">{{item.status===0?'已领取':item.status===2?'已领完':'已过期'}}{{item.receive_num||0}}/{{item.total_num}}</view>
            
          </view>
        </view>
        <view class="no-data" v-if="!listInfo.data.list.length">
          <image src="@/static/image/no-data.png"></image>
          <view>暂无数据</view>
        </view>
      </scroll-view>
    </view>
  </view>
  
</template>

<script setup>
  import {ref,reactive,nextTick} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import navbarBgImg from '@/static/image/luckybag-tit.png'
  import yearPicker from '@/components/year-picker.vue'
  import {luckyBagStatApi} from '@/service/wallet/index.js'
  import {formatNumber} from '@/unit/common.js'
  import {getDate} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  
  const tabList = ref([{id:2, title: '收到的福袋'},{id:1, title: '发出的福袋'},])
  const curTab = ref(2)
  const prePage = ref(0)
  const listInfo = reactive({data:{
    user: {},
    total_amount:0,
    receive_num:0,
    receive_best_num:0,
    receive_best_num:0,
    list: []
  }})
  const year = ref(new Date().getFullYear())
  const listStyle = reactive({
    listHeight: ""
  })
  const pageInfo = reactive({
    page_id:1,
    page_size:20,
    total: 0
  })
  
  function toWathdrawal(){
    uni.navigateTo({
      url:'/pages/wallet/luckyBagWathdrawal?show_title=0&prePage=record'
    })
  }
  
  function getElementHeight(selector){
    const el = document.querySelector(selector);
      if (!el) {
        console.error(`未找到选择器为 ${selector} 的元素`);
        return 0; // 兜底默认值
      }
      // 获取计算样式的高度（带单位），转成纯数字（关键：去掉px单位）
      const heightStr = getComputedStyle(el).height;
      // 处理特殊情况：height为auto/0的场景
      const heightNum = parseFloat(heightStr)*2 + 252;
      console.log(`元素 ${selector} 高度：`, heightNum, 'px');
      return heightNum;
  }
  
  // 计算列表高度的主函数
  function calcListHeight(){
    listStyle.listHeight = getElementHeight('.total-data');
  };

  onLoad(option=>{
    curTab.value = (option.id||2)*1
    prePage.value = (option.prePage||0)*1
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            getList()
        });
    })
  })
  
  function getList(){
    uni.showLoading()
    let params = {
      type: curTab.value,
      year:year.value,
      page_id: pageInfo.page_id,
      page_size: pageInfo.page_size
    }
    luckyBagStatApi(params,res=>{
      if (~~res.code === 0) {
        if(res.data) {
          if(pageInfo.page_id === 1) {
            listInfo.data = res.data
            pageInfo.total = res.data.total
          } else {
            listInfo.data.list = [...listInfo.data.list,...res.data.list]
          }
          pageInfo.page_id++
        }
        setTimeout(() => {
          calcListHeight()
        }, 100);
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  
  function onReachBottom(){
    if(listInfo.data.list.length<pageInfo.total) {
      getList()
    }
  }
  
  const handleYearConfirm = (y) => {
    year.value = y
    pageInfo.page_id = 1
    getList()
  }
  
  function switchTab(item){
    pageInfo.page_id = 1
    curTab.value = item.id
    getList()
  }
  
  function backPage() {
    if(prePage.value){
      uni.navigateBack()
    } else {
      window.client.closeWebview()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    // height: 100vh;
    height: calc(100vh - 76rpx);
    padding: 164rpx 32rpx 32rpx;
    background-color: #ffffff;
  }
  .tab-box {
    position: absolute;
    left: 104rpx;
    top: 0;
    width: 352rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box {
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(255,255,255,0.6);
      &.active {
        color: #ffffff;
        font-weight: 600;
      }
    }
    .line {
      position: absolute;
      bottom: 12rpx;
      width: 60rpx;
      height: 8rpx;
      background: #FFFFFF;
      border-radius: 4rpx;
      transition: left .2s;
    }
  }
  .timer-box {
    position: absolute;
    right: 24rpx;
    top: 20rpx;
    font-size: 24rpx;
    width: 144rpx;
    height: 48rpx;
    border: 2rpx solid #ffffff;
    border-radius: 8rpx;
    padding: 0 16rpx;
    color: #FFFFFF;
  }
  .total-data {
    padding-top: 48rpx;
    // height: 464rpx;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    .headimg {
      display: block;
      margin: 0 auto;
      width: 72rpx;
      height: 72rpx;
      border-radius: 16rpx;
    }
    .nickname {
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #000000;
      line-height: 32rpx;
      text-align: center;
    }
    .price {
      margin-top: 32rpx;
      font-weight: 700;
      font-size: 96rpx;
      color: #FFA332;
      line-height: 96rpx;
      text-align: center;
    }
    .exp {
      margin-top: 32rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: rgba(0,0,0,0.4);
      line-height: 32rpx;
      text-align: center;
      &.exp-1 {
        margin-top: 48rpx;
        margin-bottom: 24rpx;
        text-align: left;
      }
    }
    .exp-box {
      margin-top: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .box {
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
      }
      .line {
        margin: 0 32rpx;
        width: 2rpx;
        height: 28rpx;
        background: rgba(0,0,0,0.08);
      }
    }
    .withdraw {
      margin: 32rpx auto 0;
      width: 356rpx;
      height: 68rpx;
      border-radius: 16rpx;
      border: 2rpx solid #FFA332;
      line-height: 68rpx;
      text-align: center;
      font-weight: 400;
      font-size: 28rpx;
      color: #FFA332;
    }
  }
  .list-box {
    background-color: #ffffff;
    // height: calc(100vh - 716rpx);
    .scrollBox {
      height: 100%;
    }
    .box {
      margin-top: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        flex-shrink: 0;
        .user{
          display: flex;
        }
        .headimg {
          width: 72rpx;
          height: 72rpx;
          border-radius: 16rpx;
          margin-right: 16rpx;
        }
      }
      .val1 {
        font-weight: 400;
        font-size: 24rpx;
        color: #000000;
        line-height: 32rpx;
        &.val1-1 {
          text-align: right;
        }
      }
      .val2 {
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.3);
        line-height: 32rpx;
        &.val2-2 {
          text-align: right;
        }
      }
      .zan {
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: #FF4A4A;
        line-height: 32rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        image {
          margin-right: 8rpx;
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
  }
  .no-data {
    margin-top: 0;
  }
</style>