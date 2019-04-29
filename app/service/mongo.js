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
    await mongoose.connect(this.app.config.mongo.uri);
    const conn = mongoose.connection;
    const gfs = new Grid(conn.db, mongoose.mongo);
    const writestream = gfs.createWriteStream({
      filename,
      ...options,
    });
    await request(url).pipe(writestream);
    conn.close();
  }

  async getFile(filename, writeStream) {
    await mongoose.createConnection(this.app.config.mongo.uri);
    const conn = mongoose.connection;
    const gfs = new Grid(conn.db, mongoose.mongo);
    const readstream = gfs.createReadStream({
      filename,
    });
    await readstream.pipe(writeStream);
    conn.close();
  }
}

module.exports = MongoService;
