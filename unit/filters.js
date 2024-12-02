// 数字转换
export function filterMoney(value) {
  if (value == null) {
    value = '-';
    return value;
  } else if (value == '-') {
    return value;
  }
  var param = '';
  var k = 10000;
  var sizes = ['', '万', '亿', '万亿'];
  var i;
  if (value < k) {
    param = value;
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    // param = (value / Math.pow(k, i)).toFixed(1) + sizes[i]
    var curNum = value / Math.pow(k, i);
    if ((curNum + '').indexOf('.') != -1) {
      var arr = (curNum + '').split('.');
      var newArr = arr[1].split('');
      if (newArr[0] != 0) {
        param = curNum.toFixed(1) + sizes[i];
      } else {
        param = curNum.toFixed() + sizes[i];
      }
    } else {
      param = curNum.toFixed() + sizes[i];
    }
  }
  return param;
};