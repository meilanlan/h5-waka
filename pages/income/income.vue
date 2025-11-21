<template>
  <view class="my-profit">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="我的收益" @backPage="backPage">
      <view class="tips" @click="openAgreement(1)">
        <text>运营协议</text>
        <image src="/static/image/why1.png"></image>
      </view>
    </myCustomNavbar>
    <view class="wrapper" v-if="pageFlag">
      <incomeBox source="myProfit">
        <template v-slot:profitDetailSlot>
          <myProfitGroups></myProfitGroups>
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
  import {ref,nextTick, reactive} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import incomeBox from './components/income-box.vue'
  import profitAgreementXVue from '../robotAccount/components/profit-agreement-x.vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import myProfitGroups from './components/my-profit-groups.vue'
  
  const agreementPopup = ref(null)
  const pageFlag = ref(false)
  
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
  }
  function backPage() {
    window.client.closeWebview()
  }
  onLoad(option=>{
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            pageFlag.value = true
        });
    })
  })
  
</script>

<style scoped lang="scss">
  .my-profit {
    padding-top: 88rpx;
    min-height: 100vh;
    background-color: #F0F3F8;
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
    padding: 24rpx 20rpx;
  }
</style>