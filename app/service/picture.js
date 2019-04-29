'use strict';
const Service = require('egg').Service;
class PictureService extends Service {
  async saveImage(filename, message) {
    const picUrl = message.PicUrl;
    this.ctx.service.mongo.saveFile(filename, picUrl, message);
  }
}

module.exports = PictureService;
