'use strict';

const sha1 = require('sha1');
const Controller = require('egg').Controller;

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

  async wxMessage() {
    const { ctx } = this;
    const reqbd = ctx.request.body;
    console.log(reqbd);
    ctx.body = 'hello';
  }
}

module.exports = HomeController;
