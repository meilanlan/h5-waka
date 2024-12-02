<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
      
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
  @import url('@/common/common.css');
	/*每个页面公共css */
  
  body {
    font-family: "PingFang SC-Medium", "PingFang SC";
    color: #0E1B2E;
    line-height: 1;
    background-color: #F4F5F7;
  }
  * {
    box-sizing: border-box;
  }
  
  /* #ifdef H5 */
  :deep uni-scroll-view .uni-scroll-view::-webkit-scrollbar { 
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
     display: none 
  } 
  /* #endif */
  
  // 导航栏
  .common-header {
    // padding: 0 40rpx 0 32rpx;
    width: 100%;
    height: 88rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .back {
      width: 48rpx;
      height: 48rpx;
      position: absolute;
      // top: 20rpx;
      left: 32rpx;
      cursor: pointer;
    }
    .gy {
      width: 48rpx;
      height: 48rpx;
    }
    text {
      font-size: 36rpx;
      font-family: "PingFang SC-Medium";
      font-weight: 500;
      color: #000000;
    }
  }
  
  // 机器列表
  .robotList {
    .list {
      margin-bottom: 24rpx;
      padding: 32rpx;
      height: 208rpx;
      background: #FFFFFF;
      box-shadow: 0px 4rpx 20rpx 1rpx rgba(197, 204, 213, 0.1);
      border-radius: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      >* {
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items: center;
      }
      .headimg {
        width: 140rpx;
        height: 140rpx;
        position: relative;
        overflow: hidden;
        border-radius: 24rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 24rpx;
          &.off {
            filter: blur(6rpx);
          }
        }
        .off-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 140rpx;
          color: #FFFFFF;
          font-size: 24rpx;
          filter: blur(0);
        }
      }
      .info {
        margin-left: 24rpx;
        font-size: 24rpx;
        color: rgba(0, 0, 0, .4);
        .name {
          font-size: 32rpx;
          font-weight: 600;
          // max-width: 300rpx;
          color: #000000;
          display: flex;
          align-items:center;
          .cv {
            width: 80rpx;
            height: 32rpx;
            margin-left: 16rpx;
          }
        }
        .ing {
          margin-top: 8rpx;
          display: flex;
          align-items: center;
          font-weight: 400;
          >*{
            flex-shrink: 0;
          }
          text {
            color: #1675FE;
            padding: 0 4rpx;
          }
          .ing-box {
            display: flex;
            align-items: center;
            margin-right: 18rpx;
          }
          .ing-icon {
            margin-right: 8rpx;
            width: 28rpx;
            height: 28rpx;
            vertical-align: middle;
          }
        }
        .medal {
          margin-top: 10rpx;
          display: flex;
          align-items: center;
          font-weight: 400;
          image {
            width: 32rpx;
            height: 32rpx;
            margin-left: 8rpx;
          }
        }
        .st {
          margin-top: 20rpx;
          .st-img {
            &::before {
              content: '';
              display: inline-block;
              width: 30rpx;
              height: 30rpx;
              background-repeat: no-repeat;
              background-size: contain;
              vertical-align: middle;
            }
            &::after {
              content: '';
              display: inline-block;
              font-size: 24rpx;
              margin-left: 10rpx;
            }
            &.st-true {
              &::before {
                content: "";
                // background-image: url('@/static/image/online.png');
              }
              &::after {
                content: "在线";
                color: #00B386;
              }
            }
            &.st-false {
              &::before {
                content: "";
                // background-image: url('@/static/image/offline.png');
              }
              &::after {
                content: "已离线";
                color: #606178;
              }
            }
          }
          
        }
      }
      .off-text {
        width: 297rpx;
        height: 34rpx;
        position: absolute;
        bottom: 34rpx;
        left: 323rpx;
      }
      .btn {
        // width: 130rpx;
        padding: 0 30rpx;
        height: 56rpx;
        border-radius: 40rpx;
        border: 2rpx solid #EEF0F4;
        text-align: center;
        line-height: 56rpx;
        font-size: 24rpx;
        color: #9DA9B9;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        
        image {
          display: block;
          width: 24rpx;
          height: 24rpx;
          margin-left: 4rpx;
        }
      }
    }
  }
  // 设置底部弹窗的圆角
  :deep .uni-popup .uni-popup__wrapper{
    border-radius: 30rpx 30rpx 0 0;
  }
  .common-popup {
    width: 100vw;
    height: calc(100vh - 120px);
    padding: 40rpx 28rpx;
    background-color: #ffffff;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
  }
  
</style>
