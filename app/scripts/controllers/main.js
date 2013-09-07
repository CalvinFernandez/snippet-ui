'use strict';

angular.module('snippetUiApp')
  .controller('MainCtrl', function ($scope, Conversations) {

  $scope.conversations = Conversations.all();
  $scope.me = Conversations.me();

});
