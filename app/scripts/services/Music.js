'use strict';

angular.module('snippetUiApp')
  .factory('Music', function ($http) {
    var songsPath = '/api/songs/all';
    var categoriesPath = '/api/categories/all';
    var categoryPath = '/api/categories/songs';
    
    var songs = $http.get(songsPath).then(function(resp) {
      return resp.data;
    });
    
    var genres = $http.get(categoriesPath).then(function(resp) {
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
        return $http({
          method: 'GET', 
          url: categoryPath,        
          params: {
            id: id
          }
        }).then(function(resp) {
          return resp.data;
        })
      },

      selected: ''
    };
  });
