let ApiUrl = '';
if (process.env.M_NODE_ENV === 'test') {
  // 测试环境
  ApiUrl = 'https://apitest.glxnetwork.com';
} else if (process.env.M_NODE_ENV === 'production_sh1'){
  // 生产环境-sh
  ApiUrl = 'https://api.glxnetwork.com';
} else if (process.env.M_NODE_ENV === 'production_nj1'){
  // 生产环境-nj
  ApiUrl = 'https://api-nj.glxnetwork.com';
} else {
  // 开发环境
  ApiUrl = '/api';
}
export {
  ApiUrl
}