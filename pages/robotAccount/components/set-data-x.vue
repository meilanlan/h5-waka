<template>
  <view class="list-box">
    <view class="item-box">
      <view class="list">
        <image class="icon" src="@/static/image/set/d-1.png"></image>
        <view class="right">
          <view class="h1">群人数：<text>{{info.total_user}}人</text></view>
          <view class="h2">
            <text>今日新增：<text class="text2">{{info.today_new_user}}人</text></text>
            <text class="text1">最新成员：<text class="text3">{{info.last_new_user_name || '-'}}</text></text>
          </view>
        </view>
      </view>
      
      <view class="list">
        <image class="icon" src="@/static/image/set/d-2.png"></image>
        <view class="right">
          <view class="h1">群活跃：<text>{{info.total_active}}人</text></view>
          <view class="h2">
            <text>今日：<text class="text3">{{info.day_active}}人</text></text>
            <text class="text1">本月：<text class="text3">{{info.month_active}}人</text></text>
          </view>
        </view>
      </view>
      
      <view class="list">
        <image class="icon" src="@/static/image/set/d-3.png"></image>
        <view class="right">
          <view class="h1">群发言：<text>{{info.total_chat}}条</text></view>
          <view class="h2">
            <text>今日：<text class="text3">{{info.day_chat}}条</text></text>
            <text class="text1">本月：<text class="text3">{{info.month_chat}}条</text></text>
            <text class="text1">累计：<text class="text3">{{info.total_chat}}条</text></text>
          </view>
        </view>
      </view>
      
      <view class="list">
        <image class="icon" src="@/static/image/set/d-4.png"></image>
        <view class="right">
          <view class="h1">签到：<text>{{info.total_check_in}}人次</text></view>
          <view class="h2">
            <text>今日：<text class="text3">{{info.day_check_in}}人次</text></text>
            <text class="text1">本月：<text class="text3">{{info.month_check_in}}人次</text></text>
          </view>
        </view>
      </view>
      
      <view class="list">
        <image class="icon" src="@/static/image/set/d-5.png"></image>
        <view class="right">
          <view class="h1">本群总金币：<text>{{info.total_coin}}</text></view>
          <view class="h2">
            <text>本群金币冠军：<text class="text3">{{info.user_name_max_coin}}</text><text class="text4">【{{info.user_max_coin}}】</text></text>
          </view>
        </view>
      </view>
      
      <view class="list">
        <image class="icon" src="@/static/image/set/d-10.png"></image>
        <view class="right">
          <view class="h1">本群总魅力：<text>{{info.total_charm}}</text></view>
          <view class="h2">
            <text>本群魅力冠军：<text class="text3">{{info.user_name_max_charm}}</text><text class="text4">【{{info.user_max_charm}}】</text></text>
          </view>
        </view>
      </view>
      
      <!-- <view class="list">
        <image class="icon" src="@/static/image/set/d-6.png"></image>
        <view class="right">
          <view class="h1">本群总水晶：<text>{{info.total_crystel}}</text></view>
          <view class="h2">
            <text>本群水晶冠军：<text class="text3">{{info.user_name_max_crystel}}</text><text class="text4">【{{info.user_max_crystel}}】</text></text>
          </view>
        </view>
      </view>
      
      <view class="list">
        <image class="icon" src="@/static/image/set/d-11.png"></image>
        <view class="right">
          <view class="h1">本群总金砖：<text>{{info.total_brick}}</text></view>
          <view class="h2">
            <text>本群金砖冠军：<text class="text3">{{info.user_name_max_brick}}</text><text class="text4">【{{info.user_max_brick}}】</text></text>
          </view>
        </view>
      </view> -->
    </view>
    
    <view class="item-box">
      <view class="list list1 list2">
        <image class="icon" src="@/static/image/set/d-12.png"></image>
        <view class="right">
          <view class="h1">群套餐信息</view>
        </view>
        <!-- <view class="left" @click="toPage('/pages/robotAccount/groupRecord')">
          记录 <image src="../../../static/image/ic_arrow.png" mode=""></image>
        </view> -->
      </view>
      <view class="h2-box">
        <view class="h2">
          <text>换群次数：<text class="text3">{{info.switch_group*1>999?'不计次数':info.switch_group+'次'}}</text></text>
          <text class="text1">元宝：<text class="text4">【{{info.yuanbao}}】</text></text>
          <!-- <text>封群换群：<text class="text3">{{info.switch_group}}次</text></text>
          <text class="text1">横幅换群：<text class="text3">{{info.switch_group_from_ban}}次</text></text> -->
        </view>
        <view class="h2">
          <text>数据同步：<text class="text3">{{info.syn_count*1>999?'不计次数':info.syn_count+'次'}}</text></text>
          <text class="text1">更换群助手：<text class="text3">{{info.switch_robot}}次</text></text>
        </view>
        <view class="h2">
          <text>超管个数：<text class="text3">{{info.super_admin}}人</text></text>
          <text class="text1">管理个数：<text class="text3">{{info.admin}}人</text></text>
        </view>
        <view class="h2">
          <text>开始时间：<text class="text3">{{info.start_time || '-'}}</text></text>
        </view>
        <view class="h2">
          <text>结束时间：<text class="text3">{{info.term_time || '-'}}</text></text>
        </view>
      </view>
      
    </view>
   
    <!-- <view class="item-box">
      <view class="list list1">
        <image class="icon" src="@/static/image/set/d-8.png"></image>
        <view class="right">
          <view class="h1">任务礼物记录</view>
        </view>
        <view class="left" @click="toPage('/pages/robotAccount/taskGiftRecord')">
          查看 <image src="../../../static/image/ic_arrow.png" mode=""></image>
        </view>
      </view>
    </view>
    
    <view class="item-box">
      <view class="list list1">
        <image class="icon" src="@/static/image/set/d-9.png"></image>
        <view class="right">
          <view class="h1">群主账户</view>
        </view>
        <view class="left" @click="toPage('/pages/robotAccount/groupAccount')">
          查看 <image src="../../../static/image/ic_arrow.png" mode=""></image>
        </view>
      </view>
    </view> -->
    
  </view>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        
      }
    },
    methods: {
      toPage(url){
        this.$emit('toNextPage',url)
        // uni.navigateTo({
        // 	url: url+'?group_id='+this.groupId+'&robot_id='+this.
        // });
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-box {
    margin-top: 10rpx;
    .item-box {
      margin: 18rpx 30rpx 0;
      padding: 0 30rpx;
      background-color: #ffffff;
      box-shadow: 0 0 20rpx 1px rgba(197, 204, 213, 0.1);
      border-radius: 20rpx;
    }
    .list {
      width: 100%;
      padding: 30rpx 0;
      border-bottom: 1rpx solid #EEF0F4;
      display: flex;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      .icon {
        width: 80rpx;
        height: 80rpx;
      }
      .right {
        width: 84%;
        margin-left: 30rpx;
        .h1 {
          line-height: 32rpx;
          font-weight: 500;
          font-size: 32rpx;
          text {
            color: #1675FE;
            margin-left: 10rpx;
          }
        }
        
      }
      &.list1 {
        border-bottom: none;
        .right {
          width: 62%;
        }
        .left {
          width: 130rpx;
          height: 56rpx;          
          line-height: 56rpx;
          border-radius: 40rpx;
          border: 2rpx solid #EEF0F4;
          font-size: 24rpx;
          // font-family: MiSans, 'MiSans';
          font-weight: 400;
          color: #606178;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          >* {
            flex-shrink: 0;
          }
          image {
            width: 24rpx;
            height: 24rpx;
            margin-left: 4rpx;
          }
        }
      }
      &.list2 {
        padding-bottom: 0;
      }
    }
  }
  .h2 {
    margin-top: 16rpx;
    font-size: 24rpx;
    color: #606178;
    text {
      line-height: 30rpx;
    }
    .text1 {
      margin-left: 30rpx;
    }
    .text2 {
      color: #1675FE;
    }
    .text3 {
      color: #0E1B2E;
    }
    .text4 {
      color: #FDAD12;
    }
  }
  .h2-box {
    padding-bottom: 40rpx;
    margin-top: -14rpx;
    padding-left: 110rpx;
  }
</style>