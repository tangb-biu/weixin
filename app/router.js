'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.all('/wx', controller.home.wechat);

  router.get('/picture', controller.home.weixinPicture);

  router.get('/api/picture', controller.weixinPictureApis);

  router.get('/pic/:filename', controller.home.weixinFile);
};
