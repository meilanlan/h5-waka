"use strict";
const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};
const processParams = (obj) => {
  let param = {};
  if (obj === null || obj === void 0 || obj === "")
    return param;
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== void 0 && obj[key] !== "") {
      param[key] = typeof obj[key] === "string" ? trim(obj[key]) : obj[key];
    }
  }
  return param;
};
const getUrlParam = (name) => {
  var reg = new RegExp("[?&]+" + name + "=([^?^#^&]+)");
  try {
    return decodeURIComponent(window.location.href.match(reg)[1]);
  } catch (e) {
    return null;
  }
};
exports.getUrlParam = getUrlParam;
exports.processParams = processParams;
//# sourceMappingURL=../../.sourcemap/mp-weixin/unit/common.js.map
