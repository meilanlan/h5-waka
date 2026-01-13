<template>
    <view class="tablist">
      <scroll-view class="scroll-view_H" scroll-x="true" :scroll-left='scrollLeft'>
        <view class="tab-box">
          <text :id="'item'+item.id" :ref="el => { if (el) itemRefList[index] = el; }" :class="['text1', 'tab-box-'+index, tabId===item.id?'active':'']" v-for="(item,index) in tabArr" :key="'id-'+item.id" @click="switchTab(item,index)">{{item.value}}</text>
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
    userRole:{
      type: Number,
      default: 0,
    }
  })
  const emit = defineEmits(['switchTab'])
  const tabArr = ref([])
  const tabId = ref(props.tabId) //当前的tab id 的值
  const lineLeft = ref('4%') //样式下划线的位置
  const scrollLeft = ref(0) //设置滚动条的位置
  const itemRefList = ref([])
  
  // console.log(props.userRole, 'props.userRole')
  if(props.userRole===1){ //群主
    tabArr.value = [
      {id: 1, value: '群空间', distance: '4%'},
      {id: 2, value: '群指令', distance: '25%'},
      {id: 3, value: '我的主页', distance: '49%'},
      {id: 4, value: '机器人', distance: '71.5%'},
      {id: 5, value: '群收益', distance: '93%'},
      {id: 6, value: '数据同步', distance: '116%'},
      {id: 7, value: '群设置', distance: '140%'},
    ]
  } else if(props.userRole===2){ //超管
    tabArr.value = [
      {id: 1, value: '群空间', distance: '4%'},
      {id: 2, value: '群指令', distance: '25%'},
      {id: 3, value: '我的主页', distance: '49%'},
      {id: 4, value: '机器人', distance: '71.5%'},
      {id: 7, value: '群设置', distance: '93%'},
    ]
  } else {//普通管理、群成员
    tabArr.value = [
      {id: 1, value: '群空间', distance: '4%'},
      {id: 2, value: '群指令', distance: '25%'},
      {id: 3, value: '我的主页', distance: '49%'}
    ]
  }
  let index = tabArr.value.findIndex(item=>{return item.id===props.tabId})
  // console.log(index, 'index is')
  lineLeft.value = tabArr.value[index===-1?1:index].distance
  
  if (tabId.value==6 && tabArr.value.length>5) { //将隐藏的tab在页面中展示
    scrollLeft.value = 100
  } else if(tabId.value==7) {
    scrollLeft.value = 180
  }
  
 
  function switchTab(item,index){
    tabId.value = item.id
    lineLeft.value = tabArr.value[index].distance
    emit('switchTab',tabId.value)
    // uni.createSelectorQuery()
    // .select('.tab-box-'+index)  // 选择器或ref名称
    // .boundingClientRect(rect => {
    //   if (rect) {
    //     // let percent =rect.width+uni.upx2px(48)
    //     console.log(rect, 'rect is')
    //     // console.log('元素宽度:', rect.width + 'px');
        
    //     const tabRect = rect[0]
    //     const listRect = rect[1]
    //     // 计算指示器位置：tab中心点 - 指示器宽度的一半
    //     // const tabCenter = tabRect.left + tabRect.width / 2
    //     // const indicatorWidth = 20 // 40rpx转换为px的一半
    //     // const newLeft = tabCenter - indicatorWidth - listRect.left
    //     // console.log(newLeft, 'newLeft')
    //     // indicatorLeft.value = newLeft
    //   }
    // })
    // .exec();  // 执行查询
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
      // min-width: 96rpx;
      // max-width: 128rpx;
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