<template>
  <view class="settingBox">
    <view class="menuList">
      <scroll-view scroll-x="true" class="scroll-x" :scroll-left='scrollLeft'>
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
                  :authCode="props.authCode"
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
                  :userRole="props.robotInfo.user_role"
                  :authCode="props.authCode"
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
    <set-luckdraw-x v-else-if="setMenuIndex === 4" :group_id='parentInfo.data.group_id' :authCode="props.authCode" @updateAdminToken="clearAdminToken"></set-luckdraw-x>
    <view class="setCont">
      <set-member-x v-if="setMenuIndex === 1" :robotInfo="props.robotInfo" :authCode="props.authCode" @updateAdminToken="clearAdminToken"></set-member-x>
      <!-- <set-move-x v-else-if="setMenuIndex === 5" :robotInfo="props.robotInfo" @updateAdminToken="clearAdminToken"></set-move-x> -->
      <set-adjusting-records :robotInfo="props.robotInfo" v-else-if="setMenuIndex === 5" />
    </view>
  </view>
</template>

<script setup>
  import {ref,reactive, inject} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import setMemberX from './set-member-x.vue'
  // import setMoveX from './set-move-x.vue'
  import setDataX from './set-data-x.vue';
  import setManageX from './set-manage-x.vue'
  import setConfigX from './set-config-x.vue'
  import setLuckdrawX from './set-luckdraw-x.vue'
  import setAdjustingRecords from './set-adjusting-records.vue'
  import {groupSummaryData,groupConfigData,groupCmdData} from '@/service/robotAccount/index.js'
  
  const props = defineProps({
    robotInfo: Object,
    groupSetId: {
      type: Number,
      default: 1
    },
    authCode: String
  })
  const emit = defineEmits(['clearAuthCode'])
  
  
  const setMenuList = ref([
      {id: 1, name: '群汇总'},
      {id: 2, name: '群数据'},
      {id: 3, name: '群管'},
      {id: 4, name: '配置'},
      {id: 5, name: '盲盒'},
      // {id: 6, name: '一键同步'}
      {id: 6, name: '调整记录'}
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
  const scrollLeft = ref(0) //设置滚动条的位置
  const cmdData = reactive({
      joy_list: [],
      main_list: []
    })
  // console.log(,'ooo)
    
  if(props.groupSetId) {
    setMenuIndex.value = setMenuList.value.findIndex(item=>item.id===props.groupSetId)
    if(props.groupSetId===1){
      getGroupSummaryInfo()
    }else if(props.groupSetId===3){
      groupConfigInfo()
    }else if(props.groupSetId===4){
      groupConfigInfo()
      getGroupCmdData()
    } else if(props.groupSetId===6){
      scrollLeft.value = 100
    }
  }

  
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
    groupConfigData({default: type, group_id: parentInfo.data.group_id,auth_code: props.authCode},res => {
      if (res.code === 0) {
        let newInfo = {1: null,2: null,3: null,4: null,5: null,6: null,7: null,8: null,9: null,10: null,11: null,12: null,13:null,14:null,15:null,16:null,17:{business_config_list:[]},18:null,19:null,20:null,21:null,22:null,23:{title_list: []},24:{coin_gift_list:[]}}
        if (res.data && res.data.length>0) {
          for(var key in res.data) {
            // this.configInfo[res.data[key].data_type] = res.data[key]
            newInfo[res.data[key].data_type] = res.data[key]
          }
        }
        configInfo.data = JSON.parse(JSON.stringify(newInfo))
        console.log(configInfo.data[11], 'ooo')
        if (!configInfo.data[11]) { // 设置默认词库
          configInfo.data[11] = {
            data_type: 11,
            list: [{id: '',title: '',content: ''}]
          }
          console.log(configInfo.data[11],'after')
        }
        if (!configInfo.data[23].title_list) {
          configInfo.data[23].title_list = []
          configInfo.data[23].title_list.push({id: '', name: '',res_id:-1})
        }
        if (!configInfo.data[24].coin_gift_list) {
          configInfo.data[24].coin_gift_list.push({id: -1, name: '', coin: '', charm: ''})
        } else {
          configInfo.data[24]['coin_gift_list'].forEach((t, i)=>{
            if(!t.id) t['id']=-2
            if (t.name.length>8) t.name = t.name.slice(0, 8)+'...'
          })
        }
        setMenuIndex.value === 2 ? (initMember.value = true):(initConfig.value = true)
        
      } else if (res.code === 100401) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        clearAdminToken()
      } else {
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
    groupConfigInfo(2)
    // setTimeout(() => {
    //   this.groupConfigInfo(2)
    // },2000)
  }
  
  function topage(url){
    uni.navigateTo({
    	url: url+'?group_id='+parentInfo.data.group_id+'&robot_id='+parentInfo.data.robot_id
    });
  }
  
  function clearAdminToken(){
    emit('clearAuthCode')
  }
  
  function getGroupSummaryInfo(){
    uni.showLoading()
    // 概要数据
    groupSummaryData({group_id: parentInfo.data.group_id,auth_code: props.authCode},res => {
      if (res.code === 0) {
        dataSummary.data = res.data || {}
        uni.hideLoading()
      } else if (res.code === 100401) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
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
    // 获取插件开关
    console.log('++++++!')
    groupCmdData({group_id: parentInfo.data.group_id,auth_code: props.authCode}, res => {
      if (res.code === 0) {
        cmdData.main_list = res.data.main_list
        cmdData.joy_list = res.data.joy_list
      } else if (res.code === 100401) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        clearAdminToken()
        uni.hideLoading()
      }else if (res.code != -10002){
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
      // initConfig.value = true
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
            &:nth-child(7){
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