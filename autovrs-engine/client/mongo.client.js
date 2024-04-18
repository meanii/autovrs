import mongoose from 'mongoose';

export class Mongo {
  constructor(url) {
    this.url = url;
  }

  connect() {
    return new Promise((resolve, reject) => {

      mongoose.connect(this.url);

      const db = mongoose.connection;

      const error = (err) => {
        console.error('connection error:', err);
        reject(err);
      }

      const open = () => {
        console.log('MongoDB connected');
        resolve();
      }

      db.on('error', error);
      db.once('open', open);

    });
  }

}