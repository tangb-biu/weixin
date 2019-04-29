'use strict';

const sha1 = require('sha1');
const Controller = require('egg').Controller;
const wechat = require('co-wechat');
const request = require('request');
const fs = require('fs');

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
    const pics = await ctx.service.picture.getAllPicture();
    await ctx.render('picture.htm', { pics });
  }

  async weixinFile() {
    const filename = this.ctx.params.filename;
    this.ctx.service.mongo.getFile(filename, this.ctx.res);
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
    // const MsgId = message.MsgId;
    // ctx.service.picture.saveImage(MsgId, message);
    const writeStream = fs.createWriteStream('../public/' + message.MsgId + '.jpg');
    await request(message.PicUrl).pipe(writeStream);
    ctx.service.picture.savePicture(message);
  }
  return {
    content: 'http://47.96.68.132/picture',
    type: 'text',
  };
});
module.exports = HomeController;
