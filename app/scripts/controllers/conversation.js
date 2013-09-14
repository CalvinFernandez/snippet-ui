'use strict';

angular.module('snippetUiApp')
  .controller('ConversationCtrl', function ($scope, $state, Conversations, Songs) {
    
    var index = $state.params.id;
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
      $scope.newMessageSong = '';
      $scope.newMessageText = '';
    }
  });
