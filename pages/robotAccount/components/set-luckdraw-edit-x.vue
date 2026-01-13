<template>
  <view>
    <view class="wrapper2">
      <view class="title-box">
        <view class="left">
          盲盒名称
        </view>
        <view class="right" v-if="type === 1" @click="switchShowPlay">
          {{isShowPlay===true?'收起':'展开'}}
            <image :class="['t-arrow', isShowPlay===false?'hide':'']" src="../../../static/image/select-icon.png"></image>
        </view>
      </view>
      <view :class="['switch-box', isShowPlay===true?'show':'hide']">
        <view class="name">
          <input type="text" v-model="addDataNew.lottery_name" placeholder="1000金币/1000魅力/实物" placeholder-style="color:#C5CCD5">
        </view>
        <text class="text2">注：系统默认中奖需联系管理</text>
        <view class="title-box title-box-1">
          <view class="left">
            盲盒结果
          </view>
        </view>
        <view class="result-list">
          <view :class="['box', curResultIndex===i?'active':'']" v-for="(item, i) in resultList" :key="item.id" @click="switchResult(i)">
            <view class="left">
              <view class="img"></view>
              <text>{{item.text}}</text>
            </view>
            <!-- :type="item.id===1?'text':'number'" -->
            <template v-if="curResultIndex===i">
              <input v-if="item.id===0||item.id===1" type="digit" v-model="addDataNew.award" @blur="watchAward">
              <input v-else type="number" v-model="addDataNew.award" @blur="watchAward">
            </template>
            <!-- <input v-show="curResultIndex===i" type="digit" v-model="addDataNew.award" @blur="watchAward"> -->
          </view>
        </view>
        <text class="text2">注：请根据盲盒名称填写数字</text>
        <view class="lucky-box-set">
          <text class="label">盲盒概率</text>
          <input type="number" v-model="addDataNew.lottery_rate" @blur="watchLotteryRate">
          <text>概率范围0-1000</text>
        </view>
        <view class="lucky-box-set">
          <text class="label">盲盒数量</text>
          <input type="number" v-model="addDataNew.lottery_num" @blur="watchLotteryNum">
          <text>此盲盒每日发放总数</text>
        </view>
        <view class="lucky-box-set">
          <text class="label">每日限量</text>
          <input type="number" v-model="addDataNew.day_limit" @blur="watchLotteryDay">
          <text>每人每天获得此盲盒上限</text>
        </view>
        <view class="submit-btn" @click="saveAll">保存/添加新奖项</view>
      </view>
    </view>
    
  </view>
</template>
<script>
  import UniEvenSwitch from '@/components/uni-evan-switch/evan-switch.vue'
  import {lotterySetData, lotteryAddData, lotteryEditData} from '@/service/robotAccount/index.js'
  export default {
    props:{
      type: {
        type: Number,
        default: 1
      },
      isOpen: {
        type: Boolean,
        default: false
      },
      addData: {
        type: Object,
        default: () => {
          return {
            lottery_name: '',
            lottery_type: 0,
            award: 0,
            lottery_rate: 0,
            lottery_num: 0,
            day_limit: 0
          }
        }
      },
    },
    components: {UniEvenSwitch},
    data(){
      return {
        isShowPlay: true,
        curResultIndex: 0,
        resultList: [
          {id:2,text: '开盲盒获得实物价值', award: 100},
          {id:3,text: '战队金获得实物价值', award: 100},
          {id:0,text: '开盲盒获得金币', award: 100},
          {id:1,text: '开盲盒获得魅力', award: 100},
        ],
        addDataNew: {
          lottery_name: '',
          lottery_type: 0,
          award: 0,
          lottery_rate: 0,
          lottery_num: 0,
          day_limit: 0
        }
      }
    },
    mounted() {
      this.addDataNew = JSON.parse(JSON.stringify(this.addData))
      if (this.type === 2){
        this.resultList.forEach((item,i) =>{
          (item.id===this.addDataNew.lottery_type)&&(this.curResultIndex=i)
        })
      }
      // console.log(this.addDataNew.lottery_type, 'tutu',this.addData.lottery_type)
    },
    methods: {
      saveAll() {
        if (!this.addDataNew.lottery_name) {
          uni.showToast({
            title: '请输入盲盒的名称',
            icon: 'none'
          });
          return false
        }
        uni.showLoading()
        this.addDataNew.lottery_type = this.resultList[this.curResultIndex].id
        let param = {
          lottery_id: this.addDataNew.lottery_id,
          group_id: this.addDataNew.group_id,
          auth_code: this.addDataNew.auth_code,
          status: this.addDataNew.status, //新增
          lottery_name: this.addDataNew.lottery_name,
          l_type: this.addDataNew.lottery_type,
          l_award: this.addDataNew.award,
          l_total: this.addDataNew.lottery_num,
          l_rate: this.addDataNew.lottery_rate,
          l_maxnum_uday: this.addDataNew.day_limit,
        }
        lotteryAddData(param, res => {
          if (res.code === 0) {
            this.drawData(res)
          } else if (res.code === 100401) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.$emit('clearAdminToken')
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          uni.hideLoading()
        })
      },
      drawData(res){
        this.$emit('updateData')
        // this.initdata()
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        // this.addDataNew = {
        //   lottery_name: '',
        //   lottery_type: 0,
        //   award: 0,
        //   lottery_rate: 0,
        //   lottery_num: 0,
        //   day_limit: 0
        // }
        this.addDataNew.lottery_name = ''
        this.addDataNew.lottery_type = 0
        this.addDataNew.award = 0
        this.addDataNew.lottery_rate = 0
        this.addDataNew.lottery_num = 0
        this.addDataNew.day_limit = 0
        this.curResultIndex = 0
        this.type != 1 && this.$emit('closePopup')
      },
      watchLotteryDay() {
        this.addDataNew.lottery_num<0&&(this.addDataNew.lottery_num=0)
      },
      watchLotteryNum() {
        this.addDataNew.day_limit<0&&(this.addDataNew.day_limit=0)
      },
      watchLotteryRate() {
        this.addDataNew.lottery_rate<0&&(this.addDataNew.lottery_rate=0)
        this.addDataNew.lottery_rate>1000&&(this.addDataNew.lottery_rate=1000)
      },
      watchAward() {
        this.addDataNew.award = !this.addDataNew.award?0:this.addDataNew.award
        if (this.resultList[this.curResultIndex].id !=0 && this.resultList[this.curResultIndex].id !=1) {
          this.addDataNew.award<0&&(this.addDataNew.award=0)
        }
      },
      switchResult(i) {
        if (this.curResultIndex != i) {
          this.curResultIndex = i
          this.addDataNew.award = 0
        }
      },
      
      switchShowPlay(){
        this.isShowPlay = !this.isShowPlay
      },
    }
  }
</script>

<style lang="scss" scoped>
.wrapper2 {
  // margin-top: -42rpx;
  box-shadow: 0 0 10rpx 0 rgba(197,204,213,0.1);
  width: 690rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  padding: 42rpx 30rpx;
  font-size: 28rpx;
  margin: 0 auto;
  .title-box {
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.title-box-1 {
      margin-top: 24rpx;
    }
    >* {
      flex-shrink: 0;
    }
    image {
      width: 20rpx;
      height: 20rpx;
      margin-left: 10rpx;
      vertical-align: text-bottom;
      &.t-arrow {
        transform: rotate(0);
        transition: transform 300ms;
        &.hide {
          transform: rotate(180deg);
          transition: transform 300ms;
        }
      }
    }
    
    .left {
      font-weight: 500;
      color: #0E1B2E;
      line-height: 40rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
    }
    .right {
      line-height: 40rpx;
      color: #606178;
      display: flex;
      align-items: center;
      font-size: 28rpx;
    }
  }
}
.switch-box {
  margin-top: 20rpx;
  overflow: hidden;
  transition: height .2s;
  .name {
    width: 630rpx;
    height: 80rpx;
    background: #F4F5F7;
    border-radius: 10rpx;
    padding: 0 20rpx;
    input {
      width: 100%;
      height: 100%;
      font-size: 28rpx;
    }
  }
  .text2 {
    display: block;
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #9DA9B9;
  }
  
  .result-list {
    width: 630rpx;
    background: #F8F9FA;
    border-radius: 8rpx;
    padding: 30rpx 10rpx 30rpx 30rpx;
    .box {
      width: 100%;
      height: 64rpx;
      margin-bottom: 14rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      >*{
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items: center;
        .img {
          margin-right: 16rpx;
          width: 40rpx;
          height: 40rpx;
          border: 2rpx solid #C5CCD5;
          border-radius: 50%;
        }
        text {
          font-size: 32rpx;
        }
      }
      input {
        width: 160rpx;
        height: 64rpx;
        background: #EEF0F4;
        border: 1rpx solid #1675FE;
        border-radius: 8rpx;
        text-align: center;
        font-size: 28rpx;
      }
      &.active {
        .img {
          border: none;
          background: url('@/static/image/set/check.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  &.show {
    height: auto;
  }
  &.hide {
    height: 0;
  }
}
.lucky-box-set {
  margin-top: 30rpx;
  display: flex;
  align-items: center;
  
  text {
    font-size: 24rpx;
    color: #9DA9B9;
  }
  .label {
    font-size: 32rpx;
    font-weight: 500;
    color: #0E1B2E;
  }
  input {
    margin: 0 30rpx;
    padding: 0 8rpx;
    width: 160rpx;
    height: 80rpx;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 80rpx;
    background: #F4F5F7;
    border-radius: 8rpx;
    text-align: center;
  }
}
.submit-btn {
  margin-top: 40rpx;
  width: 630rpx;
  height: 80rpx;
  background: #1675FE;
  text-align: center;
  line-height: 80rpx;
  font-size: 28rpx;
  color: #FFFFFF;
  border-radius: 12rpx;
}
</style>