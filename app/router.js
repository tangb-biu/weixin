'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.all('/wx', controller.home.wechat);

  router.get('/wx/picture', controller.home.weixinPicture);

  router.get('/wx/api/picture', controller.home.weixinPictureApis);

  router.get('/wx/pic/:filename', controller.home.weixinFile);
};
