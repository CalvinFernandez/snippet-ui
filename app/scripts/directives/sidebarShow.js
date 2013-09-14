'use strict';

angular.module('snippetUiApp')
  .directive('sidebarShow', function () {


    return {
        
      restrict: 'A',

      link: function postLink($scope, $element, $attrs) {
        var expression = $attrs.sidebarShow; 
        var overlappingDiv = "#" + $attrs.sidebarShowOverlaps;

        //  Test expresion for the truth
        if (!$scope.$eval(expression)) {
          $element.hide();  
        }
        //  Watch value for updates
        //
        $scope.$watch(expression, function(newValue, oldValue) {
          if (newValue === true) {
            $element.show();
            var width = $(overlappingDiv).width();
            $(overlappingDiv).css({
              'width': width,
              'margin-left': '65%',
            });
            $("#mobile-overflow-fix").css('overflow', 'hidden');

          } else {
            $element.hide();
            $(overlappingDiv).css({
              'width': 'inherit',
              'margin-left': 'auto'
            }); 

            $("#mobile-overflow-fix").css('overflow', 'auto');
          }
        }); 
      }
    };
  });
