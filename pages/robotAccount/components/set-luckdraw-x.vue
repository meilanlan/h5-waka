<template>
  <view class="lucky-box need_scroll_top_view" v-if="initFlag">
    <view class="lucky-tab">
      <view :class="['box', 'box-'+item, curIndex===i?'active':'']" v-for="(item, i) in 2" :key="item" @click="switchTab(i)">
        <text></text>{{item===1?'盲盒设置':'盲盒记录'}}
      </view>
    </view>
    <view v-show="curIndex === 0">
      <view class="wrapper1">
        <view class="wrapper1-box">
          <text>每次盲盒消耗金币</text>
          <input class="input" type="number" v-model="configData.lottery_coin" @blur="watchCoin">
          <view class="btn" @click="saveCoin">保存</view>
        </view>
        <view class="text1">使用方法：如您盲盒名称填写100金币，开盲盒结果处勾选开盲盒获得金币，后面填写100即可。</view>
      </view>
      <view class="switch-box-1">
        <text space="nbsp" decode="true">金币/魅力自动发放（开）</text> <uni-even-switch :size="20" :value="isOpen" :extra-data="0" :context-level="2" activeColor="#67C23A" inactiveColor="#C1CBDB" :beforeChange="beforeListChange"></uni-even-switch>
      </view>
      <set-luckdraw-edit-x
        :type="1"
        :isOpen="isOpen"
        :addData="addData"
        @clearAdminToken="clearAdminToken"
        @updateData="initdata"
      ></set-luckdraw-edit-x>
      
      <view class="tableList">
        <uni-table ref="tableList" :loading="loading" emptyText="暂无数据">
          <uni-tr class="tr-header">
            <uni-th class="circle" align="center" :width="tableWidth1">序号</uni-th>
            <uni-th :width="tableWidth3" align="center">盲盒名称</uni-th>
            <uni-th :width="tableWidth2" align="center">概率</uni-th>
            <uni-th :width="tableWidth3" align="center">消耗金币</uni-th>
            <uni-th :width="tableWidth2" align="center">数量</uni-th>
            <uni-th :width="tableWidth3" align="center">每日限量</uni-th>
            <uni-th :width="tableWidth1" align="center">编辑</uni-th>
            <uni-th :width="tableWidth1" align="center" class="circle1">删除</uni-th>
          </uni-tr>
          <uni-tr v-for="(item,i) in configData.lottery_list" :key="i">
            <uni-td :width="tableWidth1" align="center">{{i<9?'0'+(i+1):(i+1)}}</uni-td>
            <uni-td :width="tableWidth3" align="center">
              <view class="name-box">{{item.lottery_name}}</view>
            </uni-td>
            <uni-td :width="tableWidth2" align="center">{{item.rate || 0}}</uni-td>
            <uni-td :width="tableWidth3" align="center">{{item.coin || 0}}</uni-td>
            <uni-td :width="tableWidth2" align="center">{{item.total_num || 0}}</uni-td>
            <uni-td :width="tableWidth3" align="center">{{item.user_max_num_day || 0}}</uni-td>
            <uni-td :width="tableWidth1" align="center"><image class="delect" src="@/static/image/set/edit.png" mode="" @click="editLotter(i)"></image></uni-td>
            <uni-td :width="tableWidth1" align="center"><image class="delect" src="@/static/image/set/delect.png" mode="" @click="delectLotter(item, i)"></image></uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>
    
    <view class="record-list" v-show="curIndex === 1">
      <view class="text1 text3">提示：开盲盒记录仅保存当日记录</view>
      <view class="tableList tableList1">
        <uni-table ref="tableList" :loading="loading" emptyText="暂无数据">
          <uni-tr class="tr-header">
            <uni-th class="circle" align="center" :width="tableWidth4"  :sortable="true" @sort-change="changeTable($event)">序号</uni-th>
            <uni-th :width="tableWidth6" align="center">昵称</uni-th>
            <uni-th :width="tableWidth5" align="center">盲盒名称</uni-th>
            <uni-th :width="tableWidth4" align="center">实物</uni-th>
            <uni-th :width="tableWidth4" align="center">金币</uni-th>
            <uni-th :width="tableWidth4" align="center" class="circle1">魅力</uni-th>
          </uni-tr>
          <uni-tr v-for="(item, i) in logData" :key="i">
            <uni-td :width="tableWidth4" align="center" sortable>{{i<9?'0'+(i+1):(i+1)}}</uni-td>
            <uni-td :width="tableWidth6" align="center">{{item.nick_name}}</uni-td>
            <uni-td :width="tableWidth5" align="center">
              <view class="name-box">
                {{item.lottery_name}}
              </view>
            </uni-td>
            <uni-td :width="tableWidth4" align="center">{{(item.cash?item.cash.toFixed(2):item.cash) || 0}}</uni-td>
            <uni-td :width="tableWidth4" align="center">
              <view>已发放{{item.coin_auto || 0}}</view>
              <view v-show="item.coin_manual">{{item.coin_manual || 0}}未发放</view>
            </uni-td>
            <uni-td :width="tableWidth4" align="center">
              <view>已发放{{item.charm_auto || 0}}</view>
              <view v-show="item.charm_manual">{{item.charm_manual || 0}}未发放</view>
            </uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </view>
    
    <uni-popup ref="luckyPopup" type="bottom">
      <view class="robotMallPopup" >
        <view class="title">编辑奖品</view>
        <scroll-view scroll-y="true" class="scroll">
          <set-luckdraw-edit-x
            v-if="addData.lottery_id"
            :type="2"
            :isOpen="isOpen"
            :addData="addData"
            @clearAdminToken="clearAdminToken"
            @updateData="initdata"
            @closePopup="$refs.luckyPopup.close()"
          ></set-luckdraw-edit-x>
        </scroll-view>
      </view>
    </uni-popup>
    
  </view>
</template>

<script>
  import UniEvenSwitch from '@/components/uni-evan-switch/evan-switch.vue'
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import SetLuckdrawEditX from './set-luckdraw-edit-x.vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {lotteryConfigData,lotteryDelData, lotterySetData,lotteryAddData,lotteryLogData} from '@/service/robotAccount/index.js'
  // import {scrollToTargetPosition} from '@/mixin/index.mixin.js'
  export default {
    // mixins: [scrollToTargetPosition],
    components: {UniEvenSwitch,uniTable,uniTd,uniTh,uniTr,SetLuckdrawEditX,uniPopup},
    props:{
      group_id: {
        type: String,
        default: () => {}
      },
      authCode: String
    },
    data() {
      return {
        curIndex: 0,
        curResultIndex: 0,
        loading: false,
        initFlag: false,
        tableWidth1: uni.upx2px(70),
        tableWidth2: uni.upx2px(78),
        tableWidth3: uni.upx2px(120),
        tableWidth4: uni.upx2px(80),
        tableWidth5: uni.upx2px(100),
        tableWidth6: uni.upx2px(90),
        resultList: [
          {id:2,text: '开盲盒获得实物价值', award: 100},
          {id:3,text: '战队金获得实物价值', award: 100},
          {id:0,text: '开盲盒获得金币', award: 100},
          {id:1,text: '开盲盒获得魅力', award: 100},
        ],
        configData: {
          data_type: 18,
          lottery_coin: 0,
          lottery_list: []
        },
        isOpen: false,
        addData: {
          group_id: '',
          auth_code: '',
          status: 1,
          lottery_name: '',
          lottery_type: 0,
          award: 0,
          lottery_rate: 0,
          lottery_num: 0,
          day_limit: 0
        },
        logData: []
      }
    },
    mounted() {
      uni.showLoading()
      this.addData.group_id = this.group_id*1
      this.addData.auth_code = this.authCode
      this.initdata()
    },
    
    methods: {
      beforeListChange(e,extraData) {
        uni.showLoading()
        let params = {
          group_id: this.group_id, 
          auth_code: this.authCode, 
          auto_add: e===true?1:0,
          data_type: this.configData.data_type,
          lottery_coin: this.configData.lottery_coin
        }
        
        return new Promise((resolve, reject) => {
          lotterySetData(params, res => {
            if (~~res.code === 0) {
              setTimeout(()=>{
                uni.showToast({
                  title: e===true?'已开启':'已关闭',
                  icon: 'none'
                });
              },300)
              resolve()
            } else if (res.code === 100401) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
              this.$emit('updateAdminToken')
              uni.hideLoading()
            } else {
              uni.hideLoading()
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
              reject()
            }
          })
        })
      },
      saveCoin() {
        uni.showLoading()
         // auto_add: this.isOpen===true?1:0
        lotterySetData({group_id: this.group_id, auth_code: this.authCode, data_type: this.configData.data_type, lottery_coin: this.configData.lottery_coin, auto_add: this.isOpen===true?1:0,}, res => {
          if (res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          } else if (res.code === 100401) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.$emit('updateAdminToken')
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          uni.hideLoading()
        })
      },
      watchCoin() {
        (this.configData.lottery_coin<0||!this.configData.lottery_coin)&&(this.configData.lottery_coin=0)
      },
      editLotter(i) {
        // console.log(this.configData.lottery_list[i].lottery_type,'type')
        this.addData = {
          group_id: this.group_id*1,
          auth_code: this.authCode,
          status: 1,//编辑
          lottery_id: this.configData.lottery_list[i].lottery_id,
          lottery_name: this.configData.lottery_list[i].lottery_name,
          lottery_type: this.configData.lottery_list[i].lottery_type || 0,
          award: this.configData.lottery_list[i].award || 0,
          lottery_rate: this.configData.lottery_list[i].rate,
          lottery_num: this.configData.lottery_list[i].total_num,
          day_limit: this.configData.lottery_list[i].user_max_num_day
        }
        // console.log(this.addData, 'ui')
        this.$refs.luckyPopup.open()
      },
      delectLotter(item, i) {
        uni.showLoading()
        let param = {
          group_id: this.group_id*1,
          auth_code: this.authCode,
          lottery_id: item.lottery_id
        }
        lotteryDelData(param, res => {
          if (res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.configData.lottery_list.splice(i, 1)
          } else if (res.code === 100401) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.$emit('updateAdminToken')
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
          uni.hideLoading()
        })
      },
      initdata() {
        uni.showLoading()
        lotteryConfigData({group_id: this.group_id*1,auth_code: this.authCode}, res => {
          if (res.code === 0) {
            this.isOpen = res.data[0].auto_do&&res.data[0].auto_do*1 === 1 ? true : false
            this.configData = res.data[0]
          } else if (res.code === 100401) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.$emit('updateAdminToken')
          } else {
            // if (res.code != -10002){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            // }
          }
          uni.hideLoading()
          this.initFlag = true
        })
      },
      initRecord() {
        lotteryLogData({group_id: this.group_id,auth_code: this.authCode}, res => {
          if (res.code === 0) {
            // if (res.data&&res.data.length > 0) {
            //   res.data.forEach((item,i) => {
            //     item['index'] = i+1
            //   })
            // }
            this.logData = res.data || []
            
          } else if (res.code === 100401) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.$emit('updateAdminToken')
          } else {
            if (res.code != -10002){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            }
          }
          uni.hideLoading()
        })
      },
      changeTable(e, i) {
        let key = 'index'
        let contents = JSON.parse(JSON.stringify(this.logData))
        if (e.order === 'ascending') {
          //正序
          contents = contents.sort((a, b) => {
          	//需要排序的列为数字时直接计算
          	if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
          		return a[key] - b[key]
          	}
          })
        } else {
          //倒序
          contents = contents.sort((a, b) => {
          	if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
          		return b[key] - a[key]
          	}
          })
        }
        this.logData = contents
      },
      
      switchTab(i) {
        if (this.curIndex != i) {
          uni.showLoading()
          this.curIndex = i
          i === 0 && this.initdata()
          i === 1 && this.initRecord()
        }
      },
      clearAdminToken(){
        this.$emit('updateAdminToken')
      }
    }
  }
</script>

<style lang="scss" scoped>
.lucky-box {
  padding: 0 30rpx 40rpx;
}
.lucky-tab {
  width: 690rpx;
  height: 100rpx;
  background: #EEF0F4;
  border-radius: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10rpx;
  >* {
    flex-shrink: 0;
  }
  .box {
    width: 330rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 20rpx;
    text-align: center;
    font-size: 28rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    >* {
      flex-shrink: 0;
    }
    text {
      display: block;
      width: 40rpx;
      height: 40rpx;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 8rpx;
    }
    &.box-1 {
      text {
        background-image: url('@/static/image/set/l-t-1-1.png');
      }
    }
    &.box-2 {
      text {
        background-image: url('@/static/image/set/l-t-2-1.png');
      }
    }
    &.active {
      background: #FFFFFF;
      box-shadow: 0px 0px 20rpx 0px rgba(197,204,213,0.1);
      font-weight: 500;
    }
  }
}

.text1 {
  margin-top: 20rpx;
  width: 690rpx;
  height: 150rpx;
  background: #F8F9FA;
  border-radius: 20rpx;
  padding: 24rpx 20rpx 0 30rpx;
  color: #606178;
  font-size: 24rpx;
  line-height: 32rpx;
  &.text3 {
    text-align: center;
    box-shadow: 0px 0px 20rpx 0px rgba(197,204,213,0.3);
  }
}

.tableList {
    margin: 30rpx 0;
    border-radius: 20rpx;
    box-shadow: 0 0 10rpx 0 rgba(197,204,213,0.1);
    :deep .uni-table {
      border-radius: 20rpx;
      .uni-table-th {
        font-size: 24rpx;
        line-height: 1.2;
        font-weight: 400;
        color: #606178;
        border-right: none;
        padding: 20rpx 10rpx;
        &.circle {
          border-radius: 20rpx 0 0 0;
        }
        &.circle1 {
          border-radius: 0 20rpx 0 0;
        }
      }
      .uni-table-tr {
        .uni-table-td {
          font-size: 26rpx;
          color: #0E1B2E;
          border-right: none;
          border-color: #F4F5F7;
          padding: 8rpx;
        }
        &:last-of-type {
          .uni-table-td {
            border: none;
          }
        }
      }
      
    }
    .tr-header {
      border-radius: 20rpx;
      background-color: #E8F1FF;
      overflow: hidden;
    }
    .delect {
      width: 40rpx;
      height: 40rpx;
    }
    .name-box {
      max-height: 200rpx;
      overflow-y: auto;
    }
  }
  .tableList1 {
    margin-top: -70rpx;
  }
  // 弹窗的商场样式
  .robotMallPopup {
    width: 100vw;
    height: calc(100vh - 120px);
    padding: 40rpx 28rpx;
    background-color: #ffffff;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
    background: linear-gradient(180deg, #FFFFFF 0%, #F4F5F7 100%);
    .title {
      font-size: 36rpx;
      font-weight: 500;
      padding-bottom: 20rpx;
      border-bottom: 1px solid rgba(197, 204, 213, .4);
    }
    .scroll {
      height: 96%;
    }
  }
.wrapper1 {
  width: 690rpx;
  background: #FFFFFF;
  box-shadow: 0 0 10rpx 0 rgba(197,204,213,0.3);
  border-radius: 20rpx;
  margin-top: 30rpx;
  .wrapper1-box {
    width: 100%;
    height: 120rpx;
    padding-left: 30rpx;
    padding-right: 20rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  text {
    font-size: 32rpx;
    font-weight: 500;
  }
  .input {
    width: 180rpx;
    height: 80rpx;
    background: #F4F5F7;
    border-radius: 8rpx;
    padding: 0 10rpx;
    text-align: center;
  }
  .btn {
    width: 140rpx;
    height: 80rpx;
    background: #1675FE;
    border-radius: 8rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #FFFFFF;
  }
  .text1 {
    width: 690rpx;
    background: #F8F9FA;
    border-radius: 0 0 22rpx 22rpx;
    padding: 24rpx 20rpx 24rpx 30rpx;
    color: #606178;
    font-size: 24rpx;
    line-height: 32rpx;
  }
}
.switch-box-1 {
  padding: 40rpx 30rpx;
  margin: 42rpx 0 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 0 10rpx 0 rgba(197,204,213,0.1);
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >*{
    flex-shrink: 0;
  }
}
</style>
