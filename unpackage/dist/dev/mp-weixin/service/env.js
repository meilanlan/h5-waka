"use strict";
exports.ApiUrl = "";
if (process.env.M_NODE_ENV === "test") {
  exports.ApiUrl = "https://api-test.whackgroup.com";
} else if (process.env.M_NODE_ENV === "production_sh1") {
  exports.ApiUrl = "https://api.whackgroup.com/";
} else {
  exports.ApiUrl = "/api";
}
//# sourceMappingURL=../../.sourcemap/mp-weixin/service/env.js.map
