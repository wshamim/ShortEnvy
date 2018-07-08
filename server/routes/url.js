const mongoose = require('mongoose');
const UrlModel = require('../models/url');
const config = require('config');

const webhost = process.env.HOST || config.WebserverHost;

const resolveUrl = (req, res) => {
  const short_id = req.params.short_id;
  // check if url already exists in DB
  UrlModel.findOne({ short_id: short_id }, function(err, doc) {
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(webhost);
    }
  });
};

const shortenUrl = (req, res) => {
  const longUrl = req.body.longUrl;
  let shortUrl = '';
  // Check if url already exists in DB
  UrlModel.findOne({ long_url: longUrl }, (err, doc) => {
    if (doc) {
      shortUrl = webhost + doc.short_id;
      res.send({
        shortUrl,
        longUrl,
        msg: 'URL already exists!',
        error: ''
      });
    } else {
      let link = UrlModel({ long_url: longUrl });
      link.save(err => {
        if (err) {
          res.send({ longUrl, shortUrl, error: err, msg: '' });
        }
      });
      res.send({
        longUrl,
        shortUrl: webhost + link.short_id,
        error: '',
        msg: 'Url Shortened successfully.'
      });
    }
  });
};

module.exports = { resolveUrl, shortenUrl };
