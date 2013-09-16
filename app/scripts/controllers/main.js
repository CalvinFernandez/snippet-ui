'use strict';

angular.module('snippetUiApp')
  .controller('MainCtrl', function ($scope, $rootScope, $state, Conversations) {
    $scope.header = {}; 
    $scope.sidebar = {
      show: false
    }

    $scope.sidebar.categories = [
      {'name': 'Messages', 'path': 'messages.list', 'icon': 'icon-envelope'}, 
      {'name': 'Songs', 'path': 'music.all', 'icon': 'icon-music'}, 
      {'name': 'Contacts', 'path': 'contacts.list', 'icon': 'icon-group'}, 
      {'name': 'Settings', 'path': 'settings', 'icon': 'icon-puzzle-piece'}, 
      {'name': 'Sign Out', 'path': 'signout', 'icon': 'icon-key'}];     

  });
