let ApiUrl = '';
console.log(process.env.M_NODE_ENV,'process.env.M_NODE_ENV is')
  
if (!process.env.M_NODE_ENV || process.env.M_NODE_ENV === 'test'||process.env.M_NODE_ENV === 'dev') {
  // 测试环境
  // ApiUrl = 'https://apitest.glxnetwork.com';
  ApiUrl = 'https://api-test.whackgroup.com';
} else if (process.env.M_NODE_ENV === 'production_sh1'){
  // 生产环境-sh
  ApiUrl = 'https://api.whackgroup.com';
} 
// else {
  // 开发环境
  // ApiUrl = 'https://api-dev.whackgroup.com';
// }

export {
  ApiUrl
}