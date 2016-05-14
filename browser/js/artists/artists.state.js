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
  .state('artistSearch', {
    url: '/artists/:artist',
    templateUrl: '/js/artists/artist-search.html',
    controller: 'ArtistSearchCtrl',
    resolve: {
      searchedArtists: function(ArtistsFactory, $stateParams) {
        return ArtistsFactory.searchArtists($stateParams.artist);
      }
    }
  })
  .state('artist', {
    url: '/artists/id/:id',
    templateUrl: 'js/artists/artist.html',
    controller: 'ArtistCtrl',
    resolve: {
      artist: function(ArtistsFactory, $stateParams) {
        return ArtistsFactory.fetchArtist($stateParams.id);
      },
      events: function(ArtistsFactory, $stateParams) {
        return ArtistsFactory.fetchRelatedEvents($stateParams.id);
      },
      currLocation: function(ArtistsFactory) {
        return ArtistsFactory.getCurrentPosition();
      }
    }
  });
});
