'use strict';

angular.module('snippetUiApp')
  .controller('MainCtrl', function ($scope, $rootScope, $state, Conversations) {
  
  $rootScope.show = {};
  $rootScope.hide = {};
  
  $scope.conversations = Conversations.all();
  $scope.me = Conversations.me();

  $scope.header = {
    title: 'Inbox'
  }

  $scope.toggleOptions = function() {
    $rootScope.show.options = !$rootScope.show.options;    
  }
});
