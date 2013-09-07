'use strict';

angular.module('snippetUiApp')
  .controller('ConversationCtrl', function ($scope, $routeParams, Conversations, Songs) {

    var index = $routeParams.number;
    $scope.me = Conversations.me();

    $scope.conversation = Conversations.all()[index];
    $scope.songs = Songs.all();

    $scope.newMessageText = '';
    $scope.newMessageSong = '';

    //  Update unread convo //
    $scope.conversation.unread = false; 

    $scope.selectSong = function(song) {
      $scope.snippetPanel = !$scope.snippetPanel; 
      $scope.newMessageSong = song;  
      $scope.pauseSong(song);
    };

    $scope.toggleSong = function(song) {
      if (song.element.paused) {
        song.element.play();
      } else  {
        song.element.pause();  
      }
    }

    $scope.pauseSong = function(song) {
      song.element.pause();
    }

    $scope.sendMessage = function() {

      var newMessage = {
        'author': {
          'number': $scope.me.number,
          'name': $scope.me.name
        },
        'song': $scope.newMessageSong,
        'listened': 'true',
        'text': $scope.newMessageText 
      };

      $scope.conversation.messages.push(newMessage);

    }
  });
