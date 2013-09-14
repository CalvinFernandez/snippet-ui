angular.module('snippetUiApp')
  .directive('rootShow', function() {

    function isRoot(path) {
      return path.split('.').length === 1; 
    }

    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var expression = $attrs.rootShow;

        if (!isRoot($scope.$eval(expression))) {
          $element.hide();  
        } 

        $scope.$watch(expression, function(newValue, oldValue) {
          if (isRoot(newValue)) {
            $element.show();
          } else {
            $element.hide();
          }  
        });
      } 
    } 
})
  .directive('rootHide', function() {
    function isRoot(path) {
      return path.split('.').length === 1; 
    }
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        var expression = $attrs.rootHide;

        if (isRoot($scope.$eval(expression))) {
          $element.hide();  
        } 

        $scope.$watch(expression, function(newValue, oldValue) {
          if (isRoot(newValue)) {
            $element.hide();
          } else {
            $element.show();
          }  
        });
      } 
    }
});
