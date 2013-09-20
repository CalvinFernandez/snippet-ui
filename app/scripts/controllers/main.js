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
      //{'name': 'Settings', 'path': 'settings', 'icon': 'icon-puzzle-piece'}, 
      $scope.sidebar.categories.push({'name': 'Log Out', 'path': 'logout', 'icon': 'icon-key'});     
    } else {
      $scope.sidebar.categories.push({'name': 'Log In', 'path': 'login', 'icon': 'icon-key'});
    }

  });
