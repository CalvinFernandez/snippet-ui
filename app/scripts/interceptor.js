angular.module('snippetUiApp').run(['$rootScope', '$location', function($rootScope, $state) {
  $rootScope.$on('event:auth-loginRequired', function() {
    $state.go('login');
  });
}]);

