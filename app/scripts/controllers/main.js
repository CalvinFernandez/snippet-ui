'use strict';

angular.module('snippetUiApp')
  .controller('MainCtrl', function ($scope, $rootScope, $state, Conversations) {
  
  $rootScope.show = {};
  $rootScope.hide = {};
 
  $scope.conversations = Conversations.all();
  $scope.me = Conversations.me();

  $scope.back = function() {
    var previous = $rootScope.$from.pop();
    $state.go(previous.state, previous.params);
  }
});
