'use strict';

angular.module('snippetUiApp')
  .controller('MainCtrl', function ($scope, $state, Conversations) {

  $scope.conversations = Conversations.all();
  $scope.me = Conversations.me();

  $scope.header = {
    title: 'Inbox'
  }

  $scope.toggleOptions = function() {
    if ($state.current.name === 'inbox.options') {
      $state.go('inbox');
    } else {
      $state.go('inbox.options');
    }
  }
});
