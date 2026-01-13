<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="嗨豆结算" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-box">
      <view class="info">
        <image class="headimg" :src="withdrawalsInfo.data.user.head_img||gender"></image>
        <view class="">
          <view class="name">
            {{withdrawalsInfo.data.user.nick_name}}
            <image v-for="(item,i) in withdrawalsInfo.data.user.ic_list" :key="i" :src="item" mode="heightFix"></image>
          </view>
          <!-- <view class="text" @click="toVerified(1)">{{withdrawalsInfo.data.user.verified?'已实名认证':'未实名认证'}}</view> -->
          <view class="text">{{withdrawalsInfo.data.user.verified?'已实名认证':'未实名认证'}}</view>
        </view>
      </view>
      
      <view class="wathdrawal-box">
        <view class="top-box">
          <view class="text1">可提现:¥{{withdrawalsInfo.data.hi_dou||0}}</view>
          <view class="inpt-box">
            <text v-if="num">¥</text><input class="uni-input" v-model="num" />
            <view class="all" @click="allWathdrawal">全部提现</view>
          </view>
          <view class="foot-box">
            <view class="box">
              <view class="price">
                {{formatNumber(withdrawalsInfo.data.hi_dou)}}
              </view>
              <view class="text">
                嗨豆余额
              </view>
            </view>
            <view class="box">
              <view class="price">
                ¥{{formatNumber(withdrawalsInfo.data.total_hi_dou)}}
              </view>
              <view class="text">
                累计提现
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="exp1">
        提交后1-5个工作日到账
      </view>
      <view :class="['btn',num>0&&'active']" @click="submitWathdrawal">
        提现
      </view>
      <view class="text2 text3"><text>1.</text> <text>为遵循<text class="blue" @click="openPage">国家个税新政</text>规定，平台提现需要完成云账户灵活用工人员电子签约。</text></view>
      <view class="text2"><text>2.</text> 最快1分钟就能完成签约，电签后到账实时性和安全性更有保障。</view>
    </view>
    <uni-popup ref="surePopup" type="bottom" :safe-area="false" background-color="#ffffff">
      <view class="common-popup">
        <view class="title">提现确认</view>
        <image src="/static/image/close.png" class="close" @click="surePopup.close()"></image>
        <view class="info-box">
          <view class="list">
            <text class="left">提现金额</text>
            <view>
              <view class="price">¥{{formatNumber(num)}}</view>
              <view class="exp">服务费：{{calculateTax(num, withdrawalsInfo.data.fee_ratio)}}元</view>
            </view>
          </view>
          <view class="list">
            <text class="left">提现账号</text>
            <view class="right">
              <image src="/static/image/zfb.png" class="zfb"></image>
              <text>{{maskPhoneNumber(withdrawalsInfo.data.user.alipay_id)}}</text>
            </view>
          </view>
          <view class="text2 text3">提现须知：</view>
          <view class="text2"><text>1.</text>请确认提现账号与本人实名认证信息匹配，避免影响提现到账。</view>
          <view class="text2"><text>2.</text>每天可以发起一次提现，5个工作日内到账。</view>
          <view class="text2"><text>3.</text>最小提现金额为10元，每一笔提现将扣除{{calculateTax(withdrawalsInfo.data.fee_ratio,100)}}%服务费(云账户收取)。</view>
          <view class="text2"><text>4.</text>实际到账金额为提现金额扣除个人所得税和服务费后的金额。</view>
          <view class="sure-btn" @click="makesureWathdrawal">确认提现</view>
        </view>
      </view>
    </uni-popup>
    
    <uni-popup ref="makesurePopup" type="center">
      <view class="makesure-popup">
        <view class="tit">完成提现</view>
        <view class="exp">
          提现申请已提交，资金将在5个工作日内到账，请在支付宝账户内查询，如有问题可联系平台客服咨询。
        </view>
        <view class="sure" @click="makesurePopup.close()">
          确定
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref,nextTick, reactive} from 'vue'
  import {onLoad,onShow} from '@dcloudio/uni-app'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  import {withdrawalsInfoApi,withdrawalsCreateApi,yunzhanghuVerifyApi,idCardVerifyPreApi,contractYunzhanghuApi} from '@/service/income/index.js'
  import {formatNumber} from '@/unit/common.js'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {maskPhoneNumber} from '@/unit/common.js'
  
  const boyHeadimg = new URL("@/static/image/boy.png", import.meta.url).href
  const girlHeadimg = new URL("@/static/image/girl.png", import.meta.url).href
  
  const num = ref('')
  const surePopup = ref()
  const makesurePopup = ref()
  const group_id = ref('')
  const withdrawalsInfo = reactive({
    data:{user:{}}
  })
  const payLock = ref(false)
  const gender = ref(window.userinfo?.user.gender===1?boyHeadimg:girlHeadimg)
  
  function openPage(){
    uni.navigateTo({
      url:'/pages/agreements/newPolicy'
    })
  }
  
  function calculateTax(amount, taxRate) {
      // 方法1：转换为整数计算
      const precision = 1000;
      const result = (amount * precision * taxRate) / precision;
      // 方法2：四舍五入显示
      return Number(result.toFixed(2));
  }
  
  
  function toVerified(deb){
    // 设置测试账号实名认证
    if(!withdrawalsInfo.data.user.verified) {
      let params = {
        card_no: withdrawalsInfo.data.user.alipay_id,
        name: withdrawalsInfo.data.user.nick_name,
        alipay_id: withdrawalsInfo.data.user.alipay_id,
        is_web: true,
        debugger: deb
      }
      yunzhanghuVerifyApi(params,res=>{
        getWithdrawalsInfo()
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      })
    }
  }
  
  function submitWathdrawal(){
    if (!withdrawalsInfo.data.user.verified){
      //唤起客户端真人认证
      window.client.JSAction({
        id: 112
      })
      return false
    }
    surePopup.value.open()
  }
  function makesureWathdrawal(){
    if(num.value>0&&payLock.value===false){
      uni.showLoading()
      payLock.value = true
      let param = {
        amount: num.value,
        channel: 'alipay',
        card_no: withdrawalsInfo.data.user.alipay_id
      }
      withdrawalsCreateApi(param,res=>{
        payLock.value = false
        if (~~res.code === 0) {
          withdrawalsInfo.data.hi_dou = withdrawalsInfo.data.hi_dou*1 - num.value*1
          num.value = ''
          surePopup.value.close()
          makesurePopup.value.open()
        } else if(~~res.code === -2){
          //唤起客户端真人认证
          window.client.JSAction({
            id: 112
          })
        } else if(~~res.code === -3){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          toYunzhanghu()
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
      })
    }
  }
  
  function toYunzhanghu(){
    let fullDomain = window.location.protocol + '//' + window.location.host;
    let url = group_id.value==0?`${fullDomain}/index.html#/pages/income/wathdrawal?show_title=0`:`${fullDomain}/index.html#/pages/income/wathdrawal?params=${JSON.stringify({show_title:0,group_id:group_id.value})}`
    let param = {
      redirect_url: url
    }
    contractYunzhanghuApi(param,res=>{
      if (~~res.code === 0) {
        window.location.href = res.data.url
      } else if(~~res.code === -1) {
        //解约
        toVerified(2)
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  }
  
  function allWathdrawal(){
    if(withdrawalsInfo.data.hi_dou>0){
      num.value = withdrawalsInfo.data.hi_dou
    }
  }
  
  function backPage(){
    if (group_id.value==0){
      uni.navigateTo({
        url:'/pages/income/income?show_title=0'
      })
    } else {
      uni.navigateTo({
        url:`/pages/robotAccount/robotDetail?show_title=0&group_id=${group_id.value}&pid=5`
      })
    }
  }
  
  function getWithdrawalsInfo(){
    uni.showLoading()
    withdrawalsInfoApi({},res=>{
      if (~~res.code === 0) {
        withdrawalsInfo.data = res.data
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  onShow(()=>{
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            console.log(res, "resresres");
            getWithdrawalsInfo()
        });
    })
  })
  onLoad((option)=>{
    if(option.params) {
      let params = JSON.parse(option.params)
      group_id.value = params.group_id
    } else {
      group_id.value = option.group_id || 0
    }
  })
</script>

<style lang="scss" scoped>
  .wrapper {
    padding-top: 88rpx;
    min-height: calc(100vh - 88rpx);
    background-color: #ffffff;
    // font-family: 'MiSans';
    :deep .custom-navbar{
        .nav-wrapper {
          .nav-box {
            .return-btn {
              left: 22rpx;
            }
          }
        }
    }
    .wrapper-box {
      padding: 20rpx 22rpx 32rpx;
      .info {
        display: flex;
        align-items: center;
        >*{
          flex-shrink: 0;
        }
        .headimg {
          margin-right: 20rpx;
          width: 112rpx;
          height: 112rpx;
          border-radius: 24rpx;
        }
        .name {
          font-weight: 600;
          font-size: 32rpx;
          color: #000000;
          line-height: 40rpx;
          image {
            margin-left: 8rpx;
            // width: 32rpx;
            height: 32rpx;
          }
        }
        .text {
          margin-top: 16rpx;
          font-weight: 400;
          font-size: 28rpx;
          color: #22C0FF;
          line-height: 32rpx;
        }
      }
    }
  }
  .wathdrawal-box {
    margin-top: 32rpx;
    width: 100%;
    height: 296rpx;
    background-color: #F0F3F8;
    border-radius: 24rpx;
    position: relative;
    .top-box {
      padding: 32rpx 32rpx 0;
      .text1 {
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
      }
      .inpt-box {
        margin-top: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text {
          font-size: 48rpx;
          font-weight: 700;
          line-height: 48rpx;
        }
        input {
          height: 48rpx;
          font-weight: 700;
          font-size: 48rpx;
          line-height: 48rpx;
        }
      }
      .all {
        min-width: 128rpx;
        padding: 12rpx 0;
        // height: 48rpx;
        background: #FFFFFF;
        border-radius: 222rpx;
        font-weight: 500;
        font-size: 24rpx;
        color: rgba(0,0,0,0.6);
        overflow: hidden;
        // line-height: 48rpx;
        text-align: center;
      }
    }
    .foot-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 106rpx;
      background-color: #AEB8C8;
      border-radius: 0 0 24rpx 24rpx;
      display: flex;
      .box {
        padding-top: 18rpx;
        width: 342rpx;
        height: 100%;
        text-align: center;
        font-size: 28rpx;
        line-height: 32rpx;
        .price {
          font-weight: 700;
          color: #FFFFFF;
        }
        .text {
          margin-top: 8rpx;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
        }
      }
    }
    
  }
  .exp1 {
    margin-top: 24rpx;
    text-align: center;
    font-weight: 400;
    font-size: 28rpx;
    color: #9E9E9E;
    line-height: 44rpx;
  }
  :deep .uni-input-input {
    // width: 4rpx;
    caret-color: #22C0FF ;
  }
  .btn {
    margin-top: 48rpx;
    width: 100%;
    height: 96rpx;
    line-height: 96rpx;
    background: rgba(34, 192, 255, 0.3);
    border-radius: 16rpx;
    text-align: center;
    font-weight: 600;
    font-size: 32rpx;
    color: #FFFFFF;
    &.active{
      background: #22C0FF;
    }
  }
  .common-popup {
    height: 832rpx;
    padding: 0;
    background-color: #F0F3F8;
    .title {
      width: 100%;
      height: 96rpx;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      text-align: center;
      line-height: 96rpx;
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
    }
    .close {
      position: absolute;
      right: 24rpx;
      top: 24rpx;
      width: 48rpx;
      height: 48rpx;
    }
    .info-box {
      padding: 0 22rpx;
      .list {
        padding: 0 32rpx;
        margin-top: 24rpx;
        width: 100%;
        height: 120rpx;
        background: #FFFFFF;
        border-radius: 16rpx;
        font-size: 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          font-weight: 500;
          color: #000000;
          // line-height: 40rpx;
        }
        .price {
          font-weight: 500;
          color: #000000;
          line-height: 40rpx;
          text-align: right;
        }
        .exp {
          margin-top: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: #9E9E9E;
          line-height: 24rpx;
          text-align: right;
        }
        .right {
          display: flex;
          align-items: center;
          .zfb{
            margin-right: 8rpx;
            width: 48rpx;
            height: 48rpx;
          }
          text {
            font-weight: 500;
            font-size: 32rpx;
            color: #000000;
            line-height: 40rpx;
          }
        }
        
      }
      
      .sure-btn {
        margin-top: 48rpx;
        width: 100%;
        height: 96rpx;
        background: #22C0FF;
        border-radius: 16rpx;
        font-weight: 600;
        font-size: 32rpx;
        color: #FFFFFF;
        line-height: 96rpx;
        text-align: center;
      }
    }
    
  }
  .text3 {
    margin-top: 24rpx;
  }
  .text2 {
    display: flex;
    font-weight: 400;
    font-size: 24rpx;
    color: #9E9E9E;
    line-height: 36rpx;
    .blue {
      color: #22C0FF;
    }
  }
  .makesure-popup {
    width: 640rpx;
    height: 304rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 48rpx 0;
    .tit {
      font-weight: 500;
      font-size: 32rpx;
      color: #000000;
      line-height: 48rpx;
      text-align: center;
    }
    .exp {
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #898989;
      line-height: 36rpx;
      padding: 0 32rpx;
    }
    .sure {
      margin-top: 32rpx;
      width: 100%;
      height: 88rpx;
      box-shadow: 0px -1px 0px 0px rgba(0,0,0,0.1);
      line-height: 88rpx;
      text-align: center;
      font-weight: 400;
      font-size: 32rpx;
      color: #22C0FF;
    }
  }
</style>