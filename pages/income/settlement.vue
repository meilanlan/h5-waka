<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="嗨币结算" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-box">
      <view class="exp">
        <text>持有收益嗨币:{{hiIcon}}</text>
        比例10嗨币:1嗨豆
      </view>
      <view class="inpt-box">
        <view class="num-icon" @click="cutNum">
          <text :class="num>0&&'active'"></text>
        </view>
        <view class="inpt">
          <input class="uni-input" v-model="num" type="number" placeholder="100（请输入整百数字）" />
        </view>
        <view class="num-icon" @click="addNum">
          <image src="../../static/image/add.png"></image>
        </view>
      </view>
      <view :class="['exchange',num>0&&'active']" @click="exchangeNum">
        兑换<text v-show="num>0">:{{num/10}}嗨豆</text>
      </view>
      <view class="exp1">
        兑换确豆每周仅可操作一次
      </view>
      <view class="exp2">
        温馨提示: 1.账户收益说明: 1)金仓鼠普通账户:每月1日将冻结上月收益的金仓鼠。自提主播将在每月5日左右充入快捷账户，转化完成之后将扣除冻结的金仓鼠。 2)金仓鼠快捷账户:快捷账户仅开放给结算方式为在线自提的主播。仅快捷账户支持提现，比例为1000金仓鼠=1元。 2.金仓鼠转化时间:观众通过i0S渠道购买充值的电池打赏的道具或大航海产生的收益，将60天后入账金仓鼠账户;其他渠道充值的电池打赏的道具或大航海产生的收益，将隔天入账到金仓鼠账户。 3.金仓鼠总账户:金仓鼠普通账户+金仓鼠快捷账户 4.提现规则说明: 1)金额限制:周一至周五09:00~17:00可兑换(节假日等特殊原因除外)，每天最多提现一次，每次可提1~2000元(特殊情况除外) 2)到账时间:支付宝提现提交申请后，一般会在24小时到账。单笔提现超过2000元，一般会在7天之内到账。 3)税费说明:每次发起提现时，系统会自动结算税费并展示给用户。
      </view>
    </view>
    
  </view>
 
</template>

<script setup>
  import {ref,nextTick} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import {hiIconExchangeApi} from '@/service/income/index.js'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  const num = ref('')
  const hiIcon = ref('')
  const isiOS = ref(window.isiOS)
  const luckFlag = ref(false)
  
  function backPage(){
    uni.navigateBack()
  }
  
  function exchangeNum(){
    if(luckFlag.value===false) {
      luckFlag.value=true
      hiIconExchangeApi({num: num.value},res=>{
        if (~~res.code === 0) {
          uni.showToast({
            title: '兑换成功',
            icon: 'none'
          });
          hiIcon.value = hiIcon.value - num.value
          num.value = ''
        }else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        luckFlag.value=false
      })
    }
    
  }
  
  function cutNum(){
    if(num.value) {
      num.value = num.value*1-100
    }
  }
  function addNum(){
    num.value = num.value*1+100
  }
  function returnPage(){
    uni.navigateBack();
  }
  
  onLoad((option)=>{
    hiIcon.value = option.hiIcon||0
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
        });
    })
  })
  
</script>

<style lang="scss" scoped>
  .wrapper {
    padding-top: 88rpx;
    min-height: 100vh;
    background-color: #ffffff;
    .wrapper-box {
      padding: 20rpx 32rpx 32rpx;
      .exp {
        font-weight: 400;
        font-size: 28rpx;
        color: #9E9E9E;
        line-height: 36rpx;
        display: flex;
        justify-content: space-between;
        text {
          color: #22C0FF;
        }
      }
      .inpt-box {
        margin-top: 32rpx;
        display: flex;
        align-items: center;
        .num-icon {
          width: 96rpx;
          height: 96rpx;
          line-height: 80rpx;
          background: #F0F3F8;
          border-radius: 16rpx;
          text-align: center;
          image {
            display: block;
            width: 64rpx;
            height: 64rpx;
            margin: 16rpx auto 0;
          }
          text {
            display: inline-block;
            width: 24rpx;
            height: 6rpx;
            background: rgba(0, 0, 0, .3);
            border-radius: 444rpx;
            &.active {
              background: #000000;
            }
          }
        }
        .inpt {
          margin: 0 24rpx;
          width: 446rpx;
          height: 96rpx;
          background: #F0F3F8;
          border-radius: 16rpx;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          input {
            font-weight: 700;
            font-size: 28rpx;
            color: #000000;
            line-height: 28rpx;
          }
        }
      }
    }
  }
  .exchange {
    margin-top: 48rpx;
    width: 100%;
    height: 96rpx;
    border-radius: 16rpx;
    line-height: 96rpx;
    text-align: center;
    font-weight: 600;
    font-size: 32rpx;
    color: #FFFFFF;
    background: rgba(34, 192, 255, .3);
    
    &.active {
      background: #22C0FF;
    }
  }
  .exp1,
  .exp2 {
    margin-top: 24rpx;
    text-align: center;
    font-weight: 400;
    font-size: 28rpx;
    color: #9E9E9E;
    line-height: 44rpx;
  }
  .exp2 {
    padding: 92rpx 28rpx;
    text-align: left;
  }
</style>