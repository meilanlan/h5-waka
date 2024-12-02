// import { isIOS, decideEnv } from '@/unit/common.js';
import Vue from 'vue';

const scrollToTargetPosition = { // 滚动相关
  data () {
    return {
      sTop: null
    };
  },
  mounted () {
    this.viewTop();
  },
  methods: {
    viewTop () {
      let that = this;
      uni.createSelectorQuery().select('.need_scroll_top_view').boundingClientRect(function (e) {
        that.sTop = e.top;
      }).exec();
    },
    backFixationTop () {
      uni.pageScrollTo({
        scrollTop: this.sTop,
        duration: 800
      });
    }
  }
};

const iosShare = { // IOS分享相关
  data () {
    return {
      //
    };
  },
  onShow () {
    // let that = this;
    // if (isIOS() && decideEnv() && decideEnv() === 'wx') {
    //   that.$jswx.ready(function () {
    //     that.$jswx.updateAppMessageShareData({
    //       title: document.title,
    //       desc: 'ceshi',
    //       link: window.location.href.split('#')[0],
    //       imgUrl: 'http://sellerweb.tofire.cn/image/logo_small.png',
    //       success: () => {
    //         // uni.showModal({
    //         //   title: '分享成功'
    //         // });
    //       },
    //       fail: () => {
    //         // uni.showModal({
    //         //   title: '分享失败'
    //         // });
    //       }
    //     });
    //   });
    // }
  }
};

const setSafeAreaSize = { // 设置安全区域下得相关尺寸
  onLoad () {
    uni.getSystemInfo({
      success: (e) => {
        // alert(JSON.stringify(e));
        Vue.prototype.safeHeight = e.safeArea.height;
        Vue.prototype.safeWidth = e.safeArea.width;
        Vue.prototype.systemPixelRatio = e.pixelRatio;
      }
    });
  }
};

export {
  scrollToTargetPosition,
  iosShare,
  setSafeAreaSize,
}