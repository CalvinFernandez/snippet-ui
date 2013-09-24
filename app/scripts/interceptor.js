angular.module('snippetUiApp').run(['$rootScope', '$state', function($rootScope, $state) {
  $rootScope.$on('event:auth-loginRequired', function() {
    //$state.go('login');
  });
}]);

