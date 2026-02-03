<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="福气值结算" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-box">
      <view class="info">
        <image class="headimg" :src="withdrawalsInfo.data.user.head_img||gender" mode="aspectFill"></image>
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
          <!-- <view class="text1">可提现:¥{{calculateTax(withdrawalsInfo.data.fortune, withdrawalsInfo.data.ratio)}}</view> -->
          <view class="text1">可提现:¥{{withdrawalsInfo.data.rw_fortune}}</view>
          <view class="inpt-box">
            <text v-if="num">¥</text><input class="uni-input" type="number" v-model="num" placeholder="请输入提现金额" placeholder-style="color:#C5CCD5;fontSize:36rpx;fontWeight:normal" @input="handleInputOnlyInt" />
            <view class="all" @click="allWathdrawal">全部提现</view>
          </view>
          <view class="foot-box">
            <view class="box">
              <view class="price">
                {{formatNumber(withdrawalsInfo.data.fortune)}}
              </view>
              <view class="text">
                福气值
              </view>
            </view>
            <view class="box">
              <view class="price">
                ¥{{formatNumber(withdrawalsInfo.data.cmw_fortune)}}
              </view>
              <view class="text">
                本月累计提现
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="exp1">
        每月1日可以发起提现，提交后5个工作日到帐
      </view>
      <view :class="['btn',num>0&&'active']" @click="submitWathdrawal">
        提现
      </view>
      <tradeDetail ref="tradeDetailRef" v-if="withdrawalsInfo.data.user.user_id" :boxstyle="{backgroundColor: '#F0F3F8'}" :rangeObject="rangeObject" :type="2"></tradeDetail>
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
              <view class="exp">需{{num*withdrawalsInfo.data.ratio}}点福气值</view>
            </view>
          </view>
          <view class="list list-1">
            <text class="left">提现方式</text>
            <!-- <view class="right">
              <image src="/static/image/zfb.png" class="zfb"></image>
              <text>{{maskPhoneNumber(withdrawalsInfo.data.user.alipay_id)}}</text>
            </view> -->
            <view class="methods">
              <view :class="['methods-box', methodType===item&&'active']" v-for="item in 2" :key="item" @click="switchMethod(item)">
                <image src="/static/image/zfb.png" v-if="item===1"></image>
                <image src="/static/image/wx-2.png" v-else></image>
                {{item===1?'支付宝':'微信'}}
              </view>
            </view>
          </view>
          
          <view class="text2 text3">提现须知：</view>
          <view class="text2"><text>1、</text>最小提现金额为1元人民币；</view>
          <view class="text2"><text>2、</text>提现需要同意平台授权个人支付宝或微信账号;</view>
          <view class="text2"><text>3、</text>每人每月累计可提现金额500人民币，超出部分可顺延下个月进行提现。</view>
          <view class="sure-btn" @click="makesureWathdrawal">确认提现</view>
        </view>
      </view>
    </uni-popup>
    
    <uni-popup ref="makesurePopup" type="center">
      <view class="makesure-popup">
        <view class="tit">完成提现</view>
        <view class="exp">
          提现申请已提交，资金将在5个工作日内到账，请在{{methodType===1?'支付宝账户':'微信账户'}}内查询，如有问题可联系平台客服咨询。
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
  import {luckyWithdrawalsInfoApi,luckyWithdrawalsApplyApi} from '@/service/wallet/index.js'
  import {formatNumber,maskPhoneNumber,getRecentWeekRange,getRecentMonthRange,getRecentThreeMonthsRange} from '@/unit/common.js'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import tradeDetail from '../income/components/trade-detail.vue'
  const rangeObject = {
    0: {start_time: '2025-01-01 00:00:00',end_time: ''},
    1: {start_time: getRecentWeekRange().start+' 00:00:00',end_time: getRecentWeekRange().end+' 23:59:59'},
    2: {start_time: getRecentMonthRange().start+' 00:00:00',end_time: getRecentMonthRange().end+' 23:59:59'},
    3: {start_time: getRecentThreeMonthsRange().start+' 00:00:00',end_time: getRecentThreeMonthsRange().end+' 23:59:59'},
  }
  
  const boyHeadimg = new URL("@/static/image/boy.png", import.meta.url).href
  const girlHeadimg = new URL("@/static/image/girl.png", import.meta.url).href
  const tradeDetailRef = ref(null)
  const num = ref('')
  const surePopup = ref()
  const makesurePopup = ref()
  const group_id = ref('')
  const prePage = ref('wallet')
  const methodType = ref(1)
  const withdrawalsInfo = reactive({
    data:{user:{}}
  })
  const payLock = ref(false)
  const gender = ref(window.userinfo?.user.gender===1?boyHeadimg:girlHeadimg)
  
  function switchMethod(item){
    methodType.value = item
  }
  // 提示防抖定时器（避免连续输入小数点时多次弹窗）
  let toastTimer = null
  function handleInputOnlyInt() {
      // 核心逻辑：过滤掉所有非数字字符，只保留0-9
      num.value = num.value.replace(/[^0-9.]/g, '');
      if (num.value.includes('.')) {
          // 防抖处理：3秒内只提示一次，避免频繁弹窗
          if (!toastTimer) {
            uni.showToast({
              title: '必须输入整数金额',
              icon: 'none', // 提示类型为纯文字，更友好
              duration: 2000 // 提示显示2秒
            });
            
            // 设置防抖定时器，3秒后重置
            toastTimer = setTimeout(() => {
              toastTimer = null;
            }, 3000);
          }
        } else {
          // 3. 仅当无小数点时，处理0开头的多位数（保持原有逻辑）
          if (num.value.length > 1 && num.value.startsWith('0')) {
            num.value = num.value.replace(/^0+/, '');
            // 处理过滤后为空的情况（比如只输入0时保留0）
            if (!num.value) num.value = '';
          }
        }
        
      // 可选：去除0开头的多位数（比如输入0123自动变成123，提现金额通常不需要0开头）
      // if (num.value.length > 1 && num.value.startsWith('0')) {
      //   num.value = num.value.replace(/^0+/, '');
      //   // 处理过滤后为空的情况（比如只输入0时保留0）
      //   if (!num.value) num.value = '';
      // }
  }
  
  function openPage(){
    uni.navigateTo({
      url:'/pages/agreements/newPolicy'
    })
  }
  
  function calculateTax(amount, taxRate) {
    if(!amount) return 0
    // 方法1：转换为整数计算
    const precision = 1000;
    const result = (amount * precision / taxRate) / precision;
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
    if(!num.value) {
      return false
    } else if(num.value.includes('.')) {
        uni.showToast({
          title: '必须输入整数金额',
          icon: 'none', // 提示类型为纯文字，更友好
          duration: 2000 // 提示显示2秒
        });
        return false
    } else if(withdrawalsInfo.data.cmw_fortune>=500) {
      uni.showToast({
        title: '本月提现已超额',
        icon: 'none'
      });
      return false
    } else if(num.value>withdrawalsInfo.data.cmrw_fortune){
      uni.showToast({
        title: '金额大于可提现金额',
        icon: 'none'
      });
      return false
    }
    surePopup.value.open()
  }
  function withdrawalsApply(){
    if(num.value>0&&payLock.value===false){
      uni.showLoading()
      payLock.value = true
      let param = {
        amount: num.value,
        channel: methodType.value===1?'alipay':'wechat',
      }
      luckyWithdrawalsApplyApi(param,res=>{
        payLock.value = false
        if (~~res.code === 0) {
          getWithdrawalsInfo()
          // withdrawalsInfo.data.fortune = withdrawalsInfo.data.fortune*1 - (num.value*1*withdrawalsInfo.data.ratio)
          num.value = ''
          surePopup.value.close()
          makesurePopup.value.open()
          if (tradeDetailRef.value) {
              tradeDetailRef.value.updateList()
          } else {
            console.warn('子组件实例未找到')
          }
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
  function makesureWathdrawal(){
    if(methodType.value===1&&!withdrawalsInfo.data.user.alipay_id){
      window.client.JSBindAlipayJSAction({},(respon)=>{
        if(respon) {
          getWithdrawalsInfo()
          withdrawalsApply()
        }
      })
      return false
    } else if(methodType.value===2&&!withdrawalsInfo.data.user.wechat_id) {
      window.client.JSBindWechatJSAction({},(respon)=>{
        if(respon) {
          getWithdrawalsInfo()
          withdrawalsApply()
        }
      })
      return false
    }
    withdrawalsApply()
  }
  window.notice_result_callback = (res)=>{
    // 客户端通知h5更新页面数据
    let respon = JSON.parse(res)
    if(respon.type===1){
      getWithdrawalsInfo()
      withdrawalsApply()
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
    if(withdrawalsInfo.data.cmrw_fortune>0){
      num.value = (withdrawalsInfo.data.rw_fortune+'').split('.')[0]
    }
  }
  
  function backPage(){
    uni.navigateBack()
  }
  
  function getWithdrawalsInfo(){
    uni.showLoading()
    luckyWithdrawalsInfoApi({},res=>{
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
  onLoad((option)=>{
    prePage.value = option.prePage || 'wallet'
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            getWithdrawalsInfo()
        });
    })
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
    margin-bottom: 36rpx;
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
        &.list-1 {
          padding: 30rpx 32rpx;
          height: auto;
          display: block;
          .methods{
            margin-top: 16rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .methods-box {
              width: 301rpx;
              height: 80rpx;
              background: #F0F3F8;
              border-radius: 16rpx;
              border: 2rpx solid #F0F3F8;
              font-weight: 400;
              font-size: 32rpx;
              color: #000000;
              display: flex;
              justify-content: center;
              align-items: center;
              &.active {
                background: rgba(2,169,241,0.1);
                border-color: #22C0FF;
              }
            }
            image {
              margin-right: 16rpx;
              width: 48rpx;
              height: 48rpx;
            }
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