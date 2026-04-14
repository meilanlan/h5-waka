<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="福袋功能使用说明" @backPage="backPage"></myCustomNavbar>
    
    <view>· 福袋入口</view>
    <view>福袋是用户在社群内群成员之间互动的方式。</view>
    <image class="img1" src="/static/image/luckyBagExplain/1.jpg"></image>
    <view>· 福袋使用</view>
    <view>福袋分为新入福袋、锦鲤福袋和定时福袋，（用户使用嗨币）支付后可以发送福袋到群内，新人福袋：是固定福气值和固定福袋个数的福袋；锦鲤福袋：可以自定义福气值和福袋个数，也可以选择拼手气和普通福袋两种模式。定时福袋：是一种可以设置1-10分钟后开启的福袋，并可以设置开启门槛的福袋。用户在第一次使用福袋功能时，需要同意“Whack福袋互动功能服务协议”后，才能使用福袋功能。发送在群内的福袋，自己和群成员都可以领取，先到先得，24小时内未领取完的福袋，系统会自动将剩余的金额和虚拟道具退回到用户账户内。 </view>
    <image class="img2" src="/static/image/luckyBagExplain/2.jpg"></image>
    <view> · 新入福袋</view>
    <view>新人福袋，为固定福气值和福袋个数，用户仅可以自定义福袋名称和福袋封面，完成后支付获得对应的嗨币后 ，福袋会发送到群内。</view>
    <image class="img3" src="/static/image/luckyBagExplain/3.jpg"></image>
    <view>选择福袋封面</view>
    <image class="img4" src="/static/image/luckyBagExplain/4.jpg"></image>
    <view>· 锦鲤福袋</view>
    <view>锦鲤福袋可以设置福气值、福袋个数、福袋名称和福袋封面，完成设置后底部会自动显示需要支付嗨币的金额，完成后支付获得对应的嗨币后，福袋会发送到群内。</view>
    <image class="img5" src="/static/image/luckyBagExplain/5.jpg"></image>
    <view>· 定时福袋</view>
    <view>定时福袋可以设置福气值、福袋个数，还可以设置1-10分钟的开启时间，当人均福气值超过10点时，可以开启福袋门槛10嗨币，开启后打开福袋的用户需要给发送福袋的用户每次支付10嗨币。</view>
    <image class="img6" src="/static/image/luckyBagExplain/6.jpg"></image>
    <view>社群内有多个定时福袋未被领取时，右上角会有定时福袋的数量显示。</view>
    <image class="img7" src="/static/image/luckyBagExplain/7.jpg"></image>
    <view>点击后可以查询社群内定时福袋列表，点击后可以开启定时福袋。</view>
    <image class="img8" src="/static/image/luckyBagExplain/8.jpg"></image>
    <view>· 福袋记录</view>
    <view>我的-钱包中，可以查询自己福袋的发出和收到的记录。</view>
    <image class="img9" src="/static/image/luckyBagExplain/9.jpg"></image>
    <view>点击后可以查询详细的记录</view>
    <image class="img10" src="/static/image/luckyBagExplain/11.jpg"></image>
    <image class="img10 img10-1" src="/static/image/luckyBagExplain/12.jpg"></image>
    <view>福气袋中可以查询并使用收到的福利道具。</view>
    <image class="img13" src="/static/image/luckyBagExplain/13.jpg"></image>
    <view>· 福袋提现</view>
    <view>我的-钱包-我的福袋中，点击提现可以进入到提现页面。</view>
    <image class="img14" src="/static/image/luckyBagExplain/14.jpg"></image>
    <view>提现页面中会显示当前账户可提现金额，用户可以自定义设置提现金额，提现金额必须是整数，最低不能小于1元。页面底部显示提现状态记录，如有问题可以联系官方客服。</view>
    <image class="img15" src="/static/image/luckyBagExplain/15.jpg"></image>
    <view>提现渠道可以选择支付宝或微信，第一次提现需要同意Whack进行授权，完成授权后系统会进行打款申请，完成打款后系统会更新状态，用户可以在个人支付宝或微信钱包中查看金额到账。</view>
    <image class="img16" src="/static/image/luckyBagExplain/16.jpg"></image>
    <view class="font-bold">用户使用本服务的行为应符合相关法律法规规定及平台规则，用户在社群内发放福袋和参与领取福袋的行为，视为用户个人行为，用户需要承担所有责任，平台不承担任何责任。且不得存在任何违反上述规定/规则、侵犯任何第三人合法权益的情况。同时，用户不得以任何违法或违反公序良俗的方式使用本服务（包括但不限于利用本服务开展涉嫌赌博、诈骗性质的活动等），否则应当自行承担可能因此产生的责任和损失，如因此给平台造成任何损失的，用户还应当赔偿。用户违反本条的，平台有权保存用户相关违法违规或不当行为的记录，并将其移送给相关行政或司法机关予以处理。</view>
    
  </view>
</template>

<script setup>
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  
  
  function backPage() {
    window.client.closeWebview()
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 88rpx 32rpx;
    background-color: #ffffff;
    view {
      margin-bottom: 20rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(0,0,0,0.8);
      line-height: 48rpx;
    }
    .mt32 {
      margin-top: 60rpx;
    }
    .text-right {
      text-align: right;
    }
    .font-bold {
      font-weight: bold;
    }
    image {
      margin-bottom: 12rpx;
    }
    .img1 {
      width: 570rpx;
      height: 450rpx;
    }
    .img2 {
      width: 564rpx;
      height: 609rpx;
    }
    .img3 {
      width: 446rpx;
      height: 897rpx;
    }
    .img4 {
      width: 435rpx;
      height: 488rpx;
    }
    .img5 {
      width: 387rpx;
      height: 777rpx;
    }
    .img6 {
      width: 438rpx;
      height: 891rpx;
    }
    .img7 {
      width: 559rpx;
      height: 536rpx;
    }
    .img8 {
      width: 565rpx;
      height: 638rpx;
    }
    .img9 {
      width: 561rpx;
      height: 538rpx;
    }
    .img10 {
      width: 291rpx;
      height: 601rpx;
      &.img10-1 {
        margin-left: 20rpx;
      }
    }
    .img13 {
      width: 306rpx;
      height: 632rpx;
    }
    .img14 {
      width: 488rpx;
      height: 673rpx;
    }
    .img15 {
      width: 490rpx;
      height: 755rpx;
    }
    .img16 {
      width: 483rpx;
      height: 526rpx;
    }
  }
</style>