'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.all('/wx', controller.home.wechat);

  router.get('/lx/picture', controller.home.weixinPicture);

  router.get('/lx/api/picture', controller.home.weixinPictureApis);

  router.get('/lx/pic/:filename', controller.home.weixinFile);
};
