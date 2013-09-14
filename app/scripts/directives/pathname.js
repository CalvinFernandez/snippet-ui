'use strict';

angular.module('snippetUiApp')
  .directive('pathName', function () {

    function parsePath(path) {
      var paths = path.split('.');
      return paths[paths.length - 1];
    }

    return {
      restrict: 'A',  
      elem: {},

      link: function($scope, $element, $attrs) {
        var value = $scope.$eval($attrs.pathName);
        $element.html(parsePath(value));

        $scope.$watch($attrs.pathName, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $element.html(parsePath(newValue));
          }
        });
      }
    }
  });
