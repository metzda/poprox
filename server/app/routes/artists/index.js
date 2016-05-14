'use strict';
var router = require('express').Router();
var request = require('request');
module.exports = router;
var _ = require('lodash');

router.get('/', function(req, res, next) {
  res.status(200).send();
});

router.get('/:artist', function(req, res, next) {
  var artist = req.params.artist;
  request.get({url: "https://api.spotify.com/v1/search?q="+artist+"&type=artist"}, function(err, response, body) {
    res.status(200).send(body);
  });
});

router.get('/id/:id', function(req, res, next) {
  var id = req.params.id;
  request.get({url: "https://api.spotify.com/v1/artists/"+id}, function(err, response, body) {
    res.status(200).send(body);
  });
});

router.get('/id/:id/related', function(req, res, next) {
  var id = req.params.id;
  request.get({url: "https://api.spotify.com/v1/artists/"+id+"/related-artists"}, function(err, response, body) {
    res.status(200).send(body);
  });
});

router.get('/events/:name', function(req, res, next) {
  var name = req.params.name;
  request.get({url: "http://api.bandsintown.com/artists/"+name+"/events.json?api_version=2.0&app_id=POP_ROX"}, function(err, response, body) {
    res.status(200).send(body);
  });
});
