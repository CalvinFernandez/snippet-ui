'use strict';

angular.module('snippetUiApp')
  .factory('Music', function ($http) {
    var songPath = 'songs.json';
    var genrePath = 'genres.json';
    
    var songs = $http.get(songPath).then(function(resp) {
      return resp.data;
    });
    
    var genres = $http.get(genrePath).then(function(resp) {
      return resp.data;     
    });
    
    


    // Public API here
    return {

      all: function () {
        return songs;
      },

      genres: function() {
        return genres;
      },

      genre: function(id) {
        for (var i = 0; i < genres.$$v.length; i ++) {
          if (genres.$$v[i].id == id) {
            return genres.$$v[i];
          }
        }          
      },

      selected: ''
    };
  });
