'use strict';

angular.module('snippetUiApp')
  .controller('SongsCtrl', function ($scope, $state, Music) {
     
    $scope.header.headerName = 'Songs';
    if ($state.data.caller.name === 'messages.conversation') {
      $scope.header.leftBtn = '<small>Conversation</small>';
      $scope.header.leftBtnFn = function() {
        window.history.back();      
      }
    } else {
      $scope.header.leftBtn = "<i class='icon-reorder'></i>";
      $scope.header.leftBtnFn = function() {
        $scope.sidebar.show = !$scope.sidebar.show;        
      }
    }

    $scope.songs = Music.all();

    $scope.genres = Music.genres();

    $scope.selectGenre = function(genre) {
      $scope.genre = genre;
      $state.go('music.genre');
    }

    $scope.selectSong = function(song) {
      Music.selected = song; 
      $scope.selectedSong = song; 
    }

    $scope.sendSong = function(song) {
      $scope.selectSong(song);
      if ($scope.calledFromConversation) {
        window.history.back();     
      } else {
        
      }
    }
  })
  .controller('GenresCtrl', function($scope, $state, Music) {
    //$scope.genres = Music.genres();    
  })
  .controller('GenreCtrl', function($scope, $state, $stateParams, Music) {
    //$scope.genre = Music.genre($stateParams.id); 
    //$scope.songs = Music.all();
    $state.go('.list');   
  });
