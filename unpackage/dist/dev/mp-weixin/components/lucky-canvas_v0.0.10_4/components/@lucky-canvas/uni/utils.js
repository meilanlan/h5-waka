"use strict";
const common_vendor = require("../../../../../common/vendor.js");
let windowWidth = common_vendor.index.getSystemInfoSync().windowWidth;
if (windowWidth > 960)
  windowWidth = 375;
const rpx2px = (value) => {
  if (typeof value === "string")
    value = Number(value.replace(/[a-z]*/g, ""));
  return windowWidth / 750 * value;
};
const changeUnits = (value) => {
  return Number(value.replace(/^(\-*[0-9.]*)([a-z%]*)$/, (value2, num, unit) => {
    switch (unit) {
      case "px":
        num *= 1;
        break;
      case "rpx":
        num = rpx2px(num);
        break;
      default:
        num *= 1;
        break;
    }
    return num;
  }));
};
const resolveImage = async (img, canvas, srcName = "src", resolveName = "$resolve") => {
  let imgObj;
  if (window) {
    imgObj = new Image();
  } else {
    imgObj = canvas.createImage();
  }
  imgObj.onload = () => {
    img[resolveName](imgObj);
  };
  imgObj.onerror = (err) => {
    common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/utils.js:41", err);
  };
  imgObj.src = img[srcName];
};
function getImage(canvasId, canvas) {
  return new Promise((resolve, reject) => {
    common_vendor.index.canvasToTempFilePath({
      canvas,
      canvasId,
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    }, this);
  });
}
exports.changeUnits = changeUnits;
exports.getImage = getImage;
exports.resolveImage = resolveImage;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/components/lucky-canvas_v0.0.10_4/components/@lucky-canvas/uni/utils.js.map
