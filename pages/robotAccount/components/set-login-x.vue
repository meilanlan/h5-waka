<template>
  <view class="login">
    <view class="h1">
      <image src="@/static/image/set-login/admin.png" mode=""></image>
      管理员登录
    </view>
    <view :class="['inpt-box', isActive===true?'active':'']">
      <image src="@/static/image/set-login/lock.png" mode=""></image>
      <input class="input" v-model="password" type="password" placeholder="请输入管理员密码" placeholder-style="color:#C5CCD5" @focus="isActive=true" @blur="isActive=false">
      <view :class="['btn', password!=''?'active':'']" @click="tologin">登录</view>
    </view>
    <view class="tips">
      <view class="tit">登录群设置可快捷自定义以下功能</view>
      <view class="list-box">
        <view class="list">
          <image src="@/static/image/set-login/1.png" mode=""></image>
          群内数据
        </view>
        <view class="list">
          <image src="@/static/image/set-login/2.png" mode=""></image>
          成员信息
        </view>
        <view class="list">
          <image src="@/static/image/set-login/3.png" mode=""></image>
          文案配置
        </view>
        <view class="list">
          <image src="@/static/image/set-login/4.png" mode=""></image>
          指令配置
        </view>
        <view class="list">
          <image src="@/static/image/set-login/5.png" mode=""></image>
          一键复制
        </view>
        <view class="list">
          <image src="@/static/image/set-login/6.png" mode=""></image>
          修改密码
        </view>
      </view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        password: '',
        isActive: false
      }
    },
    methods: {
      tologin(){
        if (this.password != '') {
          this.$emit('tologin', {paw: this.password})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    padding: 0 60rpx;
    margin-top: 80rpx;
    .h1 {
      font-size: 40rpx;
      font-weight: 500;
      line-height: 40rpx;
      text-align: center;
      image {
        width: 48rpx;
        height: 48rpx;
        margin-right: 15rpx;
        vertical-align: bottom;
      }
    }
    .inpt-box {
      padding: 0 12rpx 0 30rpx;
      margin-top: 70rpx;
      height: 112rpx;
      background: #F4F5F7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 15rpx;
      >* {
        flex-shrink: 0;
      }
      &.active {
        border: 1px solid #1675FE;
      }
      image {
        width: 40rpx;
        height: 40rpx;
      }
      .input {
        width: 340rpx;
        height: 32rpx;
        font-size: 32rpx;
        color: #0E1B2E;
        line-height: 32rpx;
      }
      .btn {
        width: 172rpx;
        height: 88rpx;
        line-height: 88rpx;
        background-color: #C5CCD5;
        font-size: 32rpx;
        font-weight: 500;
        color: #ffffff;
        border-radius: 15rpx;
        text-align: center;
        &.active {
          background-color: #1675FE;
        }
      }
    }
    .tips {
      margin-top: 100rpx;
      text-align: center;
      .tit {
        margin-bottom: 40rpx;
        color: #9DA9B9;
        font-size: 24rpx;
      }
      .list-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .list {
          width: 305rpx;
          height: 100rpx;
          line-height: 100rpx;
          background: #F8F9FA;
          border-radius: 20rpx;
          margin-bottom: 20rpx;
          font-size: 28rpx;
          color: #606178;
          image {
            width: 40rpx;
            height: 40rpx;
            vertical-align: text-top;
            margin-right: 20rpx;
          }
        }
      }
    }
  }
</style>