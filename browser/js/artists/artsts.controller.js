app.controller('ArtistsCtrl', function($scope, popularArtists) {
  $scope.popularArtists = popularArtists;
});

app.controller('ArtistSearchCtrl', function($scope, searchedArtists, $stateParams) {
  $scope.searchTerm = $stateParams.artist;
  $scope.searchedArtists = searchedArtists;
});

app.controller('ArtistCtrl', function($scope, artist, relatedArtists) {
  $scope.artist = artist;
  $scope.relatedArtists = relatedArtists;
});
