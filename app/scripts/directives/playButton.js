'use strict';

angular.module('snippetUiApp')
  .directive('playButton', function () {

    var sizes = ['icon', 'icon-large', 'icon-2x', 'icon-3x', 'icon-4x'];

    return {
      template: '<i ng-hide="playing || !loaded" ng-click="toggleSong()" class="icon-play-circle {{iconSize}}"></i>' + 
      '<i ng-show="playing && loaded" ng-click="toggleSong()" class="icon-pause {{iconSize}}"></i>' + 
      '<i ng-hide="loaded" class="icon-spinner {{iconSize}}"></i>',
        
      restrict: 'E',

      link: function postLink($scope, $element, $attrs) {
        $scope.audioElement = document.createElement('audio');

        $scope.playing = false;
        $scope.loaded = true; //false

        
        $scope.audioElement.addEventListener('ended', function() {
          //
          //  Toggle back to not playing //
          //
          $scope.$apply(
            function() {  
              $scope.playing = false;
            });
        });

        var source = $scope.$eval($attrs.src);
        var size = $scope.$eval($attrs.size);

        if (source) {
          $scope.audioElement.src = "/api" + source;      
        }
        if (size) {
          $scope.iconSize = size;
        }
        
        $scope.$watch($attrs.size, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.iconSize = newValue;
          }
        });
        $scope.$watch($attrs.src, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.audioElement.src = "/api" + newValue;
          }
        }); 
      },

      controller: function($scope, $element, $attrs) {

        $scope.toggleSong = function() {
          $scope.playing = !$scope.playing;

          if ($scope.audioElement.paused) {
            $scope.audioElement.play();
          } else {
            $scope.audioElement.pause();
          }
        }
      }
    };
  });
