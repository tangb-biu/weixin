'use strict';
const mongoose = require('mongoose');
const request = require('request');
const Grid = require('gridfs-stream');
mongoose.Promise = global.Promise;
const Service = require('egg').Service;

class MongoService extends Service {
  async getConnection() {
    await mongoose.createConnection(this.app.config.mongo.uri);
    return mongoose.connection;
  }
  async saveFile(filename, url, options) {
    mongoose.connect(this.app.config.mongo.uri);
    const conn = mongoose.connection;
    conn.once('open', () => {
      const gfs = Grid(conn.db, mongoose.mongo);
      const writestream = gfs.createWriteStream({
        filename,
        ...options,
      });
      request(url).pipe(writestream);
    });
  }
}

module.exports = MongoService;
