<template>
  <view class="menuList">
    <scroll-view scroll-x="true" class="scroll-x">
      <view class="menuBox">
        <view class="box-w"></view>
        <view :class="['box', menuIndex === index ? 'active' : '']" v-for="(item,index) in menuList" :key="item.id" @click="switchMenu(item,index)">
          <view :class="['box-img', 'box-img-'+(index+1)]"></view>
          {{item.name}}
        </view>
        <view class="box-w"></view>
      </view>
    </scroll-view>
  </view>
  <view class="tableList">
    <uni-table ref="tableList" :loading="loading" emptyText="暂无数据">
      <uni-tr>
        <!-- <uni-th :width="menuIndex===1||menuIndex===2?tableWidth2:tableWidth" :align="index+1 === thList[menuIndex+1].length ? 'right':'center'" v-for="(item,index) in thList[menuIndex+1]" :key="index" :sortable="item.sort" @sort-change="changeTable($event, index)">
          {{item.name}}
        </uni-th> -->
        <uni-th :width="index==0?tableWidth3:tableWidth" :align="index===0?'left':index+1 === thList[menuIndex+1].length ? 'right':'center'" v-for="(item,index) in thList[menuIndex+1]" :key="index" :sortable="item.sort" @sort-change="changeTable($event, index)">
          {{item.name}}
        </uni-th>
      </uni-tr>
      <template v-if="menuIndex != 4 && menuIndex != 5 && menuIndex != 6">
        <!-- 群成员 -->
        <uni-tr v-for="(item,i) in tableData" :key="i">
          <uni-td :width="tableWidth3" align="left" sortable>{{item.index <= 9?'0'+item.index:item.index}}</uni-td>
          <uni-td align="center" v-show="menuIndex!=6">{{item.nick_name}}</uni-td>
          <!-- <uni-td align="center" v-show="menuIndex!=6">{{item.display_name}}</uni-td> -->
          <uni-td align="right" v-show="menuIndex===0">{{item.created_at}}</uni-td>
          <!-- <template v-if="menuIndex===3">
            <uni-td :width="tableWidth" align="right">{{item.total_brick - item.used_brick > 0 ? item.total_brick - item.used_brick : 0}}</uni-td>
            //<uni-td :width="tableWidth" align="right">{{item.total_brick}}</uni-td>
          </template>
          <template v-if="menuIndex===4">
          //<template v-if="menuIndex===2">
            <uni-td align="right">{{item.total_crystal - item.used_crystal > 0 ? item.total_crystal - item.used_crystal : 0}}</uni-td>
            //<uni-td :width="tableWidth" align="right">{{item.total_crystal}}</uni-td>
          </template> -->
          <uni-td align="right" v-show="menuIndex===1">{{filterMoney(item.gold_coin)}}</uni-td>
          <uni-td align="right" v-show="menuIndex===2">{{item.fans_val}}</uni-td>
          <template v-if="menuIndex===3">
            <uni-td align="center" >{{item.total_check_in}}</uni-td>
            <uni-td align="right" >{{item.continuous_check_in}}</uni-td>
          </template>
          <template v-else-if="menuIndex===7">
            <uni-td align="right" >{{item.flag===1?'超级管理员':'普通管理员'}}</uni-td>
          </template>
        </uni-tr>
      </template>
      
     <template v-else-if="menuIndex===4">
        <uni-tr v-for="(item,i) in marriageInfo" :key="i">
          <uni-td :width="tableWidth3" align="left">{{item.index <= 9?'0'+item.index:item.index}}</uni-td>
          <uni-td align="center">{{item.display_name_1}}<br />{{item.display_name_2}}</uni-td>
          <uni-td align="center" >{{item.marriage_days}}</uni-td>
          <uni-td align="right" >{{item.love_value}}</uni-td>
        </uni-tr>
      </template>
      
      <template v-else-if="menuIndex===5">
        <uni-tr v-for="(item,i) in titInfo" :key="i">
          <uni-td :width="tableWidth3" align="left">{{item.index <= 9?'0'+item.index:item.index}}</uni-td>
          <uni-td align="center">{{item.display_name}}</uni-td>
          <uni-td align="right" >{{item.title}}</uni-td>
        </uni-tr>
      </template>
      
      <template v-else-if="menuIndex===6">
       <uni-tr v-for="(item,i) in sectInfo" :key="i">
          <uni-td :width="tableWidth3" align="left">{{item.index <= 9?'0'+item.index:item.index}}</uni-td>
          <uni-td align="center">{{item.display_name}}</uni-td>
          <uni-td align="right" >{{item.sect_name}}</uni-td>
        </uni-tr>
      </template>
      
      <template v-else>
        <uni-tr v-for="(item,i) in adminInfo" :key="i">
          <uni-td :width="tableWidth3" align="left">{{item.index <= 9?'0'+item.index:item.index}}</uni-td>
          <uni-td align="center">{{item.display_name}}</uni-td>
          <uni-td align="right" >{{item.flag===1?'超级管理员':'普通管理员'}}</uni-td>
        </uni-tr>
      </template>
    </uni-table>
  </view>
</template>

<script setup>
  import {inject, reactive, ref} from 'vue'
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import {filterMoney} from '@/unit/filters.js'
  import {groupUserData,groupMarriageData,groupTitData,groupAdminData,groupSectData} from'@/service/robotAccount/index.js'
  
  const menuList = ref([
    {id: 1, name: '群成员',type: 1},
    {id: 4, name: '金币',type: 1},
    {id: 5, name: '魅力',type: 1},
    // {id: 2, name: '金砖'},
    // {id: 3, name: '水晶'},
    // {id: 4, name: '金币'},
    // {id: 5, name: '魅力'},
    {id: 6, name: '签到',type: 1},
    {id: 7, name: '婚姻',type: 2},
    {id: 8, name: '头衔',type: 3},
    {id: 9, name: '门派',type: 4},
    {id: 10, name: '群管',type: 1},
  ])
  const tableWidth = ref(uni.upx2px(114))
  const tableWidth2 = ref(uni.upx2px(148))
  const tableWidth3 = ref(uni.upx2px(40))
  const tableData = ref([])
  const marriageInfo = ref([])
  const titInfo = ref([])
  const sectInfo = ref([])
  const adminInfo = ref([])
  const parentInfo = inject('parentGroupInfo')
  const menuIndex = ref(0)
  const loading = ref(false)
  const thList = {
    1: [
        {name: '序号',key: 'index',sort: true, arr: 'tableData'},
        {name: '群昵称',key: '',sort: false, arr: 'tableData'},
        {name: '入群时间',key: '',sort: false, arr: 'tableData'},
      ],
    2: [
      {name: '序号',key: 'index',sort: true, arr: 'tableData', arr: 'tableData'},
      {name: '群昵称',key: '',sort: false, arr: 'tableData', arr: 'tableData'},
      {name: '金币',key: 'gold_coin',sort: true, arr: 'tableData', arr: 'tableData'},
    ],
    3: [
      {name: '序号',key: 'index',sort: true, arr: 'tableData'},
      {name: '群昵称',key: '',sort: false, arr: 'tableData'},
      {name: '魅力',key: 'fans_val',sort: true, arr: 'tableData'},
    ],
    // 4: [
    //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
    //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
    //   {name: '金砖',key: '',sort: false, arr: 'tableData'},
    //   // {name: '金砖',key: 'total_brick',sort: true, arr: 'tableData'},
    // ],
    // 5: [
    //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
    //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
    //   {name: '水晶',key: '',sort: false, arr: 'tableData'},
    //   // {name: '水晶',key: 'total_brick',sort: true, arr: 'tableData'},
    // ],
    4: [
      {name: '序号',key: 'index',sort: true, arr: 'tableData'},
      {name: '群昵称',key: '',sort: false, arr: 'tableData'},
      {name: '累计',key: 'total_check_in',sort: true, arr: 'tableData'},
      {name: '连续',key: 'continuous_check_in',sort: true, arr: 'tableData'},
    ],
    5: [
      {name: '序号',key: 'index',sort: true, arr: 'marriageInfo'},
      {name: '群昵称',key: '',sort: false, arr: 'marriageInfo'},
      {name: '天数',key: 'marriage_days',sort: true, arr: 'marriageInfo'},
      {name: '恩爱值',key: 'love_value',sort: true, arr: 'marriageInfo'},
    ],
    6: [
      {name: '序号',key: 'index',sort: true, arr: 'titInfo'},
      {name: '群昵称',key: '',sort: false, arr: 'titInfo'},
      {name: '头衔名称',key: '',sort: false, arr: 'titInfo'},
    ],
    7: [
      {name: '序号',key: 'index',sort: true, arr: 'sectInfo'},
      {name: '群昵称',key: '',sort: false, arr: 'sectInfo'},
      {name: '门派',key: '',sort: false, arr: 'sectInfo'},
    ],
    8: [
      {name: '序号',key: 'index',sort: true, arr: 'adminInfo'},
      {name: '群昵称',key: '',sort: false, arr: 'adminInfo'},
      {name: '群管级别',key: '',sort: false, arr: 'adminInfo'},
    ]
  }
  
  
  // 群成员
  loading.value = true
  groupUserInfo(1)
  
  function changeTable(e, i) {
    // 创建一个对象来存储引用和字符串的对应关系
    const refMap = {
      'tableData': tableData.value,
      'marriageInfo': marriageInfo.value,
      'titInfo': titInfo.value,
      'sectInfo': sectInfo.value,
      'adminInfo': adminInfo.value,
    };
    let key = thList[menuIndex.value+1][i].key
    let contents = JSON.parse(JSON.stringify(refMap[thList[menuIndex.value+1][i].arr]))
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
    if (thList[menuIndex.value+1][i].arr === 'tableData') {
      tableData.value = contents
    } else if (thList[menuIndex.value+1][i].arr === 'marriageInfo') {
      marriageInfo.value = contents
    } else if (thList[menuIndex.value+1][i].arr === 'titInfo') {
      titInfo.value = contents
    } else if (thList[menuIndex.value+1][i].arr === 'sectInfo'){
      sectInfo.value = contents
    } else if (thList[menuIndex.value+1][i].arr === 'adminInfo') {
      adminInfo.value = contents
    }
    // refMap[thList[menuIndex.value+1][i].arr] = contents
  }
  
  function groupUserInfo(type){
    if((menuIndex.value===0&&type===1) || type!==1) {
        loading.value = true
        groupUserData({group_id: parentInfo.group_id,type: type}, res => {
          if (res.code === 0) {
            if (res.data&&res.data.length > 0) {
              res.data.forEach((item,i) => {
                item['index'] = i+1
              })
            }
            if (type === 1) {
              // 群成员、金币、魅力、签到、群管理
              tableData.value = res.data
            }
            if (menuIndex.value === 4) { //婚姻
              marriageInfo.value = res.data
            } else if (menuIndex.value === 5) { //头衔
              titInfo.value = res.data
            } else if (menuIndex.value === 6) { // 门派
              sectInfo.value = res.data
            }
            
            loading.value = false
            uni.hideLoading()
          } else {
            if (res.code != -10002){
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
            }
            uni.hideLoading()
            loading.value = false
          }
        })
    }
    
  }
  
  function getMarriageInfo() {
    // 婚姻
    groupMarriageData({group_id: parentInfo.group_id}, res => {
      if (res.code === 0) {
        if (res.data&&res.data.length > 0) {
          res.data.forEach((item,i) => {
            item['index'] = i+1
          })
        }
        marriageInfo.value = res.data
        loading.value = false
      } else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
        loading.value = false
      }
    })
  }
  function getTitInfo() {
    // 头衔
    groupTitData({group_id: parentInfo.group_id}, res => {
      if (res.code === 0) {
        if (res.data&&res.data.length > 0) {
         res.data.forEach((item,i) => {
           item['index'] = i+1
         })
        }
        titInfo.value = res.data
        loading.value = false
      } else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
        loading.value = false
      }
    })
  }
  function getAdminInfo() {
    // 群管
    groupAdminData({group_id: parentInfo.group_id}, res => {
      if (res.code === 0) {
        if (res.data&&res.data.length > 0) {
          res.data.forEach((item,i) => {
            item['index'] = i+1
          })
        }
        adminInfo.value = res.data
        loading.value = false
      } else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
        loading.value = false
      }
    })
  }
  function getSectInfo() {
    // 门派
    groupSectData({group_id: parentInfo.group_id},res => {
      if (res.code === 0) {
        if (res.data&&res.data.length > 0) {
         res.data.forEach((item,i) => {
           item['index'] = i+1
         })
        }
        sectInfo.value = res.data
        loading.value = false
      } else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
        uni.hideLoading()
        loading.value = false
      }
    })
  }
  
  function switchMenu(item, i) {
    console.log(i,'ooo')
    if (menuIndex.value != i) {
        menuIndex.value = i
        groupUserInfo(item.type)
      // i === 0  && (loading.value = true) && groupUserInfo()
      // i === 4 && (loading.value = true) && getMarriageInfo()
      // i === 5 && (loading.value = true) && getTitInfo()
      // i === 6 && (loading.value = true) && getSectInfo()
      // i === 7 && (loading.value = true) && getAdminInfo()
      
    }
  }
  
</script>

<style lang="scss" scoped>
  .menuList {
    // padding-left: 30rpx;
    margin-top: 34rpx;
    width: 100%;
    height: 138rpx;
    .scroll-x {
      width: 100%;
      height: 100%;
      .menuBox {
        display: flex;
        align-items: center;
        >*{
          flex-shrink: 0;
        }
        .box {
          margin-right: 20rpx;
          width: 114rpx;
          height: 126rpx;
          border-radius: 8rpx;
          border: 1px solid #EEF0F4;
          text-align: center;
          color: #606178;
          font-size: 28rpx;
          transition: all 200ms;
          position: relative;
          .box-img {
            width: 60rpx;
            height: 60rpx;
            margin: 14rpx auto 4rpx;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            @for $i from 1 through 10 {
              &.box-img-#{$i} {
                background-image: url('../../static/image/robot-tab/#{$i}.png');
              }
            }
          }
          &::after {
            content: '';
            width: 24rpx;
            height: 12rpx;
            background: url('@/static/image/robot-tab/arrow.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: -12rpx;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
          }
          &.active {
            width: 138rpx;
            color: #0E1B2E;
            background-color: #EEF0F4;
            border-color: #9DA9B9;
            font-size: 28rpx;
            &::after {
              content: '';
              opacity: 1;
              transition: opacity 200ms;
            }
          }
          &:nth-of-type(11) {
            margin-right: 0 !important;
          }
        }
        .box-w {
          width: 30rpx;
          height: 126rpx;
        }
      }
      
    }
  }
  
  .tableList {
    margin: 18rpx 30rpx;
    border: 1px solid #F4F5F7;
    // border-top: none;
    // border-bottom: none;
    :deep .uni-table-th {
      font-size: 24rpx;
      line-height: 1.2;
      font-weight: 400;
      color: #606178;
      background-color: #F4F5F7;
      border-right: none;
    }
    :deep .uni-table-tr {
      .uni-table-td {
        font-size: 28rpx;
        color: #0E1B2E;
        border-right: none;
        border-color: #F4F5F7;
        
      }
      &:last-of-type {
        .uni-table-td {
          border: none;
        }
      }
    }
  }
</style>