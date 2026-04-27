<template>
  <view class="list-content">
    <view class="list-box" v-if="userRole === 1">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-9.png" mode=""></image>
          设置超管新密码
        </view>
      </view>
      <form><input class="inpt1" :password='true' type="password" v-model="paw" placeholder="新密码" placeholder-style="color:#C5CCD5">      </form>
      <form><input class="inpt1" :password='true' v-model="againPaw" type="password" placeholder="再次确认新密码" placeholder-style="color:#C5CCD5">      </form>
      <view class="btn" @click="setPaw">保存</view>
    </view>
    
    <!-- 插件开关 -->
    <view class="list-box list-box-1">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-4.png" mode=""></image>
          插件开关
        </view>
        <view class="right" @click="switchShow('isShowSwitch')">
          <image :class="['t-arrow', showObj.isShowSwitch===false?'hide':'']" src="@/static/image/set/t-arrow.png" mode=""></image>
          {{showObj.isShowSwitch===true?'收起':'打开'}}
        </view>
      </view>
      <view :class="['switch-box', showObj.isShowSwitch===true?'show':'hide']">
        <view class="switch-list" v-for="(item, index) in cmdData.main_list" :key="item.cmd_id">
          <text space="nbsp" decode="true">{{item.cmd_name}}</text>
          <!-- <uni-even-switch v-model="item.cmd_is_open" :size="20" :extraData="index" :contextLevel="2" activeColor="#67C23A" inactiveColor="#C1CBDB" :beforeChange="beforeListChange"></uni-even-switch> -->
          <uni-even-switch :value="item.cmd_is_open" :size="20" :extraData="index" :contextLevel="2" activeColor="#67C23A" inactiveColor="#C1CBDB" :beforeChange="beforeListChange"></uni-even-switch>
        </view>
      </view>
    </view>
    
    <!-- 插件开关 -->
    <view class="list-box list-box-1">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-10.png" mode=""></image>
          娱乐插件开关
        </view>
        <view class="right" @click="switchShow('isShowPlay')">
          <image :class="['t-arrow', showObj.isShowPlay===false?'hide':'']" src="@/static/image/set/t-arrow.png" mode=""></image>
          {{showObj.isShowPlay===true?'收起':'打开'}}
        </view>
      </view>
      <view :class="['switch-box', showObj.isShowPlay===true?'show':'hide']">
        <view class="switch-list" v-for="(item, index) in cmdData.joy_list" :key="item.cmd_id">
          <text space="nbsp" decode="true">{{item.cmd_name}}</text> <uni-even-switch :value="item.cmd_is_open" :size="20" :extraData="index" :contextLevel="2" activeColor="#67C23A" inactiveColor="#C1CBDB" :beforeChange="beforePlayChange"></uni-even-switch>
        </view>
      </view>
    </view>
    
    <!-- 签到金币范围 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-6.png" mode=""></image>
          签到金币范围
        </view>
        <view class="right" @click="initData(6)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <text>大小范围</text>
        <view class="inpt">
          <input class="inpt-1" type="number" v-model="signInfo.obtain_min" placeholder="最小值" placeholder-style="color:#C5CCD5" @blur="watchMinNumber">
          <text style="color: #C5CCD5">-</text>
          <input class="inpt-1" type="number" v-model="signInfo.obtain_max" placeholder="最大值" placeholder-style="color:#C5CCD5" @blur="watchMaxNumber">
        </view>
      </view>
      <view class="btn" @click="saveSign">保存</view>
    </view>
    
    <!-- 求婚消耗魅力值自定义 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-6.png" mode=""></image>
          求婚消耗魅力值自定义
        </view>
        <view class="right" @click="initData(15)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <!-- <text>大小范围</text> -->
        <view class="inpt inpt-5">
          <!-- <view class="inpt-1">1</view>
          <text style="color: #C5CCD5;font-size: 36rpx;">:</text> -->
          <input class="inpt-1" type="number" v-model="propose.req_marriage_charm" placeholder="最大值" placeholder-style="color:#C5CCD5">
        </view>
      </view>
      <text class="tips">建议：求婚消耗魅力值最高不超过5w</text>
      <view class="btn" @click="savePropose">保存</view>
    </view>
    
    <!-- 前世预测消耗金币 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-6.png" mode=""></image>
          前世预测消耗金币
        </view>
        <view class="right" @click="initData(20)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <view class="inpt inpt-5">
          <input class="inpt-1" type="number" v-model="preLife.coin" placeholder="最大值" placeholder-style="color:#C5CCD5" @blur="watchLifeNumber">
        </view>
      </view>
      <view class="btn" @click="savePreLife">保存</view>
    </view>
    
    <!-- 刮刮乐消耗金币 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-6.png" mode=""></image>
          刮刮乐消耗金币
        </view>
        <view class="right" @click="initData(21)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <view class="inpt inpt-5">
          <input class="inpt-1" type="number" v-model="happlyInfo.coin" placeholder="最大值" placeholder-style="color:#C5CCD5" @blur="watchHapplyNumber">
        </view>
      </view>
      <view class="btn" @click="saveHapply">保存</view>
    </view>
    
    <!-- 蜜月、约会、洞房恩爱值获得范围 -->
   <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-6.png" mode=""></image>
          恩爱值
        </view>
        <view class="right" @click="initData(14)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <text>获得范围</text>
        <view class="inpt">
          <input class="inpt-1" type="number" v-model="loveing.love_min" placeholder="最小值" placeholder-style="color:#C5CCD5">
          <text style="color: #C5CCD5">-</text>
          <input class="inpt-1" type="number" v-model="loveing.love_max" placeholder="最大值" placeholder-style="color:#C5CCD5">
        </view>
      </view>
      <view class="btn" @click="saveLoveing">保存</view>
    </view>
    
    <!-- 打劫概率/获取金币范围 7 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-7.png" mode=""></image>
          打劫概率/获取金币范围
        </view>
        <view class="right" @click="initData(7)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <text>成功概率</text>
        <view class="inpt inpt-3">
          <input class="inpt-2" type="number" v-model="lootInfo.success_ratio" placeholder="成功概率" placeholder-style="color:#C5CCD5" @blur="watchRatio">
          <text class="pre">%</text>
        </view>
      </view>
      <view class="inpt-box">
        <text>成功获取金币</text>
        <view class="inpt">
          <input class="inpt-1" type="number" v-model="lootInfo.obtain_min" placeholder="最小值" placeholder-style="color:#C5CCD5" @blur="watchObtainMin">
          <text style="color: #C5CCD5">-</text>
          <input class="inpt-1" type="number" v-model="lootInfo.obtain_max" placeholder="最大值" placeholder-style="color:#C5CCD5" @blur="watchObtainMax">
        </view>
      </view>
      <view class="inpt-box">
        <text>失败消耗金币</text>
        <view class="inpt">
          <input class="inpt-1" type="number" v-model="lootInfo.lose_min" placeholder="最小值" placeholder-style="color:#C5CCD5" @blur="watchLoserMin">
          <text style="color: #C5CCD5">-</text>
          <input class="inpt-1" type="number" v-model="lootInfo.lose_max" placeholder="最大值" placeholder-style="color:#C5CCD5" @blur="watchLoserMax">
        </view>
      </view>
      <view class="btn" @click="saveLoot">保存</view>
    </view>
    
    <!-- 逼婚概率/消费金币范围 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-7.png" mode=""></image>
          逼婚概率/消费金币范围
        </view>
        <view class="right" @click="initData(16)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box">
        <text>成功概率</text>
        <view class="inpt inpt-3">
          <input class="inpt-2" type="number" min="10" v-model="force.force_rate" placeholder="成功概率" placeholder-style="color:#C5CCD5" @blur="watchForceRatio">
          <text class="pre">%</text>
        </view>
      </view>
      <view class="inpt-box">
        <text>金币消费范围</text>
        <view class="inpt">
          <input class="inpt-1" type="number" v-model="force.force_coin_min" placeholder="最小值" placeholder-style="color:#C5CCD5" @blur="watchForceMin">
          <text style="color: #C5CCD5">-</text>
          <input class="inpt-1" type="number" v-model="force.force_coin_max" placeholder="最大值" placeholder-style="color:#C5CCD5" @blur="watchForceMax">
        </view>
      </view>
      <view class="btn" @click="saveForce">保存</view>
    </view>
    
    <!-- 配置金币兑换比例 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-12.png" mode=""></image>
          自动加金币兑换设置
        </view>
        <view class="right" @click="initData(13)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <view class="inpt-box inpt-box-3">
        <text>RMB</text>
        <text>金币</text>
      </view>
      <view class="inpt-box-4">
        <view class="p-box p-box-1">1</view>
        <view class="wait">=</view>
        <view class="p-box">
          <input class="inpt-2" type="number" v-model="coinRate.coin_rate" placeholder="比例要小于10000000" placeholder-style="color:#C5CCD5" @blur="watchCoinRate">
        </view>
      </view>
      <view class="btn" @click="saveCoin">保存</view>
    </view>
    
    <!-- 整点报时消息 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-5.png" mode=""></image>
          整点报时消息
        </view>
        <view class="right" @click="initData(4)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <textarea class="textarea1" v-model="timerMsg.data" placeholder="自定义文字" placeholder-style="color:#C5CCD5" />
      <view class="btn" @click="saveTimerMsg">保存</view>
    </view>
    
    <!-- 送礼成功提示文案 -->
    <!-- <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-8.png" mode=""></image>
          送礼成功提示文案
        </view>
        <view class="right" @click="initData(5)">
          <image src="@/static/image/set/t-del.png" mode=""></image>
          恢复初始
        </view>
      </view>
      <textarea class="textarea1" v-model="sendGift.data" placeholder="自定义文字" placeholder-style="color:#C5CCD5" />
      <text class="tips">注意：文案中的红色字不要修改！</text>
      <text class="tips">其它文字都能自定义，如果错入输入恢复初始即可。</text>
      <text class="tips"><text>@$收礼者$</text> 🎁收到了礼物🎁</text>
      <text class="tips"><text>「$发送者$」花费$金额$金币，</text>赠送你</text>
      <text class="tips"><text>【$礼物$】，</text>快答谢吧！</text>
      <text class="tips">（举例新增）开开心心的收到了你的礼物</text>
      <view class="btn" @click="saveSendGift">保存</view>
    </view> -->
    
    <!-- 送礼成功提示文案 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-13.png" mode=""></image>
          创业
        </view>
        <view class="right">
          成功率 0-100
        </view>
      </view>
      <view class="business" v-for="(item, i) in businessList.business_config_list" :key="item.id">
        <text class="left">{{item.title}}</text>
        <view class="inpt">
          <input class="inpt-2" type="number" v-model="item.rate" placeholder-style="color:#C5CCD5" @blur="watchBusiness($event, i)">
        </view>
      </view>
      <view class="btn" @click="saveSendBusiness">保存</view>
      
    </view>
    
    <!-- 群背景定制图 -->
    <view class="list-box" v-for="(item, index) in newGroupWord.list" :key="index">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-11.png" mode=""></image>
          词库添加
        </view>
        <!-- <view class="right" @click="delectWord(item, index)" v-if="index>=1"> -->
        <view class="right" @click="delectWord(item, index)">
          <image src="@/static/image/close.png" mode=""></image>
        </view>
      </view>
      <view class="inpt-box-1">
        <view class="ques">
          <text>问题：</text>
          <textarea class="textarea3" :maxlength="2000" v-model="item.title" />
        </view>
        <text class="tips">· 输入你想让机器人反馈的指令问题；· 如：奶茶包；</text>
      </view>
      <view class="inpt-box-1 inpt-box-2">
        <view class="ques">
          <text>答案：</text>
          <textarea class="textarea3" :maxlength="2000" v-model="item.content" />
        </view>
        <text class="tips">· 输入您想让机器人反馈的答案，如：30/6，低接；</text>
      </view>
      <view class="btn" @click="saveWord(item)">保存</view>
      <view class="draw-btn" @click="addWord" v-show="index+1 === newGroupWord.list.length">
        <image src="../../../static/image/add-2.png" mode=""></image> 点击添加更多自定义词库
      </view>
    </view>
    
    <!-- 头衔 -->
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-15.png" mode=""></image>
          贵族头衔
        </view>
        <view class="right" @click="switchShow('isShowNoble')">
          <image :class="['t-arrow', showObj.isShowNoble===false?'hide':'']" src="@/static/image/set/t-arrow.png" mode=""></image>
          {{showObj.isShowNoble===true?'收起':'打开'}}
        </view>
      </view>
      <view :class="['switch-box', showObj.isShowNoble===true?'show':'hide']">
        <view class="noble-list" v-for="(item,i) in newNobleInfo.title_list" :key="'name-'+i">
          <view class="noble-inpt"><input type="text" v-model="item.name" placeholder="头衔名称" placeholder-style="color:#C5CCD5" @input="watchInpt($event, i)"></view>
          <!-- <view class="noble-bg-box" @click="openNoble(i)">
            <image v-if="item.res_id*1 === -1" src="../../../static/image/noble-bg.png" class="noble-bg"></image>
            <view class="empty" v-else-if="item.url === 'no' || item.res_id==='no' ||item.res_id*1===0 ">
              <image class="cur-noble-1" src="@/static/image/set/un-use.png"></image>
            </view>
            <image class="cur-noble" v-else :src="item.url"></image>
          </view> -->
          <view :class="['save', !item.name&&'gray']" @click="saveNoble(item, i, 1)"><image src="@/static/image/set/save.png"></image></view>
          <view :class="['delect', item.id==''&&newNobleInfo.title_list.length<=1?'gray':'']" @click="delectNoble(item,i,0)">
            <image src="@/static/image/set/delect.png"></image>
          </view>
        </view>
        <view :class="['draw-btn', emptyFlag===false&&'gray']" @click="addNoble">
          <image src="../../../static/image/add-2.png" mode=""></image> 点击添加贵族头衔
        </view>
      </view>
    </view>
    
    <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-15.png" mode=""></image>
          金币礼物
        </view>
        <view class="right" @click="switchShow('isShowGift')">
          <image :class="['t-arrow', showObj.isShowGift===false?'hide':'']" src="@/static/image/set/t-arrow.png" mode=""></image>
          {{showObj.isShowGift===true?'收起':'打开'}}
        </view>
      </view>
      <view :class="['switch-box', showObj.isShowGift===true?'show':'hide']">
        <view class="gift-wrapper">
          <view class="title">
            <text class="box">名称</text>
            <text class="box">消耗金币</text>
            <text class="box">获得魅力</text>
          </view>
          <view class="gift-list" v-for="(item, i) in newGiftInfo.coin_gift_list" :key="'gift-'+i">
            <view class="box box-1">
              <textarea rows="2" v-model="item.name" @input="watchGift($event, i)"></textarea>
            </view>
            <view class="box box-2">
              <input type="number" v-model="item.coin" @input="watchGift($event, i)">
            </view>
            <view class="box box-3">
              <input type="digit" v-model="item.charm" @input="watchGift($event, i)">
            </view>
            <view :class="['hands save', (item.id===-2||!item.name||item.coin==''||item.charm=='')?'gray':'']" @click="saveGift(item, i, 1)"><image src="@/static/image/set/save.png"></image></view>
            <view :class="['hands delect',(item.id===-2||newGiftInfo.coin_gift_list.length<=1)&&'gray']" @click="delGift(item, i, 0)"><image src="@/static/image/set/delect.png"></image></view>
            
          </view>
        </view>
        <view :class="['draw-btn', giftFlag===false&&'gray']" @click="addGift">
          <image src="../../../static/image/add-2.png" mode=""></image> 继续添加更多礼物名称
        </view>
      </view>
    </view>
    
    <!-- 群背景定制图 -->
    <!-- <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-1.png" mode=""></image>
          群背景定制图
        </view>
      </view>
      <view class="inpt-box">
        <text>图片链接</text>
        <textarea class="textarea2" :maxlength="-1" v-model="groupTopBg.group_top_bg" placeholder="请输入图片链接" placeholder-style="color:#C5CCD5" />
      </view>
      
      <view class="btn" @click="saveBg">保存</view>
    </view> -->
    
    <!-- 群推广配置 -->
    <!-- <view class="list-box">
      <view class="title-box">
        <view class="left">
          <image src="@/static/image/set/t-1.png" mode=""></image>
          群推广配置
        </view>
      </view>
      <view class="inpt-box">
        <text>图片链接</text>
        <textarea class="textarea2" :maxlength="-1" v-model="groupTopAd.group_top_ad" placeholder="请输入图片链接" placeholder-style="color:#C5CCD5" />
      </view>
      <view class="inpt-box">
        <text>推广跳转</text>
        <textarea class="textarea2" :maxlength="-1" v-model="groupTopAd.group_top_ad_jump_url" placeholder="请输入推广跳转地址" placeholder-style="color:#C5CCD5" />
      </view>
      
      <view class="btn" @click="saveAd">保存</view>
    </view> -->
    
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
    
    <!-- 选择头衔背景 -->
    <uni-popup ref="chooseNobleBgPopup" type="bottom" background-color="#ffffff">
      <view class="choosePopup">
        <view class="popup-tit">
          <view class="h1">设置贵族头衔背景</view>
          <view class="text1">
            如需定制，请<text class="blue">联系客服</text>
          </view>
        </view>
        <view class="popup-body">
          <scroll-view scroll-y="true" class="scroll">
            <view class="popup-list-box" v-if="newNobleList.length">
              <view class="box">
                <view :class="['img none',newNobleList[newNobleInfoIndex].url === 'no' || newNobleList[newNobleInfoIndex].res_id === 'no'|| newNobleList[newNobleInfoIndex].res_id*1 === 0 ?'active':'']" @click="checkNoble({res_id: '0',title: '',url: ''})">
                  <image src="../../../static/image/set/un-use.png" mode=""></image>
                </view>
                <view :class="['tit',newNobleList[newNobleInfoIndex].url === 'no' || newNobleList[newNobleInfoIndex].res_id === 'no'|| newNobleList[newNobleInfoIndex].res_id*1 === 0?'active':'']">不使用背景</view>
              </view>
              <view class="box" v-for="(item, index) in nobleBgList" :key="index">
                <view :class="['img', newNobleList[newNobleInfoIndex].res_id === item.res_id?'active':'']" @click="checkNoble(item)">
                  <image :src="item.url" mode="aspectFit"></image>
                </view>
                <view :class="['tit', newNobleList[newNobleInfoIndex].res_id === item.res_id?'active':'']">{{item.title}}</view>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="popup-foot"><view class="btn" @click="sureNoble">确认</view></view>
      </view>
    </uni-popup>
    
  </view>
</template>
<script setup>
  import {ref,reactive,watch} from 'vue'
  import UniEvenSwitch from '@/components/uni-evan-switch/evan-switch.vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import {groupPawData, 
          groupSetCmdData, 
          groupSetConfigData, 
          groupWordDelData, 
          nobleNameData,
          nobleNameDelData,
          giftEditData,
          giftDelData,
          groupResData} from'@/service/robotAccount/index.js'
          
  const props = defineProps({
    group_id: {
      type: String,
      default: () => {}
    },
    userRole: Number,
    authCode: String,
    cmdData: {
      type: Object,
      default: () => {
        return {
          joy_list: [],
          main_list: []
        }
      }
    },
    timerMsg: {
      type: Object,
      default: () => {
        return {
          data: '',
          data_type: 4,
        }
      }
    },
    sendGift: {
      type: Object,
      default: () => {
        return {
          data: '',
          data_type: 5,
        }
      }
    },
    signInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 6,
          obtain_max: '',
          obtain_min: ''
        }
      }
    },
    lootInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 7,
          lose_max: '',
          lose_min: '',
          obtain_max: '',
          obtain_min: '',
          success_ratio: ''
        }
      }
    },
    groupTopBg: {
      type: Object,
      default: () => {
        return {
          data_type: 8,
          group_top_bg: ''
        }
      }
    },
    groupTopAd: {
      type: Object,
      default: () => {
        return {
          data_type: 9,
          group_top_ad: '',
          group_top_ad_jump_url: ''
        }
      }
    },
    groupword: {
      type: Object,
      default: () => {
        return {
          data_type: 11,
          list: []
        }
      }
    },
    coinRate: {
      type: Object,
      default: () => {
        return {
          data_type: 13,
          coin_rate: 0
        }
      }
    },
    propose: {
      type: Object,
      default: () => {
        return {
          data_type: 15,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0
        }
      }
    },
    loveing: {
      type: Object,
      default: () => {
        return {
          data_type: 14,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0
        }
      }
    },
    force: {
      type: Object,
      default: () => {
        return {
          data_type: 0,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0
        }
      }
    },
    businessList: {
      type: Object,
      default: () => {
        return {
          data_type: 0,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0,
          business_config_list: []
        }
      }
    },
    preLife: {
      type: Object,
      default: () => {
        return {
          data_type: 20,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0,
          business_config_list: [],
          coin: 0
        }
      }
    },
    happlyInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 21,
          force_coin_max: 0,
          force_coin_min: 0,
          force_rate: 0,
          love_max: 0,
          love_min: 0,
          req_marriage_charm: 0,
          business_config_list: [],
          coin: 0
        }
      }
    },
    nobleInfo:{
      type: Object,
      default: () => {
        return {
          data_type: 23,
          title_list: []
        }
      }
    },
    giftInfo: {
      type: Object,
      default: () => {
        return {
          data_type: 24,
          list: []
        }
      }
    }
  })
  
  const emit = defineEmits(['updateConfig','updateGroupInfo','setDefaultData','updateAdminToken']) 
  // const isShowSwitch = ref(true)
  // const isShowPlay = ref(true)
  // const isShowNoble = ref(true)
  // const isShowGift = ref(true)
  const showObj = reactive({
    isShowSwitch: true,
    isShowPlay: true,
    isShowNoble: true,
    isShowGift: true,
  })
  const paw = ref('')
  const againPaw = ref('')
  const initType = ref('')
  const emptyFlag = ref(false)
  const giftFlag = ref(false)
  const newGroupWord = reactive({
     data_type:11,
     list: []
  })
  const newNobleInfo = reactive({
     data_type:23,
     title_list: []
  })
  const newGiftInfo = reactive({
     data_type:24,
     coin_gift_list: []
  })
  const nobleBgList = ref([])
  const newNobleList = ref([])
  const newNobleInfoIndex = ref(0)
  const chooseNobleBgPopup = ref()
  const makesurePopup = ref()
  

  const mergeAndDeduplicate = (source, target, key) => {
    const combined = [...source[key], ...target[key]];
    const unique = {};
    const result = combined.filter(item => {
      if (key === 'title_list'&&!unique[item.id]) {
        unique[item.id] = true;
        return true;
      }
      return false;
    });
    target[key] = result;
  };
  

  // watch([props.groupword, props.nobleInfo, props.giftInfo], ([g, n, gi]) => {
  //   newGroupWord.value = { ...g };
  //   console.log(n, 'nnnn')
  //   mergeAndDeduplicate(n, newNobleInfo, 'title_list');
  //   mergeAndDeduplicate(gi, newGiftInfo, 'coin_gift_list');
  // }, { immediate: true, deep: true });
 
  // watch(props.groupword, (g) => {
  //   newGroupWord.value = { ...g };
  // }, { immediate: true });
  watch(() => props.groupword, (newVal) => {
    newGroupWord.list = newVal.list
  }, { immediate: true});
  
  // 使用函数形式监听props.nobleInfo
  watch(() => props.nobleInfo, (newVal) => {
    // mergeAndDeduplicate(newVal, newNobleInfo, 'title_list');
    const combined = [...newVal['title_list'], ...newNobleInfo['title_list']];
    const unique = {};
    const result = combined.filter(item => {
      if (!unique[item.id]) {
        unique[item.id] = true;
        return true;
      }
      return false;
    });
    newNobleInfo['title_list'] = result;
  }, { immediate: true});
  
  watch(() => props.giftInfo, (value) => {
    let arr = value.coin_gift_list
    let newArr = []
    for(var i=0;i<arr.length;i++){
      newArr.push(arr[i])
    }
    newGiftInfo.coin_gift_list = newArr
  }, { immediate: true});


  watch(newNobleInfo, (value) => {
    getEmptyFlag(value.title_list);
  }, { immediate: true });

  watch(newGiftInfo, (value) => {
    getGiftFlag(value.coin_gift_list);
  }, { immediate: true });

  function sureNoble(){
    chooseNobleBgPopup.value.close()
    newNobleInfo.title_list = JSON.parse(JSON.stringify(newNobleList.value))
  }
  function checkNoble(item){
    newNobleList.value[newNobleInfoIndex.value]['res_id'] = item.res_id
    newNobleList.value[newNobleInfoIndex.value]['url'] = item.url
  }
  function openNoble(i){
    newNobleInfoIndex.value = i
    newNobleList.value = JSON.parse(JSON.stringify(newNobleInfo.title_list))
    uni.showLoading()
    chooseNobleBgPopup.value.open()
    groupResData({res_type: 3},res => {
      if (res.code === 0) {
          res.data.forEach(item => (item['isPlay'] = false));
          nobleBgList.value = res.data || []
        uni.hideLoading()
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  function saveGift(item, i, st){
    if(item.id) {
      if (item.name && item.coin != '' && item.charm != '') {
        uni.showLoading()
        let params = {
          id: item.id===-1?'':item.id,
          title: item.name,
          group_id: props.group_id,
          auth_code: props.authCode,
          status: st,
          price: item.charm,
          score: item.coin
        }
        giftEditData(params, res => {
          if (res.code === 0) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            if(st === 1) {
              emit('updateConfig')
              newGiftInfo.coin_gift_list.splice(i, 1)
            } else {
              newGiftInfo.coin_gift_list.splice(i, 1)
              props.giftInfo.coin_gift_list.splice(i, 1)
              if (newGiftInfo.coin_gift_list.length<=0) {
                newGiftInfo.coin_gift_list.push({id: -1, name: '', coin: '', charm: ''})
                props.giftInfo.coin_gift_list.push({id: -1, name: '', coin: '', charm: ''})
              }
            }
            
            uni.hideLoading()
          } else if (res.code === 100401) {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            emit('updateAdminToken')
            uni.hideLoading()
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
            uni.hideLoading()
          }
        })
      }
    }
    
  }
  function addGift(){
    if(giftFlag.value === true) {
      let obj = {id: -1, name: '', coin: '', charm: ''}
      newGiftInfo.coin_gift_list.push(obj)
    }
  }
  function delGift(item,i,st){
    if (item.id&&newGiftInfo.coin_gift_list.length>0) {
      if (item.id != -1) {
        uni.showLoading()
        saveGift(item,i,st)
        // giftDelData({id: newGiftInfo.coin_gift_list[i].id}, res => {
        //   if (res.code === 0) {
        //     uni.showToast({
        //       title: res.msg,
        //       icon: 'none',
        //       duration: 2000,
        //     });
        //     newGiftInfo.coin_gift_list.splice(i, 1)
        //     giftInfo.coin_gift_list.splice(i, 1)
        //     if (newGiftInfo.coin_gift_list.length<=0) {
        //       newGiftInfo.coin_gift_list.push({id: -1, name: '', coin: '', charm: ''})
        //       giftInfo.coin_gift_list.push({id: '', name: '', coin: '', charm: ''})
        //     }
        //     uni.hideLoading()
        //   } else {
        //     uni.showToast({
        //       title: res.msg,
        //       icon: 'none'
        //     });
        //     uni.hideLoading()
        //   }
        // })
      } else if (item.id == -1 && newGiftInfo.coin_gift_list.length>1) {
        newGiftInfo.coin_gift_list.splice(i, 1)
      }
      
    }
  }
  function watchGift(e, i){
    getGiftFlag(newGiftInfo.coin_gift_list)
  }
  function getGiftFlag(value) {
    let emptyNum = 0
    for(var i = 0; i<value.length;i++){
      if (!value[i].name || value[i].coin == '' || value[i].charm == '') {
        giftFlag.value = false
      } else {
        emptyNum = emptyNum+1
      }
    }
    if (emptyNum === value.length) {
      giftFlag.value = true
    }
  }
  function getEmptyFlag(value){
    let emptyNum = 0
    for(var i = 0; i<value.length;i++){
      if (!value[i].name) {
        emptyFlag.value = false
      } else {
        emptyNum = emptyNum+1
      }
    }
    if (emptyNum === value.length) {
      emptyFlag.value = true
    }
  }
  function watchInpt(e, i) {
    getEmptyFlag(newNobleInfo.title_list)
  }
  function delectNoble(item, i, st){
    if (newNobleInfo.title_list.length>0) {
      if (item.id != '') {
        uni.showLoading()
        saveNoble(item, i, st)
        // nobleNameDelData({id: newNobleInfo.title_list[i].id}, res => {
        //   if (res.code === 0) {
        //     uni.showToast({
        //       title: res.msg,
        //       icon: 'none',
        //       duration: 2000,
        //     });
        //     newNobleInfo.title_list.splice(i, 1)
        //     nobleInfo.title_list.splice(i, 1)
        //     if (newNobleInfo.title_list.length<=0) {
        //       newNobleInfo.title_list.push({id: '', name: '', res_id: -1})
        //       nobleInfo.title_list.push({id: '', name: '',res_id: -1})
        //     }
        //     uni.hideLoading()
        //   } else {
        //     uni.showToast({
        //       title: res.msg,
        //       icon: 'none'
        //     });
        //     uni.hideLoading()
        //   }
        // })
      } else if (item.id == '' && newNobleInfo.title_list.length>1) {
        newNobleInfo.title_list.splice(i, 1)
      }
      
    }
  }
  function saveNoble(item, i, st){
    if (item.name) {
      uni.showLoading()
      let params = {
        id: item.id,
        title: item.name,
        group_id: props.group_id,
        auth_code: props.authCode,
        status: st, //1 正常(有 ID 更新，没 ID 创建)
        icon: !item.res_id?'-1':item.res_id*1,
      }
      // console.log(params.res_id, '------', item.res_id)
      nobleNameData(params, res => {
        if (res.code === 0) {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          if(st===1){
            newNobleInfo.title_list.splice(i, 1)
            emit('updateConfig')
          } else {
            newNobleInfo.title_list.splice(i, 1)
            props.nobleInfo.title_list.splice(i, 1)
            if (newNobleInfo.title_list.length<=0) {
              newNobleInfo.title_list.push({id: '', name: '', res_id: -1})
              props.nobleInfo.title_list.push({id: '', name: '',res_id: -1})
            }
          }
          
          uni.hideLoading()
        } else if (res.code === 100401) {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          emit('updateAdminToken')
          uni.hideLoading()
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        }
      })
    }
  }
  function addNoble(){
    if(emptyFlag.value === true) {
      let obj = {id: '', name: '', res_id: -1}
      newNobleInfo.title_list.push(obj)
    }
  }
  function setConfig(param, updateConfig, updateGroupInfo) {
    //UpdateConfig: true 更新updateConfig 配置方法  false 不更新updateConfig方法
    //updateGroupInfo: true 更新updateGroupInfo 群信息方法  false 不更新updateGroupInfo方法
    groupSetConfigData({...param,auth_code: props.authCode}, res => {
      if (res.code === 0) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        // updateConfig === true && this.$emit('updateConfig')
        updateGroupInfo === true && emit('updateGroupInfo')
        if (updateConfig === true) {
          emit('updateConfig')
        } else {
          props.groupword.list.push({title: param.title, content: param.content})
        }
        uni.hideLoading()
      } else if (res.code === 100401) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        emit('updateAdminToken')
        uni.hideLoading()
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  function saveSendBusiness() {
    let rate = []
    props.businessList.business_config_list.forEach(item => {
      rate.push(item.rate)
    })
    let params = {
        type: 17,
        business_rate: rate.join(','),
        group_id: props.group_id
    }
    setConfig(params, true, false)
  }
  function addWord() {
    let obj = {
      id: '',
      title: '',
      content: ''
    }
    newGroupWord.list.push(obj)
  }
  function delectWord(item, index) {
    console.log(item, 'item iiii')
    console.log(index, 'item index')
    // console.log(index, 'index',this.groupword.list[index].title)
    // if (index<1 && !props.groupword.list[index].id) {
    if (index<1 && !item.id) {
      newGroupWord.list[index].id = ''
      newGroupWord.list[index].title = ''
      newGroupWord.list[index].content = ''
      return false
    }else if(index>=1 && !item.id){
      newGroupWord.list.splice(index, 1)
      uni.hideLoading()
      return false
    }
    uni.showLoading()
    let params = {
      type: 11,
      id: item.id,
      title: item.title, 
      group_id: props.group_id,
      status:0
    }
    
    // setConfig(params, false, false)
    groupSetConfigData({...params,auth_code: props.authCode}, res => {
      if (res.code === 0) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        newGroupWord.list.splice(index, 1)
        // props.groupword.list.splice(index, 1)
        if (props.groupword.list.length<=0) {
          // props.groupword.list = [{id: '',title: '', content: ''}]
          newGroupWord.list = [{id: '',title: '', content: ''}]
        }
        
        uni.hideLoading()
      } else if (res.code === 100401) {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        emit('updateAdminToken')
        uni.hideLoading()
      } else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
    
    // groupWordDelData({title: item.title, group_id: props.group_id}, res => {
    //   if (res.code === 0) {
    //     uni.showToast({
    //       title: res.msg,
    //       icon: 'none'
    //     });
    //     // this.$emit('updateConfig')
    //     newGroupWord.list.splice(index, 1)
    //     props.groupword.list.splice(index, 1)
    //     if (props.groupword.list.length<=0) {
    //       props.groupword.list = [{title: '', content: ''}]
    //       newGroupWord.list = [{title: '', content: ''}]
    //     }
    //     uni.hideLoading()
    //   } else {
    //     uni.showToast({
    //       title: res.msg,
    //       icon: 'none'
    //     });
    //     uni.hideLoading()
    //   }
    // })
  }
  function saveWord(item) {
    if (!item.title) {
      uni.showToast({
        title: "请输入指令问题",
        icon: 'none'
      });
      return false
    } else if (!item.content) {
      uni.showToast({
        title: "请输入答案",
        icon: 'none'
      });
      return false
    }
    let params = {
      type: 11,
      title: item.title,
      content: item.content,
      group_id: props.group_id
    }
    // this.setConfig(params)
    setConfig(params, true, false)
  }
  function closeSurePopup() { 
    makesurePopup.value.close()
    emit('setDefaultData', initType.value)
  }
  function initData(type) {
    initType.value = type
    makesurePopup.value.open()
  }
  function watchBusiness(e, i) {
    (props.businessList.business_config_list[i].rate===''||props.businessList.business_config_list[i].rate<0)&&(props.businessList.business_config_list[i].rate=0)
    props.businessList.business_config_list[i].rate>100&&(props.businessList.business_config_list[i].rate=100)
  }
  function watchForceRatio() {
    props.force.force_rate<10&&(props.force.force_rate=10)
    props.force.force_rate>70&&(props.force.force_rate=70)
  }
  function watchCoinRate() {
    props.coinRate.coin_rate<0&&(props.coinRate.coin_rate=0)
    props.coinRate.coin_rate>10000000&&(props.coinRate.coin_rate=9999999)
  }
  function watchRatio() {
    props.lootInfo.success_ratio<0 && (props.lootInfo.success_ratio=0)
    props.lootInfo.success_ratio>100 && (props.lootInfo.success_ratio=100)
  }
  function watchObtainMin() {
    props.lootInfo.obtain_min<0 && (props.lootInfo.obtain_min=1)
    if (props.lootInfo.obtain_min&&props.lootInfo.obtain_max) {
      if(props.lootInfo.obtain_min>=props.lootInfo.obtain_max) {
        props.lootInfo.obtain_min = (props.lootInfo.obtain_max-1)
      }
      props.lootInfo.obtain_min = props.lootInfo.obtain_min * 1
    }
  }
  function watchObtainMax() {
    props.lootInfo.obtain_max<0 && (props.lootInfo.obtain_max=1)
    if (props.lootInfo.obtain_min&&props.lootInfo.obtain_max) {
      if (props.lootInfo.obtain_max<=props.lootInfo.obtain_min) {
        props.lootInfo.obtain_max = (props.lootInfo.obtain_min+1)
      }
      props.lootInfo.obtain_max = props.lootInfo.obtain_max * 1
    }
  }
  function watchLoserMin() {
    props.lootInfo.lose_min<0 && (props.lootInfo.lose_min=1)
    if (props.lootInfo.lose_min&&props.lootInfo.lose_max) {
      if(props.lootInfo.lose_min>=props.lootInfo.lose_max) {
        props.lootInfo.lose_min = (props.lootInfo.lose_max-1)
      }
      props.lootInfo.lose_min = props.lootInfo.lose_min * 1
    }
  }
  function watchForceMin() {
    props.force.force_coin_min<0 && (props.force.force_coin_min=1)
    if (props.force.force_coin_min&&props.force.force_coin_max) {
      if(props.force.force_coin_min>=props.force.force_coin_max) {
        props.force.force_coin_min = (props.force.force_coin_max-1)
      }
      props.force.force_coin_min = props.force.force_coin_min * 1
    }
  }
  function watchForceMax() {
    props.force.force_coin_max<0 && (props.force.force_coin_max=1)
    if (props.force.force_coin_min&&props.force.force_coin_max) {
      if (props.force.force_coin_max<=props.force.force_coin_min) {
        props.force.force_coin_max = (props.force.force_coin_min+1)
      }
      props.force.lose_max = props.force.lose_max * 1
    }
  }
  function watchLoserMax() {
    props.lootInfo.lose_max<0 && (props.lootInfo.lose_max=1)
    if (props.lootInfo.lose_min&&props.lootInfo.lose_max) {
      if (props.lootInfo.lose_max<=props.lootInfo.lose_min) {
        props.lootInfo.lose_max = (props.lootInfo.lose_min+1)
      }
      props.lootInfo.lose_max = props.lootInfo.lose_max * 1
    }
  }
  function saveLoot() {
    uni.showLoading()
    let param = {
      type: 7,
      success_ratio: props.lootInfo.success_ratio,
      obtain_min: props.lootInfo.obtain_min,
      obtain_max: props.lootInfo.obtain_max,
      lose_min: props.lootInfo.lose_min,
      lose_max: props.lootInfo.lose_max,
      group_id: props.group_id
    }
    setConfig(param, true, false)
  }
  function saveForce() {
    uni.showLoading()
    let param = {
      type: 16,
      force_rate: props.force.force_rate,
      force_coin_min: props.force.force_coin_min,
      force_coin_max: props.force.force_coin_max,
      group_id: props.group_id
    }
    setConfig(param, true, false)
  }
  function saveCoin() {
    if (props.coinRate.coin_rate == '') {
        uni.showToast({
          title: "请输入比例值",
          icon: 'none'
        });
        return false
    }
    setConfig({type: 13,coin_rate: props.coinRate.coin_rate, group_id: props.group_id}, true, false)
  }
  function watchMinNumber() {
    props.signInfo.obtain_min<0 && (props.signInfo.obtain_min=1)
    if (props.signInfo.obtain_min&&props.signInfo.obtain_max) {
      if(props.signInfo.obtain_min>=props.signInfo.obtain_max) {
        props.signInfo.obtain_min = (props.signInfo.obtain_max-1)
      }
      props.signInfo.obtain_min = props.signInfo.obtain_min * 1
    }
  }
  function watchMaxNumber() {
    props.signInfo.obtain_max<0 && (props.signInfo.obtain_max=1)
    if (props.signInfo.obtain_min&&props.signInfo.obtain_max) {
      if (props.signInfo.obtain_max<=props.signInfo.obtain_min) {
        props.signInfo.obtain_max = (props.signInfo.obtain_min+1)
      }
      props.signInfo.obtain_max = props.signInfo.obtain_max * 1
    }
  }
  function watchLifeNumber() {
    props.preLife.coin<0 && (props.preLife.coin=0)
    if (props.preLife.coin>1000000000) {
      props.preLife.coin = 999999999
    }
  }
  function watchHapplyNumber() {
    props.happlyInfo.coin<0 && (props.happlyInfo.coin=0)
    if (props.happlyInfo.coin>1000000000) {
      props.happlyInfo.coin = 999999999
    }
  }
  function saveSign() {
    // if (this.signInfo.obtain_min == ''||this.signInfo.obtain_max=='') {
    //   uni.showToast({
    //     title: "请输入大小范围",
    //     icon: 'none'
    //   });
    //   return false
    // }
    uni.showLoading()
    let param = {
      type: 6,
      obtain_min: props.signInfo.obtain_min,
      obtain_max: props.signInfo.obtain_max,
      group_id: props.group_id
    }
    // this.setConfig(param)
    setConfig(param, true, false)
  }
  function savePropose() {
    uni.showLoading()
    if (props.propose.req_marriage_charm == '') {
      uni.showToast({
        title: "请输入最大值",
        icon: 'none'
      });
      return false
    }
    let param = {
      type: 15,
      req_marriage_charm: props.propose.req_marriage_charm,
      group_id: props.group_id
    }
    setConfig(param, true, false)
  }
  function savePreLife() {
    uni.showLoading()
    if (props.preLife.coin == '') {
      uni.showToast({
        title: "请输入消耗金币",
        icon: 'none'
      });
      return false
    }
    let param = {
      type: 20,
      coin: props.preLife.coin,
      group_id: props.group_id
    }
    setConfig(param, true, false)
  }
  function saveHapply() {
    uni.showLoading()
    if (props.happlyInfo.coin == '') {
      uni.showToast({
        title: "请输入消耗金币",
        icon: 'none'
      });
      return false
    }
    let param = {
      type: 21,
      coin: props.happlyInfo.coin,
      group_id: props.group_id
    }
    setConfig(param, true, false)
  }
  function saveLoveing() {
    uni.showLoading()
    let param = {
      type: 14,
      love_min: props.loveing.love_min,
      love_max: props.loveing.love_max,
      group_id: props.group_id
    }
    setConfig(param, true, false)
  }
  function saveSendGift() {
    if (!props.sendGift.data) {
      uni.showToast({
        title: "请输入自定义内容",
        icon: 'none'
      });
      return false
    }
    uni.showLoading()
    // this.setConfig({data_type: 5,text: this.sendGift.data})
    setConfig({type: 5,text: props.sendGift.data,group_id: props.group_id}, true, false)
  }
  function saveBg() {
    uni.showLoading()
    let path = props.groupTopBg.group_top_bg
    let reg = /(http|https):\/\/\S*/
    if (path && !reg.test(path)) {
      uni.showToast({
        title: "请输入带有http符号的链接",
        icon: 'none'
      });
      return false
    }
    path = path?path.replace("https", "http"):path
    // this.setConfig({data_type: 8,group_top_bg: path}, 'updateGroupInfo')
    setConfig({data_type: 8,group_top_bg: path, group_id: props.group_id}, true, true)
  }
  function saveAd() {
    uni.showLoading()
    let reg = /(http|https):\/\/\S*/
    if ((props.groupTopAd.group_top_ad && !reg.test(props.groupTopAd.group_top_ad)) || (props.groupTopAd.group_top_ad_jump_url && !reg.test(props.groupTopAd.group_top_ad_jump_url))) {
      uni.showToast({
        title: "请输入带有http符号的链接",
        icon: 'none'
      });
      return false
    }
    props.groupTopAd.group_top_ad = props.groupTopAd.group_top_ad?props.groupTopAd.group_top_ad.replace("https", "http"):props.groupTopAd.group_top_ad
    props.groupTopAd.group_top_ad_jump_url = props.groupTopAd.group_top_ad_jump_url?props.groupTopAd.group_top_ad_jump_url.replace("https", "http"):props.groupTopAd.group_top_ad_jump_url
    // this.setConfig({data_type: 9,group_top_ad: this.groupTopAd.group_top_ad,group_top_ad_jump_url:this.groupTopAd.group_top_ad_jump_url}, 'updateGroupInfo')
    setConfig({data_type: 9,group_top_ad: props.groupTopAd.group_top_ad,group_top_ad_jump_url:props.groupTopAd.group_top_ad_jump_url,group_id: props.group_id}, true, true)
  }
  function saveTimerMsg() {
    if (!props.timerMsg.data) {
      uni.showToast({
        title: "请输入自定义内容",
        icon: 'none'
      });
      return false
    }
    uni.showLoading()
    let param = {
      type: 4,
      text: props.timerMsg.data,
      group_id: props.group_id
    }
    // this.setConfig(param)
    setConfig(param, true, false)
  }
  function drawSwitch (params, e) {
    return new Promise((resolve, reject) => {
      groupSetCmdData(params, res => {
        if (~~res.code === 0) {
          setTimeout(()=>{
            uni.showToast({
              title: e===true?'插件已开启':'插件已关闭',
              icon: 'none'
            });
          },300)
          resolve()
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
  }
  function beforeListChange(e,extraData) {
    uni.showLoading()
    let params = {
      group_id: props.group_id,
      auth_code: props.authCode,
      cmd_id: props.cmdData.main_list[extraData].cmd_id,
      cmd_open: e===true?1:0,
      cmd_type: "",
    }
    return new Promise((resolve, reject) => {
      groupSetCmdData(params, res => {
        if (~~res.code === 0) {
          setTimeout(()=>{
            uni.showToast({
              title: e===true?'插件已开启':'插件已关闭',
              icon: 'none'
            });
          },300)
          resolve()
        } else if (res.code === 100401) {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          emit('updateAdminToken')
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
  }
  function beforePlayChange(e,extraData) {
    uni.showLoading()
    let params = {
      group_id: props.group_id,
      auth_code: props.authCode,
      cmd_id: props.cmdData.joy_list[extraData].cmd_id,
      cmd_open: e===true?1:0,
      cmd_type: 'joy'
    }
    return new Promise((resolve, reject) => {
      groupSetCmdData(params, res => {
        if (~~res.code === 0) {
          setTimeout(()=>{
            uni.showToast({
              title: e===true?'插件已开启':'插件已关闭',
              icon: 'none'
            });
          },300)
          resolve()
        } else if (res.code === 100401) {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          emit('updateAdminToken')
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
  }
  function setPaw() {
    if(!paw.value || !againPaw.value) {
      uni.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return false
    } else if (paw.value !== againPaw.value) {
      uni.showToast({
        title: '密码不一致，请重新输入',
        icon: 'none'
      });
      return false
    }
    uni.showLoading()
    groupPawData({group_id: props.group_id,pwd: paw.value},res => {
      if (res.code === 0) {
        uni.showToast({
          title: '密码设置成功',
          duration: 1000,
          success: () => {
            paw.value = '' 
            againPaw.value = ''
            setTimeout(() => {
              emit('updateAdminToken')
            }, 1200)
          }
        })
      } else{
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  }
  function switchShow(data) {
    showObj[data] = !showObj[data] 
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
      &.list-box-1 {
        padding: 40rpx 30rpx 0;
      }
      .title-box {
        margin-bottom: 30rpx;
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
          font-size: 28rpx;
        }
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
      }
      .inpt1 {
        // width: 630rpx;
        height: 80rpx;
        background: #F4F5F7;
        border-radius: 8rpx;
        margin-bottom: 20rpx;
        padding: 0 30rpx;
      }
      .switch-box {
        margin-top: 40rpx;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        transition: height .2s;
        >* {
          flex-shrink: 0;
        }
        .switch-list {
          width: 50%;
          margin-bottom: 40rpx;
          display: flex;
          align-items: center;
          &:nth-of-type(2n) {
            justify-content: flex-end;
          }
          &:nth-of-type(1) {
          }
          text {
            display: block;
            width: 176rpx;
            font-size: 28rpx;
          }
          .evan-switch {
            margin-left: 20rpx;
          }
        }
        .noble-list {
          margin-bottom: 20rpx;
          display: flex;
          align-items: center;
          >* {
            flex-shrink: 0;
          }
          .noble-inpt {
            // width: 380rpx;
            width: 460rpx;
            height: 80rpx;
            background: #F4F5F7;
            border-radius: 8rpx;
            input {
              width: 100%;
              height: 100%;
              padding-left: 20rpx;
              font-size: 28rpx;
              // font-family: MiSans, 'MiSans';
              font-weight: 500;
              color: #0E1B2E;
            }
          }
          .save {
            // margin-left: 20rpx;
            // width: 100rpx;
            // height: 80rpx;
            // background: rgba(22,117,254,0.1);
            // border-radius: 8rpx;
            // font-size: 28rpx;
            // font-family: PingFang SC-Medium, PingFang SC;
            // font-weight: 500;
            // color: #1675FE;
            // line-height: 80rpx;
            // text-align: center;
            width: 60rpx;
            height: 60rpx;
            margin-left: 20rpx;
            image {
              display: block;
              margin: 10rpx auto;
              width: 40rpx;
              height: 40rpx;
              vertical-align: middle;
            }
            &.gray {
              mix-blend-mode: luminosity;
              // background-color: #F4F5F7;
              // color: #cccccc;
            }
          }
          .delect {
            margin-left: 20rpx;
            width: 60rpx;
            height: 60rpx;
            line-height: 60rpx;
            image {
              display: block;
              margin: 10rpx auto;
              width: 40rpx;
              height: 40rpx;
              vertical-align: middle;
            }
            &.gray {
              image {
                mix-blend-mode: luminosity;
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
      .textarea1 {
        padding: 20rpx;
        width: 100%;
        height: 200rpx;
        background: #F4F5F7;
        border-radius: 10rpx;
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
      .inpt-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        margin-bottom: 20rpx;
        >* {
          flex-shrink: 0;
        }
        text {
          color: #333333;
        }
        .inpt {
          padding: 0 40rpx;
          width: 450rpx;
          height: 80rpx;
          background: #F4F5F7;
          border-radius: 8rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .inpt-1 {
            width: 120rpx;
            height: 100%;
            text-align: center;
          }
          .inpt-2 {
            width: 360rpx;
            height: 100%;
            text-align: center;
          }
          
          .pre {
            color: #C5CCD5;
          }
          &.inpt-3 {
            padding: 0 20rpx;
          }
          &.inpt-5 {
            width: 100%;
            // background-color: #ffffff;
            // padding: 0;
            .inpt-1 {
              width: 100%;
              height: 100%;
            }
            // .inpt-1-1 {
            //   width: 300rpx;
            //   background-color: #F4F5F7;
            //   border-radius: 8rpx;
            // }
          }
        }
        &.inpt-box-3 {
          margin-top: 40rpx;
        }
      }
      .inpt-box-1 {
        font-size: 28rpx;
        margin-bottom: 20rpx;
        color: #606178;
        .ques {
          padding: 20rpx;
          width: 630rpx;
          // height: 80rpx;
          background: #F4F5F7;
          display: flex;
          justify-content: flex-start;
          // align-items: center;
          margin-bottom: 20rpx;
          border-radius: 10rpx;
          .inpt-4 {
            width: 500rpx;
            // height: 100%;
            font-size: 28rpx;
            color: #606178;
          }
          text {
            padding-top: 6rpx;
          }
        }
        .textarea3 {
          width: 500rpx;
          height: 192rpx;
          font-size: 28rpx;
          // background: red;
          // padding: 24rpx 25rpx;
          
          :deep .uni-textarea-compute, .uni-textarea-line {
            display: none;
          }
        }
        &.inpt-box-2 {
          margin-top: 40rpx;
        }
      }
      .inpt-box-4 {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        >* {
          flex-direction: 0;
        }
        .wait {
          color: #C5CCD5;
          margin: 0 30rpx;
        }
        .p-box {
          height: 80rpx;
          background: #F4F5F7;
          border-radius: 10rpx;
          text-align: center;
          line-height: 80rpx;
          .inpt-2 {
            width: 460rpx;
            height: 100%;
          }
          &.p-box-1 {
            width: 100rpx;
            background: none;
          }
        }
      }
      .business {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 26rpx;
        font-size: 28rpx;
        >* {
          flex-shrink: 0;
        }
        text {
          font-weight: 500;
        }
        .inpt {
          width: 200rpx;
          height: 64rpx;
          background: #F4F5F7;
          border-radius: 10rpx;
          input {
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 28rpx;
          }
        }
      }
    }
  }
  .tips {
    display: block;
    font-size: 24rpx;
    color: #9DA9B9;
    margin-top: 10rpx;
    line-height: 1.4;
    text {
      color: #F23C3C;
    }
  }
  .draw-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #1675FE;
    width: 100%;
    height: 80rpx;
    background: rgba(22,117,254,0.1);
    border-radius: 20rpx;
    border: 1px solid rgba(22, 117, 254, 0.5);
    >* {
      flex-shrink: 0;
    }
    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 20rpx;
    }
    &.gray {
      background-color: #F4F5F7;
      color: #cccccc;
      border-color: #F4F5F7;
      image {
        mix-blend-mode: luminosity;
      }
    }
  }
  
  .clearSurePopup {
    .clearText {
      text-align: center;
    }
    .btn-box {
      .btn {
        width: 100%;
        color: #ffffff;
        background-color: #1675FE;
      }
    }
  }
  .gift-wrapper {
    >*{
      flex-shrink: 0;
    }
    .box {
      margin-right: 20rpx;
      width: 150rpx;
      height: 80rpx;
      border-radius: 10rpx;
      font-size: 24rpx;
      // font-family: MiSans, 'MiSans';
    }
    .title {
      display: flex;
      align-items:center;
      text {
        display: block;
        text-align: center;
        line-height: 80rpx;
        color: #606178;
      }
    }
    .gift-list {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      >*{
        flex-shrink: 0;
      }
      .box {
        background-color: #F4F5F7;
        input {
          padding: 0 23rpx;
          width: 100%;
          height: 100%;
          font-size: 28rpx;
        }
        textarea {
          width: 100%;
          // height: auto;
          height: 100%;
          padding: 12rpx 23rpx;
          font-size: 24rpx;
          line-height: 30rpx;
        }
      }
      .hands {
        width: 60rpx;
        height: 60rpx;
        image {
          display: block;
          margin: 10rpx auto;
          width: 40rpx;
          height: 40rpx;
          vertical-align: middle;
        }
        &.save {
          margin-right: 10rpx;
          &.gray {
            image {
              mix-blend-mode: luminosity;
            }
          }
        }
        &.delect {
          &.gray {
            image {
              mix-blend-mode: luminosity;
            }
          }
        }
        
      }
    }
  }
  .noble-bg-box {
   
    .noble-bg {
      margin-left: 15rpx;
      width: 80rpx;
      height: 80rpx;
      cursor: pointer;
    }
    .cur-noble {
      margin-left: 15rpx;
      width: 80rpx;
      height: 80rpx;
      cursor: pointer;
    }
    .empty {
      margin-left: 15rpx;
      width: 80rpx;
      height: 80rpx;
      background-color: #EEF0F4;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .cur-noble-1 {
        width: 40rpx;
        height: 40rpx;
      }
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
</style>