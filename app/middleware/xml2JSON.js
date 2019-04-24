'use strict';
const xml2JSON = require('xml2json');
const rawBody = require('raw-body');

module.exports = () => {
  return async function xmlToJSON(ctx, next) {
    await next();
    try {
      if (ctx.request.header['content-type'] === 'text/xml') {
        const buff = rawBody(ctx.request.req);
        ctx.request.body = (xml2JSON.toJson(buff)).xml;
      }
    } catch (e) {
      ctx.response.body = e.JSON_PARSE_ERR;
      ctx.logger.info(`----出参----${JSON.stringify(this.response.body)}`);
      return;
    }
  };
};
