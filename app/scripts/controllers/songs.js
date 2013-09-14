'use strict';

angular.module('snippetUiApp')
  .controller('SongsCtrl', function ($scope, $state, Songs) {
    $scope.songs = Songs.all();
    $scope.selectSong = function(song) {
      Songs.selected = song; 
      if ($state.includes('home.messages.conversation.picksong')) {
          $state.go('^');  
      } else if ($state.includes('home.songs')) {
        $state.go('home.messages.new');
      }
    }
  });
