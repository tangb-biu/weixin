/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

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
  config.keys = appInfo.name + '_1556088659992_936';
  config.appSecret = '06e09f06712d9b2acfc115f6b3c080cc';
  // add your middleware config here
  config.middleware = [ 'onlyWX' ];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.htm': 'nunjucks',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.logger = {
    level: 'DEBUG',
  };

  config.mongo = {
    uri: 'mongodb://tangbin:tangbin@47.96.68.132:27017/weixin',
  };

  config.configure = {
    picPath: '/home/ftpuser/www/images',
  };

  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/pub',
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
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
