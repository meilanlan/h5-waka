<template>
  <!-- 年份选择器弹窗 -->
  <!-- <view class="year-picker-mask" v-if="showPicker" @click="closePicker">
    <view class="year-picker-content" @click.stop>
      
    </view>
  </view> -->
  <uni-popup ref="yearPickerPopup" type="bottom" @maskClick="closePicker">
    <view class="year-picker-content" @click.stop>
      <view class="picker-header">
        <view class="picker-btn cancel-btn" @click="closePicker">取消</view>
        <view class="picker-btn confirm-btn" @click="confirmYear">确定</view>
      </view>
      <!-- 年份选择器核心：picker-view（H5端适配） -->
      <picker-view
        class="year-picker-view"
        :value="pickerValue"
        @change="handlePickerChange"
      >
        <picker-view-column>
          <view class="year-item" v-for="year in yearList" :key="year">
            {{ year }} 年
          </view>
        </picker-view-column>
      </picker-view>
    </view>
    
  </uni-popup>
  
  <!-- 触发选择的按钮/展示框（可自定义） -->
  <view class="year-display" @click="openPicker">
    {{ selectedYear || '请选择年份' }}
    <image :class="isRotate&&'active'" src="/static/image/btn-down-white.png" class="arrow"></image>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'

// 接收父组件参数：默认年份、年份范围
const props = defineProps({
  defaultYear: Number,
  minYear: Number,
  maxYear: Number,
});

// 向父组件抛出选中的年份
const emit = defineEmits(['confirm']);
const yearPickerPopup = ref(null)
const isRotate = ref(false)

// 控制选择器显示/隐藏
const showPicker = ref(false);
// picker-view 选中值（数组，仅一列）
const pickerValue = ref([0]);
// 选中的年份
const selectedYear = ref('');
// 年份范围（默认：1900-当前年）
const minYear = ref(props.minYear || 1900);
const maxYear = ref(props.maxYear || new Date().getFullYear());

// 生成年份列表
const yearList = computed(() => {
  const list = [];
  for (let i = minYear.value; i <= maxYear.value; i++) {
    list.push(i);
  }
  console.log(list, 'list')
  return list;
});

// 初始化：设置默认年份
onMounted(() => {
  if (props.defaultYear) {
    const index = yearList.value.findIndex(year => year === props.defaultYear);
    if (index !== -1) {
      pickerValue.value = [index];
      selectedYear.value = props.defaultYear;
    }
  }
  // selectedYear.value = `${props.defaultYear} 年`;
});

// 打开选择器
const openPicker = () => {
  isRotate.value = true
  showPicker.value = true;
  yearPickerPopup.value.open()
};

// 关闭选择器
const closePicker = () => {
  console.log(12313)
  isRotate.value = false
  showPicker.value = false;
  yearPickerPopup.value.close()
};

// 选择器滑动变化
const handlePickerChange = (e) => {
  pickerValue.value = e.detail.value;
  const selected = yearList.value[e.detail.value[0]];
  selectedYear.value = selected;
};

// 确认选择的年份
const confirmYear = () => {
  console.log(pickerValue.value, 'pickerValue.value is')
  const year = yearList.value[pickerValue.value];
  
  emit('confirm', year);
  closePicker();
};
</script>

<style scoped>
/* 遮罩层 */
.year-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 999;
}

/* 选择器内容 */
.year-picker-content {
  width: 100%;
  background: #fff;
  border-radius: 16rpx 16rpx 0 0;
  padding-bottom: 20rpx;
}

/* 顶部操作栏 */
.picker-header {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  border-bottom: 1px solid #eee;
}

.picker-btn {
  border: none;
  background: transparent;
  font-size: 28rpx;
  padding: 0;
}

.cancel-btn {
  color: #999;
}

.confirm-btn {
  color: #007aff;
}

/* 年份选择器视图 */
.year-picker-view {
  width: 100%;
  height: 300rpx; /* H5端固定高度，保证滑动体验 */
}

/* 年份选项 */
.year-item {
  /* height: 100rpx; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 32rpx; */
  /* line-height: 100rpx; */
  text-align: center;
  color: #333333;
}

/* 年份展示框（可自定义样式） */
.year-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.arrow {
  width: 26rpx;
  height: 26rpx;
  transform: rotate(0);
  transition: transform .2s;
  
}
.arrow.active {
  transform: rotate(180deg);
}
</style>