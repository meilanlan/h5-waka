<template>
    <view class="tablist">
      <scroll-view class="scroll-view_H" scroll-x="true" :scroll-left='scrollLeft'>
        <view class="tab-box">
          <text :id="'item'+item.id" :class="['text1', tabId===item.id?'active':'']" v-for="(item,index) in tabArr" :key="'id-'+item.id" @click="switchTab(item,index)">{{item.value}}</text>
          <text class="line" :style="{left: lineLeft}"></text>
        </view>
      </scroll-view>
    </view>
    
</template>

<script setup>
  import {nextTick, ref} from 'vue'
  
  const props = defineProps({
    tabId: {
        type: Number,
        default: 1,
    },
  })
  const emit = defineEmits(['switchTab'])
  const tabArr = ref([
    {id: 1, value: '群空间', distance: '4%'},
    {id: 2, value: '群指令', distance: '25%'},
    {id: 3, value: '我的主页', distance: '49%'},
    {id: 4, value: '机器人', distance: '71.5%'},
    {id: 5, value: '群收益', distance: '93%'},
    {id: 6, value: '群设置', distance: '114%'},
  ])
  const distance = ref(['4%','25%','49%','71.5%','93%','114%'])
  const tabId = ref(props.tabId) //当前的tab id 的值
  const lineLeft = ref('4%') //样式下划线的位置
  const scrollLeft = ref(0) //设置滚动条的位置
  let index = tabArr.value.findIndex(item=>{return item.id===props.tabId})
  lineLeft.value = distance.value[index]
  
  if (tabId.value>=6 && tabArr.value.length>5) { //将隐藏的tab在页面中展示
    scrollLeft.value = 100
  }
  
 
  function switchTab(item,index){
    tabId.value = item.id
    lineLeft.value = distance.value[index]
    emit('switchTab',tabId.value)
    // this.initPageData()
  }
  
  function scroll(e){
    console.log('触发', e)
    
  }
</script>

<style lang="scss" scoped>
  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
    height: 100%;
  }
  .tablist {
    padding: 0 32rpx;
    height: 52rpx;
    position: relative;
    .tab-box {
      display: flex;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
    }
    .text1 {
      color: rgba(0,0,0,.3);
      font-size: 32rpx;
      margin-right: 48rpx;
      &.active {
        color: #000000;
        font-weight: 500;
      }
    }
    .line {
      display: block;
      position: absolute;
      left: 5%;
      bottom: 0;
      width: 40rpx;
      height: 8rpx;
      background-color: #22C0FF;
      transition: all .1s;
    }
  }
</style>