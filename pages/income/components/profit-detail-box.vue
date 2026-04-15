<template>
  <view class="profit-detail-box">
    <scroll-view scroll-y="true" class="scrollBox" @scrolltolower="onReachBottom">
      <profitDetailList :boxstyle="{backgroundColor: '#F0F3F8'}" :list="curProfitDetailList"></profitDetailList>
      <view class="no-data" v-if="!curProfitDetailList.length">
        <image src="@/static/image/no-data.png" mode=""></image>
        <view>暂无数据</view>
      </view>
    </scroll-view>
   
  </view>
  
</template>

<script setup>
  import {ref,reactive} from 'vue'
  import profitDetailList from '../../income/components/profit-detail-list.vue'
  import {profitIncomeDetailApi} from '@/service/income/index.js'
  import {getRecentMonthRange} from '@/unit/common.js'
  
  const props = defineProps({
    gropuId: String
  })
  
  const monthRange = getRecentMonthRange()
  
  const curProfitDetailList = ref([])
  const pageInfo = reactive({
    page_id: 1,
    total: 0,
  })
  
  function onReachBottom(){
    if(curProfitDetailList.value.length<pageInfo.total) {
      getDetailList()
    }
  }
  
  function getDetailList(){
    let params = {
      group_id: props.gropuId,
      page_id: pageInfo.page_id,
      start_time: monthRange.start+' 00:00:00',
      end_time: monthRange.end+' 23:59:59',
    }
    uni.showLoading()
    profitIncomeDetailApi(params,res=>{
      if (~~res.code === 0) {
        if(pageInfo.page_id === 1) {
          curProfitDetailList.value = res.data.items||[]
          pageInfo.total = res.data.total
        } else {
          curProfitDetailList.value = [...curProfitDetailList.value,...res.data.items]
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
  getDetailList()
</script>

<style scoped lang="scss">
  .profit-detail-box {
    height: calc(100vh - 666rpx);
    .scrollBox {
      height: 100%;
    }
  }
  .no-data {
    margin-top: 10rpx;
  }
</style>