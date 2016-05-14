app.controller('ArtistsCtrl', function($scope, popularArtists) {
  $scope.popularArtists = popularArtists;
});

app.controller('ArtistSearchCtrl', function($scope, searchedArtists, $stateParams) {
  $scope.searchTerm = $stateParams.artist;
  $scope.searchedArtists = searchedArtists;
});

app.controller('ArtistCtrl', function($scope, artist, events, currLocation, ArtistsFactory) {
  $scope.artist = artist;
  $scope.events = artist.events.concat(events);
  $scope.currLocation = currLocation;
  $scope.getDistance = function(lat, lon) {
    return ArtistsFactory.getDistanceCrowMiles(lat, lon, currLocation.lat, currLocation.lng);
  };
  $scope.distanceOptions = [{name: 'All', value: 100000},
                            {name: '25', value: 25},
                            {name: '50', value: 50},
                            {name: '100', value: 100},
                            {name: '250', value: 250}];
  $scope.distance = $scope.distanceOptions[0].value;
});
