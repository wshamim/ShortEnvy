const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const UrlModelSchema = new Schema({
  short_id: { type: String, index: { unique: true }, default: shortid.generate },
  long_url: { type: String, index: { unique: true } },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UrlModel', UrlModelSchema);
