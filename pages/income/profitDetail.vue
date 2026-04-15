<template>
  <view class="profit-detaill-wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="收益明细" @backPage="backPage"></myCustomNavbar>
    <view class="top-timer">
      <view class="team-box" @click="switchIcon">
        <view class="name" v-if="groupsList.length">{{groupsList[teamObj.curTeamIndex].group_name}}</view>
        <view :class="['forward',teamObj.show===true&&'active']"></view>
      </view>
      <view class="time-wrapper">
        <uniDatetimePicker v-model="range" type="daterange" :clearIcon="false" rangeSeparator="至" @change="changeTime" />
      </view>
    </view>
    <view class="cur-top">
      当月合计收入：<text>{{detailInfo.total_amount}}(嗨币)</text>
    </view>
    <view class="list-wrapper">
      <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
        <profitDetailList :list="detailInfo.items"></profitDetailList>
        <view class="no-data" v-if="!detailInfo.items.length">
          <image src="@/static/image/no-data.png" mode=""></image>
          <view>暂无数据</view>
        </view>
      </scroll-view>
    </view>
   
    <!-- 群组列表 -->
    <uni-popup ref="teamPopup" type="top" :animation="false" mask-background-color="rgba(255,255,255,0.1)" @maskClick="maskClickTeam">
      <view class="common-popup">
        <scroll-view scroll-y="true" class="srollBox">
          <view class="list" v-for="(item,index) in groupsList" :key="index" @click="switchTeam(item,index)">
            <text>{{item.group_name}}</text>
            <image v-show="teamObj.curTeamIndex === index" src="@/static/image/choose.png" mode=""></image>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref,reactive,nextTick} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  // import uniDataSelect from '@/components/uni-data-select/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import uniDatetimePicker from '@/components/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue'
  import {myProfitGroupsApi,profitIncomeDetailApi} from '@/service/income/index.js'
  import {getRecentDayRange,getRecentMonthRange} from '@/unit/common.js'
  import profitDetailList from './components/profit-detail-list.vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  const teamPopup = ref(null)
  const teamObj = reactive({
    curTeamIndex: 0,
    show: false
  })
  const range = ref([])
  // const isiOS = ref(window.isiOS)
  const groupsList = ref([])
  const defaultAllProfit = [{group_id:0,group_name:'全部收益'}]
  const detailInfo = reactive({
    items: [],
    total_amount: 0
  })
  const urlGroupId = ref()
  const pageInfo = reactive({
    page_id: 1,
    total: 0,
  })
  
  function backPage(){
    uni.navigateBack()
  }
  function changeTime() {
    pageInfo.page_id = 1
    getDetail(groupsList.value[teamObj.curTeamIndex].group_id)
  }
  
  function switchTeam(item, index) {
    teamObj.curTeamIndex = index
    teamObj.show = !teamObj.show
    teamPopup.value.close()
    getDetail(item.group_id)
  }
  
  function maskClickTeam(){
    teamObj.show = false
  }
  
  function switchIcon(){
    pageInfo.page_id = 1
    teamObj.show = !teamObj.show
    if (teamObj.show===true ) teamPopup.value.open()
    else teamPopup.value.close()
  }
  
  function getMyProfitGroups(){
    myProfitGroupsApi({},res=>{
      if (~~res.code === 0) {
        groupsList.value = [...defaultAllProfit,...res.data.items]
        // console.log(groupsList.value, 'groupsList.value is')
        teamObj.curTeamIndex = groupsList.value.findIndex(item=>item.group_id===(urlGroupId.value*1))
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  }
  function onReachBottom(){
    if(detailInfo.items.length<pageInfo.total) {
      getDetail(groupsList.value[teamObj.curTeamIndex].group_id)
    }
  }
  function getDetail(id){
    let params = {
      group_id: id*1,
      page_id: pageInfo.page_id,
      start_time: range.value[0]+' 00:00:00',
      end_time: range.value[1]+' 23:59:59',
    }
    uni.showLoading()
    profitIncomeDetailApi(params,res=>{
      if (~~res.code === 0) {
        if(pageInfo.page_id === 1) {
          detailInfo.items = res.data.items||[]
          detailInfo.total_amount = res.data.total_amount||0
          pageInfo.total = res.data.total
        } else {
          detailInfo.items = [...detailInfo.items,...res.data.items]
        }
        pageInfo.page_id++
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  
  onLoad(option=>{
    urlGroupId.value = option.group_id||0
    if(option.day*1===1){
      //获取当天的时间
      let obj = getRecentDayRange()
      range.value = [obj,obj]
    }else{
      let obj = getRecentMonthRange()
      range.value = [obj.start,obj.end]
    }
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            getMyProfitGroups()
            getDetail(urlGroupId.value)
        });
    })
  })
</script>

<style lang="scss" scoped>
  .profit-detaill-wrapper {
    padding-top: 88rpx;
  }
  .top-timer {
    padding: 16rpx 20rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .team-box {
    padding: 0 24rpx;
    width: 262rpx;
    height: 56rpx;
    background: #F0F3F8;
    border-radius: 276rpx;
    // font-family: 'MiSans';
    display: flex;
    justify-content: space-between;
    align-items: center;
    >* {
      flex-shrink: 0;
    }
    .name {
      display: block;
      width: 196rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .forward {
      width: 32rpx;
      height: 32rpx;
      // transform: rotate(90deg);
      background: url('@/static/image/btn-down.png') no-repeat;
      background-size: 100% 100%;
      transition: background 300ms;
      &.active {
        background: url('@/static/image/btn_top.png') no-repeat;
        background-size: 100% 100%;
        // transform: rotate(180deg);
      }
    }
  }
  .time-wrapper {
    width: 424rpx;
    :deep .uni-date-x--border {
      border: none;
      .uni-date-x {
        background-color: #F0F3F8;
        padding: 10rpx 22rpx;
        border-radius: 276rpx;
        font-size: 28rpx;
        color: #000000;
        .uni-date__x-input {
          height: auto;
          padding: 0;
          line-height: 36rpx;
        }
        .range-separator {
          height: auto;
          line-height: 36rpx;
          color: rgba(0,0,0,0.6);
        }
      }
    }
  }
  .common-popup {
    border-radius: 0 0 30rpx 30rpx;
    margin-top: 264rpx;
    height: 600rpx;
    .srollBox {
      height: 100%;
    }
    .list {
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        // font-family: 'MiSans';
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
      }
      image {
        width: 48rpx;
        height: 48rpx;
      }
    }
  }
  .cur-top {
    padding: 24rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: rgba(0,0,0,0.6);
    line-height: 36rpx;
    text {
      color: #22C0FF;
    }
  }
  .list-wrapper {
    padding: 0 20rpx 30rpx;
    height: calc(100vh - 348rpx);
    .scrollBox {
      height: 100%;
    }
    
  }
  .no-data {
    margin-top: 0;
  }
</style>