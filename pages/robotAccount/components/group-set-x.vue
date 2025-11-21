<template>
  <view class="settingBox">
    <view class="menuList">
      <scroll-view scroll-x="true" class="scroll-x">
        <view class="menuBox">
          <view class="box-w"></view>
          <view :class="['box', setMenuIndex === index ? 'active' : '']" v-for="(item,index) in setMenuList" :key="item.id" @click="switchSetMenu(item,index)">
            <view :class="['box-img', 'box-img-'+(index+1)]"></view>
            {{item.name}}
          </view>
          <view class="box-w"></view>
        </view>
      </scroll-view>
    </view>
    <set-data-x v-if="setMenuIndex === 0" :info="dataSummary.data" @toNextPage="topage"></set-data-x>
    <set-manage-x v-else-if="setMenuIndex===2&&initMember===true"
                  :group_id='parentInfo.data.group_id'
                  :welcome="configInfo.data[1]" 
                  :emoji="configInfo.data[2]" 
                  :audio="configInfo.data[3]" 
                  :rule="configInfo.data[10]" 
                  :notice="configInfo.data[12]" 
                  :paipaiData="configInfo.data[22]"
                  :protectData="configInfo.data[25]"
                  @updateAdminToken="clearAdminToken" 
                  @setDefaultData="setDefaultData" 
                  @updateConfig="updateConfig"></set-manage-x>
    <set-config-x v-else-if="setMenuIndex===3&&initConfig===true" :group_id='parentInfo.data.group_id'
                  :robotInfo="props.robotInfo"
                  :cmdData='cmdData' 
                  :timerMsg="configInfo.data[4]" 
                  :sendGift="configInfo.data[5]" 
                  :signInfo='configInfo.data[6]' 
                  :lootInfo="configInfo.data[7]" 
                  :groupTopBg="configInfo.data[8]" 
                  :groupTopAd="configInfo.data[9]"
                  :groupword="configInfo.data[11]" 
                  :coinRate="configInfo.data[13]"
                  :propose="configInfo.data[15]"
                  :loveing="configInfo.data[14]"
                  :force="configInfo.data[16]"
                  :businessList="configInfo.data[17]"
                  :preLife="configInfo.data[20]"
                  :happlyInfo="configInfo.data[21]"
                  :nobleInfo="configInfo.data[23]"
                  :giftInfo="configInfo.data[24]"
                  @updateAdminToken="clearAdminToken"
                  @setDefaultData="setDefaultData" 
                  @updateConfig="updateConfig" 
                  @updateGroupInfo="getGroupInfo"></set-config-x>
    <set-luckdraw-x v-else-if="setMenuIndex === 4" @updateAdminToken="clearAdminToken"></set-luckdraw-x>
    <view class="setCont">
      <set-member-x v-if="setMenuIndex === 1" :robotInfo="props.robotInfo" @updateAdminToken="clearAdminToken"></set-member-x>
      <set-move-x v-else-if="setMenuIndex === 5" :robotInfo="props.robotInfo" @updateAdminToken="clearAdminToken"></set-move-x>
    </view>
  </view>
</template>

<script setup>
  import {ref,reactive, inject} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import setMemberX from './set-member-x.vue'
  import setMoveX from './set-move-x.vue'
  import setDataX from './set-data-x.vue';
  import setManageX from './set-manage-x.vue'
  import setConfigX from './set-config-x.vue'
  import setLuckdrawX from './set-luckdraw-x.vue'
  import {groupSummaryData,groupConfigData,groupCmdData} from '@/service/robotAccount/index.js'
  
  const props = defineProps({
    robotInfo: Object
  })
  
  const  setMenuList = ref([
      {id: 1, name: '群汇总'},
      {id: 2, name: '群数据'},
      {id: 3, name: '群管'},
      {id: 4, name: '配置'},
      {id: 5, name: '盲盒'},
      {id: 6, name: '一键同步'}
  ])
  const setMenuIndex =ref(0)
  const tabId = ref('')
  const origin = ref('')
  // const robotInfo = reactive({data:{
  //     ad_img_url: "",
  //     ad_jump_url: "",
  //     bg_img_url: "",
  //     group_cover: "",
  //     group_id: "",
  //     group_name: "",
  //     member_count: 0,
  //     service_name: "",
  //     service_status: 0,
  //     service_time: ""
  // }})
  const dataSummary =reactive({data:{}})
  const parentInfo = reactive(({data:{}}))
  parentInfo.data = inject('parentGroupInfo')
  const initMember = ref(false)
  const initConfig = ref(false)
  const cmdData = reactive({
      joy_list: [],
      main_list: []
    })
    

  
  const configInfo = reactive({data:{
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null
  }})
  
  // uni.showLoading()
  getGroupSummaryInfo()
  
  function getGroupInfo() {
    // groupDetailData({group_id: parentInfo.data.group_id}, res => {
    //   if (~~res.code === 0) {
    //     this.robotInfo = res.data
    //     this.loading = false
    //     uni.hideLoading()
    //   }else {
    //     if (res.code != -10002){
    //       uni.showToast({
    //         title: res.msg,
    //         icon: 'none'
    //       });
    //     }
    //     uni.hideLoading()
    //     this.loading = false
    //   }
    // })
  }
  
  function groupConfigInfo(type) {
    groupConfigData({default: type, group_id: parentInfo.data.group_id},res => {
    //   res = {
    //     "code": 0,
    //     "data": [
    //         {
    //             "data_type": "1",
    //             "data": "💖  欢迎你来到本群！💖\n💖 小嗨群助手欢迎您 💖\n┄┄┄┄┄┄┄┄┄┄┄┄\n也许这就是上天安排的一种缘分，让我们相遇!\n愿我们成为相亲相爱的一家人!\n┄┄┄┄┄┄┄┄┄┄┄┄\n其它指令\n⚠️输入指令:\n【群空间】【群指令】【菜单】\n查看更多功能使用方法",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "2",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "3",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "4",
    //             "data": "【系统智能提醒】",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "5",
    //             "data": "@$收礼者$ 🎁 收到了礼物 🎁 \n「$发送者$」花费 $金额$ 金币，赠送你【$礼物$】，快答谢TA吧！",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "6",
    //             "obtain_min": 1,
    //             "obtain_max": 2000,
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "7",
    //             "success_ratio": 30,
    //             "obtain_min": 100,
    //             "obtain_max": 10000,
    //             "lose_min": 1,
    //             "lose_max": 10000,
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "8",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "9",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "10",
    //             "data": "1",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "12",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "11",
    //             "list": [
    //                 {
    //                     "title": "群规",
    //                     "content": "群规\n🌈欢迎新人：\n🈲️吵架\n🈲️禁止发王者以外的一切链接\n🈲️严禁私下拉小群，\n🈲️挂\n1⃣️潜水摸包者  罚10/7\n2⃣️发十元以下红包（抽福利除外）违者罚10/7\n3⃣️刷图（图片视频表情包系统表情），3张包括3张以上，每个罚款10元，多一张加5元\n4⃣️专属/转账罚款10块7包\n5⃣️不是管理发测挂包罚款100块20包\n6⃣️群员退群回来前三次（罚款50块十包）其后回来需要开赞助，群员在晚言旗下换群（罚款100块给资金）需走流程，\n7⃣️大小号换号流程20/10\n8⃣️结婚/拜师且行且珍惜：结婚喜糖至少20起，同性结婚喜糖50起，结婚10分钟內不发糖管理可以直接仲裁，双方同意离婚免费离婚（不满10天罚款20块十包）单方离婚仲裁（罚款50块十包），一方退群另一方可免费仲裁。"
    //                 }
    //             ],
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "13",
    //             "coin_rate": 10000,
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "14",
    //             "love_min": 50,
    //             "love_max": 200,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "15",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 13140,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "16",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 50,
    //             "force_coin_min": 100,
    //             "force_coin_max": 10000,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "21",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 300000,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "20",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 30000,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "22",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 100000,
    //             "pai_rate": "10,10,10,10,10,36,10,10,30",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "23",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "title_list": [
    //                 {
    //                     "name": "青铜贵族",
    //                     "id": 1024,
    //                     "res_id": -1
    //                 },
    //                 {
    //                     "name": "白银贵族",
    //                     "id": 1025,
    //                     "url": "https://robot-wechat-1311025102.cos.ap-shanghai.myqcloud.com/svip/01.png",
    //                     "res_id": 10
    //                 },
    //                 {
    //                     "name": "👑马栏山山大王",
    //                     "id": 1026,
    //                     "url": "https://robot-wechat-1311025102.cos.ap-shanghai.myqcloud.com/svip/05.png",
    //                     "res_id": 14
    //                 },
    //                 {
    //                     "name": "💪健身房一代西楚霸王",
    //                     "id": 1027,
    //                     "url": "https://robot-wechat-1311025102.cos.ap-shanghai.myqcloud.com/svip/03.png",
    //                     "res_id": 12
    //                 },
    //                 {
    //                     "name": "神",
    //                     "id": 1539,
    //                     "url": "https://robot-wechat-1311025102.cos.ap-shanghai.myqcloud.com/svip/02.png",
    //                     "res_id": 11
    //                 }
    //             ],
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "24",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "coin_gift_list": [
    //                 {
    //                     "name": "测试礼物",
    //                     "id": 38,
    //                     "coin": 99999,
    //                     "charm": 999
    //                 },
    //                 {
    //                     "name": "🌸劳斯莱斯",
    //                     "id": 39,
    //                     "coin": 111111,
    //                     "charm": 111
    //                 },
    //                 {
    //                     "name": "炸弹",
    //                     "id": 764,
    //                     "coin": 10000,
    //                     "charm": -100
    //                 }
    //             ],
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "17",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "business_config_list": [
    //                 {
    //                     "id": 1,
    //                     "title": "🌈①💻网络公司【1:30】",
    //                     "rate": 1
    //                 },
    //                 {
    //                     "id": 2,
    //                     "title": "🌈②🛰️科技行业【1:20】",
    //                     "rate": 1
    //                 },
    //                 {
    //                     "id": 3,
    //                     "title": "🌈③💶外贸企业【1:15】",
    //                     "rate": 5
    //                 },
    //                 {
    //                     "id": 4,
    //                     "title": "🌈④🏢星级酒店【1:10】",
    //                     "rate": 5
    //                 },
    //                 {
    //                     "id": 5,
    //                     "title": "🌈⑤💪健身中心【1:8】",
    //                     "rate": 11
    //                 },
    //                 {
    //                     "id": 6,
    //                     "title": "🌈⑥😻宠物医院【1:5】",
    //                     "rate": 18
    //                 },
    //                 {
    //                     "id": 7,
    //                     "title": "🌈⑦🛒连锁超市【1:3】",
    //                     "rate": 30
    //                 },
    //                 {
    //                     "id": 8,
    //                     "title": "🌈⑧🍔外卖小哥【1:2】",
    //                     "rate": 100
    //                 }
    //             ],
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 0,
    //                 "violation_words": "",
    //                 "violation_alert": "",
    //                 "tick_alert": ""
    //             }
    //         },
    //         {
    //             "data_type": "25",
    //             "love_min": 0,
    //             "love_max": 0,
    //             "req_marriage_charm": 0,
    //             "force_rate": 0,
    //             "force_coin_min": 0,
    //             "force_coin_max": 0,
    //             "coin": 0,
    //             "pai_type": 0,
    //             "pai_price": 0,
    //             "pai_rate": "",
    //             "protect_config": {
    //                 "max_warnning_num": 5,
    //                 "violation_words": "奶子|口交|做爱|接龙|扫雷|赌博|",
    //                 "violation_alert": "====‼️警告‼️====️\n️@$违规者$ 你已经违反本群群规！\n这是系统对你的第「$次数$」次警告\n超出「$总次数$」次违规将被自动踢出群\n===================\n【被提醒违规后请及时撤回】",
    //                 "tick_alert": "====‼️警示‼️====️\n@$违规者$ 因违反群规被踢出本群 \n请务必遵守群规，净化本群环境，营造健康绿色家庭"
    //             }
    //         }
    //     ],
    //     "msg": "success"
    // }
      if (res.code === 0) {
        let newInfo = {1: null,2: null,3: null,4: null,5: null,6: null,7: null,8: null,9: null,10: null,11: null,12: null,13:null,14:null,15:null,16:null,17:{business_config_list:[]},18:null,19:null,20:null,21:null,22:null,23:{title_list: []},24:{coin_gift_list:[]}}
        if (res.data && res.data.length>0) {
          for(var key in res.data) {
            // this.configInfo[res.data[key].data_type] = res.data[key]
            newInfo[res.data[key].data_type] = res.data[key]
          }
        }
        configInfo.data = JSON.parse(JSON.stringify(newInfo))
        console.log(configInfo.data, 'configInfo.data is')
        if (!configInfo.data[11]) { // 设置默认词库
          configInfo.data[11] = {
            data_type: 11,
            list: [{title: '',content: ''}]
          }
        }
        if (!configInfo.data[23].title_list) {
          configInfo.data[23].title_list = []
          configInfo.data[23].title_list.push({id: '', name: '',res_id:-1})
        }
        if (!configInfo.data[24].coin_gift_list.length) {
          configInfo.data[24].coin_gift_list.push({id: '', name: '', coin: '', charm: ''})
        } else {
          configInfo.data[24]['coin_gift_list'].forEach((t, i)=>{
            if (t.name.length>8) t.name = t.name.slice(0, 8)+'...'
          })
        }
        setMenuIndex.value === 2 ? (initMember.value = true):(initConfig.value = true)
        
        console.log(configInfo.data, '遇见')
      } else if (res.code === -20001) {
        // uni.showToast({
        //   title: '登录失效，请重新登录',
        //   icon: 'none'
        // });
        clearAdminToken()
      } else if (res.code != -10002){
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  
  function setDefaultData(type) {
    // 恢复默认值
    // uni.showLoading()
    // if (this.configDefault[type]) {
    //   let newInfo = this.configInfo
    //   newInfo[type] = this.configDefault[type]
    //   this.configInfo = JSON.parse(JSON.stringify(newInfo))
    //   setTimeout(() => {
    //     uni.hideLoading()
    //   }, 500)
    // } else {
    //   groupConfigData({default: 1},res => {
    //     if (res.code === 0) {
    //       if (res.data && res.data.length>0) {
    //         for(var key in res.data) {
    //           this.configDefault[res.data[key].data_type] = res.data[key]
    //         }
    //       }
    //       let newInfo = this.configInfo
    //       newInfo[type] = this.configDefault[type]
    //       this.configInfo = JSON.parse(JSON.stringify(newInfo))
    //     } else if (res.code === -20001) {
    //       // uni.showToast({
    //       //   title: '登录失效，请重新登录',
    //       //   icon: 'none'
    //       // });
    //       this.clearAdminToken()
    //     } else if (res.code != -10002){
    //       uni.showToast({
    //         title: res.msg,
    //         icon: 'none'
    //       });
    //     }
    //     uni.hideLoading()
    //   })
    // }
  }
  function updateConfig() {
    // // 更新配置
    // this.groupConfigInfo(2)
    // // setTimeout(() => {
    // //   this.groupConfigInfo(2)
    // // },2000)
  }
  
  function topage(url){
    uni.navigateTo({
    	url: url+'?group_id='+parentInfo.data.group_id+'&robot_id='+parentInfo.data.robot_id
    });
  }
  
  function clearAdminToken(){
    
  }
  
  function getGroupSummaryInfo(){
    uni.showLoading()
    // 概要数据
    groupSummaryData({group_id: parentInfo.data.group_id},res => {
      if (res.code === 0) {
        dataSummary.data = res.data || {}
        uni.hideLoading()
      } else if (res.code === -20001) {
        // uni.showToast({
        //   title: '登录失效，请重新登录',
        //   icon: 'none'
        // });
        clearAdminToken()
        uni.hideLoading()
      } else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        } else {
          uni.hideLoading()
          if (JSON.stringify(dataSummary.data)== "{}") {
            uni.showLoading({
              title: "小嗨正在努力加载中...",
              icon: 'none'
            })
            setTimeout(()=>{
              getGroupSummaryInfo()
            },3000)
          }
          
        }
      }
    })
  }
  
  function getGroupCmdData() {
    console.log('纯纯粹粹',parentInfo)
    // 获取插件开关
    console.log('++++++!')
    groupCmdData({group_id: parentInfo.data.group_id}, res => {
      if (res.code === 0) {
        cmdData.main_list = res.data.main_list
        cmdData.joy_list = res.data.joy_list
      } else if (res.code === -20001) {
        // uni.showToast({
        //   title: '登录失效，请重新登录',
        //   icon: 'none'
        // });
        clearAdminToken()
      } else if (res.code != -10002){
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      uni.hideLoading()
    })
  }
  
  function switchSetMenu(item, i) {
      if (setMenuIndex.value != i) {
        setMenuIndex.value = i
        i === 0 && uni.showLoading() && getGroupSummaryInfo()
        if (i === 2) {
          uni.showLoading()
          if (!configInfo.data[1]) groupConfigInfo(2)
          else {
            initMember.value = true 
            uni.hideLoading()
          }
        }
         else if(i === 3){
          uni.showLoading()
          getGroupCmdData()
          if (!configInfo.data[1]) groupConfigInfo(2)
          else {
            initConfig.value = true
            uni.hideLoading()
          }
        }
        // i != 2 && this.initMember && (this.initMember = false)
        // i != 3 && this.initConfig && (this.initConfig = false)
      }
    }
    
</script>

<style lang="scss" scoped>
  .settingBox {
    .menuList {
      margin-top: 46rpx;
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
            width: 124rpx;
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
              @for $i from 1 through 6 {
                &.box-img-#{$i} {
                  background-image: url('../../static/image/set/s-#{$i}.png');
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
              width: 124rpx;
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
  }
  .setCont {
    margin: 18rpx 30rpx 0;
    padding: 0 30rpx;
    background-color: #ffffff;
    box-shadow: 0 0 20rpx 1px rgba(197, 204, 213, 0.1);
    border-radius: 20rpx;
  }
</style>