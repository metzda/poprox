app.controller('ArtistsCtrl', function($scope, popularArtists) {
  $scope.popularArtists = popularArtists;
});
app.controller('ArtistCtrl', function($scope, relatedArtists) {
  $scope.relatedArtists = relatedArtists;
});
