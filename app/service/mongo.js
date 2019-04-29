'use strict';
const mongoose = require('mongoose');
const request = require('request');
const Grid = require('gridfs-stream');
mongoose.Promise = global.Promise;
const Service = require('egg').Service;

class MongoService extends Service {
  async getConnection() {
    const conn = mongoose.createConnection({ uri: this.app.config.mongdb.uri });
    return conn;
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
