<template>
  <view class="energy">
    <view class="header">
      <view class="left">能量助力</view>
      <view class="right">
        余额:{{haveEnergy}} <image src="../../../static/image/home-1.png"></image>
      </view>
    </view>
    <view class="energy-list">
      <view :class="['energy-list-box', checkEnergyNum===index&&'active']" v-for="(item,index) in props.energy.list" :key="'n'+item.id" @click="checkEnergy(item,index)">
        <view class="">
          <view class="box">
            <image src="../../../static/image/home-1.png"></image>
            {{item.energy}}
          </view>
          <view class="box-exp" v-if="checkEnergyNum===index && item.title">
            <view class="box-exp-1">{{item.title}}</view>
            <view class="">{{item.desc}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="energy-inpt">
      <view class="text">自定义能量值</view>
      <view class="inpt-box">
        <input type="number" v-model="num" class="input" placeholder="请输入" placeholder-style="color:#C5CCD5;" @input="watchNum">
        <image src="../../../static/image/home-1.png"></image>
      </view>
    </view>
    <view :class="['btn-box',(num||checkEnergyNum!=-1)&&'active']" @click="helpPay">立即助力</view>
    <!-- 嗨币充值 -->
    <uni-popup ref="payPopup" type="bottom">
      <view class="common-popup">
        <pay-x :haib="props.haib"></pay-x>
      </view>
    </uni-popup>
    
  </view>
</template>

<script setup>
  import {ref,reactive,inject} from 'vue'
  import {onReady} from '@dcloudio/uni-app'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import payX from '../../../components/pay-x/pay-x.vue';
  import {groupGrowApi} from '@/service/robotAccount/index.js'
  
  
  const props = defineProps({
    energy: Object,
    haib: Object
  })
  const emit = defineEmits(['updateEnergy'])
  const energyList = [1,5,10,50,100,200]
  const checkEnergyNum = ref(-1)
  const num = ref('')
  const payPopup = ref(null)
  const haveEnergy = ref(0)
  haveEnergy.value = props.energy.banlance
  const parentInfo = reactive({data:{}})
  parentInfo.data = inject('parentGroupInfo')
  const energyLock = ref(false)
  function checkEnergy(item,index){
    checkEnergyNum.value = index
    num.value = item.energy
  }
  
  function watchNum(){
    if (num.value) {
      num.value = num.value.replace(/\D/g, '');
      // 如果第一个字符是0并且后面有字符，移除开头的0
      if (num.value.length > 1 && num.value.startsWith('0')) {
          num.value = num.value.slice(1);
      }
      checkEnergyNum.value = -1
    }
    
  }
  
  function helpPay(){
    if (energyLock.value === false) {
      energyLock.value === true
      uni.showLoading({mask: true})
      groupGrowApi({group_id: parentInfo.data.group_id,amount: num.value}, res => {
        if (res.code === 0) {
          if(res.action?.id === 1011) {
            payPopup.value.open()
            uni.showToast({
              title: 'HI币余额不足',
              icon: 'error'
            });
          } else if(res.data) {
            haveEnergy.value = res.data.rgiths?.energy
            emit('updateEnergy',haveEnergy.value)
            uni.hideLoading()
            window.client.JSAction({
                id: 1013 ,
                param: JSON.stringify(res.action)
            });
            uni.showToast({
              title: '能量助力成功',
              icon: 'none'
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          energyLock.value === false
        } else {
          energyLock.value === false
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        }
      })
    }
    
    // if (num.value||checkEnergyNum.value!=-1) {
    //   console.log(payPopup.value,'payPopupi')
    //   let energy = haveEnergy.value - num.value
    //   console.log(energy, 'energy o')
    //   if (energy>0) {
    //     // 直接用能量助力
    //     uni.showLoading()
    //     groupGrowApi({group_id: parentInfo.data.group_id,amount: num.value}, res => {
    //       if (res.code === 0) {
    //         uni.showToast({
    //           title: '能量助力成功',
    //           icon: 'none'
    //         });
    //         haveEnergy.value = energy
    //         uni.hideLoading()
    //       } else if (res.code === -20001) {
    //         // this.$emit('updateAdminToken')
    //         uni.hideLoading()
    //       } else if (res.code != -10002){
    //         uni.showToast({
    //           title: res.msg,
    //           icon: 'none'
    //         });
    //         uni.hideLoading()
    //       } else {
    //         uni.hideLoading()
    //       }
    //     })
        
    //   } else {
    //     // payPopup.value.open()
    //     // uni.showToast({
    //     //   title: 'HI币余额不足',
    //     //   icon: 'error'
    //     // });
    //     console.log(props.haib.banlance, 'props.haib.banlance is')
    //     if (props.haib.banlance<=0) {
          
    //       payPopup.value.open()
    //       uni.showToast({
    //         title: 'HI币余额不足',
    //         icon: 'error'
    //       });
    //     } else {
          
    //     }
    //   }
    // }
    
  }
  
  onReady(()=>{
  })
  
</script>

<style lang="scss" scoped>
  .energy {
    font-family: 'MiSans';
    margin-top: 32rpx;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000000;
      .left {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 40rpx;
      }
      .right {
        display: flex;
        align-items: center;
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 28rpx;
        line-height: 32rpx;
        image {
          margin-left: 10rpx;
          width: 30rpx;
          height: 30rpx;
        }
      }
    }
    .energy-list {
      margin-top: 18rpx;
      display: flex;
      flex-wrap: wrap;
      .energy-list-box {
        margin-right: 20rpx;
        margin-bottom: 18rpx;
        width: 215rpx;
        height: 160rpx;
        background: #F0F3F8;
        border-radius: 16rpx;
        border: 4rpx solid transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 36rpx;
        color: #000000;
        line-height: 44rpx;
        .box {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .box-exp {
          text-align: center;
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.4);
          line-height: 1;
          font-weight: 400;
          .box-exp-1 {
            margin: 16rpx 0;
            color: #22C0FF;
          }
        }
        image {
          margin-right: 8rpx;
          width: 48rpx;
          height: 48rpx;
        }
        &:nth-of-type(3n) {
          margin-right: 0;
        }
        &.active {
          border-color: #22C0FF;
          background: rgba(34,192,255,0.1);
        }
      }
    }
    .energy-inpt {
      padding: 0 32rpx;
      width: 100%;
      height: 112rpx;
      background: #F0F3F8;
      border-radius: 16rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
      }
      .inpt-box {
        display: flex;
        align-items: center;
        .input {
          margin-right: 36rpx;
          width: 96rpx;
          height: 40rpx;
          font-size: 32rpx;
          color: #000000;
          font-weight: 500;
        }
      }
      image {
        width: 45rpx;
        height: 45rpx;
      }
    }
    .btn-box {
      width: 100%;
      margin-top: 18rpx;
      height: 96rpx;
      text-align: center;
      font-weight: 600;
      font-size: 32rpx;
      color: #FFFFFF;
      line-height: 96rpx;
      background-color: rgba(34, 192, 255, .3);
      border-radius: 16rpx;
      &.active {
        background-color: #22C0FF;
      }
    }
  }
  .common-popup {
    height: 1000rpx;
  }
</style>