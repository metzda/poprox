app.factory('ArtistsFactory', function($http) {
  var ArtistsFactory = {};

  ArtistsFactory.replaceBlankArtistImage = function(artist) {
    if (artist.images.length === 0)
      artist.images = [{'url': 'http://media.virginradio.fr/pmedia-3195733-ajust_640-f1460543364/le-dj-kygo-lors-de-son-concert-a-paris-c.jpg'}];
    return artist;
  };

  ArtistsFactory.popularArtists = function() {
    return $http.get('/api/artists/')
      .then(function(response) {
        return response.data;
      });
  };

  ArtistsFactory.searchArtists = function(artist) {
    return $http.get('/api/artists/' + artist)
      .then(function(response) {
        return response.data.artists.items;
      })
      .then(function(artists) {
        return artists.map(ArtistsFactory.replaceBlankArtistImage);
      });
  };

  ArtistsFactory.fetchArtist = function(id) {
    return $http.get('/api/artists/id/' + id)
      .then(function(response) {
        return response.data;
      })
      .then(function(artist) {
        return ArtistsFactory.replaceBlankArtistImage(artist);
      });
  };

  ArtistsFactory.fetchRelatedArtists = function(id) {
    return $http.get('/api/artists/id/' + id + '/related')
      .then(function(response) {
        return response.data.artists;
      })
      .then(function(artists) {
        return artists.map(ArtistsFactory.replaceBlankArtistImage);
      });
  };

  return ArtistsFactory;
});
