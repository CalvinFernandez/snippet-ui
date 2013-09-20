angular.module('snippetUiApp')
  .factory('Assert', function ($rootScope) {

    $rootScope.closeAlert = function() {
      $rootScope.alerts = [];    
    }

    $rootScope.alerts = [];

    var assert = function(test, message) {
      if (!test) {
        $rootScope.alerts.push(message);
        return true;
      }
      return false;
    };

    return assert;   
  });
 
