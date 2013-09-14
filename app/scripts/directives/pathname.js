'use strict';

angular.module('snippetUiApp')
  .directive('pathName', function () {
    var value = '';
    var elem = {};

    function parsePath(path) {
      var paths = path.split('.');
      return paths[paths.length - 1];
    }

    return {
      restrict: 'A',  
      elem: {},

      link: function($scope, $element, $attrs) {
        elem = $element;
        elem.html(parsePath(value));
      },

      controller: function($scope, $state) {
        value = $state.current.name 

        $scope.$watch('$state.current.name', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            elem.html(parsePath(newValue));
          }
        });
      }
    }
  });
