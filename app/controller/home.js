'use strict';

const sha1 = require('sha1');
const Controller = require('egg').Controller;
const wechat = require('co-wechat');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async wxIndex() {
    const { ctx } = this;
    const o = ctx.query;
    if (Object.keys(o).length === 0) {
      ctx.body = 'hello, this is handle view';
    }
    const signature = o.signature,
      timestamp = o.timestamp,
      nonce = o.nonce,
      echostr = o.echostr,
      token = 'abc123';
    const arr = [ token, timestamp, nonce ];
    arr.sort();
    const hashCode = sha1(arr.join(''));
    if (hashCode === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = 'hello world';
    }
  }
  async weixinPicture() {
    const { ctx } = this;
    await ctx.render('picture.htm', {});
  }
}

const config = {
  appid: 'wxe1e24497c6cc5e6d',
  token: 'abc123',
  encodingAESKey: 'd6idGlf9BgqeHMovcnklHByxDQlaroIEzNe7fbsOMqo',
};
HomeController.prototype.wechat = wechat(config).middleware(async (message, ctx) => {
  if (message.MsgType === 'text') {
    return {
      content: '月老让我告诉你一个秘密，唐斌喜欢😘兰杨😘，怎么样都喜欢。',
      type: 'text',
    };
  }

  if (message.MsgType === 'image') {
    const MsgId = message.MsgId;
    ctx.service.mongo.saveImage(MsgId, message);
  }
  return {
    content: '我还没长大呢，现在只认识汉字哦。',
    type: 'text',
  };
});
module.exports = HomeController;
