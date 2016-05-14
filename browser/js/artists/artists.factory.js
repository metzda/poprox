app.factory('ArtistsFactory', function($http) {
  return {
    popularArtists: function() {
      return $http.get('/api/artists/')
        .then(function(response) {
          return response.data;
        });
    },
    relatedArtists: function(artist) {
      return $http.get('/api/artists/' + artist)
        .then(function(response) {
          return response.data;
        });
    }
  };
});
