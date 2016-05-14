app.factory('ArtistsFactory', function($http, $q, $window) {
  var ArtistsFactory = {};

  ArtistsFactory.getCurrentPosition = function() {
    var deferred = $q.defer();

    if(!$window.navigator) {
      deferred.reject(new Error('Geolocation is not supported'));
    } else {
      $window.navigator.geolocation.getCurrentPosition(function(position) {
        deferred.resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, deferred.reject);
    }

    return deferred.promise;
  };

  ArtistsFactory.getDistanceCrowMiles = function (lat1, lon1, lat2, lon2) {
    function toRad(Value) {
      return Value * Math.PI / 180;
    }
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 0.621371;
  };

  ArtistsFactory.replaceBlankArtistImage = function(artist) {
    if (artist.images.length === 0)
      artist.images = [{'url': 'http://media.virginradio.fr/pmedia-3195733-ajust_640-f1460543364/le-dj-kygo-lors-de-son-concert-a-paris-c.jpg'}];
    return artist;
  };
  ArtistsFactory.populateEventDetails = function(artist, event) {
    if (artist.events.length === 0)
      artist.images = [{'url': 'http://media.virginradio.fr/pmedia-3195733-ajust_640-f1460543364/le-dj-kygo-lors-de-son-concert-a-paris-c.jpg'}];
    return artist;
  };

  ArtistsFactory.populateArtistEvents = function(artist) {
    return ArtistsFactory.fetchArtistEvents(artist.name)
      .then(function(events) {
        artist.events = events;
        artist.events.map(function(event) {
          event.artist = artist.name;
          event.genres = artist.genres;
        });
        return artist;
      });
  };
  ArtistsFactory.combineArtistEvents = function(prev, curr) {
    return prev.concat(curr.events);
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
      })
      .then(function(artists) {
        console.log(artists);
        return artists;
      });
  };

  ArtistsFactory.fetchArtist = function(id) {
    return $http.get('/api/artists/id/' + id)
      .then(function(response) {
        return response.data;
      })
      .then(function(artist) {
        return ArtistsFactory.replaceBlankArtistImage(artist);
      })
      .then(function(artist) {
        return ArtistsFactory.populateArtistEvents(artist);
      });
  };

  ArtistsFactory.fetchRelatedEvents = function(id) {
    return $http.get('/api/artists/id/' + id + '/related')
      .then(function(response) {
        return response.data.artists;
      })
      .then(function(artists) {
        return artists.map(ArtistsFactory.replaceBlankArtistImage);
      })
      .then(function(artists) {
        return artists.map(ArtistsFactory.populateArtistEvents);
      })
      .then($q.all)
      .then(function(artists) {
        return artists.reduce(ArtistsFactory.combineArtistEvents, []);
      });
  };

  ArtistsFactory.fetchArtistEvents = function(name)  {
    return $http.get('/api/artists/events/' + name)
      .then(function(response) {
        return response.data;
      });
  };

  return ArtistsFactory;
});
