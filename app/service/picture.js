'use strict';
const Service = require('egg').Service;
const mongoose = require('mongoose');
const picSchema = require('../model/pictrueSchema');
const PIC = mongoose.model('Picture', picSchema);
class PictureService extends Service {
  async saveImage(filename, message) {
    const picUrl = message.PicUrl;
    this.ctx.service.mongo.saveFile(filename, picUrl, message);
  }

  async savePicture(message) {
    await mongoose.connect(this.app.config.mongo.uri);
    const pic = new PIC({
      name: message.FromUserName,
      url: message.PicUrl,
      messageType: message.MsgType,
      mediaId: message.MediaId,
      forUser: message.FromUserName,
      messageId: message.MsgId,
    });

    return await pic.save();
  }

  async getAllPicture() {
    await mongoose.connect(this.app.config.mongo.uri);
    return await PIC.find({ messageType: 'image' });
  }
}

module.exports = PictureService;
