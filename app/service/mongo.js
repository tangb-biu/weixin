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
    const conn = this.getConnection();
    conn.once('open', () => {
      const gfs = Grid(conn.db);
      const writestream = gfs.createWriteStream({
        filename,
        ...options,
      });
      request(url).pipe(writestream);
    });
  }
}

module.exports = MongoService;
