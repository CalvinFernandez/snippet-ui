'use strict';

angular.module('snippetUiApp')
  .directive('playButton', function () {

    var sizes = ['icon', 'icon-large', 'icon-2x', 'icon-3x', 'icon-4x'];

    return {
      template: '<i ng-hide="playing || !loaded" ng-click="toggleSong()" class="icon-play {{iconSize}}"></i>' + 
      '<i ng-show="playing && loaded" ng-click="toggleSong()" class="icon-pause {{iconSize}}"></i>' + 
      '<i ng-hide="loaded" class="icon-spinner {{iconSize}}"></i>',
        
      restrict: 'E',

      scope: {
        src: '=',
        size: '='  
      },

      link: function postLink($scope, $element, $attrs) {
        $scope.audioElement = document.createElement('audio');
        $scope.iconSize = sizes[$scope.size];

        $scope.playing = false;
        $scope.loaded = false;

        $scope.audioElement.addEventListener('ended', function() {
          //
          //  Toggle back to not playing //
          //
          $scope.$apply(
            function() {  
              $scope.playing = false;
            });
        });

        $scope.audioElement.addEventListener('canplaythrough', function() {
          //
          //  Wait for loading event to finish before allowing 
          //  playback
          //  
          $scope.$apply(
            function() {
              $scope.loaded = true;
            });
        });

        $scope.audioElement.src = $scope.src;  
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
