<template>
  <view>
    <view class="closePopPopup">
      <view class="clearText">
        <text space="nbsp">{{value}}</text>
      </view>
      <view class="btn-box" @click="know">确认</view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: () => {}
      }
    },
    name:"tips-x",
    data() {
      return {
        
      };
    },
    methods: {
      know() {
        this.$emit('know')
      }
    }
  }
</script>

<style lang="scss" scoped>
.closePopPopup {
    width: 622rpx;
    height: 350rpx;
    background: #FFFFFF;
    border-radius: 30rpx;
    padding: 60rpx 0 0;
    font-size: 36rpx;
    .clearText {
      text-align: center;
      font-weight: 500;
      line-height: 1.5;
    }
    .text2 {
      margin-top: 30rpx;
      font-weight: 400;
      color: #606178;
      text-align: center;
    }
    .btn-box {
      margin: 40rpx auto 0;
      width: 462rpx;
      height: 88rpx;
      background: #1675FE;
      border-radius: 20rpx;
      font-weight: 500;
      color: #FFFFFF;
      text-align: center;
      line-height: 88rpx;
    }
  }
</style>