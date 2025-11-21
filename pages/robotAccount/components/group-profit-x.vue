<template>
  <view class="my-profit">
    <!-- <my-custom-navbar :navStyle="{background:'#ffffff',color:'#000000'}" title="我的收益" @backPage="backPage">
      <view class="tips" @click="openAgreement(1)">
        <text>运营协议</text>
        <image src="/static/image/why1.png"></image>
      </view>
    </my-custom-navbar> -->
    <view class="wrapper">
      <incomeBox source="group" :group_id="parentInfo.group_id*1">
        <template v-slot:profitDetailSlot>
          <profitDetailBox :gropuId="parentInfo.group_id"></profitDetailBox>
          <!-- <profitDetailList :boxstyle="{backgroundColor: '#F0F3F8'}" :list="curProfitDetailList"></profitDetailList>
          <view class="no-data" v-if="!curProfitDetailList.length">
            <image src="@/static/image/no-data.png" mode=""></image>
            <view>暂无数据</view>
          </view> -->
        </template>
      </incomeBox>
    </view>
    
    <!-- 运营协议 -->
    <uni-popup ref="agreementPopup" type="center">
      <view class="common-popup">
        <image @click="openAgreement(2)" class="close" src="@/static/image/close.png"></image>
        <profitAgreementXVue></profitAgreementXVue>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref, reactive, inject} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import profitAgreementXVue from './profit-agreement-x.vue'
  import incomeBox from '../../income/components/income-box.vue'
  // import profitDetailList from '../../income/components/profit-detail-list.vue'
  import profitDetailBox from '../../income/components/profit-detail-box.vue'
  // import {profitIncomeDetailApi} from '@/service/income/index.js'
  // import {getRecentMonthRange} from '@/unit/common.js'
  
  const agreementPopup = ref(null)
  // const curProfitDetailList = ref([])
  // const monthRange = getRecentMonthRange()
  const parentInfo = inject('parentGroupInfo')
  
  
</script>

<style scoped lang="scss">
  .my-profit {
    // padding-top: 88rpx;
    background-color: #ffffff;
  }
  .tips {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 40rpx;
    display: flex;
    align-items: center;
    text {
      // font-family: MiSans, MiSans;
      font-weight: 400;
      font-size: 28rpx;
      color: #000000;
      line-height: 32rpx;
      margin-right: 8rpx;
    }
    image {
      width: 32rpx;
      height: 32rpx;
    }
  }
  .common-popup {
    width: 92vw;
    border-radius: 30rpx;
    position: relative;
    .close {
      width: 48rpx;
      height: 48rpx;
      position: absolute;
      right: 28rpx;
      top: 58rpx;
      z-index: 10;
    }
  }
  .wrapper {
    padding: 24rpx 32rpx;
  }
  
</style>