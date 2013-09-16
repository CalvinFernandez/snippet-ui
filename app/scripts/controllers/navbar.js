angular.module('snippetUiApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $state) {

    if ($state.data.caller.name === 'messages.conversation') {
      $scope.calledFromConversation = true;
    }

    $scope.toggleOptions = function() {
      $rootScope.options = !$rootScope.options;
    }      

    $scope.back = function() {
      window.history.back();
    }
  });
