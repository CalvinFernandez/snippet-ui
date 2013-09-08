'use strict';

angular.module('snippetUiApp')
  .directive('liSong', function () {
    return {
      template: 

        '<div class="col-xs-2 vertical-align">' +
          '<play-button src="song.src" size="3"></play-button>' +
        '</div>' +
        '<div ng-click="selectSong(song)" class="col-xs-8 ">' +
          '<h3 class="no-wrap overflow-ellipsis"> {{song.name}} </h3>' +
          '<small> {{song.artist}}, {{song.album}}</small>' + 
        '</div>' +
        '<div ng-click="selectSong(song)"class="col-xs-2 vertical-align">' +
          '<span class="glyphicon glyphicon-chevron-right"></span>' +
        '</div>',

      restrict: 'EA',
    };
  });
