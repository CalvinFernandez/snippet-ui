'use strict';

angular.module('snippetUiApp')
  .controller('SongsCtrl', function ($scope, $state, Music) {
    $scope.headers = ['', 'Song', 'Length']; 

    $scope.songs = Music.all();
    $scope.selectSong = function(song) {
      Music.selected = song; 
      if ($state.includes('home.messages.conversation.picksong')) {
          $state.go('^');  
      } else if ($state.includes('home.songs')) {
        $state.go('home.messages.new');
      }
    }
  })
  .controller('GenresCtrl', function($scope, $state, Music) {
    $scope.genres = Music.genres();    

  })
  .controller('GenreCtrl', function($scope, $state, $stateParams, Music) {
    $scope.genre = Music.genre($stateParams.id); 
       
  });
