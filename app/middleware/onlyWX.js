// eslint-disable-next-line strict
'use strict';

module.exports = () => {
  return async function onlyWX(ctx, next) {
    await next();
    const header = ctx.request.header;
    const ua = header['user-agent'].toLowerCase();
    const isWX = /.*micromessenger.*/.test(ua);
    if (!isWX) {
      await ctx.render('error.htm', {});
    }
  };
};
