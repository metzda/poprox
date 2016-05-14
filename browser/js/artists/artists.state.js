app.config(function($stateProvider) {
  $stateProvider.state('artists', {
    url: '/artists',
    templateUrl: '/js/artists/artists.html',
    controller: 'ArtistsCtrl',
    resolve: {
      popularArtists: function(ArtistsFactory, $stateParams) {
        return ArtistsFactory.popularArtists();
      }
    }
  })
  .state('artist', {
    url: '/artists/:artist',
    templateUrl: '/js/artists/artist.html',
    controller: 'ArtistCtrl',
    resolve: {
      relatedArtists: function(ArtistsFactory, $stateParams) {
        return ArtistsFactory.relatedArtists($stateParams.artist);
      }
    }
  });
});
