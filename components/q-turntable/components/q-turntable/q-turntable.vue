<template>
  <view class="turntable_wp sol-class">
    <image
      src="@/static/image/lucky/award.png"
      :style="'-webkit-transform:rotate(' + deg + 'deg) translateZ(0);transform:rotate(' + deg + 'deg) translateZ(0);transform-origin: center center;transition:transform 0.1s linear;'"
    ></image>
    <view class="turntable_pointer" @tap="start">
      <image src="@/static/image/pointer.png"></image>
      <view class="text text1">新人福利</view>
      <view class="text text2">免费1次</view>
    </view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			deg: 0,
			singleAngle: '',
			// 每片扇形的角度
			isStart: false,
      timeSpeed: 100,
		};
	},

	components: {},
	props: {
		// 划分区域
		areaNumber: {
			type: Number,
			default: 8
		},
		// 速度
		speed: {
			type: Number,
			default: 16
		}
	},

	beforeMount() {
		this.init();
	},

	methods: {
		init() {
			let { areaNumber } = this;
			const singleAngle = 360 / areaNumber;
			this.singleAngle = singleAngle;
		},

		// 点击开始抽奖
		start() {
			this.$emit('start');
		},
    
    beginTest(awardNumber){
      	let deg = this.deg;
      	let singleAngle = this.singleAngle;
      	let speed = this.speed;
      	let isStart = this.isStart;
      	if (isStart) return;
      	this.isStart = true;
        
        let startTime = Date.now();
        const slowDuration = 2000; // 2秒慢速阶段
        let currentSpeed = this.speed * 0.3; // 初始慢速
        
      	let endAddAngle = 0;
      	endAddAngle = 360 - ((awardNumber - 1) * singleAngle); // 中奖角度
      
      	const rangeAngle = (Math.floor(Math.random() * 5) + 4) * 360; // 随机旋转几圈再停止
      
      	let cAngle;
      	deg = 0;
      	this.timer = setInterval(() => {
          
        const elapsed = Date.now() - startTime;
        // 2秒内慢速阶段
        if (elapsed < slowDuration) {
            currentSpeed = this.speed * (0.3 + 0.7 * (elapsed / slowDuration));
        } else {
            currentSpeed = this.speed; // 2秒后全速
        }
        
        console.log(currentSpeed, 'currentSpeed is')
          
          if (deg < rangeAngle) {
              deg += currentSpeed;
          } else {
              const cAngle = (endAddAngle + rangeAngle - deg) / currentSpeed;
              deg += Math.max(Math.min(cAngle, currentSpeed), 1);
              
              if (deg >= endAddAngle + rangeAngle) {
                  this.deg = endAddAngle + rangeAngle;
                  this.isStart = false;
                  clearInterval(this.timer);
                  this.$emit('success');
              }
          }
          
      		this.deg = deg;
      	}, 1000 / 60);
    },

		begin(awardNumber) {
			let deg = this.deg;
			let singleAngle = this.singleAngle;
			let speed = this.speed;
			let isStart = this.isStart;
      
			if (isStart) return;
			this.isStart = true;
      
			let endAddAngle = 0;
			// endAddAngle = 360 - ((awardNumber - 1) * singleAngle + singleAngle / 2); // 中奖角度
			endAddAngle = 360 - ((awardNumber - 1) * singleAngle); // 中奖角度

			const rangeAngle = (Math.floor(Math.random() * 5) + 4) * 360; // 随机旋转几圈再停止

			let cAngle;
			deg = 0;
			this.timer = setInterval(() => {
				if (deg < rangeAngle) {
					deg += speed;
				} else {
					cAngle = (endAddAngle + rangeAngle - deg) / speed;
					cAngle = cAngle > speed ? speed : cAngle < 1 ? 1 : cAngle;
					deg += cAngle;
					if (deg >= endAddAngle + rangeAngle) {
						this.deg = endAddAngle + rangeAngle;
						this.isStart = false;
						clearInterval(this.timer);
						this.$emit('success');
					}
				}
				this.deg = deg;
			}, 1000 / 60);
		}
	}
};
</script>
<style lang="scss" scoped>

.turntable_wp {
  position: absolute;
  top: 474rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 510rpx;
  height: 510rpx;
  font-family: 'MiSans';
  image {
  	display: block;
  	width: 100%;
  	height: 100%;
  }
  .turntable_pointer {
  	position: absolute;
  	width: 234rpx;
  	height: 234rpx;
  	top: 138rpx;
  	left: 50%;
    transform: translateX(-50%);
    .text {
      position: absolute;
      left: 0;
      width: 100%;
      text-align: center;
      &.text1 {
        top: 82rpx;
        font-weight: 600;
        font-size: 28rpx;
        color: #FFFFFF;
        line-height: 38rpx;
        text-shadow: 0px 2rpx 4rpx #4B78E9;
      }
      &.text2 {
        top: 126rpx;
        font-weight: 600;
        font-size: 24rpx;
        color: rgba(255,255,255,0.6);
        line-height: 32rpx;
      }
    }
  }
}

</style>
