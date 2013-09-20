'use strict';

angular.module('snippetUiApp')
  .controller('SongsCtrl', function ($scope, $state, Music, Session, Assert) {
     
    $scope.header.headerName = 'Lyricoos';
    $scope.header.rightBtn = '';

    if ($state.data.caller.name === 'conversation' || 
      $state.data.caller.name === 'newConversation') {

      $scope.state = 'conversationModal';
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
      Session.selectedSong = song; 
      $scope.selectedSong = song; 
    }

    $scope.sendSong = function(song) {
      $scope.selectSong(song);

      if ($scope.state === 'conversationModal') {
        window.history.back();     
      } else {
       $state.go('newConversation'); 
      }
    }
  })

  .controller('GenresCtrl', function($scope, $state, Music) {
    //$scope.genres = Music.genres();    
  })
  .controller('GenreCtrl', function($scope, $state, $stateParams, Music) {
    $scope.songs = Music.genre($scope.genre.id);
    $state.go('.list');   
  });
