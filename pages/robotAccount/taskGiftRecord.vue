<template>
  <view class="content">
    <view class="tab-list">
      <view :class="['skewed', 'skewed'+item, curTab === item ? 'active':''] " v-for="item in 2" :key="item" @click="switchTab(item)">
        <p>{{item===1?'陪我玩':'摘星星'}}</p>
      </view>
    </view>
    <view class="tableList">
      <uni-table ref="tableList" :loading="loading" emptyText="暂无数据" border>
        <uni-thead>
          <uni-tr>
            <uni-th :width="w1" align="center" sortable  @sort-change="changeTable">序号</uni-th>
            <uni-th :width="w2" align="center">送礼人</uni-th>
            <uni-th :width="w2" align="center">消耗金砖</uni-th>
            <uni-th :width="w2" align="center">收礼人</uni-th>
            <uni-th :width="w2" align="center">收到水晶</uni-th>
            <uni-th :width="w3" align="right">日期</uni-th>
          </uni-tr>
        </uni-thead>
        
        <uni-tbody class="my-table-body">
          <uni-tr v-for="item in tableInfo" :key="item.index">
            <uni-td :width="w1" align="center">{{item.index}}</uni-td>
            <uni-td :width="w2" align="left">{{item.from}}</uni-td>
            <uni-td :width="w2" align="left">{{item.brick}}</uni-td>
            <uni-td :width="w2" align="left">{{item.to}}</uni-td>
            <uni-td :width="w2" align="left">{{item.crystel}}</uni-td>
            <uni-td :width="w3" align="right">{{item.time}}</uni-td>
          </uni-tr>
        </uni-tbody>
        <uni-tr class="table-footer">
          <uni-td :width="w1" align="center">合计</uni-td>
          <uni-td :width="w2" align="left">-</uni-td>
          <uni-td :width="w2" align="left">{{totalBrick}}</uni-td>
          <uni-td :width="w2" align="left" >-</uni-td>
          <uni-td :width="w2" align="left" >{{totalCrystel}}</uni-td>
          <uni-td :width="w3" align="right" >-</uni-td>
        </uni-tr>
      </uni-table>
    </view>
    
  </view>
</template>

<script>
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniThead from '@/components/uni-table/components/uni-thead/uni-thead.vue'
  import uniTbody from '@/components/uni-table/components/uni-tbody/uni-tbody.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import {groupTaskListData} from '@/service/robotAccount/index.js'
  export default {
    components: {uniTable,uniThead,uniTbody,uniTd,uniTh,uniTr},
    data() {
      return {
        curTab: 1,
        loading: true,
        robot_id: '',
        w1: uni.upx2px(100),
        w2: uni.upx2px(120),
        w3: uni.upx2px(170),
        initInfo: [],
        tableInfo: [],
        totalBrick: 0,
        totalCrystel: 0,
        
      }
    },
    onLoad(option) {
      this.robot_id = option.robot_id
      this.init()
    },
    methods: {
      init () {
        groupTaskListData({robot_id:this.robot_id}, res => {
          if (res.code === 0) {
            if (res.data&&res.data.length > 0) {
              this.initInfo = res.data
              this.drawInfo(this.curTab-1)
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
    drawInfo(tabId) {
      if (this.initInfo[tabId].list && this.initInfo[tabId].list.length > 0) {
        this.initInfo[tabId].list.forEach((item,i) => {
          item['index'] = i+1
          this.totalBrick += item.brick
          this.totalCrystel += item.crystel
        })
        this.tableInfo = this.initInfo[tabId].list
      }
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    changeTable(e) {
      let key = 'index'
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
    },
    switchTab(item) {
      if (this.curTab != item) {
        this.curTab = item
        this.totalBrick = 0
        this.totalCrystel = 0
        this.loading = true
        if (this.initInfo && this.initInfo.length > 0) {
          this.drawInfo(this.curTab-1)
        } else {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-list {
  width: 750rpx;
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  >*{
    flex-shrink: 0;
  }
}
.skewed {
  position: relative;
  display: inline-block;
  width: 385rpx;
  height: 80rpx;
  p {
    position: absolute;
    width: 100%;
    height: 100%;
    line-height: 80rpx;
    text-align: center;
    z-index: 12;
    font-size: 32rpx;
    color: #ffffff;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #c5ccd5;
    border-radius: 20rpx 20rpx 0 0;
    box-shadow: 10rpx 0 10rpx 0 rgba(157,169,185,0.2000);
    -webkit-transform: perspective(.6em) scale(1.1, 1.2) rotateX(2deg);
    -moz-transform: perspective(.6em) scale(1.1, 1.2) rotateX(2deg);
    -ms-transform: perspective(.6em) scale(1.1, 1.2) rotateX(2deg);
    -o-transform: perspective(.6em) scale(1.1, 1.2) rotateX(2deg);
    transform: perspective(.6em) scale(1.1, 1.2) rotateX(2deg);
  }
  &.skewed1::before {
    content: '';
    box-shadow: 10rpx 0 10rpx 0 rgba(157,169,185,0.2000);
    -webkit-transform-origin:bottom left;  
    transform-origin:bottom left;  
  }
  &.skewed2::before {
    content: '';
    right: 20rpx;
    box-shadow: -10rpx 0 10rpx 0 rgba(157,169,185,0.2000);
    -webkit-transform-origin:bottom right;  
    transform-origin:bottom right;  
  }
  &.active{
    &::before {
      content: '';
      background: #ffffff;
      z-index: 10;
    }
    p {
      color: #1675FE;
      font-weight: 500;
    }
  }
}

.tableList {
  padding: 140rpx 0 80rpx;
  width: 750rpx;
  min-height: calc(100vh - 40px);
  background-color: #ffffff;
  :deep .uni-table-th {
    font-size: 24rpx;
    line-height: 1.2;
    font-weight: 400;
    color: #606178;
    border-right: none;
    padding: 18rpx 0;
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
  :deep .uni-table-thead {
    width: 750rpx;
    position: fixed;
    top: 80rpx;
    left: 50%;
    transform: translateX(-50%);
  }
    
  }
  .my-table-body {
    // height: calc(100vh - 220rpx);
    background-color: #ffffff;
  }
  .table-footer {
    width: 750rpx;
    position: fixed;
    bottom: calc(var(--window-bottom));
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    border-left: 1px solid #EEF0F4;
    box-shadow: 0 -10rpx 10rpx 0 rgba(157,169,185,0.2000);
  }
  // bottom: calc(var(--window-bottom) + 10px)
</style>
