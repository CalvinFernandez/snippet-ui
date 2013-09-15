angular.module('snippetUiApp')
  .controller('NavbarCtrl', function ($rootScope, $scope) {
    $scope.toggleOptions = function() {
      $rootScope.options = !$rootScope.options;
    }      
    $scope.back = function() {
        window.history.back();
    }
  });
