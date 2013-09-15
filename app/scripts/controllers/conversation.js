'use strict';

angular.module('snippetUiApp')
  .controller('ConversationCtrl', function ($scope, $state, Conversations, Music) {
    
    var index = $state.params.id;
    $scope.me = Conversations.me();

    $scope.conversation = Conversations.all()[index];
    $scope.songs = Music.all();

    $scope.newMessageText = '';
    $scope.newMessageSong = Music.selected;

    //  Update unread convo //
    $scope.conversation.unread = false; 

    $scope.selectSong = function(song) {
      $scope.snippetPanel = !$scope.snippetPanel; 
      $scope.newMessageSong = song;  
    };

    $scope.removeSong = function() {
      Music.selected = '';
      $scope.newMessageSong = '';
    };

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

      //  Reset ui values //
      Music.selected = '';
      $scope.newMessageSong = '';

      $scope.newMessageText = '';
    }
  });
