const trim = (str) => { // 去除字符串前后所有空
  return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
// 千分位数字
const formatNumber = (num) => {
  if(!num) return 0
  return Number(num).toLocaleString('en-US')
};

const processParams = (obj) => { // 去除空的参数
  let param = {};
  if (obj === null || obj === undefined || obj === '') return param;
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      param[key] = typeof obj[key] === 'string' ? trim(obj[key]) : obj[key];
    }
  }
  return param;
};
const getUrlParam = (name) => { // 截取url参数
  var reg = new RegExp("[\?\&]+" + name + "=([^?^#^\&]+)");
  try { 
    return decodeURIComponent(window.location.href.match(reg)[1]);
  } catch (e) { 
    return null; 
  }
};

var u = navigator.userAgent;
const isInApp = () => {
  var flag = /micromessenger/i.test(u) === false && (typeof window.webkit !== 'undefined' || typeof window.WKWebViewJavascriptBridge !== 'undefined')
  return flag
}
// 判断系统环境
const getIsAndroid = ()=>{
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var isAndroid = u.indexOf('Android')>-1|| u.indexOf('Adr') > -1;
  var flag = false
  if (isAndroid) {
    flag = window.native?true:false
  } 
  // else if (isiOS) {
  //   flag = true
  // } else {
  //   flag = false
  // }
  // return flag
  return u+'---'+isAndroid+'---'+window.native
}

function formatDate(date){
  return [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0')
    ].join('-');
}

// 获取最近三个月的起始和结束日期（含当月）
function getRecentThreeMonthsRange() {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
  // 计算前两个月的起始日
  const twoMonthsAgoStart = new Date(currentMonthStart);
  twoMonthsAgoStart.setMonth(twoMonthsAgoStart.getMonth() - 2);
  
  // 计算当月最后一天
  const currentMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  return {
    start: formatDate(twoMonthsAgoStart),
    end: formatDate(currentMonthEnd),
    // 包含完整日期对象用于进一步计算
    // startObj: twoMonthsAgoStart,
    // endObj: currentMonthEnd
  };
}

function getRecentMonthRange() {
  //获取当月开始-结束
  const date = new Date()
  let start = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-01`
  let end =  new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  return {
    start:start,
    end:end
  }
}
function getRecentWeekRange(){
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6（0是周日）
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 计算与周一的差值
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: formatDate(monday),
    end: formatDate(sunday),
    // weekStartObj: monday,
    // weekEndObj: sunday
  };
}
function getRecentDayRange() {
  //获取当天开始结束
  const date = new Date();
  return formatDate(date)
}

function maskPhoneNumber(phoneNumber) {
  if(!phoneNumber){
    return false
  }
  return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

function jumpApp(param){
  // let  iosAppUrl= `whackapp://moment?id=${appInfo.moment_id}&type=${appInfo.type}`
  // let androidAppUrl = `whackapp://moment?id=${appInfo.moment_id}&type=${appInfo.type}`
  let downloadIos = 'https://apps.apple.com/cn/app/whack/id6752324554'
  let downloadAnd = 'https://www.whackgroup.com/#/'
  console.log('UPDATE!')
  
  // 配置参数（需替换为你的APP实际信息）
  const config = {
      // APP的URL Scheme（需与APP开发时配置一致，如：myapp://home）
      scheme: window.isiOS?param.iosAppUrl:param.androidAppUrl, // 可携带参数
      // 下载链接（分iOS/Android）
      downloadUrl: {
          ios: "https://apps.apple.com/cn/app/whack/id6752324554", // App Store链接
          android: "https://www.whackgroup.com/#/", // 应用宝/官网链接
          fallback: "https://www.whackgroup.com/#/" // 通用下载页（兜底）
      },
      timeout: 500 // 唤起检测延迟（毫秒，建议300-500）
  };
  
  // 核心逻辑：唤起APP或跳转下载
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isWeChat = /MicroMessenger/i.test(ua);

  // 记录唤起前的时间戳
  const startTime = Date.now();
  window.location.href = config.scheme;

  // 检测唤起是否成功：若500ms内页面未隐藏（进入后台），则跳转下载
  setTimeout(() => {
    // console.log('计时开始')
      const endTime = Date.now();
      // console.log(document.hidden, 'document.hidden')
      // console.log(endTime,'----',startTime, '----', endTime - startTime)
      // 若时间差小于1000ms（未唤起成功），且页面可见，则跳转下载
      // && endTime - startTime < 1000
      if (!document.hidden) {
        // console.log('打开下载页面')
          const downloadLink = window.isiOS 
              ? config.downloadUrl.ios 
              : !window.isiOS 
                  ? config.downloadUrl.android 
                  : config.downloadUrl.fallback;
          // console.log(downloadLink, 'downloadLink')
          window.location.href = downloadLink;
      }
  }, config.timeout);

}

export {
  trim,
  processParams,
  getUrlParam,
  getIsAndroid,
  isInApp,
  getRecentMonthRange,
  getRecentDayRange,
  getRecentWeekRange,
  getRecentThreeMonthsRange,
  formatNumber,
  maskPhoneNumber,
  jumpApp
}