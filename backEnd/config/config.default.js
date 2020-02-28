/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582854292345_4168';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://root:root@localhost:27017/demo?authSource=admin',
      options: {}
    },
  };

  config.security = {
    csrf: {
      enable: false,
      domainWhiteList: ['http://127.0.0.1:8080/']
    }
  };

  config.cors ={
    origin:'http://127.0.0.1:8080',
    allowMethods:'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH',
    credentials: true
  };

  config.session={
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,  //只能nodejs调用
    encrypt: true,  //session加密
    renew: true,  //刷新用户的延长期
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
