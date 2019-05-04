// eslint-disable-next-line strict
'use strict';

module.exports = () => {
  return async function onlyWX(ctx, next) {
    await next();
    const header = ctx.request.header;
    const ua = header['user-agent'];
    const isWX = /.*micromessenger.*/.test(ua);
    if (!isWX) {
      ctx.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe1e24497c6cc5e6d&redirect_uri=http://47.96.68.132/picture');
    }
  };
};
