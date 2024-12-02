const trim = (str) => { // 去除字符串前后所有空
  return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
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

export {
  trim,
  processParams,
  getUrlParam,
  getIsAndroid,
  isInApp
}