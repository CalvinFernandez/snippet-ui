'use strict';

angular.module('snippetUiApp')
  .controller('ConversationCtrl', function ($scope, $state, Conversations, Music, Session) {

    $scope.conversations = Conversations.all(Session.get().id);
    $scope.selectConversation = function(conversation) {
      Session.speakingWith = conversation.contact;
      $state.go('messages.conversation', {id: conversation.contact.id});
    }   
  });
