<template>
  <view>
    <view class="tab-box">
      <view :class="['box','box-'+i, curIndex===i?'active':'']" v-for="(item, i) in tabItem" :key="i" @click="switchTab(i)">
        <view class="img"></view>
        {{item}}
      </view>
    </view>
    <view class="tableList">
      <view :class="['tableTit', 'tableTit-'+curIndex]">使用权限：<text>{{tableData.jur}}</text></view>
      <uni-table ref="tableList" border emptyText="暂无数据">
        <uni-tr>
          <uni-th align="center" :width="w1">序号</uni-th>
          <uni-th align="left" :width="w2">指令</uni-th>
          <uni-th align="left" :width="w3">功能说明</uni-th>
        </uni-tr>
        <uni-tr v-for="(item,i) in tableData.list" :key="i">
          <uni-td align="center" :width="w1">{{item.index}}</uni-td>
          <uni-td align="left" :width="w2">{{item.name}}</uni-td>
          <uni-td align="left" :width="w3">{{item.ex}}</uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script>
  import {instData} from '@/unit/instructions.js'
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  export default {
    components: {uniTable,uniTd,uniTh,uniTr},
    name:"instruction-x",
    data() {
      return {
        tabItem: ['群员指令','群管指令','超管指令','客服指令','注意事项'],
        curIndex: 0,
        tableData: {
          jur: '',
          list: []
        },
        w1: uni.upx2px(100),
        w2: uni.upx2px(290),
        w3: uni.upx2px(296),
      };
    },
    mounted() {
      this.tableData = instData[this.curIndex+1]
    },
    methods: {
      switchTab(i) {
        if (this.curIndex != i) {
          this.curIndex = i
          this.tableData = instData[this.curIndex+1]
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
.tab-box {
  margin-top: 34rpx;
  padding: 0 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >*{
    flex-shrink: 0;
  }
  .box {
    width: 130rpx;
    height: 122rpx;
    border-radius: 8rpx;
    border: 1px solid;
    color: #606178;
    line-height: 24rpx;
    font-size: 24rpx;
    text-align: center;
    position: relative;
    .img {
      width: 60rpx;
      height: 60rpx;
      margin: 14rpx auto 4rpx;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -22rpx;
      width: 0;
      height: 0;
      border: 12rpx solid transparent;
      opacity: 0;
    }
    &.box-0 {
      background: rgba(22,117,254,0.06);
      border-color: #1675FE;
      .img {
        background-image: url('@/static/image/inst/1.png');
      }
    }
    &.box-1 {
      background: rgba(255,206,84,0.1);
      border-color: #FFCE54;
      .img {
        background-image: url('@/static/image/inst/2.png');
      }
    }
    &.box-2 {
      background: rgba(121,222,180,0.1);
      border-color: #79DEB4;
      .img {
        background-image: url('@/static/image/inst/3.png');
      }
    }
    &.box-3 {
      background: rgba(148,193,255,0.1);
      border-color: #94C1FF;
      .img {
        background-image: url('@/static/image/inst/4.png');
      }
    }
    &.box-4 {
      background: rgba(250,194,163,0.1);
      border-color: #FAC2A3;
      .img {
        background-image: url('@/static/image/inst/5.png');
      }
    }
    &.active {
      color: #ffffff;
      &.box {
        border: none;
      }
      &.box-0 {
        background: #1675FE;
        &::after {
          content: '';
          border-top-color: #1675FE;
          opacity: 1;
        }
      }
      &.box-1 {
        background: #FDAD12;
        &::after {
          content: '';
          border-top-color: #FDAD12;
          opacity: 1;
        }
      }
      &.box-2 {
        background: #00B386;
        &::after {
          content: '';
          border-top-color: #00B386;
          opacity: 1;
        }
      }
      &.box-3 {
        background: #247ADE;
        &::after {
          content: '';
          border-top-color: #247ADE;
          opacity: 1;
        }
      }
      &.box-4 {
        background: #FF8855;
        &::after {
          content: '';
          border-top-color: #FF8855;
          opacity: 1;
        }
      }
    }
  }
}
.tableList {
  margin: 28rpx 0 0;
  padding: 0 32rpx;
  // border-right: 1px solid #F4F5F7;
  .tableTit {
    border-radius: 10rpx 10rpx 0 0;
    font-size: 32rpx;
    line-height: 80rpx;
    text-align: center;
    color: #ffffff;
    text {
      font-weight: 500;
    }
    &.tableTit-0 {
      background-color: #1675FE;
    }
    &.tableTit-1 {
      background-color: #FDAD12;
    }
    &.tableTit-2 {
      background-color: #00B386;
    }
    &.tableTit-3 {
      background-color: #247ADE;
    }
    &.tableTit-4 {
      background-color: #FF8855;
    }
  }
  :deep .uni-table-th {
    font-size: 24rpx;
    line-height: 1.2;
    font-weight: 400;
    color: #606178;
    background-color: #F4F5F7;
  }
  :deep .uni-table-tr {
    .uni-table-td {
      font-size: 24rpx;
      color: #0E1B2E;
      border-color: #F4F5F7;
      &:nth-child(2) {
        font-weight: 500;
      }
    }
    
  }
}
</style>