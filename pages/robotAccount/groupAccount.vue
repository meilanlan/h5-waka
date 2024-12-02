<template>
  <view class="content">
    <uni-table ref="tableList" :loading="loading" emptyText="暂无数据" border>
      <uni-tr>
        <uni-th :width="w1" align="center" sortable  @sort-change="changeTable">月份</uni-th>
        <uni-th :width="w2" align="left">充值总数</uni-th>
        <uni-th :width="w2" align="left">下单数</uni-th>
        <uni-th :width="w2" align="left">收益总数</uni-th>
      </uni-tr>
      
      <uni-tbody class="my-table-body">
        <uni-tr v-for="item in tableInfo" :key="item.index">
          <uni-td :width="w1" align="center">{{item.month}}月</uni-td>
          <uni-td :width="w2" align="left">{{item.recharge}}</uni-td>
          <uni-td :width="w2" align="left">{{item.order_num}}</uni-td>
          <uni-td :width="w2" align="left">{{item.income}}</uni-td>
        </uni-tr>
      </uni-tbody>
    </uni-table>
    <view class="total">
      <view class="">合计收益总数：</view>
      <view class="num">{{total}}</view>
    </view>
    <view class="tips">注：单位为金砖</view>
  </view>
</template>

<script>
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTbody from '@/components/uni-table/components/uni-tbody/uni-tbody.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import {groupIncomeListData} from '@/service/robotAccount/index.js'
  export default {
    components: {uniTable,uniTbody,uniTd,uniTh,uniTr},
    data() {
      return {
        loading: false,
        w1: uni.upx2px(120),
        w2: uni.upx2px(210),
        tableInfo: [],
        robot_id: '',
        total: 0
      }
    },
    onLoad(option) {
      this.robot_id = option.robot_id
      this.init()
    },
    methods: {
      init() {
        groupIncomeListData({robot_id:this.robot_id}, res => {
          if (res.code === 0) {
            if (res.data&&res.data.length > 0) {
              res.data.forEach((item,i) => {
                item['index'] = i+1
                this.total += item.income
              })
              this.tableInfo = res.data
            }
            this.loading = false
          } else {
            if (res.code != -10002){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            }
            this.loading = false
          }
        })
      },
      changeTable(e) {
        let key = 'month'
        let contents = JSON.parse(JSON.stringify(this.tableInfo))
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
        this.tableInfo = contents
      }
    }
  }
</script>

<style scoped lang="scss">
.content {
  height: 100vh;
  width: 750rpx;
  background-color: #ffffff;
  position: relative;
  :deep .uni-table-th {
    font-size: 24rpx;
    line-height: 1.2;
    font-weight: 400;
    color: #606178;
    // border-right: none;
    background-color: #f4f5f7;
    &:last-of-type {
      padding-right: 20rpx;
    }
  }
  :deep .uni-table-tr {
    .uni-table-td {
      font-size: 24rpx;
      color: #0E1B2E;
      // border-right: none;
      border-color: #EEF0F4;
    }
    &:last-of-type {
      .uni-table-td {
        // border: none;
      }
    }
  }
}
.total {
  padding: 28rpx 0 28rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  >*{
    flex-shrink: 0;
  }
  .num {
    width: 210rpx;
    padding: 0 20rpx;
  }
}
.tips {
  position: absolute;
  bottom: 20rpx;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  color: #9DA9B9;
}
</style>
