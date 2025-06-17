<template>
  <view class="list-box">
    <view class="group-list">
      <view class="left">
        <!-- <image class="img" src="" mode=""></image> -->
        <image class="img" :src="robotInfo.group_cover" mode=""></image>
        <!-- <view class="img"></view> -->
        <view class="h1">{{robotInfo.group_name}}</view>
        <view class="h2">当前微信群</view>
      </view>
      <image class="move-icon" src="@/static/image/set/g-1.png" mode=""></image>
      <view class="right" @click="openPopup">
        <image v-if="curGroupInfo.cover" class="img" :src="curGroupInfo.cover" mode=""></image>
        <view class="img act" v-else>
          <image class="add" src="@/static/image/set/g-add.png" mode=""></image>
        </view>
        <view class="h1" v-if="!curGroupInfo.cover">点击添加</view>
        <view class="h1" v-else><image src="@/static/image/set/g-refresh.png" mode=""></image> 重新选择</view>
        <view class="h2">同步到微信群</view>
      </view>
    </view>
    <checkbox-group class="checkbox-list" @change="checkboxChange">
      <label>
        <checkbox value="2" :checked="checkMember" />群成员数据
      </label>
      <label class="checkbox-2">
        <checkbox value="1" />群设置
      </label>
    </checkbox-group>
    <view class="btn-start" @click="startDraw">开始同步</view>
    
    <!-- 请选择需同步的微信群 -->
    <uni-popup ref="groupPopup" type="bottom" background-color="#ffffff">
      <view class="groupPopup">
        <view class="title">请选择需同步的微信群</view>
        <view class="scroll-box">
          <scroll-view scroll-y="true" class="scroll" v-if="list.length>0">
            <radio-group @change="radioChange">
              <label class="list" v-for="(item, index) in list" :key="index">
                <view class="left">
                  <image class="img" :src="item.cover" mode=""></image>
                  <view>
                    <view class="h1">{{item.group_name}}</view>
                    <view class="h2">{{item.status_name}}</view>
                  </view>
                </view>
                <view class="right">
                  <radio :value="item.group_id" :checked="item.group_id == curGroupId" />
                </view>
              </label>
            </radio-group>
          </scroll-view>
          <view class="common-empty" v-else>
            <image src="@/static/image/empty.png" mode=""></image>
            暂无可同步的群列表~
          </view>
        </view>
        <view class="btn-sure-1" @click="sureGroup">
          <view>确认</view>
        </view>
        
      </view>
    </uni-popup>
    
    <!-- 二次确认弹窗 -->
    <uni-popup ref="surePopup" type="center">
      <view class="clearSurePopup">
        <view class="clearText">
          是否确认将 「{{robotInfo.group_name}}」的{{sureText}}同步到 「{{curGroupInfo.group_name}}」？
          <br>
          (该操作会消耗一次同步数据的服务额度)
        </view>
        <view class="btn-box">
          <view class="btn" @click="$refs.surePopup.close()">取消</view>
          <view class="btn btn-sure" @click="draw">确认</view>
        </view>
      </view>
    </uni-popup>
    
    <!-- 封群提示 -->
    <uni-popup ref="closePopPopup" type="center" :is-mask-click="false">
      <tips-x :value="errorText" @know="know"></tips-x>
    </uni-popup>
    
  </view>
</template>

<script>
  // import {scrollToTargetPosition} from '@/mixin/index.mixin.js'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import TipsX from '@/components/tips-x/tips-x.vue'
  import {groupSynListData, groupSynStartData} from '@/service/robotAccount/index.js'
  export default {
    props: {
      robotInfo: {
        type: Object,
        default: () => {}
      },
      robot_id: {
        type: String,
        default: () => {}
      }
    },
    // mixins: [scrollToTargetPosition],
    components: {uniPopup,TipsX},
    data () {
      return {
        list: [],
        dataType: [],
        curGroupId: '',
        curGroupIndex: -1,
        curGroupInfo: {
          group_id: '',
          cover: '',
          group_name: '',
          status_name: ''
        },
        sureText: '',
        errorText: '',
        checkMember: false
      }
    },
    methods: {
      draw() {
        uni.showLoading()
        let param = {
          data_type: this.dataType.length>1?3:this.dataType[0],
          syn_group_id: this.curGroupInfo.group_id,
          robot_id: this.robot_id,
          syn_robot_id: this.curGroupInfo.robot_wx_id
        }
        groupSynStartData(param, res => {
          if (~~res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          } else if (res.code === -20001) {
            uni.hideLoading()
            this.$emit('updateAdminToken')
          } else if (res.code === -30000) {
            this.errorText = res.msg
            this.$refs.closePopPopup.open()
            uni.hideLoading()
          } else if (res.code != -10002){
            uni.hideLoading()
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          } else {
            uni.hideLoading()
          }
          this.$refs.surePopup.close()
        })
      },
      startDraw() {
        if (!this.curGroupInfo.group_id) {
          uni.showToast({
            title: '请添加同步的微信群',
            icon: 'none'
          });
          return false
        } else if (this.dataType.length<=0) {
          uni.showToast({
            title: '请选择需要同步的配置',
            icon: 'none'
          });
          return false
        }
        this.sureText = this.dataType.length>=2 ? '【群成员数据和群设置】' : this.dataType[0] == 1 ? '【群设置】' : '【群成员数据】';
        this.$refs.surePopup.open()
      },
      know() {
        this.$refs.closePopPopup.close()
      },
      checkboxChange(e){
        console.log(e.detail.value,'uiu')
        this.dataType = e.detail.value
      },
      sureGroup() {
        if (this.curGroupIndex === -1) {
          uni.showToast({
            title: '请选择微信群',
            icon: 'none'
          });
          return false
        }
        this.curGroupInfo = this.list[this.curGroupIndex]
        this.$refs.groupPopup.close()
        
      },
      radioChange(e) {
        this.curGroupId = e.detail.value
        for(var key in this.list) {
          if (this.list[key].group_id === e.detail.value) {
            this.curGroupIndex = key
            break
          }
        }
      },
      openPopup() {
        this.getgroupSynListData()
      },
      getgroupSynListData() {
        uni.showLoading()
        groupSynListData({group_id: this.robotInfo.group_id},res => {
          if (~~res.code === 0) {
            this.list = res.data || []
            this.$refs.groupPopup.open()
            uni.hideLoading()
          } else if (res.code === -20001) {
            uni.hideLoading()
            this.$emit('updateAdminToken')
          }  else if (res.code === -30000) {
            this.errorText = res.msg
            this.$refs.closePopPopup.open()
            uni.hideLoading()
          } else if (res.code != -10002){
            uni.hideLoading()
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          } else {
            uni.hideLoading()
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-box {
    padding: 86rpx 0 60rpx;
    .group-list {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .img {
        width: 200rpx;
        height: 200rpx;
        line-height: 220rpx;
        border-radius: 10rpx;
        .add {
          width: 40rpx;
          height: 40rpx;
        }
      }
      .h1 {
        margin-top: 20rpx;
        font-weight: 500;
        font-size: 28rpx;
      }
      .h2 {
        margin-top: 12rpx;
        font-size: 24rpx;
        color: #606178;
      }
      
      .move-icon {
        width: 60rpx;
        height: 60rpx;
        margin: -80rpx 35rpx 0;
      }
      .right {
        .img {
          background: rgba(22, 117, 254, 0.1);
          border-radius: 10rpx;
          &.act {
            border: 1px solid #1675FE;
          }
        }
        .h1 {
          color: #1675FE;
          line-height: 32rpx;
          image {
            width: 32rpx;
            height: 32rpx;
            vertical-align: top;
            margin-right: 10rpx;
          }
        }
      }
      
    }
    .checkbox-list {
      margin-top: 60rpx;
      text-align: center;
      color: #000000;
      font-size: 28rpx;
      .checkbox-2 {
        margin-left: 100rpx;
      }
      :deep uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked{
          background-color: #1675FE;
      }
      :deep uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
        // border-color: #d1d1d1;
      }
    }
  }
  .btn-start {
    width: 100%;
    height: 80rpx;
    background-color: #1675FE;
    line-height: 80rpx;
    text-align: center;
    color: #ffffff;
    font-size: 28rpx;
    border-radius: 10rpx;
    margin-top: 60rpx;
  }
  .groupPopup {
    padding: 50rpx 30rpx 20rpx;
    background-color: #ffffff;
    border-radius: 30rpx 30rpx 0 0;
    box-sizing: content-box;
    .title {
      font-size: 32rpx;
      color: #000000;
      font-weight: 500;
    }
    .scroll-box {
      margin-top: 28rpx;
      height: 600rpx;
      .scroll {
        height: 100%;
        .list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30rpx 0;
          border-bottom: 1rpx solid #EEF0F4;
          &:last-of-type {
            border-bottom: none;
          }
          >* {
            flex-shrink: 0;
          }
          .left {
            display: flex;
            align-items: center;
            .img {
              width: 140rpx;
              height: 140rpx;
              margin-right: 30rpx;
            }
            .h1 {
              font-size: 32rpx;
              font-weight: 500;
            }
            .h2 {
              margin-top: 30rpx;
              color: #9DA9B9;
              font-size: 28rpx;
            }
          }
        }
      }
    }
    .btn-sure-1 {
      padding: 30rpx 0 0;
      >view {
        width: 100%;
        height: 80rpx;
        background-color: #1675FE;
        line-height: 80rpx;
        text-align: center;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 10rpx;
      }
    }
  }
  :deep .uni-popup .uni-popup__wrapper{
    border-radius: 30rpx 30rpx 0 0;
  }
</style>