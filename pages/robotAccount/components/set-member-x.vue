<template>
  <view class="list-box need_scroll_top_view">
    <view class="list" v-for="(item, index) in tabList" :key="index">
      <view class="left">
        <view :class="['img', 'img-'+item.i]"></view> {{item.name}}
        <!-- <image :src="'@/static/image/set/m-'+(index+1)+'.png'" mode=""></image> {{item}} -->
      </view>
      <view class="right" @click="openTablePopup(item)">
        <!-- <image src="@/static/image/set/m-del.png" mode=""></image>  清空 -->
        {{item.id === 14?'查看':'设置'}}
      </view>
    </view>
    
    <!-- 详细数据 -->
    <uni-popup ref="clearTable" type="bottom" background-color="#ffffff">
      <view class="clearTable">
        <view class="title-box">
          <view class="title">{{curType===14?curName:curName+'数据清理'}}</view>
          <view class="search-box" v-if="curType===3">
            <input class="inpt-1" v-model="searchUser" placeholder="搜索用户昵称" placeholder-style="color:#C5CCD5">
            <image src="/static/image/search.png" @click="getUserData(3)"></image>
          </view>
          <image class="close" src="/static/image/close.png" @click="$refs.clearTable.close()"></image>
        </view>
        
        <view class="tableList">
          <scroll-view scroll-y="true" class="scroll">
            <!-- <uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange"> -->
            <checkbox-group class="checkbox-list" @change="checkboxChange">
              <uni-table ref="table" :loading="loading" emptyText="暂无更多数据">
                  <uni-tr>
                    <uni-th :width="curType===7||curType===8?tableWidth2:tableWidth" :align="index===0?'left':index===thList[curType].length-1?'right':'center'" v-for="(item, index) in thList[curType]" :key="index" :sortable="item.sort" @sort-change="changeTable($event, item)">
                      <view>
                        {{item.name}}
                      </view>
                    </uni-th>
                  </uni-tr>
                  <uni-tr v-for="(item, index) in tableData" :key="index">
                    <uni-td :width="tableWidth" align="left" :sortable="curType != 14?true:false">
                      <label for="">
                        <checkbox :value="item.user_id+''" :checked="item.ischeck"  v-if="curType != 14" />
                        {{item.index}}
                      </label>
                    </uni-td>
                    <template v-if="curType===1">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.gold_coin || 0}}</uni-td>
                      <uni-td :width="tableWidth" align="right">
                        <image @click="openEditpopup(item)" class="edit-icon" src="../../../static/image/set/edit.png" mode=""></image>
                      </uni-td>
                    </template>
                    <template v-else-if="curType===2">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.fans_val || 0}}</uni-td>
                      <uni-td :width="tableWidth" align="right">
                        <image @click="openEditpopup(item)" class="edit-icon" src="../../../static/image/set/edit.png" mode=""></image>
                      </uni-td>
                    </template>
                    <template v-else-if="curType===3">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.join_group_time}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.Leave_group_time}}</uni-td>
                    </template>
                    <template v-else-if="curType===4">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.chat_month || 0}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.chat_total || 0}}</uni-td>
                    </template>
                    <template v-else-if="curType===5">
                      <uni-td :width="tableWidth" align="center">{{item.display_name_1}}<br />{{item.display_name_2}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.love_value}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.marriage_days}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.marriage_time}}</uni-td>
                      <!-- <uni-td :width="tableWidth" align="right">{{item.marriage_time}}</uni-td> -->
                      <uni-td :width="tableWidth" align="right">
                        <image @click="openMarryEditpopup(item)" class="edit-icon" src="../../../static/image/set/edit.png" mode=""></image>
                      </uni-td>
                    </template>
                    <template v-else-if="curType===6">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.title}}</uni-td>
                    </template>
                    <template v-else-if="curType===7">
                      <uni-td :width="tableWidth2" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth2" align="center">{{item.total_check_in}}</uni-td>
                      <uni-td :width="tableWidth2" align="center">{{item.continuous_check_in}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.last_check_in_time}}</uni-td>
                    </template>
                    <template v-else-if="curType===8">
                      <uni-td :width="tableWidth2" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.today_rob_count}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.last_rob_time}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.rob_release_time}}</uni-td>
                    </template>
                    <template v-else-if="curType===9">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                    </template>
                    <template v-else-if="curType===10">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.time}}</uni-td>
                    </template>
                    <template v-else-if="curType===11">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="right">{{item.time}}</uni-td>
                    </template>
                    <!-- <template v-else-if="curType===12">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.brick || 0}}</uni-td>
                      <uni-td :width="tableWidth" align="right">
                        <image @click="openEditpopup(item)" class="edit-icon" src="../../../static/image/set/edit.png" mode=""></image>
                      </uni-td>
                    </template> -->
                    <!-- <template v-else-if="curType===15"> -->
                    <template v-else-if="curType===12">
                      <uni-td :width="tableWidth" align="center">{{item.display_name_1}}<br />{{item.display_name_2}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.baby_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.baby_grow}}</uni-td>
                    </template>
                    <template v-else-if="curType===13">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.crystel || 0}}</uni-td>
                      <uni-td :width="tableWidth" align="right">
                        <image @click="openEditpopup(item)" class="edit-icon" src="../../../static/image/set/edit.png" mode=""></image>
                      </uni-td>
                    </template>
                    <template v-else-if="curType===14">
                      <uni-td :width="tableWidth" align="center">{{item.nick_name}}</uni-td>
                      <uni-td :width="tableWidth" align="center">{{item.yuanBao}}</uni-td>
                    </template>
                    
                  </uni-tr>
              </uni-table>
            </checkbox-group>
          </scroll-view>
        </view>
        
        <view class="footer" v-if="curType!=14">
          <view class="left">
            <checkbox-group class="checkbox-list" @change="checkboxChangeAll">
              <label for="">
                <checkbox value="all" :checked="isAll" /> 全选
              </label>
            </checkbox-group>
            
            <view :class="['reverse', isReverse===true?'active':'']" @click="checkReverse">
              <image src="../../../static/image/set/reverse.png" mode="" v-show="isReverse===false"></image>
              <image src="../../../static/image/set/reverse-1.png" mode="" v-show="isReverse===true"></image>
              反选
            </view>
          </view>
          <view class="clear-btn" @click="tableData.length>0?$refs.clearSurePopup.open():null">{{clearUserids.length>0?'清除所选':'清除全部'}}</view>
        </view>
      </view>
    </uni-popup>
    
    <uni-popup ref="clearSurePopup" type="center" :is-mask-click="false">
      <view class="clearSurePopup">
        <view class="clearText">
          是否确认继续该清理操作
        </view>
        <view class="btn-box">
          <view class="btn" @click="$refs.clearSurePopup.close()">取消</view>
          <view class="btn btn-sure" @click="sureClear">确认</view>
        </view>
      </view>
    </uni-popup>
    
    <uni-popup ref="editPopup" type="center" :is-mask-click="false">
      <view class="editPopup">
        <view class="title">编辑{{curType===1?'金币值':curType===2?'魅力值':curType===12?'金砖值':'水晶值'}}</view>
        <view class="edit-body">
          <uni-number-box v-model="curNumber" @change="changeNumb" :min="0" :max="10000000000000000" />
        </view>
       <view class="btn-box">
          <view class="btn" @click="$refs.editPopup.close()">取消</view>
          <view class="btn btn-sure" @click="saveData">确认</view>
        </view>
      </view>
    </uni-popup>
    <uni-popup ref="editMarryPopup" type="center" :is-mask-click="false">
      <view class="editPopup">
        <!-- <view class="title">编辑{{curType===1?'金币值':curType===2?'魅力值':curType===12?'金砖值':'水晶值'}}</view> -->
        <view class="edit-body">
          <view class="edit-body-tit">结婚天数</view>
          <uni-number-box v-model="m_day" :min="0" :max="10000000000000000" />
        </view>
        <view class="edit-body">
          <view class="edit-body-tit">恩爱值</view>
          <uni-number-box v-model="m_love" :min="0" :max="10000000000000000" />
        </view>
       <view class="btn-box">
          <view class="btn" @click="$refs.editMarryPopup.close()">取消</view>
          <view class="btn btn-sure" @click="saveMarryData">确认</view>
        </view>
      </view>
    </uni-popup>
    
  </view>
</template>

<script>
  // import {scrollToTargetPosition} from '@/mixin/index.mixin.js'
  import uniTable from '@/components/uni-table/components/uni-table/uni-table.vue'
  import uniTd from '@/components/uni-table/components/uni-td/uni-td.vue'
  import uniTh from '@/components/uni-table/components/uni-th/uni-th.vue'
  import uniTr from '@/components/uni-table/components/uni-tr/uni-tr.vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import uniNumberBox from '@/components/uni-number-box_1.2.1/components/uni-number-box/uni-number-box.vue'
  import { groupClearData,groupUserDataData,groupData } from'@/service/robotAccount/index.js'
  export default {
    // mixins: [scrollToTargetPosition],
    components: {uniPopup,uniTable,uniTd,uniTh,uniTr,uniNumberBox},
    props: {
      robotInfo: {
        type: Object,
        default: () => {}
      },
      authCode: String,
    },
    data() {
      return {
        curData: {
          type: '',
          name: ''
        },
        tabList: [
          {id: 14, name: '本群元宝', i: 1},
          {id: 1, name: '本群金币', i: 1},
          {id: 2, name: '本群魅力', i: 2},
          // {id: 12, name: '本群金砖', i: 3},
          // {id: 13, name: '本群水晶', i: 4},
          {id: 3, name: '退群人员', i: 5},
          {id: 4, name: '本群活跃', i: 6},
          {id: 5, name: '本群婚姻', i: 7},
          {id: 12, name: '本群宝宝', i: 7},
          {id: 6, name: '本群头衔', i: 8},
          {id: 7, name: '本群签到', i: 9},
          {id: 8, name: '本群打劫', i: 10},
          {id: 9, name: '本群黑名单', i: 11},
          {id: 10, name: '本群小黑屋', i: 12},
          {id: 11, name: '本群监狱', i: 13},
          // '本群金币','本群魅力','本群金砖','本群水晶','本群水晶','本群活跃','本群婚姻','本群头衔','本群签到','本群打劫','本群黑名单','本群小黑屋','本群监狱'
          ],
        thList: {
          1: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '金币',key: 'gold_coin',sort: true, arr: 'tableData'},
            {name: '操作',key: '',sort: false, arr: 'tableData'},
          ],
          2: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '魅力值',key: 'fans_val',sort: true, arr: 'tableData'},
            {name: '操作',key: '',sort: false, arr: 'tableData'},
          ],
          3: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '入群时间',key: '',sort: false, arr: 'tableData'},
            {name: '退群时间',key: '',sort: false, arr: 'tableData'},
          ],
          4: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '本月发言数',key: 'chat_month',sort: true, arr: 'tableData'},
            {name: '总发言',key: '',sort: false, arr: 'tableData'},
          ],
          5: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '恩爱值',key: '',sort: false, arr: 'tableData'},
            {name: '天数',key: '',sort: false, arr: 'tableData'},
            {name: '纪念日',key: '',sort: false, arr: 'tableData'},
            {name: '操作',key: '',sort: false, arr: 'tableData'},
          ],
          6: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '头衔',key: '',sort: false, arr: 'tableData'},
          ],
          7: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '累计',key: '',sort: false, arr: 'tableData'},
            {name: '连续',key: '',sort: false, arr: 'tableData'},
            {name: '上次签到',key: '',sort: false, arr: 'tableData'},
          ],
          8: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '今日次数',key: '',sort: false, arr: 'tableData'},
            {name: '上次打劫',key: '',sort: false, arr: 'tableData'},
            {name: '释放时间',key: '',sort: false, arr: 'tableData'},
          ],
          9: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
          ],
          10: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '释放时间',key: '',sort: false, arr: 'tableData'},
          ],
          11: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '释放时间',key: '',sort: false, arr: 'tableData'},
          ],
          12: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '父母',key: '',sort: false, arr: 'tableData'},
            {name: '名称',key: '',sort: false, arr: 'tableData'},
            {name: '成长值',key: '',sort: false, arr: 'tableData'},
          ],
          // 12: [
          //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
          //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
          //   {name: '金砖',key: 'brick',sort: true, arr: 'tableData'},
          //   {name: '操作',key: '',sort: false, arr: 'tableData'},
          // ],
          // 13: [
          //   {name: '序号',key: 'index',sort: true, arr: 'tableData'},
          //   {name: '群昵称',key: '',sort: false, arr: 'tableData'},
          //   {name: '水晶',key: '',sort: false, arr: 'tableData'},
          //   {name: '操作',key: '',sort: false, arr: 'tableData'},
          // ],
          14: [
            {name: '序号',key: 'index',sort: true, arr: 'tableData'},
            {name: '群昵称',key: '',sort: false, arr: 'tableData'},
            {name: '元宝',key: '',sort: false, arr: 'tableData'},
          ]
          
        },
        tableData: [],
        loading: false,
        tableWidth: uni.upx2px(140),
        tableWidth2: uni.upx2px(110),
        curType: 1,
        curName: '',
        clearUserids: [],
        isReverse: false,
        isAll: false,
        curItemInfo: {},
        curNumber: 0,
        m_day: 0,
        m_love: 0,
        searchUser: ''
      }
    },
    methods: {
      searchUserInfo(){
        
      },
      saveMarryData(){
        if (this.m_day === '' || this.m_love === '') {
          uni.showToast({
            title: '请输入数值',
            icon: 'none'
          });
          return false
        }
        let params = {
          group_id: this.robotInfo.group_id,
          data_type: this.curType,
          m_id: this.curItemInfo.id,
          m_days: this.m_day,
          m_love: this.m_love,
          auth_code: this.authCode
        }
        uni.showLoading({
          mask: true
        })
        groupData(params, res => {
          if (res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.getUserData(this.curType)
            this.$refs.editMarryPopup.close()
          } else if (res.code === -20001) {
            this.$refs.editMarryPopup.close()
            this.$emit('updateAdminToken')
            uni.hideLoading()
          } else if (res.code != -10002){
            this.$refs.editMarryPopup.close()
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            uni.hideLoading()
          } else {
            uni.hideLoading()
          }
        })
        // console.log(params)
      },
      changeNumb(v){
        this.curNumber = v
      },
      saveData() {
        if (this.curNumber == '') {
          uni.showToast({
            title: '请输入数值',
            icon: 'none'
          });
          return false
        }
        uni.showLoading({
          mask: true
        })
        let params = {
          group_id: this.robotInfo.group_id,
          type: this.curType,
          user_id: this.curItemInfo.user_id,
          auth_code: this.authCode
        }
        if(this.curType===1){
          params['coin'] = this.curNumber
        } else if(this.curType===2) {
          params['charm'] = this.curNumber
        }
        groupData(params, res => {
          if (res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.getUserData(this.curType)
            this.$refs.editPopup.close()
          } else if (res.code === -20001) {
            this.$refs.editPopup.close()
            this.$emit('updateAdminToken')
            uni.hideLoading()
          } else if (res.code != -10002){
            this.$refs.editPopup.close()
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            uni.hideLoading()
          } else {
            uni.hideLoading()
          }
        })
      },
      openMarryEditpopup(item) {
        this.curItemInfo = item
        this.m_day = item.marriage_days|| 0
        this.m_love = item.love_value|| 0
        this.$refs.editMarryPopup.open()
      },
      openEditpopup(item) {
        this.curItemInfo = item
        this.curNumber = (this.curType===1?item.gold_coin:this.curType===2?item.fans_val:this.curType===12?item.brick:item.crystel) || 0
        this.$refs.editPopup.open()
      },
      sureClear() {
        uni.showLoading()
        let userids = this.clearUserids.length>0?this.clearUserids.toString(','):''
        groupClearData({type: this.curType,group_id: this.robotInfo.group_id, userids: userids, auth_code: this.authCode}, res=> {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          if (res.code === 0) {
            this.getUserData(this.curType)
            this.$refs.clearSurePopup.close()
          }else if (res.code === 100401) {
            this.$refs.clearSurePopup.close()
            this.$refs.clearTable.close()
            this.$emit('updateAdminToken')
            uni.hideLoading()
          } else {
            this.$refs.clearSurePopup.close()
            uni.hideLoading()
          }
        })
      },
      checkReverse() {
        // 反选
        let newIds = []
        this.isReverse = !this.isReverse
        if (this.isReverse === true) {
          this.tableData.forEach(item => {
              item.ischeck = !item.ischeck
              item.ischeck === true && newIds.push(item.user_id)
          });
          this.clearUserids = newIds
        } else {
          this.tableData.forEach(item => {
              item.ischeck = !item.ischeck
              item.ischeck === true && newIds.push(item.user_id)
          });
          this.clearUserids = newIds
        }
        this.isAll = this.clearUserids.length>=this.tableData.length?true:false
      },
      checkboxChangeAll(e) {
        // 全选
        this.isReverse = false
        if (e.detail.value.length > 0) {
          let newIds = []
          this.tableData.forEach(item => {
              item.ischeck = true
              newIds.push(item.user_id)
          });
          this.clearUserids = newIds
          this.isAll = true
        } else {
          this.clearUserids = []
          this.tableData.forEach(item => (item.ischeck = false));
          this.isAll = false
        }
      },
      checkboxChange(e) {
        console.log(e, 'e is')
        this.clearUserids = e.detail.value
        for(var si = 0; si<this.tableData.length;si++){
          if (this.clearUserids.length > 0) {
            for(var i = 0; i<this.clearUserids.length;i++) {
              if (this.clearUserids[i]*1 === this.tableData[si].user_id) {
                this.tableData[si].ischeck = true
                break
              }else {
                this.tableData[si].ischeck = false
              }
            }
          } else {
            this.tableData[si].ischeck = false
          }
        }
        // console.log(this.clearUserids, 'this.clearUserids is')
      },
      changeTable(e, item){
        let key = item.key
        let contents = JSON.parse(JSON.stringify(this.tableData))
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
            // console.log(a[key], 'a[key] ')
          	if (!isNaN(Number(a[key])) && !isNaN(Number(b[key]))) {
          		return b[key] - a[key]
          	}
          })
        }
        this.tableData = contents
      },
      openTablePopup(item) {
        this.curName = item.name
        this.curType = item.id
        this.loading = true
        this.$refs.clearTable.open()
        this.getUserData(item.id)
      },
      getUserData(type) {
        uni.showLoading()
        if(type!=3) this.searchUser = ''
        groupUserDataData({type: type, group_id: this.robotInfo.group_id,auth_code: this.authCode, key_word: this.searchUser}, res => {
            if (res.code === 0) {
              this.clearUserids = []
              this.isReverse = false
              this.isAll = false
              if (res.data&&res.data.length > 0) {
                res.data.forEach((item,i) => {
                  item['index'] = i+1
                  item['ischeck'] = false
                  type === 5 && (item['user_id'] = item.id+'')
                  // 1bi,2mei,4huo,12zhuan,fans_val,chat_month,brick
                  if (type === 1) item.gold_coin = item.gold_coin || 0
                  if (type === 2) item.fans_val = item.fans_val || 0
                  if (type === 4) item.chat_month = item.chat_month || 0
                  if (type === 12) item.brick = item.brick || 0
                })
              }
              this.tableData = res.data || []
              this.loading = false
            } else if (res.code === 100401) {
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
              this.$refs.clearTable.close()
              this.$emit('updateAdminToken')
              this.loading = false
            }else if (res.code != -10002){
              this.$refs.clearTable.close()
              uni.showToast({
                title: res.msg,
                icon: 'none'
              });
              this.loading = false
            } else {
              this.$refs.clearTable.close()
              this.loading = false
            }
            uni.hideLoading()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-box {
    padding: 40rpx 0;
    .list {
      width: 100%;
      padding: 10rpx 10rpx 10rpx 20rpx;
      margin-bottom: 30rpx;
      font-size: 32rpx;
      background-color: #F8F9FA;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-of-type {
        margin-bottom: 0;
      }
      >*{
        flex-shrink: 0;
      }
      .left {
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: 60rpx;
          height: 60rpx;
          margin-right: 10rpx;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          @for $i from 1 through 13 {
            &.img-#{$i} {
              background-image: url('@/static/image/set/m-#{$i}.png');
            }
          }
        }
      }
      .right {
        color: #ffffff;
        width: 136rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border-radius: 10rpx;
        background-color: #1675FE;
        font-size: 28rpx;
      }
    }
  }
  .clearTable {
    padding: 50rpx 30rpx 20rpx;
    background-color: #ffffff;
    border-radius: 30rpx 30rpx 0 0;
    box-sizing: content-box;
    height: 84vh;
    .title-box {
      display: flex;
      align-items: center;
      position: relative;
      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 42rpx;
        height: 42rpx;
      }
      .title {
        flex-shrink: 0;
        font-size: 32rpx;
        // font-family: MiSans, 'MiSans';
        font-weight: 500;
        color: #000000;
        line-height: 32rpx;
      }
      .search-box {
        flex-shrink: 0;
        margin-left: 32rpx;
        padding: 0 20rpx;
        height: 60rpx;
        width: 330rpx;
        display: flex;
        align-items: center;
        background-color: #F4F5F7;
        border-radius: 20rpx;
        input {
          flex-shrink: 0;
          font-size: 24rpx;
        }
        image {
          flex-shrink: 0;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    
    .footer {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 10rpx 30rpx 40rpx 50rpx;
      width: 100%;
      // height: 110rpx;
      background: #FFFFFF;
      box-shadow: 0px -10rpx 10rpx 1px rgba(40, 42, 67, 0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      >*{
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items: center;
        color: #282A43;
        .checkbox-list {
          margin-right: 60rpx;
        }
        .reverse {
          image {
            width: 30rpx;
            height: 30rpx;
            vertical-align: middle;
            margin-right: 10rpx;
          }
          &.active {
            color: #1675FE;
          }
        }
      }
      .clear-btn {
        width: 192rpx;
        height: 64rpx;
        background: #FC6565;
        border-radius: 10rpx;
        text-align: center;
        line-height: 64rpx;
        color: #FFFFFF;
      }
    }
  }
 :deep .uni-popup .uni-popup__wrapper{
   border-radius: 30rpx 30rpx 0 0;
 }
 .tableList {
   margin-top: 40rpx;
   height: 88%;
   border: 1px solid #F4F5F7;
   // border-top: none;
   // border-bottom: none;
   .scroll {
     height: 100%;
   }
   :deep .uni-table-th {
     font-size: 24rpx;
     line-height: 1.2;
     font-weight: 400;
     color: #606178;
     background-color: #F4F5F7;
     border-right: none;
   }
   :deep .uni-table-tr {
     .uni-table-th:first-of-type {
       // padding-left: 56rpx;
     }
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
 .checkbox-list {
   vertical-align: text-bottom;
   :deep uni-checkbox {
     line-height: 1;
     .uni-checkbox-wrapper {
       vertical-align: top;
     }
      .uni-checkbox-input {
        width: 30rpx;
        height: 30rpx;
        border-color: #C5CCD5;
       &.uni-checkbox-input-checked {
          background-color: #1675FE;
          border-color: #1675FE;
       }
       &.uni-checkbox-input-checked:before {
          content: "\EA08";
          font-size: 24rpx;
       }
    }
   }
   // :deep uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
   //   // border-color: #C5CCD5;
   // }
 }
 .editPopup {
   width: 690rpx;
   border-radius: 20rpx;
   background-color: #ffffff;
   padding: 40rpx 60rpx;
   .title{
     font-size: 32rpx;
     font-weight: 500;
     text-align: center;
   }
   .edit-body {
     margin-top: 100rpx;
     :deep .uni-numbox {
       margin: 0 auto;
       .uni-numbox-btns {
         width: 80rpx;
         height: 80rpx;
       }
       .uni-numbox__value {
         width: 400rpx;
         height: 80rpx;
       }
     }
     .edit-body-tit {
       text-align: center;
       margin-bottom: 20rpx;
       font-weight: bold;
     }
   }
   .btn-box{
     display: flex;
     justify-content: space-around;
     align-items: center;
     margin-top: 100rpx;
     .btn {
       width: 200rpx;
       height: 80rpx;
       line-height: 80rpx;
       text-align: center;
       color: #606178;
       &.btn-sure {
         color: #1675FE;
       }
     }
   }
 }
 .edit-icon {
   width: 40rpx;
   height: 40rpx;
 }
</style>