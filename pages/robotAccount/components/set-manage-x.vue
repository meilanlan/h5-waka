<template>
  <view class="list-content need_scroll_top_view">
    <!-- 群公告 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-1.png" mode=""></image>
          设置群公告
        </view>
      </view>
      <textarea class="textarea1" v-model="notice.data" :maxlength="2000" placeholder="设置群公告" placeholder-style="color:#C5CCD5" />
      <text class="tips">在群内输入指令：群公告；机器人即可反馈群公告</text>
      <view class="btn" @click="sureNotice">保存</view>
    </view>
    <!-- 群规 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-1.png" mode=""></image>
          设置群规文案
        </view>
      </view>
      <textarea class="textarea1" v-model="rule.data" :maxlength="2000" placeholder="设置群规文案" placeholder-style="color:#C5CCD5" />
      <text class="tips">· 在文本框内输入你想要的群规内容，并点击保存；<br />· 在群内输入指令：群规；<br />· 机器人即可反馈本群群规；</text>
      <view class="btn" @click="sureRule">保存</view>
    </view>
    <!-- 入群欢迎语 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-1.png" mode=""></image>
          入群欢迎语
        </view>
        <view class="right" @click="initData(1)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复欢迎语
        </view>
      </view>
      <textarea class="textarea1" v-model="welcome.data" :maxlength="2000" placeholder="请输入群欢迎语" placeholder-style="color:#C5CCD5" />
      <view class="btn" @click="sureWelcome">保存</view>
    </view>
    <!-- 新人入群欢迎表情 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-2.png" mode=""></image>
          新人入群欢迎表情
        </view>
      </view>
      <view class="img-box">
        <view class="img">
          <image :src="emoji.url" mode="aspectFit" v-if="emoji.url"></image>
          <view class="none" v-else>未使用表情</view>
        </view>
      </view>
      <view class="btn" @click="toConfig(1)">重新配置</view>
    </view>
    
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-3.png" mode=""></image>
          新人入群欢迎语音
        </view>
      </view>
      <view class="img-box">
        <view class="img radio-bg" v-if="audio.url">
          <view class="bg-box" @click="openCurAudio">
            <image src="../../../static/image/set/open.png" v-show="curAudioState===0" mode=""></image>
            <image src="../../../static/image/set/close.png" v-show="curAudioState===1" mode=""></image>
          </view>
        </view>
        <view class="img" v-else>
          <view class="none">未使用语音</view>
        </view>
      </view>
      <view class="btn" @click="toConfig(2)">重新配置</view>
    </view>
    
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-14.png" mode=""></image>
          拍一拍后台设置
        </view>
        <!-- <view class="right" @click="initData(-1)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view> -->
      </view>
      <view class="inpt-box">
        <text>拍一拍消耗</text>
        <view class="clap-box">
          <view :class="['box', paipaiNewData.pai_type===i?'active':'']" v-for="(item, i) in 2" :key="'p-'+i" @click="switchPai(i)">
            <view class="left">
              <view class="img"></view>
              <text>{{i===1?'金砖':'金币'}}</text>
            </view>
            <input v-show="paipaiNewData.pai_type===i" v-model="paipaiNewData.pai_price" type="number">
          </view>
        </view>
      </view>
      <view class="text-exp">概率1-100</view>
      <view class="inpt-box" >
        <text>幸运数字 0</text>
        <view class="inpt">
          <input class="inpt-1 inpt-2" type="number" v-model="paipaiZero" placeholder-style="color:#C5CCD5" disabled="true">
        </view>
      </view>
      <view class="inpt-box" v-for="(item, i) in paipaiNewData.pai_rate" :key="'rate-'+i">
        <text>幸运数字 {{i+1}}</text>
        <view class="inpt">
          <input class="inpt-1" type="number" v-model="item['number'+i]" placeholder-style="color:#C5CCD5" @blur="watchNumber($event,i)">
        </view>
      </view>
      <view class="btn" @click="savePaipai">保存</view>
    </view>
    
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-1.png" mode=""></image>
          护群助手
        </view>
      </view>
      <view class="textarea-box">
        <view class="textarea-box-tit">违规词：</view>
        <textarea class="textarea1" v-model="protectData.protect_config.violation_words" placeholder="违规词" placeholder-style="color:#C5CCD5" />
        <text class="tips">· 多个关键词请用|分割</text>
      </view>
      <view class="textarea-box">
        <view class="textarea-box-tit">违规提示语：</view>
        <textarea class="textarea1" v-model="protectData.protect_config.violation_alert" placeholder="违规提示语" placeholder-style="color:#C5CCD5" />
      </view>
      <view class="textarea-box">
        <view class="textarea-box-tit">违规踢人提示语：</view>
        <textarea class="textarea1" v-model="protectData.protect_config.tick_alert" placeholder="违规踢人提示语" placeholder-style="color:#C5CCD5" />
      </view>
      <view class="inpt-box inpt-box-1">
        <text>警告次数自动踢人</text>
        <view class="inpt">
          <input class="inpt-1" v-model="protectData.protect_config.max_warnning_num" type="number" placeholder-style="color:#C5CCD5">
        </view>
      </view>
      <!-- <view :class="['btn', (protectData.protect_config.violation_alert==='' || protectData.protect_config.tick_alert==='')?'btn-gray':'']" @click="saveProtect">保存</view> -->
      <view class="btn" @click="saveProtect">保存</view>
    </view>
    
    
    <!-- 选择表情 -->
    <uni-popup ref="chooseEmojiPopup" type="bottom" background-color="#ffffff">
      <view class="choosePopup">
        <view class="popup-tit">
          <view class="h1">入群欢迎表情列表</view>
          <view class="text1">
            如需定制，请<text class="blue">联系客服</text>
          </view>
        </view>
        <view class="popup-body">
          <scroll-view scroll-y="true" class="scroll">
            <view class="popup-list-box">
              <view class="box">
                <view :class="['img none',!curEmojInfo.res_id?'active':'']" @click="checkEmoj({res_id: '',title: '',url: ''})">
                  <image src="../../../static/image/set/un-use.png" mode=""></image>
                </view>
                <view :class="['tit', !curEmojInfo.res_id?'active':'']">不使用表情</view>
              </view>
              <view class="box" v-for="(item, index) in emojiList" :key="index">
                <view :class="['img', curEmojInfo.res_id === item.res_id?'active':'']" @click="checkEmoj(item)">
                  <image :src="item.url" mode="aspectFit"></image>
                </view>
                <view :class="['tit', curEmojInfo.res_id === item.res_id?'active':'']">{{item.title}}</view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="popup-foot"><view class="btn" @click="sureEmoj">确认</view></view>
      </view>
    </uni-popup>
    
    <!-- 选择语音 -->
    <uni-popup ref="chooseAudioPopup" type="bottom" background-color="#ffffff" @maskClick="closeRadioList">
      <view class="choosePopup">
        <view class="popup-tit">
          <view class="h1">入群欢迎语音列表</view>
          <view class="text1">
            如需定制，请<text class="blue">联系客服</text>
          </view>
        </view>
        <view class="popup-body">
          <scroll-view scroll-y="true" class="scroll">
            <view class="popup-audio-list">
              <view :class="['audio-box audio-none', !curAudioInfo.res_id?'active':'']" @click="checkAudio({res_id: '',title: '',url: ''})">
                <view class="icon-bg">
                  <image src="../../../static/image/set/un-use.png" mode=""></image>
                </view>
                <view class="text2">
                  不使用语音
                </view>
              </view>
              <view class="no_data" v-if="audioList.length <= 0">
                暂无列表
              </view>
              <view :class="['audio-box', curAudioInfo.res_id===item.res_id?'active':'']" v-for="(item,index) in audioList" :key="index" @click="checkAudio(item)">
                <view class="icon-bg-1">
                  <view class="bg-box" @click.stop="openListAudio(item, index)">
                    <image src="../../../static/image/set/open.png" mode="" v-show="item.isPlay===false"></image>
                    <image src="../../../static/image/set/close.png" mode="" v-show="item.isPlay===true"></image>
                  </view>
                </view>
                <view class="text2-box">
                  <view class="text2">
                    <view class="h1">{{item.title}}</view>{{item.content}}
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="popup-foot"><view class="btn" @click="sureAudio">确认</view></view>
      </view>
    </uni-popup>
    
    <!-- 恢复初始值确认弹窗 -->
    <uni-popup ref="makesurePopup" type="center" :is-mask-click="false">
      <view class="clearSurePopup">
        <view class="clearText">
          恢复初始值之后，<br />需要手动点击保存，才能生效喔。
        </view>
        <view class="btn-box">
          <!-- <view class="btn" @click="$refs.makesurePopup.close()">取消</view> -->
          <view class="btn btn-sure" @click="closeSurePopup">确认</view>
        </view>
      </view>
    </uni-popup>
    
  </view>
</template>

<script>
  // import {scrollToTargetPosition} from '@/mixin/index.mixin.js'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {groupConfigData, groupSetConfigData, groupResData} from '@/service/robotAccount/index.js'
  export default {
    // mixins: [scrollToTargetPosition],
    props: {
      group_id: {
        type: String,
        default: () => {}
      },
      welcome: {
        type: Object,
        default: () => {
          return {
            data: '',
            data_type: 1,
          }
        }
      },
      emoji: {
        type: Object,
        default: () => {
          return {
            data_type: 2,
            res_id: '',
            title: '',
            url: ''
          }
        }
      },
      audio: {
        type: Object,
        default: () => {
          return {
            data_type: 3,
            res_id: '',
            title: '',
            url: ''
          }
        }
      },
      rule: {
        type: Object,
        default: () => {
          return {
            data_type: 10,
            data: ''
          }
        }
      },
      notice: {
        type: Object,
        default: () => {
          return {
            data_type: 12,
            data: ''
          }
        }
      },
      paipaiData: {
        type: Object,
        default: () => {
          return {
            data_type: 22,
            pai_type: '',
            pai_price: '',
            pai_rate: ''
          }
        }
      },
      protectData: {
        type: Object,
        default: () => {
          return {
            data_type: 25,
            protect_config: {
              max_warnning_num: 5,
              violation_words: "",
              violation_alert: "",
              tick_alert: ""
            }
          }
        }
      }
    },
    components: {uniPopup},
    data() {
      return {
        defaultInfo: {},
        audioList: [],
        emojiList: [],
        curAudioState: 0, //1:播放中 0:微未播放
        curListAudioState: 0, //1:播放中 0:微未播放
        curEmojInfo: {
          res_id: '',
          title: '',
          url: ''
        },
        curAudioInfo: {
          res_id: '',
          title: '',
          url: ''
        },
        innerAudioContext: null,
        listAudioContext: null,
        paipaiNewData: {
          data_type: 22,
          pai_type: '',
          pai_price: '',
          pai_rate: []
        },
        initType: null,
        paipaiZero: 100
      }
    },
    mounted() {
      this.innerAudioContext = uni.createInnerAudioContext();
      this.listAudioContext = uni.createInnerAudioContext();
      this.innerAudioContext.obeyMuteSwitch = false
      this.listAudioContext.obeyMuteSwitch = false
      this.paipaiNewData = JSON.parse(JSON.stringify(this.paipaiData))
      let newArr = this.paipaiData.pai_rate.split(',')
      let arr = []      
      for(var i = 0;i<newArr.length;i++){
        let obj = {};
        obj[`number${i}`] = newArr[i]
        arr.push(obj)
      }
      this.paipaiNewData.pai_rate = arr
    },
    
    destroyed() {
      // audio销毁
      this.innerAudioContext.destroy()
      this.listAudioContext.destroy()
    },
    methods: {
      saveProtect(){
        console.log(this.protectData.protect_config, 'this.protectData.protect_config.violation_alert')
        if (this.protectData.protect_config.violation_alert && this.protectData.protect_config.tick_alert) {
          let params = {
            type: 25,
            group_id: this.group_id,
            max_warnning_num: this.protectData.protect_config.max_warnning_num, 
            tick_alert: this.protectData.protect_config.tick_alert,
            violation_alert: this.protectData.protect_config.violation_alert,
            violation_words: this.protectData.protect_config.violation_words.replace(/｜/g, '|').replace(/\s/g,'')
          }
          this.setConfig(params)
        } else {
          uni.showToast({
            title: '请输入完整信息',
            icon: 'none'
          });
        }
      },
      savePaipai() {
        let params = {
          type: this.paipaiNewData.data_type,
          group_id: this.group_id,
          pai_type: this.paipaiNewData.pai_type,
          pai_price: this.paipaiNewData.pai_price,
          pai_rate: ''
        }
        let pai_rate = []
        this.paipaiNewData.pai_rate.forEach((item,i) => {
          pai_rate.push(item['number'+i])
        })
        params.pai_rate = pai_rate.join(',')
        this.setConfig(params)
      },
      watchNumber(e, i) {
        if (e.detail.value*1>100) {
          this.$set(this.paipaiNewData.pai_rate, i, {['number'+i]: 100})
        } else if (e.detail.value*1<1) {
          this.$set(this.paipaiNewData.pai_rate, i, {['number'+i]: 1})
        }
      },
      switchPai(i){
        if (this.paipaiNewData.pai_type != i) {
          this.paipaiNewData.pai_type = i
          if (i === this.paipaiData.pai_type) {
            this.paipaiNewData.pai_price = this.paipaiData.pai_price
          } else {
            this.paipaiNewData.pai_price = 0
          }
        }
      },
      closeRadioList() {
        // 关闭语音列表弹窗
        if (!this.listAudioContext.paused) this.listAudioContext.stop()
      },
      openListAudio(item, index) {
        // 点击列表播放
        if (!this.innerAudioContext.paused){
          this.curAudioState = 0
          this.innerAudioContext.stop()
        }
        item.isPlay = item.isPlay===false?true:false
        item.isPlay === true && this.playListAudio(item, index)
        item.isPlay === false && this.listAudioContext.pause()
        this.audioList.forEach((obj,i) => {
          if (item.res_id != obj.res_id) {
            this.audioList[i].isPlay = false
          }
        })
      },
      playListAudio(item, i) {
        // 播放列表里的语音
        this.listAudioContext.src = item.url;
        this.listAudioContext.play()
        this.listAudioContext.onEnded(() => {
          this.audioList[i].isPlay = false
          this.listAudioContext.stop()
        })
        this.listAudioContext.onError((res) => {
          uni.showToast({
            title: res.errMsg,
            icon: 'none'
          });
          console.log(res.errMsg);
          console.log(res.errCode);
        });
      },
      openCurAudio() {
        // 播放当前语音
        this.curAudioState = this.curAudioState===0?1:0
        this.curAudioState === 1 && this.playAudio(this.audio)
        this.curAudioState === 0 && this.innerAudioContext.pause()
      },
      playAudio(item) {
        this.innerAudioContext.src = item.url;
        this.innerAudioContext.play()
        this.innerAudioContext.onEnded(() => {
          this.innerAudioContext.stop()
          this.curAudioState = 0
        })
        this.innerAudioContext.onError((res) => {
          uni.showToast({
            title: res.errMsg,
            icon: 'none'
          });
          console.log(res.errMsg);
          console.log(res.errCode);
        });
      },
      setConfig(param, ref) {
        // 设置
        groupSetConfigData(param, res => {
          if (res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            this.$emit('updateConfig')
            ref && this.$refs[ref].close()
            if (!this.listAudioContext.paused) this.listAudioContext.stop()
            if (!this.innerAudioContext.paused) {
              this.innerAudioContext.stop()
              this.curAudioState = 0
            }
            uni.hideLoading()
          } else if (res.code === -20001) {
            // uni.showToast({
            //   title: '登录失效，请重新登录',
            //   icon: 'none'
            // });
            this.$emit('updateAdminToken')
            uni.hideLoading()
          } else if (res.code != -10002){
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
      closeSurePopup() {
        this.$refs.makesurePopup.close()
        this.$emit('setDefaultData', this.initType)
      },
      initData(type) {
        this.initType = type
        this.$refs.makesurePopup.open()
      },
      toConfig(type) {
        uni.showLoading()
        this.curEmojInfo = this.emoji
        this.curAudioInfo = this.audio
        type===1?this.$refs.chooseEmojiPopup.open():this.$refs.chooseAudioPopup.open()
        groupResData({res_type: type},res => {
          if (res.code === 0) {
            if (type === 1) {
              this.emojiList = res.data || []
            } else {
              // res.data.forEach(item=>(item['isplay']=false))
              res.data.forEach(item => (item['isPlay'] = false));
              this.audioList = res.data || []
            }
            uni.hideLoading()
          } else if (res.code === -20001) {
            this.$emit('updateAdminToken')
            this.$refs.chooseEmojiPopup.close()
            uni.hideLoading()
          } else if (res.code != -10002){
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
      sureNotice() {
        this.setConfig({type: 12,text: this.notice.data, group_id: this.group_id})
      },
      checkEmoj(item) {
        this.curEmojInfo = item
      },
      checkAudio(item) {
        this.curAudioInfo = item
      },
      sureEmoj() {
        this.setConfig({type: 2,res_id: this.curEmojInfo.res_id, group_id: this.group_id}, 'chooseEmojiPopup')
      },
      sureAudio() {
        this.setConfig({type: 3,res_id: this.curAudioInfo.res_id, group_id: this.group_id}, 'chooseAudioPopup')
      },
      sureRule() {
        uni.showLoading()
        this.setConfig({type: 10,text: this.rule.data, group_id: this.group_id})
      },
      sureWelcome() {
        if (this.welcome.data) {
          if (this.welcome.data.length>2000) {
            uni.showToast({
              title: '欢迎语不能超过2000个字符',
              icon: 'none'
            });
            return false
          }
          uni.showLoading()
          this.setConfig({type: 1,welcome: this.welcome.data, group_id: this.group_id})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-content {
    padding: 0 30rpx 40rpx;
    .list-box {
      margin-bottom: 20rpx;
      padding: 40rpx 30rpx;
      background: #FFFFFF;
      box-shadow: 0 0 20rpx 1px rgba(197, 204, 213, 0.1);
      border-radius: 20rpx;
      .title-box {
        margin-bottom: 34rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >* {
          flex-shrink: 0;
        }
        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
          vertical-align: text-bottom;
        }
        .left {
          font-weight: 500;
          color: #0E1B2E;
          line-height: 40rpx;
          font-size: 32rpx;
        }
        .right {
          line-height: 40rpx;
          color: #606178;
        }
      }
      .textarea1 {
        width: 100%;
        height: 200rpx;
        background-color: #F4F5F7;
        padding: 20rpx;
        font-size: 28rpx;
        border-radius: 8rpx;
      }
      .btn {
        width: 100%;
        height: 80rpx;
        background-color: #1675FE;
        line-height: 80rpx;
        text-align: center;
        color: #ffffff;
        font-size: 28rpx;
        border-radius: 10rpx;
        margin-top: 30rpx;
        cursor: pointer;
        &.btn-gray {
          background-color: rgba(22,117,254,.2);
        }
      }
      .inpt-box {
        margin-bottom: 20rpx;
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        text {
          color: #333333;
          margin-top: 26rpx;
        }
        .textarea2 {
          width: 450rpx;
          height: 192rpx;
          background: #F4F5F7;
          border-radius: 8rpx;
          padding: 24rpx 25rpx;
          :deep .uni-textarea-compute, .uni-textarea-line {
            display: none;
          }
        }
        .inpt {
          width: 450rpx;
          height: 80rpx;
          background: #F4F5F7;
          border-radius: 8rpx;
          padding: 0 25rpx;
          .inpt-1 {
            height: 100%;
            font-size: 28rpx;
            text-align: center;
            &.inpt-2 {
              color: rgba(14, 27, 46, .4);
            }
          }
        }
        .clap-box {
          width: 450rpx;
          height: 208rpx;
          background: #F8F9FA;
          border-radius: 8rpx;
          padding: 30rpx;
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
                margin: 0;
              }
            }
            input {
              width: 240rpx;
              height: 64rpx;
              background: #EEF0F4;
              border: 1rpx solid #1675FE;
              border-radius: 8rpx;
              text-align: center;
              font-size: 28rpx;
              font-weight: 500;
              color: #0E1B2E;
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
        &.inpt-box-1 {
          margin-top: 16px;
          .inpt {
            width: 380rpx;
          }
          
        }
      }
      .text-exp {
        text-align: right;
        margin: 40rpx 0 20rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #9DA9B9;
        line-height: 24rpx;
      }
    }
  }
  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      width: 201rpx;
      height: 212rpx;
      image {
        width: 100%;
        height: 100%;
      }
      .none {
        width: 201rpx;
        height: 212rpx;
        line-height: 212rpx;
        text-align: center;
        color: #606178;
      }
      &.radio-bg {
        background: url('@/static/image/set/audio-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        >* {
          flex-shrink: 0;
        }
        
      }
    }
  }
  .bg-box {
    width: 80rpx;
    height: 80rpx;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    image {
      width: 28rpx !important;
      height: 32rpx !important;
    }
  }
  .choosePopup {
    height: 88vh;
    background-color: #ffffff;
    border-radius: 30rpx 30rpx 0 0;
    padding: 50rpx 5rpx 50rpx 40rpx;
    .popup-tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      .h1 {
        font-size: 32rpx;
        font-weight: 500;
        color: #000000;
        line-height: 32rpx;
      }
      .text1 {
        padding-right: 35rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #606178;
        line-height: 24rpx;
        .blue {
          color: #1675FE;
        }
      }
    }
    .popup-foot {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 120rpx;
      padding: 20rpx 30rpx 0;
      background: #FFFFFF;
      box-shadow: 0px -10rpx 10rpx 1px rgba(40, 42, 67, 0.06);
      .btn {
        // margin: 20rpx auto 0;
        // width: 690rpx;
        height: 80rpx;
        background: #1675FE;
        border-radius: 10rpx;
        text-align: center;
        line-height: 80rpx;
        font-size: 28rpx;
        color: #ffffff;
      }
    }
    .popup-body {
      margin-top: 38rpx;
      height: 89%;
      .scroll {
        height: 100%;
        .popup-list-box {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          >*{
            flex-shrink: 0;
          }
          .box {
            margin-right: 35rpx;
            margin-bottom: 40rpx;
            cursor: pointer;
            .img {
              width: 200rpx;
              height: 200rpx;
              border-radius: 10rpx;
              position: relative;
              image {
                width: 100%;
                height: 100%;
              }
              &::after {
                content: '';
                position: absolute;
                right: -2rpx;
                bottom: -2rpx;
                width: 48rpx;
                height: 48rpx;
                background: url('@/static/image/set/choose.png') no-repeat;
                background-size: 100% 100%;
                opacity: 0;
              }
              &.none {
                background: #EEF0F4;
                image {
                  width: 100rpx;
                  height: 100rpx;
                  margin: 50rpx 50rpx 0;
                }
              }
              &.active {
                border: 2px solid #1675FE;
                &::after {
                  content: '';
                  opacity: 1;
                }
              }
            }
            .tit {
              text-align: center;
              color: #606178;
              font-size: 24rpx;
              margin-top: 20rpx;
              &.active {
                color: #1675FE;
                font-weight: 500;
              }
            }
          }
          
        }
        .popup-audio-list {
          margin-right: 35rpx;
          .audio-box {
            padding-right: 20rpx;
            margin-bottom: 30rpx;
            // overflow: hidden;
            height: 204rpx;
            border-radius: 14rpx;
            background-color: #F4F5F7;
            display: flex;
            color: #606178;
            font-size: 24rpx;
            position: relative;
            cursor: pointer;
            >*{
              flex-shrink: 0;
            }
            .icon-bg {
              width: 200rpx;
              height: 200rpx;
              background: #EEF0F4;
              border-radius: 10rpx;
            }
            .icon-bg-1 {
              width: 200rpx;
              height: 200rpx;
              background: url('@/static/image/set/audio-bg.png') no-repeat;
              background-size: 100% 100%;
              .bg-box {
                margin: 60rpx auto 0;
              }
            }
            .text2-box {
              margin-left: 30rpx;
              width: 65%;
              height: 100%;
              padding: 20rpx 0;
            }
            .h1 {
              font-weight: 500;
              font-size: 32rpx;
              margin-bottom: 10rpx;
            }
            .text2 {
              height: 100%;
              overflow-y: auto;
              line-height: 40rpx;
            }
            &.audio-none {
              background: #F8F9FA;
              image {
                display: block;
                width: 100rpx;
                height: 100rpx;
                margin: 50rpx auto 0;
              }
              .text2 {
                margin-left: 30rpx;
                font-size: 32rpx;
                font-weight: 500;
                margin-top: 60rpx;
              }
            }
            &::after {
              content: '';
              width: 48rpx;
              height: 48rpx;
              background: url('@/static/image/set/choose.png') no-repeat;
              background-size: 100% 100%;
              position: absolute;
              right: -2rpx;
              bottom: -2rpx;
              opacity: 0;
            }
            &.active {
              border: 2rpx solid #1675FE;
              &::after {
                content: '';
                opacity: 1;
              }
            }
          }
        }
        
      }
    }
  }
  .no_data {
    text-align: center;
  }
  .tips {
    display: block;
    font-size: 24rpx;
    color: #9DA9B9;
    margin-top: 16rpx;
    line-height: 1.4;
  }
  .clearSurePopup {
    .btn-box {
      .btn {
        width: 100%;
        color: #ffffff;
        background-color: #1675FE;
      }
    }
  }
  .textarea-box {
    .textarea-box-tit {
      font-size: 28rpx;
      color: #333333;
      margin: 36rpx 0 20rpx;
    }
  }
</style>