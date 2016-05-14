'use strict';
var router = require('express').Router();
var request = require('request');
module.exports = router;
var _ = require('lodash');

router.get('/', function(req, res, next) {
  res.status(200).send(['cool stuff']);
});

router.get('/:artist', function(req, res, next) {
  var artist = req.params.artist;
  request.get({url: "https://api.spotify.com/v1/search?q="+artist+"&type=artist"}, function(err, response, body) {
    res.status(200).send(body);
  });
});
