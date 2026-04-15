"use strict";
const common_vendor = require("../../../../../common/vendor.js");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t = function(e2, i2) {
  return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t2, e3) {
    t2.__proto__ = e3;
  } || function(t2, e3) {
    for (var i3 in e3)
      Object.prototype.hasOwnProperty.call(e3, i3) && (t2[i3] = e3[i3]);
  }, t(e2, i2);
};
function e(e2, i2) {
  if ("function" != typeof i2 && null !== i2)
    throw new TypeError("Class extends value " + String(i2) + " is not a constructor or null");
  function n2() {
    this.constructor = e2;
  }
  t(e2, i2), e2.prototype = null === i2 ? Object.create(i2) : (n2.prototype = i2.prototype, new n2());
}
var i = function() {
  return i = Object.assign || function(t2) {
    for (var e2, i2 = 1, n2 = arguments.length; i2 < n2; i2++)
      for (var r2 in e2 = arguments[i2])
        Object.prototype.hasOwnProperty.call(e2, r2) && (t2[r2] = e2[r2]);
    return t2;
  }, i.apply(this, arguments);
};
function n(t2, e2, i2, n2) {
  return new (i2 || (i2 = Promise))(function(r2, o2) {
    function a2(t3) {
      try {
        h2(n2.next(t3));
      } catch (t4) {
        o2(t4);
      }
    }
    function s2(t3) {
      try {
        h2(n2.throw(t3));
      } catch (t4) {
        o2(t4);
      }
    }
    function h2(t3) {
      var e3;
      t3.done ? r2(t3.value) : (e3 = t3.value, e3 instanceof i2 ? e3 : new i2(function(t4) {
        t4(e3);
      })).then(a2, s2);
    }
    h2((n2 = n2.apply(t2, e2 || [])).next());
  });
}
function r(t2, e2) {
  var i2, n2, r2, o2, a2 = { label: 0, sent: function() {
    if (1 & r2[0])
      throw r2[1];
    return r2[1];
  }, trys: [], ops: [] };
  return o2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
    return this;
  }), o2;
  function s2(o3) {
    return function(s3) {
      return function(o4) {
        if (i2)
          throw new TypeError("Generator is already executing.");
        for (; a2; )
          try {
            if (i2 = 1, n2 && (r2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((r2 = n2.return) && r2.call(n2), 0) : n2.next) && !(r2 = r2.call(n2, o4[1])).done)
              return r2;
            switch (n2 = 0, r2 && (o4 = [2 & o4[0], r2.value]), o4[0]) {
              case 0:
              case 1:
                r2 = o4;
                break;
              case 4:
                return a2.label++, { value: o4[1], done: false };
              case 5:
                a2.label++, n2 = o4[1], o4 = [0];
                continue;
              case 7:
                o4 = a2.ops.pop(), a2.trys.pop();
                continue;
              default:
                if (!(r2 = a2.trys, (r2 = r2.length > 0 && r2[r2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                  a2 = 0;
                  continue;
                }
                if (3 === o4[0] && (!r2 || o4[1] > r2[0] && o4[1] < r2[3])) {
                  a2.label = o4[1];
                  break;
                }
                if (6 === o4[0] && a2.label < r2[1]) {
                  a2.label = r2[1], r2 = o4;
                  break;
                }
                if (r2 && a2.label < r2[2]) {
                  a2.label = r2[2], a2.ops.push(o4);
                  break;
                }
                r2[2] && a2.ops.pop(), a2.trys.pop();
                continue;
            }
            o4 = e2.call(t2, a2);
          } catch (t3) {
            o4 = [6, t3], n2 = 0;
          } finally {
            i2 = r2 = 0;
          }
        if (5 & o4[0])
          throw o4[1];
        return { value: o4[0] ? o4[1] : void 0, done: true };
      }([o3, s3]);
    };
  }
}
function o(t2, e2) {
  for (var i2 = 0, n2 = e2.length, r2 = t2.length; i2 < n2; i2++, r2++)
    t2[r2] = e2[i2];
  return t2;
}
Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", { value: function(t2, e2) {
  if (null == this)
    throw new TypeError('"this" is null or not defined');
  var i2 = Object(this), n2 = i2.length >>> 0;
  if (0 === n2)
    return false;
  var r2, o2, a2 = 0 | e2, s2 = Math.max(a2 >= 0 ? a2 : n2 - Math.abs(a2), 0);
  for (; s2 < n2; ) {
    if ((r2 = i2[s2]) === (o2 = t2) || "number" == typeof r2 && "number" == typeof o2 && isNaN(r2) && isNaN(o2))
      return true;
    s2++;
  }
  return false;
} }), String.prototype.includes || (String.prototype.includes = function(t2, e2) {
  return "number" != typeof e2 && (e2 = 0), !(e2 + t2.length > this.length) && -1 !== this.indexOf(t2, e2);
}), Array.prototype.find || Object.defineProperty(Array.prototype, "find", { value: function(t2) {
  if (null == this)
    throw new TypeError('"this" is null or not defined');
  var e2 = Object(this), i2 = e2.length >>> 0;
  if ("function" != typeof t2)
    throw new TypeError("predicate must be a function");
  for (var n2 = arguments[1], r2 = 0; r2 < i2; ) {
    var o2 = e2[r2];
    if (t2.call(n2, o2, r2, e2))
      return o2;
    r2++;
  }
} });
var a = function(t2) {
  for (var e2 = [], i2 = 1; i2 < arguments.length; i2++)
    e2[i2 - 1] = arguments[i2];
  return e2.some(function(e3) {
    return Object.prototype.toString.call(t2).slice(8, -1).toLowerCase() === e3;
  });
}, s = function(t2, e2) {
  return Object.prototype.hasOwnProperty.call(t2, e2);
}, h = function(t2) {
  return [].filter.call(t2, function(t3) {
    return "\n" !== t3;
  }).join("");
}, c = function(t2) {
  if ("string" != typeof t2)
    return false;
  if ("transparent" === (t2 = t2.toLocaleLowerCase().trim()))
    return false;
  if (/^rgba/.test(t2)) {
    var e2 = /([^\s,]+)\)$/.exec(t2);
    if (0 === (null === (i2 = e2) ? 0 : "object" == typeof i2 ? NaN : "number" == typeof i2 ? i2 : "string" == typeof i2 ? "%" === i2[i2.length - 1] ? Number(i2.slice(0, -1)) / 100 : Number(i2) : NaN))
      return false;
  }
  var i2;
  return true;
}, l = function(t2, e2) {
  var i2, n2 = (null === (i2 = t2.padding) || void 0 === i2 ? void 0 : i2.split(" ").map(function(t3) {
    return e2(t3);
  })) || [0], r2 = 0, o2 = 0, h2 = 0, c2 = 0;
  switch (n2.length) {
    case 1:
      r2 = o2 = h2 = c2 = n2[0];
      break;
    case 2:
      r2 = o2 = n2[0], h2 = c2 = n2[1];
      break;
    case 3:
      r2 = n2[0], h2 = c2 = n2[1], o2 = n2[2];
      break;
    default:
      r2 = n2[0], o2 = n2[1], h2 = n2[2], c2 = n2[3];
  }
  var l2 = { paddingTop: r2, paddingBottom: o2, paddingLeft: h2, paddingRight: c2 };
  for (var u2 in l2)
    l2[u2] = s(t2, u2) && a(t2[u2], "string", "number") ? e2(t2[u2]) : l2[u2];
  return [r2, o2, h2, c2];
}, u = function(t2) {
  var e2 = [], i2 = t2.map(function(t3) {
    return Number(t3);
  }).reduce(function(t3, i3) {
    if (i3 > 0) {
      var n3 = t3 + i3;
      return e2.push(n3), n3;
    }
    return e2.push(NaN), t3;
  }, 0), n2 = Math.random() * i2;
  return e2.findIndex(function(t3) {
    return n2 <= t3;
  });
}, f = function(t2, e2, i2, n2) {
  void 0 === n2 && (n2 = 1 / 0), n2 <= 0 && (n2 = 1 / 0);
  for (var r2 = "", o2 = [], a2 = t2.measureText("...").width, s2 = 0; s2 < e2.length; s2++) {
    r2 += e2[s2];
    var h2 = t2.measureText(r2).width, c2 = i2(o2);
    if (n2 === o2.length + 1 && (h2 += a2), c2 < 0)
      return o2;
    if (h2 > c2 && (o2.push(r2.slice(0, -1)), r2 = e2[s2]), n2 === o2.length)
      return o2[o2.length - 1] += "...", o2;
  }
  return r2 && o2.push(r2), o2.length || o2.push(e2), o2;
}, d = function() {
  function t2() {
    this.subs = [];
  }
  return t2.prototype.addSub = function(t3) {
    this.subs.includes(t3) || this.subs.push(t3);
  }, t2.prototype.notify = function() {
    this.subs.forEach(function(t3) {
      t3.update();
    });
  }, t2;
}(), p = "__proto__" in {};
function g(t2, e2, i2, n2) {
  Object.defineProperty(t2, e2, { value: i2, enumerable: !!n2, writable: true, configurable: true });
}
var v = Array.prototype, m = Object.create(v);
["push", "pop", "shift", "unshift", "sort", "splice", "reverse"].forEach(function(t2) {
  m[t2] = function() {
    for (var e2 = [], i2 = 0; i2 < arguments.length; i2++)
      e2[i2] = arguments[i2];
    var n2 = v[t2].apply(this, e2), r2 = this.__luckyOb__;
    return ["push", "unshift", "splice"].includes(t2) && r2.walk(this), r2.dep.notify(), n2;
  };
});
var w = function() {
  function t2(t3) {
    this.dep = new d(), g(t3, "__luckyOb__", this), Array.isArray(t3) && (p ? t3.__proto__ = m : Object.getOwnPropertyNames(m).forEach(function(e2) {
      g(t3, e2, m[e2]);
    })), this.walk(t3);
  }
  return t2.prototype.walk = function(t3) {
    Object.keys(t3).forEach(function(e2) {
      b(t3, e2, t3[e2]);
    });
  }, t2;
}();
function y(t2) {
  if (t2 && "object" == typeof t2)
    return "__luckyOb__" in t2 ? t2.__luckyOb__ : new w(t2);
}
function b(t2, e2, i2) {
  var n2 = new d(), r2 = Object.getOwnPropertyDescriptor(t2, e2);
  if (!r2 || false !== r2.configurable) {
    var o2 = r2 && r2.get, a2 = r2 && r2.set;
    o2 && !a2 || 2 !== arguments.length || (i2 = t2[e2]);
    var s2 = y(i2);
    Object.defineProperty(t2, e2, { get: function() {
      var e3 = o2 ? o2.call(t2) : i2;
      return d.target && (n2.addSub(d.target), s2 && s2.dep.addSub(d.target)), e3;
    }, set: function(e3) {
      e3 !== i2 && (i2 = e3, o2 && !a2 || (a2 ? a2.call(t2, e3) : i2 = e3, s2 = y(e3), n2.notify()));
    } });
  }
}
var S = 0, C = function() {
  function t2(t3, e2, i2, n2) {
    void 0 === n2 && (n2 = {}), this.id = S++, this.$lucky = t3, this.expr = e2, this.deep = !!n2.deep, this.getter = "function" == typeof e2 ? e2 : function(t4) {
      t4 += ".";
      for (var e3 = [], i3 = "", n3 = 0; n3 < t4.length; n3++) {
        var r2 = t4[n3];
        if (/\[|\./.test(r2))
          e3.push(i3), i3 = "";
        else {
          if (/\W/.test(r2))
            continue;
          i3 += r2;
        }
      }
      return function(t5) {
        return e3.reduce(function(t6, e4) {
          return t6[e4];
        }, t5);
      };
    }(e2), this.cb = i2, this.value = this.get();
  }
  return t2.prototype.get = function() {
    d.target = this;
    var t3 = this.getter.call(this.$lucky, this.$lucky);
    return this.deep && function(t4) {
      var e2 = function(t5) {
        a(t5, "array", "object") && Object.keys(t5).forEach(function(i2) {
          var n2 = t5[i2];
          e2(n2);
        });
      };
      e2(t4);
    }(t3), d.target = null, t3;
  }, t2.prototype.update = function() {
    var t3 = this.get(), e2 = this.value;
    this.value = t3, this.cb.call(this.$lucky, t3, e2);
  }, t2;
}(), z = function() {
  function t2(t3, e2) {
    var i2 = this;
    this.version = "1.7.26", this.htmlFontSize = 16, this.rAF = function() {
    }, this.boxWidth = 0, this.boxHeight = 0, "string" == typeof t3 ? t3 = { el: t3 } : 1 === t3.nodeType && (t3 = { el: "", divElement: t3 }), t3 = t3, this.config = t3, this.data = e2, t3.flag || (t3.flag = "WEB"), t3.el && (t3.divElement = document.querySelector(t3.el)), t3.divElement && (t3.canvasElement = document.createElement("canvas"), t3.divElement.appendChild(t3.canvasElement)), t3.canvasElement && (t3.ctx = t3.canvasElement.getContext("2d"), t3.canvasElement.setAttribute("package", "lucky-canvas@1.7.26"), t3.canvasElement.addEventListener("click", function(t4) {
      return i2.handleClick(t4);
    })), this.ctx = t3.ctx, this.initWindowFunction(), this.config.ctx || common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", "无法获取到 CanvasContext2D"), window && "function" == typeof window.addEventListener && window.addEventListener("resize", function(t4, e3) {
      void 0 === e3 && (e3 = 300);
      var i3 = null;
      return function() {
        for (var n2 = this, r2 = [], o2 = 0; o2 < arguments.length; o2++)
          r2[o2] = arguments[o2];
        i3 || (i3 = setTimeout(function() {
          t4.apply(n2, r2), clearTimeout(i3), i3 = null;
        }, e3));
      };
    }(function() {
      return i2.resize();
    }, 300)), window && "function" == typeof window.MutationObserver && new window.MutationObserver(function() {
      i2.resize();
    }).observe(document.documentElement, { attributes: true });
  }
  return t2.prototype.resize = function() {
    var t3, e2;
    null === (e2 = (t3 = this.config).beforeResize) || void 0 === e2 || e2.call(t3), this.setHTMLFontSize(), this.setDpr(), this.resetWidthAndHeight(), this.zoomCanvas();
  }, t2.prototype.initLucky = function() {
    if (this.resize(), !this.boxWidth || !this.boxHeight)
      return common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", "无法获取到宽度或高度");
  }, t2.prototype.handleClick = function(t3) {
  }, t2.prototype.setHTMLFontSize = function() {
    window && (this.htmlFontSize = +window.getComputedStyle(document.documentElement).fontSize.slice(0, -2));
  }, t2.prototype.clearCanvas = function() {
    var t3 = [this.boxWidth, this.boxHeight], e2 = t3[0], i2 = t3[1];
    this.ctx.clearRect(-e2, -i2, 2 * e2, 2 * i2);
  }, t2.prototype.setDpr = function() {
    var t3 = this.config;
    t3.dpr || (window ? window.dpr = t3.dpr = window.devicePixelRatio || 1 : t3.dpr || common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", t3, "未传入 dpr 可能会导致绘制异常"));
  }, t2.prototype.resetWidthAndHeight = function() {
    var t3 = this.config, e2 = this.data, i2 = 0, n2 = 0;
    t3.divElement && (i2 = t3.divElement.offsetWidth, n2 = t3.divElement.offsetHeight), this.boxWidth = this.getLength(e2.width || t3.width) || i2, this.boxHeight = this.getLength(e2.height || t3.height) || n2, t3.divElement && (t3.divElement.style.overflow = "hidden", t3.divElement.style.width = this.boxWidth + "px", t3.divElement.style.height = this.boxHeight + "px");
  }, t2.prototype.zoomCanvas = function() {
    var t3 = this.config, e2 = this.ctx, i2 = t3.canvasElement, n2 = t3.dpr, r2 = [this.boxWidth * n2, this.boxHeight * n2], o2 = r2[0], a2 = r2[1];
    i2 && (i2.width = o2, i2.height = a2, i2.style.width = o2 + "px", i2.style.height = a2 + "px", i2.style["transform-origin"] = "left top", i2.style.transform = "scale(" + 1 / n2 + ")", e2.scale(n2, n2));
  }, t2.prototype.initWindowFunction = function() {
    var t3 = this.config;
    if (window)
      return this.rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t4) {
        window.setTimeout(t4, 1e3 / 60);
      }, t3.setTimeout = window.setTimeout, t3.setInterval = window.setInterval, t3.clearTimeout = window.clearTimeout, void (t3.clearInterval = window.clearInterval);
    if (t3.rAF)
      this.rAF = t3.rAF;
    else if (t3.setTimeout) {
      var e2 = t3.setTimeout;
      this.rAF = function(t4) {
        return e2(t4, 16.7);
      };
    } else
      this.rAF = function(t4) {
        return setTimeout(t4, 16.7);
      };
  }, t2.prototype.isWeb = function() {
    return ["WEB", "UNI-H5", "TARO-H5"].includes(this.config.flag);
  }, t2.prototype.loadImg = function(t3, e2, i2) {
    var n2 = this;
    return void 0 === i2 && (i2 = "$resolve"), new Promise(function(r2, o2) {
      if (t3 || o2("=> '" + e2.src + "' 不能为空或不合法"), "WEB" !== n2.config.flag)
        return e2[i2] = r2, void (e2.$reject = o2);
      var a2 = new Image();
      a2.crossorigin = "anonymous", a2.onload = function() {
        return r2(a2);
      }, a2.onerror = function() {
        return o2("=> '" + e2.src + "' 图片加载失败");
      }, a2.src = t3;
    });
  }, t2.prototype.drawImage = function(t3, e2) {
    for (var i2, n2, r2, a2 = [], s2 = 2; s2 < arguments.length; s2++)
      a2[s2 - 2] = arguments[s2];
    var h2 = this.config, c2 = h2.flag, l2 = h2.dpr;
    if (["WEB", "MP-WX"].includes(c2))
      r2 = e2;
    else {
      if (!["UNI-H5", "UNI-MP", "TARO-H5", "TARO-MP"].includes(c2))
        return common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", "意料之外的 flag, 该平台尚未兼容!");
      r2 = e2.path;
    }
    var u2 = null === (n2 = (i2 = r2.canvas || r2).getContext) || void 0 === n2 ? void 0 : n2.call(i2, "2d");
    if (u2 && !this.isWeb()) {
      a2 = a2.map(function(t4) {
        return t4 * l2;
      });
      var f2 = u2.getImageData.apply(u2, a2.slice(0, 4));
      t3.putImageData.apply(t3, o([f2], a2.slice(4, 6)));
    } else {
      8 === a2.length && (a2 = a2.map(function(t4, e3) {
        return e3 < 4 ? t4 * l2 : t4;
      }));
      try {
        t3.drawImage.apply(t3, o([r2], a2));
      } catch (t4) {
      }
    }
  }, t2.prototype.computedWidthAndHeight = function(t3, e2, i2, n2) {
    if (!e2.width && !e2.height)
      return [t3.width, t3.height];
    if (e2.width && !e2.height) {
      var r2 = this.getLength(e2.width, i2);
      return [r2, t3.height * (r2 / t3.width)];
    }
    if (!e2.width && e2.height) {
      var o2 = this.getLength(e2.height, n2);
      return [t3.width * (o2 / t3.height), o2];
    }
    return [this.getLength(e2.width, i2), this.getLength(e2.height, n2)];
  }, t2.prototype.changeUnits = function(t3, e2) {
    var i2 = this;
    void 0 === e2 && (e2 = 1);
    var n2 = this.config;
    return Number(t3.replace(/^([-]*[0-9.]*)([a-z%]*)$/, function(t4, r2, o2) {
      var a2 = { "%": function(t5) {
        return t5 * (e2 / 100);
      }, px: function(t5) {
        return 1 * t5;
      }, rem: function(t5) {
        return t5 * i2.htmlFontSize;
      }, vw: function(t5) {
        return t5 / 100 * window.innerWidth;
      } }[o2];
      if (a2)
        return a2(r2);
      var s2 = n2.handleCssUnit || n2.unitFunc;
      return s2 ? s2(r2, o2) : r2;
    }));
  }, t2.prototype.getLength = function(t3, e2) {
    return a(t3, "number") ? t3 : a(t3, "string") ? this.changeUnits(t3, e2) : 0;
  }, t2.prototype.getOffsetX = function(t3, e2) {
    return void 0 === e2 && (e2 = 0), (e2 - t3) / 2;
  }, t2.prototype.getOffscreenCanvas = function(t3, e2) {
    if (!s(this, "_offscreenCanvas") && (window && window.document && "WEB" === this.config.flag ? this._offscreenCanvas = document.createElement("canvas") : this._offscreenCanvas = this.config.offscreenCanvas, !this._offscreenCanvas))
      return common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", "离屏 Canvas 无法渲染!");
    var i2 = this.config.dpr, n2 = this._offscreenCanvas;
    n2.width = (t3 || 300) * i2, n2.height = (e2 || 150) * i2;
    var r2 = n2.getContext("2d");
    return r2.clearRect(0, 0, t3, e2), r2.scale(i2, i2), r2.dpr = i2, { _offscreenCanvas: n2, _ctx: r2 };
  }, t2.prototype.$set = function(t3, e2, i2) {
    t3 && "object" == typeof t3 && b(t3, e2, i2);
  }, t2.prototype.$computed = function(t3, e2, i2) {
    var n2 = this;
    Object.defineProperty(t3, e2, { get: function() {
      return i2.call(n2);
    } });
  }, t2.prototype.$watch = function(t3, e2, i2) {
    void 0 === i2 && (i2 = {}), "object" == typeof e2 && (e2 = (i2 = e2).handler);
    var n2 = new C(this, t3, e2, i2);
    return i2.immediate && e2.call(this, n2.value), function() {
    };
  }, t2.version = "1.7.26", t2;
}(), x = function(t2) {
  return Math.PI / 180 * t2;
}, k = function(t2, e2, i2, n2, r2, o2) {
  t2.beginPath();
  var a2, s2, h2 = x(90 / Math.PI / i2 * o2), c2 = n2 + h2, l2 = r2 - h2;
  t2.arc(0, 0, i2, c2, l2, false), t2.lineTo.apply(t2, (a2 = (n2 + r2) / 2, s2 = o2 / 2 / Math.abs(Math.sin((n2 - r2) / 2)), [+(Math.cos(a2) * s2).toFixed(8), +(Math.sin(a2) * s2).toFixed(8)])), t2.closePath();
}, I = function(t2) {
  for (var e2 = [], i2 = 1; i2 < arguments.length; i2++)
    e2[i2 - 1] = arguments[i2];
  var n2 = e2[0], r2 = e2[1], o2 = e2[2], a2 = e2[3], s2 = e2[4], h2 = Math.min(o2, a2), c2 = Math.PI;
  s2 > h2 / 2 && (s2 = h2 / 2), t2.beginPath(), t2.moveTo(n2 + s2, r2), t2.lineTo(n2 + s2, r2), t2.lineTo(n2 + o2 - s2, r2), t2.arc(n2 + o2 - s2, r2 + s2, s2, -c2 / 2, 0), t2.lineTo(n2 + o2, r2 + a2 - s2), t2.arc(n2 + o2 - s2, r2 + a2 - s2, s2, 0, c2 / 2), t2.lineTo(n2 + s2, r2 + a2), t2.arc(n2 + s2, r2 + a2 - s2, s2, c2 / 2, c2), t2.lineTo(n2, r2 + s2), t2.arc(n2 + s2, r2 + s2, s2, c2, -c2 / 2), t2.closePath();
}, A = function(t2, e2, i2, n2) {
  return t2 >= n2 && (t2 = n2), i2 * (t2 /= n2) * t2 + e2;
}, L = function(t2, e2, i2, n2) {
  return t2 >= n2 && (t2 = n2), -i2 * (t2 /= n2) * (t2 - 2) + e2;
}, T = function(t2) {
  function o2(e2, i2) {
    var n2, r2 = t2.call(this, e2, { width: i2.width, height: i2.height }) || this;
    return r2.blocks = [], r2.prizes = [], r2.buttons = [], r2.defaultConfig = {}, r2.defaultStyle = {}, r2._defaultConfig = {}, r2._defaultStyle = {}, r2.Radius = 0, r2.prizeRadius = 0, r2.prizeDeg = 0, r2.prizeAng = 0, r2.rotateDeg = 0, r2.maxBtnRadius = 0, r2.startTime = 0, r2.endTime = 0, r2.stopDeg = 0, r2.endDeg = 0, r2.FPS = 16.6, r2.step = 0, r2.ImageCache = /* @__PURE__ */ new Map(), r2.initData(i2), r2.initWatch(), r2.initComputed(), null === (n2 = e2.beforeCreate) || void 0 === n2 || n2.call(r2), r2.init(), r2;
  }
  return e(o2, t2), o2.prototype.resize = function() {
    var e2, i2;
    t2.prototype.resize.call(this), this.Radius = Math.min(this.boxWidth, this.boxHeight) / 2, this.ctx.translate(this.Radius, this.Radius), this.draw(), null === (i2 = (e2 = this.config).afterResize) || void 0 === i2 || i2.call(e2);
  }, o2.prototype.initLucky = function() {
    this.Radius = 0, this.prizeRadius = 0, this.prizeDeg = 0, this.prizeAng = 0, this.rotateDeg = 0, this.maxBtnRadius = 0, this.startTime = 0, this.endTime = 0, this.stopDeg = 0, this.endDeg = 0, this.FPS = 16.6, this.prizeFlag = -1, this.step = 0, t2.prototype.initLucky.call(this);
  }, o2.prototype.initData = function(t3) {
    this.$set(this, "width", t3.width), this.$set(this, "height", t3.height), this.$set(this, "blocks", t3.blocks || []), this.$set(this, "prizes", t3.prizes || []), this.$set(this, "buttons", t3.buttons || []), this.$set(this, "defaultConfig", t3.defaultConfig || {}), this.$set(this, "defaultStyle", t3.defaultStyle || {}), this.$set(this, "startCallback", t3.start), this.$set(this, "endCallback", t3.end);
  }, o2.prototype.initComputed = function() {
    var t3 = this;
    this.$computed(this, "_defaultConfig", function() {
      return i({ gutter: "0px", offsetDegree: 0, speed: 20, speedFunction: "quad", accelerationTime: 2500, decelerationTime: 2500, stopRange: 0 }, t3.defaultConfig);
    }), this.$computed(this, "_defaultStyle", function() {
      return i({ fontSize: "18px", fontColor: "#000", fontStyle: "sans-serif", fontWeight: "400", background: "rgba(0,0,0,0)", wordWrap: true, lengthLimit: "90%" }, t3.defaultStyle);
    });
  }, o2.prototype.initWatch = function() {
    var t3 = this;
    this.$watch("width", function(e2) {
      t3.data.width = e2, t3.resize();
    }), this.$watch("height", function(e2) {
      t3.data.height = e2, t3.resize();
    }), this.$watch("blocks", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("prizes", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("buttons", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("defaultConfig", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("defaultStyle", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("startCallback", function() {
      return t3.init();
    }), this.$watch("endCallback", function() {
      return t3.init();
    });
  }, o2.prototype.init = function() {
    var t3, e2;
    return n(this, void 0, void 0, function() {
      var i2;
      return r(this, function(n2) {
        switch (n2.label) {
          case 0:
            return this.initLucky(), i2 = this.config, null === (t3 = i2.beforeInit) || void 0 === t3 || t3.call(this), this.draw(), this.draw(), [4, this.initImageCache()];
          case 1:
            return n2.sent(), null === (e2 = i2.afterInit) || void 0 === e2 || e2.call(this), [2];
        }
      });
    });
  }, o2.prototype.initImageCache = function() {
    var t3 = this;
    return new Promise(function(e2) {
      var i2 = { blocks: t3.blocks.map(function(t4) {
        return t4.imgs;
      }), prizes: t3.prizes.map(function(t4) {
        return t4.imgs;
      }), buttons: t3.buttons.map(function(t4) {
        return t4.imgs;
      }) };
      Object.keys(i2).forEach(function(n2) {
        var r2 = i2[n2], o3 = [];
        r2 && r2.forEach(function(e3, i3) {
          e3 && e3.forEach(function(e4, r3) {
            o3.push(t3.loadAndCacheImg(n2, i3, r3));
          });
        }), Promise.all(o3).then(function() {
          t3.draw(), e2();
        });
      });
    });
  }, o2.prototype.handleClick = function(t3) {
    var e2, i2 = this.ctx;
    i2.beginPath(), i2.arc(0, 0, this.maxBtnRadius, 0, 2 * Math.PI, false), i2.isPointInPath(t3.offsetX, t3.offsetY) && 0 === this.step && (null === (e2 = this.startCallback) || void 0 === e2 || e2.call(this, t3));
  }, o2.prototype.loadAndCacheImg = function(t3, e2, i2) {
    return n(this, void 0, void 0, function() {
      var o3 = this;
      return r(this, function(a2) {
        return [2, new Promise(function(a3, s2) {
          var h2 = o3[t3][e2];
          if (h2 && h2.imgs) {
            var c2 = h2.imgs[i2];
            c2 && o3.loadImg(c2.src, c2).then(function(t4) {
              return n(o3, void 0, void 0, function() {
                return r(this, function(e3) {
                  switch (e3.label) {
                    case 0:
                      return "function" != typeof c2.formatter ? [3, 2] : [4, Promise.resolve(c2.formatter.call(this, t4))];
                    case 1:
                      t4 = e3.sent(), e3.label = 2;
                    case 2:
                      return this.ImageCache.set(c2.src, t4), a3(), [2];
                  }
                });
              });
            }).catch(function(n2) {
              common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", t3 + "[" + e2 + "].imgs[" + i2 + "] " + n2), s2();
            });
          }
        })];
      });
    });
  }, o2.prototype.drawBlock = function(t3, e2, i2) {
    var n2 = this, r2 = this.ctx;
    c(e2.background) && (r2.beginPath(), r2.fillStyle = e2.background, r2.arc(0, 0, t3, 0, 2 * Math.PI, false), r2.fill()), e2.imgs && e2.imgs.forEach(function(e3, i3) {
      var o3 = n2.ImageCache.get(e3.src);
      if (o3) {
        var a2 = n2.computedWidthAndHeight(o3, e3, 2 * t3, 2 * t3), s2 = a2[0], h2 = a2[1], c2 = [n2.getOffsetX(s2) + n2.getLength(e3.left, 2 * t3), n2.getLength(e3.top, 2 * t3) - t3], l2 = c2[0], u2 = c2[1];
        r2.save(), e3.rotate && r2.rotate(x(n2.rotateDeg)), n2.drawImage(r2, o3, l2, u2, s2, h2), r2.restore();
      }
    });
  }, o2.prototype.draw = function() {
    var t3, e2, i2 = this, n2 = this, r2 = n2.config, o3 = n2.ctx, a2 = n2._defaultConfig, l2 = n2._defaultStyle;
    null === (t3 = r2.beforeDraw) || void 0 === t3 || t3.call(this, o3), o3.clearRect(-this.Radius, -this.Radius, 2 * this.Radius, 2 * this.Radius), this.prizeRadius = this.blocks.reduce(function(t4, e3, n3) {
      return i2.drawBlock(t4, e3, n3), t4 - i2.getLength(e3.padding && e3.padding.split(" ")[0]);
    }, this.Radius), this.prizeDeg = 360 / this.prizes.length, this.prizeAng = x(this.prizeDeg);
    var u2 = this.prizeRadius * Math.sin(this.prizeAng / 2) * 2, d2 = x(this.rotateDeg - 90 + this.prizeDeg / 2 + a2.offsetDegree), p2 = function(t4, e3) {
      return i2.getOffsetX(o3.measureText(e3).width) + i2.getLength(t4.left, u2);
    }, g2 = function(t4, e3, n3) {
      var r3 = t4.lineHeight || l2.lineHeight || t4.fontSize || l2.fontSize;
      return i2.getLength(t4.top, e3) + (n3 + 1) * i2.getLength(r3);
    };
    o3.save(), this.prizes.forEach(function(t4, e3) {
      var n3 = d2 + e3 * i2.prizeAng, r3 = i2.prizeRadius - i2.maxBtnRadius, v2 = t4.background || l2.background;
      c(v2) && (o3.fillStyle = v2, k(o3, i2.maxBtnRadius, i2.prizeRadius, n3 - i2.prizeAng / 2, n3 + i2.prizeAng / 2, i2.getLength(a2.gutter)), o3.fill());
      var m2 = Math.cos(n3) * i2.prizeRadius, w2 = Math.sin(n3) * i2.prizeRadius;
      o3.translate(m2, w2), o3.rotate(n3 + x(90)), t4.imgs && t4.imgs.forEach(function(t5, e4) {
        var n4 = i2.ImageCache.get(t5.src);
        if (n4) {
          var a3 = i2.computedWidthAndHeight(n4, t5, i2.prizeAng * i2.prizeRadius, r3), s2 = a3[0], h2 = a3[1], c2 = [i2.getOffsetX(s2) + i2.getLength(t5.left, u2), i2.getLength(t5.top, r3)], l3 = c2[0], f2 = c2[1];
          i2.drawImage(o3, n4, l3, f2, s2, h2);
        }
      }), t4.fonts && t4.fonts.forEach(function(t5) {
        var e4 = t5.fontColor || l2.fontColor, n4 = t5.fontWeight || l2.fontWeight, c2 = i2.getLength(t5.fontSize || l2.fontSize), u3 = t5.fontStyle || l2.fontStyle, d3 = s(t5, "wordWrap") ? t5.wordWrap : l2.wordWrap, v3 = t5.lengthLimit || l2.lengthLimit, m3 = t5.lineClamp || l2.lineClamp;
        o3.fillStyle = e4, o3.font = n4 + " " + (c2 >> 0) + "px " + u3;
        var w3 = String(t5.text);
        (d3 ? f(o3, h(w3), function(e5) {
          var n5 = 2 * ((i2.prizeRadius - g2(t5, r3, e5.length)) * Math.tan(i2.prizeAng / 2)) - i2.getLength(a2.gutter);
          return i2.getLength(v3, n5);
        }, m3) : w3.split("\n")).filter(function(t6) {
          return !!t6;
        }).forEach(function(e5, i3) {
          o3.fillText(e5, p2(t5, e5), g2(t5, r3, i3));
        });
      }), o3.rotate(x(360) - n3 - x(90)), o3.translate(-m2, -w2);
    }), o3.restore(), this.buttons.forEach(function(t4, e3) {
      var n3 = i2.getLength(t4.radius, i2.prizeRadius);
      i2.maxBtnRadius = Math.max(i2.maxBtnRadius, n3), c(t4.background) && (o3.beginPath(), o3.fillStyle = t4.background, o3.arc(0, 0, n3, 0, 2 * Math.PI, false), o3.fill()), t4.pointer && c(t4.background) && (o3.beginPath(), o3.fillStyle = t4.background, o3.moveTo(-n3, 0), o3.lineTo(n3, 0), o3.lineTo(0, 2 * -n3), o3.closePath(), o3.fill()), t4.imgs && t4.imgs.forEach(function(t5, e4) {
        var r3 = i2.ImageCache.get(t5.src);
        if (r3) {
          var a3 = i2.computedWidthAndHeight(r3, t5, 2 * n3, 2 * n3), s2 = a3[0], h2 = a3[1], c2 = [i2.getOffsetX(s2) + i2.getLength(t5.left, n3), i2.getLength(t5.top, n3)], l3 = c2[0], u3 = c2[1];
          i2.drawImage(o3, r3, l3, u3, s2, h2);
        }
      }), t4.fonts && t4.fonts.forEach(function(t5) {
        var e4 = t5.fontColor || l2.fontColor, r3 = t5.fontWeight || l2.fontWeight, a3 = i2.getLength(t5.fontSize || l2.fontSize), s2 = t5.fontStyle || l2.fontStyle;
        o3.fillStyle = e4, o3.font = r3 + " " + (a3 >> 0) + "px " + s2, String(t5.text).split("\n").forEach(function(e5, i3) {
          o3.fillText(e5, p2(t5, e5), g2(t5, n3, i3));
        });
      });
    }), null === (e2 = r2.afterDraw) || void 0 === e2 || e2.call(this, o3);
  }, o2.prototype.carveOnGunwaleOfAMovingBoat = function() {
    var t3 = this, e2 = t3._defaultConfig, i2 = t3.prizeFlag, n2 = t3.prizeDeg, r2 = t3.rotateDeg;
    this.endTime = Date.now();
    for (var o3 = this.stopDeg = r2, a2 = e2.speed, s2 = (Math.random() * n2 - n2 / 2) * this.getLength(e2.stopRange), h2 = 0, c2 = 0, l2 = 0; ++h2; ) {
      var u2 = 360 * h2 - i2 * n2 - r2 - e2.offsetDegree + s2 - n2 / 2, f2 = L(this.FPS, o3, u2, e2.decelerationTime) - o3;
      if (f2 > a2) {
        this.endDeg = a2 - c2 > f2 - a2 ? u2 : l2;
        break;
      }
      l2 = u2, c2 = f2;
    }
  }, o2.prototype.play = function() {
    var t3, e2;
    0 === this.step && (this.startTime = Date.now(), this.prizeFlag = void 0, this.step = 1, null === (e2 = (t3 = this.config).afterStart) || void 0 === e2 || e2.call(t3), this.run());
  }, o2.prototype.stop = function(t3) {
    if (0 !== this.step && 3 !== this.step) {
      if (!t3 && 0 !== t3) {
        var e2 = this.prizes.map(function(t4) {
          return t4.range;
        });
        t3 = u(e2);
      }
      t3 < 0 ? (this.step = 0, this.prizeFlag = -1) : (this.step = 2, this.prizeFlag = t3 % this.prizes.length);
    }
  }, o2.prototype.run = function(t3) {
    var e2;
    void 0 === t3 && (t3 = 0);
    var i2 = this, n2 = i2.rAF, r2 = i2.step, o3 = i2.prizeFlag, a2 = i2._defaultConfig, s2 = a2.accelerationTime, h2 = a2.decelerationTime, c2 = a2.speed;
    if (0 !== r2) {
      if (-1 !== o3) {
        3 !== r2 || this.endDeg || this.carveOnGunwaleOfAMovingBoat();
        var l2 = Date.now() - this.startTime, u2 = Date.now() - this.endTime, f2 = this.rotateDeg;
        if (1 === r2 || l2 < s2) {
          this.FPS = l2 / t3;
          var d2 = A(l2, 0, c2, s2);
          d2 === c2 && (this.step = 2), f2 += d2 % 360;
        } else
          2 === r2 ? (f2 += c2 % 360, void 0 !== o3 && o3 >= 0 && (this.step = 3, this.stopDeg = 0, this.endDeg = 0)) : 3 === r2 ? (f2 = L(u2, this.stopDeg, this.endDeg, h2), u2 >= h2 && (this.step = 0)) : this.stop(-1);
        this.rotateDeg = f2, this.draw(), n2(this.run.bind(this, t3 + 1));
      }
    } else
      null === (e2 = this.endCallback) || void 0 === e2 || e2.call(this, this.prizes.find(function(t4, e3) {
        return e3 === o3;
      }) || {});
  }, o2.prototype.conversionAxis = function(t3, e2) {
    var i2 = this.config;
    return [t3 / i2.dpr - this.Radius, e2 / i2.dpr - this.Radius];
  }, o2;
}(z);
(function(t2) {
  function a2(e2, i2) {
    var n2, r2 = t2.call(this, e2, { width: i2.width, height: i2.height }) || this;
    return r2.rows = 3, r2.cols = 3, r2.blocks = [], r2.prizes = [], r2.buttons = [], r2.defaultConfig = {}, r2.defaultStyle = {}, r2.activeStyle = {}, r2._defaultConfig = {}, r2._defaultStyle = {}, r2._activeStyle = {}, r2.cellWidth = 0, r2.cellHeight = 0, r2.startTime = 0, r2.endTime = 0, r2.currIndex = 0, r2.stopIndex = 0, r2.endIndex = 0, r2.demo = false, r2.timer = 0, r2.FPS = 16.6, r2.step = 0, r2.prizeFlag = -1, r2.cells = [], r2.ImageCache = /* @__PURE__ */ new Map(), r2.initData(i2), r2.initWatch(), r2.initComputed(), null === (n2 = e2.beforeCreate) || void 0 === n2 || n2.call(r2), r2.init(), r2;
  }
  return e(a2, t2), a2.prototype.resize = function() {
    var e2, i2;
    t2.prototype.resize.call(this), this.draw(), null === (i2 = (e2 = this.config).afterResize) || void 0 === i2 || i2.call(e2);
  }, a2.prototype.initLucky = function() {
    this.cellWidth = 0, this.cellHeight = 0, this.startTime = 0, this.endTime = 0, this.currIndex = 0, this.stopIndex = 0, this.endIndex = 0, this.demo = false, this.timer = 0, this.FPS = 16.6, this.prizeFlag = -1, this.step = 0, t2.prototype.initLucky.call(this);
  }, a2.prototype.initData = function(t3) {
    this.$set(this, "width", t3.width), this.$set(this, "height", t3.height), this.$set(this, "rows", Number(t3.rows) || 3), this.$set(this, "cols", Number(t3.cols) || 3), this.$set(this, "blocks", t3.blocks || []), this.$set(this, "prizes", t3.prizes || []), this.$set(this, "buttons", t3.buttons || []), this.$set(this, "button", t3.button), this.$set(this, "defaultConfig", t3.defaultConfig || {}), this.$set(this, "defaultStyle", t3.defaultStyle || {}), this.$set(this, "activeStyle", t3.activeStyle || {}), this.$set(this, "startCallback", t3.start), this.$set(this, "endCallback", t3.end);
  }, a2.prototype.initComputed = function() {
    var t3 = this;
    this.$computed(this, "_defaultConfig", function() {
      var e2 = i({ gutter: 5, speed: 20, accelerationTime: 2500, decelerationTime: 2500 }, t3.defaultConfig);
      return e2.gutter = t3.getLength(e2.gutter), e2.speed = e2.speed / 40, e2;
    }), this.$computed(this, "_defaultStyle", function() {
      return i({ borderRadius: 20, fontColor: "#000", fontSize: "18px", fontStyle: "sans-serif", fontWeight: "400", background: "rgba(0,0,0,0)", shadow: "", wordWrap: true, lengthLimit: "90%" }, t3.defaultStyle);
    }), this.$computed(this, "_activeStyle", function() {
      return i({ background: "#ffce98", shadow: "" }, t3.activeStyle);
    });
  }, a2.prototype.initWatch = function() {
    var t3 = this;
    this.$watch("width", function(e2) {
      t3.data.width = e2, t3.resize();
    }), this.$watch("height", function(e2) {
      t3.data.height = e2, t3.resize();
    }), this.$watch("blocks", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("prizes", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("buttons", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("rows", function() {
      return t3.init();
    }), this.$watch("cols", function() {
      return t3.init();
    }), this.$watch("defaultConfig", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("defaultStyle", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("activeStyle", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("startCallback", function() {
      return t3.init();
    }), this.$watch("endCallback", function() {
      return t3.init();
    });
  }, a2.prototype.init = function() {
    var t3, e2;
    return n(this, void 0, void 0, function() {
      var i2;
      return r(this, function(n2) {
        switch (n2.label) {
          case 0:
            return this.initLucky(), i2 = this.config, null === (t3 = i2.beforeInit) || void 0 === t3 || t3.call(this), this.draw(), [4, this.initImageCache()];
          case 1:
            return n2.sent(), null === (e2 = i2.afterInit) || void 0 === e2 || e2.call(this), [2];
        }
      });
    });
  }, a2.prototype.initImageCache = function() {
    var t3 = this;
    return new Promise(function(e2) {
      var i2 = t3.buttons.map(function(t4) {
        return t4.imgs;
      });
      t3.button && i2.push(t3.button.imgs);
      var n2 = { blocks: t3.blocks.map(function(t4) {
        return t4.imgs;
      }), prizes: t3.prizes.map(function(t4) {
        return t4.imgs;
      }), buttons: i2 };
      Object.keys(n2).forEach(function(i3) {
        var r2 = n2[i3], o2 = [];
        r2 && r2.forEach(function(e3, n3) {
          e3 && e3.forEach(function(e4, r3) {
            o2.push(t3.loadAndCacheImg(i3, n3, r3));
          });
        }), Promise.all(o2).then(function() {
          t3.draw(), e2();
        });
      });
    });
  }, a2.prototype.handleClick = function(t3) {
    var e2 = this, i2 = this.ctx;
    o(o([], this.buttons), [this.button]).forEach(function(n2) {
      var r2;
      if (n2) {
        var o2 = e2.getGeometricProperty([n2.x, n2.y, n2.col || 1, n2.row || 1]), a3 = o2[0], s2 = o2[1], h2 = o2[2], c2 = o2[3];
        i2.beginPath(), i2.rect(a3, s2, h2, c2), i2.isPointInPath(t3.offsetX, t3.offsetY) && 0 === e2.step && ("function" == typeof n2.callback && n2.callback.call(e2, n2), null === (r2 = e2.startCallback) || void 0 === r2 || r2.call(e2, t3, n2));
      }
    });
  }, a2.prototype.loadAndCacheImg = function(t3, e2, i2) {
    return n(this, void 0, void 0, function() {
      var o2 = this;
      return r(this, function(a3) {
        return [2, new Promise(function(a4, s2) {
          var h2 = o2[t3][e2];
          if ("buttons" === t3 && !o2.buttons.length && o2.button && (h2 = o2.button), h2 && h2.imgs) {
            var c2 = h2.imgs[i2];
            if (c2) {
              var l2 = [o2.loadImg(c2.src, c2), c2.activeSrc && o2.loadImg(c2.activeSrc, c2, "$activeResolve")];
              Promise.all(l2).then(function(t4) {
                var e3 = t4[0], i3 = t4[1];
                return n(o2, void 0, void 0, function() {
                  var t5;
                  return r(this, function(n2) {
                    switch (n2.label) {
                      case 0:
                        return "function" != typeof (t5 = c2.formatter) ? [3, 3] : [4, Promise.resolve(t5.call(this, e3))];
                      case 1:
                        return e3 = n2.sent(), i3 ? [4, Promise.resolve(t5.call(this, i3))] : [3, 3];
                      case 2:
                        i3 = n2.sent(), n2.label = 3;
                      case 3:
                        return this.ImageCache.set(c2.src, e3), i3 && this.ImageCache.set(c2.activeSrc, i3), a4(), [2];
                    }
                  });
                });
              }).catch(function(n2) {
                common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", t3 + "[" + e2 + "].imgs[" + i2 + "] " + n2), s2();
              });
            }
          }
        })];
      });
    });
  }, a2.prototype.draw = function() {
    var t3, e2, i2 = this, n2 = this, r2 = n2.config, a3 = n2.ctx, u2 = n2._defaultConfig, d2 = n2._defaultStyle, p2 = n2._activeStyle;
    null === (t3 = r2.beforeDraw) || void 0 === t3 || t3.call(this, a3), a3.clearRect(0, 0, this.boxWidth, this.boxHeight), this.cells = o(o([], this.prizes), this.buttons), this.button && this.cells.push(this.button), this.cells.forEach(function(t4) {
      t4.col = t4.col || 1, t4.row = t4.row || 1;
    }), this.prizeArea = this.blocks.reduce(function(t4, e3, n3) {
      var r3 = t4.x, o2 = t4.y, s2 = t4.w, h2 = t4.h, u3 = l(e3, i2.getLength.bind(i2)), f2 = u3[0], d3 = u3[1], p3 = u3[2], g2 = u3[3], v2 = e3.borderRadius ? i2.getLength(e3.borderRadius) : 0, m2 = e3.background;
      return c(m2) && (a3.fillStyle = i2.handleBackground(r3, o2, s2, h2, m2), I(a3, r3, o2, s2, h2, v2), a3.fill()), e3.imgs && e3.imgs.forEach(function(t5, e4) {
        var n4 = i2.ImageCache.get(t5.src);
        if (n4) {
          var c2 = i2.computedWidthAndHeight(n4, t5, s2, h2), l2 = c2[0], u4 = c2[1], f3 = [i2.getOffsetX(l2, s2) + i2.getLength(t5.left, s2), i2.getLength(t5.top, h2)], d4 = f3[0], p4 = f3[1];
          i2.drawImage(a3, n4, r3 + d4, o2 + p4, l2, u4);
        }
      }), { x: r3 + p3, y: o2 + f2, w: s2 - p3 - g2, h: h2 - f2 - d3 };
    }, { x: 0, y: 0, w: this.boxWidth, h: this.boxHeight }), this.cellWidth = (this.prizeArea.w - u2.gutter * (this.cols - 1)) / this.cols, this.cellHeight = (this.prizeArea.h - u2.gutter * (this.rows - 1)) / this.rows, this.cells.forEach(function(t4, e3) {
      var n3 = i2.getGeometricProperty([t4.x, t4.y, t4.col, t4.row]), o2 = n3[0], l2 = n3[1], u3 = n3[2], g2 = n3[3], v2 = false;
      (void 0 === i2.prizeFlag || i2.prizeFlag > -1) && (v2 = e3 === i2.currIndex % i2.prizes.length >> 0);
      var m2 = v2 ? p2.background : t4.background || d2.background;
      if (c(m2)) {
        var w2 = (v2 ? p2.shadow : t4.shadow || d2.shadow).replace(/px/g, "").split(",")[0].split(" ").map(function(t5, e4) {
          return e4 < 3 ? Number(t5) : t5;
        });
        4 === w2.length && (a3.shadowColor = w2[3], a3.shadowOffsetX = w2[0] * r2.dpr, a3.shadowOffsetY = w2[1] * r2.dpr, a3.shadowBlur = w2[2], w2[0] > 0 ? u3 -= w2[0] : (u3 += w2[0], o2 -= w2[0]), w2[1] > 0 ? g2 -= w2[1] : (g2 += w2[1], l2 -= w2[1])), a3.fillStyle = i2.handleBackground(o2, l2, u3, g2, m2);
        var y2 = i2.getLength(t4.borderRadius ? t4.borderRadius : d2.borderRadius);
        I(a3, o2, l2, u3, g2, y2), a3.fill(), a3.shadowColor = "rgba(0, 0, 0, 0)", a3.shadowOffsetX = 0, a3.shadowOffsetY = 0, a3.shadowBlur = 0;
      }
      e3 >= i2.prizes.length && (e3 -= i2.prizes.length), t4.imgs && t4.imgs.forEach(function(t5, e4) {
        var n4 = i2.ImageCache.get(t5.src), r3 = i2.ImageCache.get(t5.activeSrc);
        if (n4) {
          var s2 = v2 && r3 || n4;
          if (s2) {
            var h2 = i2.computedWidthAndHeight(s2, t5, u3, g2), c2 = h2[0], f2 = h2[1], d3 = [o2 + i2.getOffsetX(c2, u3) + i2.getLength(t5.left, u3), l2 + i2.getLength(t5.top, g2)], p3 = d3[0], m3 = d3[1];
            i2.drawImage(a3, s2, p3, m3, c2, f2);
          }
        }
      }), t4.fonts && t4.fonts.forEach(function(t5) {
        var e4 = v2 && p2.fontStyle ? p2.fontStyle : t5.fontStyle || d2.fontStyle, n4 = v2 && p2.fontWeight ? p2.fontWeight : t5.fontWeight || d2.fontWeight, r3 = v2 && p2.fontSize ? i2.getLength(p2.fontSize) : i2.getLength(t5.fontSize || d2.fontSize), c2 = v2 && p2.lineHeight ? p2.lineHeight : t5.lineHeight || d2.lineHeight || t5.fontSize || d2.fontSize, m3 = s(t5, "wordWrap") ? t5.wordWrap : d2.wordWrap, w3 = t5.lengthLimit || d2.lengthLimit, y3 = t5.lineClamp || d2.lineClamp;
        a3.font = n4 + " " + (r3 >> 0) + "px " + e4, a3.fillStyle = v2 && p2.fontColor ? p2.fontColor : t5.fontColor || d2.fontColor;
        var b2 = [], S2 = String(t5.text);
        if (m3) {
          var C2 = i2.getLength(w3, u3);
          b2 = f(a3, h(S2), function() {
            return C2;
          }, y3);
        } else
          b2 = S2.split("\n");
        b2.forEach(function(e5, n5) {
          a3.fillText(e5, o2 + i2.getOffsetX(a3.measureText(e5).width, u3) + i2.getLength(t5.left, u3), l2 + i2.getLength(t5.top, g2) + (n5 + 1) * i2.getLength(c2));
        });
      });
    }), null === (e2 = r2.afterDraw) || void 0 === e2 || e2.call(this, a3);
  }, a2.prototype.handleBackground = function(t3, e2, i2, n2, r2) {
    var o2 = this.ctx;
    return r2.includes("linear-gradient") && (r2 = function(t4, e3, i3, n3, r3, o3) {
      var a3 = /linear-gradient\((.+)\)/.exec(o3)[1].split(",").map(function(t5) {
        return t5.trim();
      }), s2 = a3.shift(), h2 = [0, 0, 0, 0];
      if (s2.includes("deg")) {
        var c2 = function(t5) {
          return Math.tan(t5 / 180 * Math.PI);
        };
        (s2 = s2.slice(0, -3) % 360) >= 0 && s2 < 45 ? h2 = [e3, i3 + r3, e3 + n3, i3 + r3 - n3 * c2(s2 - 0)] : s2 >= 45 && s2 < 90 ? h2 = [e3, i3 + r3, e3 + n3 - r3 * c2(s2 - 45), i3] : s2 >= 90 && s2 < 135 ? h2 = [e3 + n3, i3 + r3, e3 + n3 - r3 * c2(s2 - 90), i3] : s2 >= 135 && s2 < 180 ? h2 = [e3 + n3, i3 + r3, e3, i3 + n3 * c2(s2 - 135)] : s2 >= 180 && s2 < 225 ? h2 = [e3 + n3, i3, e3, i3 + n3 * c2(s2 - 180)] : s2 >= 225 && s2 < 270 ? h2 = [e3 + n3, i3, e3 + r3 * c2(s2 - 225), i3 + r3] : s2 >= 270 && s2 < 315 ? h2 = [e3, i3, e3 + r3 * c2(s2 - 270), i3 + r3] : s2 >= 315 && s2 < 360 && (h2 = [e3, i3, e3 + n3, i3 + r3 - n3 * c2(s2 - 315)]);
      } else
        s2.includes("top") ? h2 = [e3, i3 + r3, e3, i3] : s2.includes("bottom") ? h2 = [e3, i3, e3, i3 + r3] : s2.includes("left") ? h2 = [e3 + n3, i3, e3, i3] : s2.includes("right") && (h2 = [e3, i3, e3 + n3, i3]);
      var l2 = t4.createLinearGradient.apply(t4, h2.map(function(t5) {
        return t5 >> 0;
      }));
      return a3.reduce(function(t5, e4, i4) {
        var n4 = e4.split(" ");
        return 1 === n4.length ? t5.addColorStop(i4, n4[0]) : 2 === n4.length && t5.addColorStop.apply(t5, n4), t5;
      }, l2);
    }(o2, t3, e2, i2, n2, r2)), r2;
  }, a2.prototype.carveOnGunwaleOfAMovingBoat = function() {
    var t3 = this, e2 = t3._defaultConfig, i2 = t3.prizeFlag, n2 = t3.currIndex;
    this.endTime = Date.now();
    for (var r2 = this.stopIndex = n2, o2 = e2.speed, a3 = 0, s2 = 0, h2 = 0; ++a3; ) {
      var c2 = this.prizes.length * a3 + i2 - r2, l2 = L(this.FPS, r2, c2, e2.decelerationTime) - r2;
      if (l2 > o2) {
        this.endIndex = o2 - s2 > l2 - o2 ? c2 : h2;
        break;
      }
      h2 = c2, s2 = l2;
    }
  }, a2.prototype.play = function() {
    var t3, e2;
    0 === this.step && (this.startTime = Date.now(), this.prizeFlag = void 0, this.step = 1, null === (e2 = (t3 = this.config).afterStart) || void 0 === e2 || e2.call(t3), this.run());
  }, a2.prototype.stop = function(t3) {
    if (0 !== this.step && 3 !== this.step) {
      if (!t3 && 0 !== t3) {
        var e2 = this.prizes.map(function(t4) {
          return t4.range;
        });
        t3 = u(e2);
      }
      t3 < 0 ? (this.step = 0, this.prizeFlag = -1) : (this.step = 2, this.prizeFlag = t3 % this.prizes.length);
    }
  }, a2.prototype.run = function(t3) {
    var e2;
    void 0 === t3 && (t3 = 0);
    var i2 = this, n2 = i2.rAF, r2 = i2.step, o2 = i2.prizes, a3 = i2.prizeFlag, s2 = i2._defaultConfig, h2 = s2.accelerationTime, c2 = s2.decelerationTime, l2 = s2.speed;
    if (0 !== r2) {
      if (-1 !== a3) {
        3 !== r2 || this.endIndex || this.carveOnGunwaleOfAMovingBoat();
        var u2 = Date.now() - this.startTime, f2 = Date.now() - this.endTime, d2 = this.currIndex;
        if (1 === r2 || u2 < h2) {
          this.FPS = u2 / t3;
          var p2 = A(u2, 0.1, l2 - 0.1, h2);
          p2 === l2 && (this.step = 2), d2 += p2 % o2.length;
        } else
          2 === r2 ? (d2 += l2 % o2.length, void 0 !== a3 && a3 >= 0 && (this.step = 3, this.stopIndex = 0, this.endIndex = 0)) : 3 === r2 ? (d2 = L(f2, this.stopIndex, this.endIndex, c2), f2 >= c2 && (this.step = 0)) : this.stop(-1);
        this.currIndex = d2, this.draw(), n2(this.run.bind(this, t3 + 1));
      }
    } else
      null === (e2 = this.endCallback) || void 0 === e2 || e2.call(this, this.prizes.find(function(t4, e3) {
        return e3 === a3;
      }) || {});
  }, a2.prototype.getGeometricProperty = function(t3) {
    var e2 = t3[0], i2 = t3[1], n2 = t3[2], r2 = void 0 === n2 ? 1 : n2, o2 = t3[3], a3 = void 0 === o2 ? 1 : o2, s2 = this.cellWidth, h2 = this.cellHeight, c2 = this._defaultConfig.gutter, l2 = [this.prizeArea.x + (s2 + c2) * e2, this.prizeArea.y + (h2 + c2) * i2];
    return r2 && a3 && l2.push(s2 * r2 + c2 * (r2 - 1), h2 * a3 + c2 * (a3 - 1)), l2;
  }, a2.prototype.conversionAxis = function(t3, e2) {
    var i2 = this.config;
    return [t3 / i2.dpr, e2 / i2.dpr];
  }, a2;
})(z);
(function(t2) {
  function o2(e2, i2) {
    var n2, r2 = t2.call(this, e2, { width: i2.width, height: i2.height }) || this;
    return r2.blocks = [], r2.prizes = [], r2.slots = [], r2.defaultConfig = {}, r2._defaultConfig = {}, r2.defaultStyle = {}, r2._defaultStyle = {}, r2.endCallback = function() {
    }, r2.cellWidth = 0, r2.cellHeight = 0, r2.cellAndSpacing = 0, r2.widthAndSpacing = 0, r2.heightAndSpacing = 0, r2.FPS = 16.6, r2.scroll = [], r2.stopScroll = [], r2.endScroll = [], r2.startTime = 0, r2.endTime = 0, r2.step = 0, r2.prizeFlag = void 0, r2.ImageCache = /* @__PURE__ */ new Map(), r2.initData(i2), r2.initWatch(), r2.initComputed(), null === (n2 = e2.beforeCreate) || void 0 === n2 || n2.call(r2), r2.init(), r2;
  }
  return e(o2, t2), o2.prototype.resize = function() {
    var e2, i2;
    t2.prototype.resize.call(this), this.draw(), null === (i2 = (e2 = this.config).afterResize) || void 0 === i2 || i2.call(e2);
  }, o2.prototype.initLucky = function() {
    this.cellWidth = 0, this.cellHeight = 0, this.cellAndSpacing = 0, this.widthAndSpacing = 0, this.heightAndSpacing = 0, this.FPS = 16.6, this.scroll = [], this.stopScroll = [], this.endScroll = [], this.startTime = 0, this.endTime = 0, this.prizeFlag = void 0, this.step = 0, t2.prototype.initLucky.call(this);
  }, o2.prototype.initData = function(t3) {
    this.$set(this, "width", t3.width), this.$set(this, "height", t3.height), this.$set(this, "blocks", t3.blocks || []), this.$set(this, "prizes", t3.prizes || []), this.$set(this, "slots", t3.slots || []), this.$set(this, "defaultConfig", t3.defaultConfig || {}), this.$set(this, "defaultStyle", t3.defaultStyle || {}), this.$set(this, "endCallback", t3.end);
  }, o2.prototype.initComputed = function() {
    var t3 = this;
    this.$computed(this, "_defaultConfig", function() {
      var e2 = i({ mode: "vertical", rowSpacing: 0, colSpacing: 5, speed: 20, direction: 1, accelerationTime: 2500, decelerationTime: 2500 }, t3.defaultConfig);
      return e2.rowSpacing = t3.getLength(e2.rowSpacing), e2.colSpacing = t3.getLength(e2.colSpacing), e2;
    }), this.$computed(this, "_defaultStyle", function() {
      return i({ borderRadius: 0, fontColor: "#000", fontSize: "18px", fontStyle: "sans-serif", fontWeight: "400", background: "rgba(0,0,0,0)", wordWrap: true, lengthLimit: "90%" }, t3.defaultStyle);
    });
  }, o2.prototype.initWatch = function() {
    var t3 = this;
    this.$watch("width", function(e2) {
      t3.data.width = e2, t3.resize();
    }), this.$watch("height", function(e2) {
      t3.data.height = e2, t3.resize();
    }), this.$watch("blocks", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("prizes", function(e2) {
      t3.initImageCache();
    }, { deep: true }), this.$watch("slots", function(e2) {
      t3.drawOffscreenCanvas(), t3.draw();
    }, { deep: true }), this.$watch("defaultConfig", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("defaultStyle", function() {
      return t3.draw();
    }, { deep: true }), this.$watch("endCallback", function() {
      return t3.init();
    });
  }, o2.prototype.init = function() {
    var t3, e2;
    return n(this, void 0, void 0, function() {
      var i2;
      return r(this, function(n2) {
        switch (n2.label) {
          case 0:
            return this.initLucky(), i2 = this.config, null === (t3 = i2.beforeInit) || void 0 === t3 || t3.call(this), this.drawOffscreenCanvas(), this.draw(), [4, this.initImageCache()];
          case 1:
            return n2.sent(), null === (e2 = i2.afterInit) || void 0 === e2 || e2.call(this), [2];
        }
      });
    });
  }, o2.prototype.initImageCache = function() {
    var t3 = this;
    return new Promise(function(e2) {
      var i2 = { blocks: t3.blocks.map(function(t4) {
        return t4.imgs;
      }), prizes: t3.prizes.map(function(t4) {
        return t4.imgs;
      }) };
      Object.keys(i2).forEach(function(n2) {
        var r2 = i2[n2], o3 = [];
        r2 && r2.forEach(function(e3, i3) {
          e3 && e3.forEach(function(e4, r3) {
            o3.push(t3.loadAndCacheImg(n2, i3, r3));
          });
        }), Promise.all(o3).then(function() {
          t3.drawOffscreenCanvas(), t3.draw(), e2();
        });
      });
    });
  }, o2.prototype.loadAndCacheImg = function(t3, e2, i2) {
    return n(this, void 0, void 0, function() {
      var o3 = this;
      return r(this, function(a2) {
        return [2, new Promise(function(a3, s2) {
          var h2 = o3[t3][e2];
          if (h2 && h2.imgs) {
            var c2 = h2.imgs[i2];
            c2 && o3.loadImg(c2.src, c2).then(function(t4) {
              return n(o3, void 0, void 0, function() {
                return r(this, function(e3) {
                  switch (e3.label) {
                    case 0:
                      return "function" != typeof c2.formatter ? [3, 2] : [4, Promise.resolve(c2.formatter.call(this, t4))];
                    case 1:
                      t4 = e3.sent(), e3.label = 2;
                    case 2:
                      return this.ImageCache.set(c2.src, t4), a3(), [2];
                  }
                });
              });
            }).catch(function(n2) {
              common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", t3 + "[" + e2 + "].imgs[" + i2 + "] " + n2), s2();
            });
          }
        })];
      });
    });
  }, o2.prototype.drawOffscreenCanvas = function() {
    var t3 = this, e2 = this._defaultConfig, i2 = this._defaultStyle, n2 = this.drawBlocks(), r2 = n2.w, o3 = n2.h, a2 = this.prizes.length, l2 = this.displacementWidthOrHeight(), u2 = l2.cellWidth, d2 = l2.cellHeight, p2 = l2.widthAndSpacing, g2 = l2.heightAndSpacing, v2 = new Array(a2).fill(void 0).map(function(t4, e3) {
      return e3;
    }), m2 = 0, w2 = 0;
    this.slots.forEach(function(e3, i3) {
      void 0 === t3.scroll[i3] && (t3.scroll[i3] = 0), e3.order = e3.order || v2;
      var n3 = e3.order.length;
      m2 = Math.max(m2, r2 + p2 * n3), w2 = Math.max(w2, o3 + g2 * n3);
    });
    var y2 = this.getOffscreenCanvas(m2, w2), b2 = y2._offscreenCanvas, S2 = y2._ctx;
    this._offscreenCanvas = b2, this.slots.forEach(function(n3, r3) {
      var o4 = u2 * r3, a3 = d2 * r3, l3 = 0, v3 = function(t4, e3) {
        for (var i3 = {}, n4 = [], r4 = 0; r4 < t4.length; r4++)
          i3[r4] = t4[r4];
        for (r4 = 0; r4 < e3.length; r4++) {
          var o5 = i3[e3[r4]];
          o5 && (n4[r4] = o5);
        }
        return n4;
      }(t3.prizes, n3.order);
      if (v3.length) {
        v3.forEach(function(r4, v4) {
          if (r4) {
            n3.order[v4];
            var m4 = p2 * v4 + e2.colSpacing / 2, w3 = g2 * v4 + e2.rowSpacing / 2, y4 = t3.displacement([o4, w3, g2], [m4, a3, p2]), b3 = y4[0], C3 = y4[1], z3 = y4[2];
            l3 += z3;
            var x3 = r4.background || i2.background;
            if (c(x3)) {
              var k3 = t3.getLength(s(r4, "borderRadius") ? r4.borderRadius : i2.borderRadius);
              I(S2, b3, C3, u2, u2, k3), S2.fillStyle = x3, S2.fill();
            }
            r4.imgs && r4.imgs.forEach(function(e3, i3) {
              var n4 = t3.ImageCache.get(e3.src);
              if (n4) {
                var r5 = t3.computedWidthAndHeight(n4, e3, u2, d2), o5 = r5[0], a4 = r5[1], s2 = [b3 + t3.getOffsetX(o5, u2) + t3.getLength(e3.left, u2), C3 + t3.getLength(e3.top, d2)], h2 = s2[0], c2 = s2[1];
                t3.drawImage(S2, n4, h2, c2, o5, a4);
              }
            }), r4.fonts && r4.fonts.forEach(function(e3) {
              var n4 = e3.fontStyle || i2.fontStyle, r5 = e3.fontWeight || i2.fontWeight, o5 = t3.getLength(e3.fontSize || i2.fontSize), a4 = e3.lineHeight || i2.lineHeight || e3.fontSize || i2.fontSize, c2 = s(e3, "wordWrap") ? e3.wordWrap : i2.wordWrap, l4 = e3.lengthLimit || i2.lengthLimit, p3 = e3.lineClamp || i2.lineClamp;
              S2.font = r5 + " " + (o5 >> 0) + "px " + n4, S2.fillStyle = e3.fontColor || i2.fontColor;
              var g3 = [], v5 = String(e3.text);
              if (c2) {
                var m5 = t3.getLength(l4, u2);
                g3 = f(S2, h(v5), function() {
                  return m5;
                }, p3);
              } else
                g3 = v5.split("\n");
              g3.forEach(function(i3, n5) {
                S2.fillText(i3, b3 + t3.getOffsetX(S2.measureText(i3).width, u2) + t3.getLength(e3.left, u2), C3 + t3.getLength(e3.top, d2) + (n5 + 1) * t3.getLength(a4));
              });
            });
          }
        });
        for (var m3 = t3.displacement([o4, 0, u2, l3], [0, a3, l3, d2]), y3 = m3[0], C2 = m3[1], z2 = m3[2], x2 = m3[3], k2 = l3; k2 < w2 + l3; ) {
          var A2 = t3.displacement([y3, k2], [k2, C2]), L2 = A2[0], T2 = A2[1];
          t3.drawImage(S2, b2, y3, C2, z2, x2, L2, T2, z2, x2), k2 += l3;
        }
      }
    });
  }, o2.prototype.drawBlocks = function() {
    var t3 = this, e2 = this;
    e2.config;
    var i2 = e2.ctx;
    e2._defaultConfig;
    var n2 = e2._defaultStyle;
    return this.prizeArea = this.blocks.reduce(function(e3, r2, o3) {
      var a2 = e3.x, s2 = e3.y, h2 = e3.w, u2 = e3.h, f2 = l(r2, t3.getLength.bind(t3)), d2 = f2[0], p2 = f2[1], g2 = f2[2], v2 = f2[3], m2 = r2.borderRadius ? t3.getLength(r2.borderRadius) : 0, w2 = r2.background || n2.background;
      return c(w2) && (I(i2, a2, s2, h2, u2, m2), i2.fillStyle = w2, i2.fill()), r2.imgs && r2.imgs.forEach(function(e4, n3) {
        var r3 = t3.ImageCache.get(e4.src);
        if (r3) {
          var o4 = t3.computedWidthAndHeight(r3, e4, h2, u2), c2 = o4[0], l2 = o4[1], f3 = [t3.getOffsetX(c2, h2) + t3.getLength(e4.left, h2), t3.getLength(e4.top, u2)], d3 = f3[0], p3 = f3[1];
          t3.drawImage(i2, r3, a2 + d3, s2 + p3, c2, l2);
        }
      }), { x: a2 + g2, y: s2 + d2, w: h2 - g2 - v2, h: u2 - d2 - p2 };
    }, { x: 0, y: 0, w: this.boxWidth, h: this.boxHeight });
  }, o2.prototype.draw = function() {
    var t3, e2 = this, i2 = this, n2 = i2.config, r2 = i2.ctx;
    i2._defaultConfig, i2._defaultStyle, null === (t3 = n2.beforeDraw) || void 0 === t3 || t3.call(this, r2), r2.clearRect(0, 0, this.boxWidth, this.boxHeight);
    var o3 = this.drawBlocks(), a2 = o3.x, s2 = o3.y, h2 = o3.w, c2 = o3.h;
    if (this._offscreenCanvas) {
      var l2 = this, u2 = l2.cellWidth, f2 = l2.cellHeight, d2 = l2.cellAndSpacing, p2 = l2.widthAndSpacing, g2 = l2.heightAndSpacing;
      this.slots.forEach(function(t4, i3) {
        var n3 = d2 * t4.order.length, o4 = e2.displacement(-(c2 - g2) / 2, -(h2 - p2) / 2), l3 = e2.scroll[i3] + o4;
        l3 < 0 && (l3 = l3 % n3 + n3), l3 > n3 && (l3 %= n3);
        var v2 = e2.displacement([u2 * i3, l3, u2, c2], [l3, f2 * i3, h2, f2]), m2 = v2[0], w2 = v2[1], y2 = v2[2], b2 = v2[3], S2 = e2.displacement([a2 + p2 * i3, s2, u2, c2], [a2, s2 + g2 * i3, h2, f2]), C2 = S2[0], z2 = S2[1], x2 = S2[2], k2 = S2[3];
        e2.drawImage(r2, e2._offscreenCanvas, m2, w2, y2, b2, C2, z2, x2, k2);
      });
    }
  }, o2.prototype.carveOnGunwaleOfAMovingBoat = function() {
    var t3 = this, e2 = this, i2 = e2._defaultConfig, n2 = e2.prizeFlag, r2 = e2.cellAndSpacing;
    this.endTime = Date.now(), this.slots.forEach(function(e3, o3) {
      var a2 = e3.order;
      if (a2.length)
        for (var s2 = e3.speed || i2.speed, h2 = e3.direction || i2.direction, c2 = a2.findIndex(function(t4) {
          return t4 === n2[o3];
        }), l2 = r2 * a2.length, u2 = t3.stopScroll[o3] = t3.scroll[o3], f2 = 0; ++f2; ) {
          var d2 = r2 * c2 + l2 * f2 * h2 - u2, p2 = L(t3.FPS, u2, d2, i2.decelerationTime) - u2;
          if (Math.abs(p2) > s2) {
            t3.endScroll[o3] = d2;
            break;
          }
        }
    });
  }, o2.prototype.play = function() {
    var t3, e2;
    0 === this.step && (this.startTime = Date.now(), this.prizeFlag = void 0, this.step = 1, null === (e2 = (t3 = this.config).afterStart) || void 0 === e2 || e2.call(t3), this.run());
  }, o2.prototype.stop = function(t3) {
    var e2;
    if (0 !== this.step && 3 !== this.step) {
      if ("number" == typeof t3)
        this.prizeFlag = new Array(this.slots.length).fill(t3);
      else {
        if (!a(t3, "array"))
          return this.stop(-1), common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", "stop() 无法识别的参数类型 " + typeof t3);
        if (t3.length !== this.slots.length)
          return this.stop(-1), common_vendor.index.__f__("error", "at components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js:15", "stop([" + t3 + "]) 参数长度的不正确");
        this.prizeFlag = t3;
      }
      (null === (e2 = this.prizeFlag) || void 0 === e2 ? void 0 : e2.includes(-1)) ? (this.prizeFlag = [], this.step = 0) : this.step = 2;
    }
  }, o2.prototype.run = function(t3) {
    var e2, i2, n2 = this;
    void 0 === t3 && (t3 = 0);
    var r2 = this, o3 = r2.rAF, a2 = r2.step, s2 = r2.prizeFlag, h2 = r2._defaultConfig, c2 = r2.cellAndSpacing, l2 = r2.slots, u2 = h2.accelerationTime, f2 = h2.decelerationTime;
    if (0 !== this.step || (null == s2 ? void 0 : s2.length) !== l2.length) {
      if (void 0 === s2 || s2.length) {
        3 !== this.step || this.endScroll.length || this.carveOnGunwaleOfAMovingBoat();
        var d2 = Date.now() - this.startTime, p2 = Date.now() - this.endTime;
        l2.forEach(function(e3, i3) {
          var r3 = e3.order;
          if (r3 && r3.length) {
            var o4 = c2 * r3.length, g3 = Math.abs(e3.speed || h2.speed), v3 = e3.direction || h2.direction, m3 = 0, w3 = n2.scroll[i3];
            if (1 === a2 || d2 < u2) {
              n2.FPS = d2 / t3;
              var y2 = A(d2, 0, g3, u2);
              y2 === g3 && (n2.step = 2), m3 = (w3 + y2 * v3) % o4;
            } else if (2 === a2)
              m3 = (w3 + g3 * v3) % o4, (null == s2 ? void 0 : s2.length) === l2.length && (n2.step = 3, n2.stopScroll = [], n2.endScroll = []);
            else if (3 === a2 && p2) {
              var b2 = n2.stopScroll[i3], S2 = n2.endScroll[i3];
              m3 = L(p2, b2, S2, f2), p2 >= f2 && (n2.step = 0);
            }
            n2.scroll[i3] = m3;
          }
        }), this.draw(), o3(this.run.bind(this, t3 + 1));
      }
    } else {
      for (var g2 = s2[0], v2 = 0; v2 < l2.length; v2++) {
        var m2 = l2[v2], w2 = s2[v2];
        if (!(null === (e2 = m2.order) || void 0 === e2 ? void 0 : e2.includes(w2)) || g2 !== w2) {
          g2 = -1;
          break;
        }
      }
      null === (i2 = this.endCallback) || void 0 === i2 || i2.call(this, this.prizes.find(function(t4, e3) {
        return e3 === g2;
      }) || void 0);
    }
  }, o2.prototype.displacement = function(t3, e2) {
    return "horizontal" === this._defaultConfig.mode ? e2 : t3;
  }, o2.prototype.displacementWidthOrHeight = function() {
    var t3 = this._defaultConfig.mode, e2 = this.slots.length, i2 = this._defaultConfig, n2 = i2.colSpacing, r2 = i2.rowSpacing, o3 = this.prizeArea || this.drawBlocks();
    o3.x, o3.y;
    var a2, s2, h2 = o3.w, c2 = o3.h, l2 = 0, u2 = 0;
    return "horizontal" === t3 ? (u2 = this.cellHeight = (c2 - r2 * (e2 - 1)) / e2, l2 = this.cellWidth = u2) : (l2 = this.cellWidth = (h2 - n2 * (e2 - 1)) / e2, u2 = this.cellHeight = l2), a2 = this.widthAndSpacing = this.cellWidth + n2, s2 = this.heightAndSpacing = this.cellHeight + r2, this.cellAndSpacing = "horizontal" === t3 ? a2 : s2, { cellWidth: l2, cellHeight: u2, widthAndSpacing: a2, heightAndSpacing: s2 };
  }, o2;
})(z);
exports.T = T;
//# sourceMappingURL=../../../../../../.sourcemap/mp-weixin/components/lucky-canvas_v0.0.10_4/components/lucky-canvas/dist/index.esm.js.map
