'use strict';

angular.module('snippetUiApp')
  .controller('MainCtrl', function ($scope, $rootScope, $state, Session) {

    $scope.header = {}; 
    $scope.sidebar = {
      show: false
    }

    $scope.sidebar.categories = [
      {'name': 'Messages', 'path': 'conversations', 'icon': 'icon-envelope'}, 
      {'name': 'Lyricoos', 'path': 'music.genres', 'icon': 'icon-music'}, 
      {'name': 'Contacts', 'path': 'contacts', 'icon': 'icon-group'}];

    if (Session.loggedIn()) {
      $rootScope.loggedIn = true;      
    }

    $scope.navigate = function(path) {
      $state.go(path);  
      $scope.sidebar.show = !$scope.sidebar.show;
    }

  });
