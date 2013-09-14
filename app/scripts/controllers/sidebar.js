angular.module('snippetUiApp')
  .controller('SidebarCtrl', function ($scope, $state) {
    $scope.categories = [
      {'name': 'Messages', 'path': 'home.messages', 'icon': 'icon-envelope'}, 
      {'name': 'Songs', 'path': 'home.songs', 'icon': 'icon-music'}, 
      {'name': 'Contacts', 'path': 'home.contacts', 'icon': 'icon-group'}, 
      {'name': 'Settings', 'path': 'home.settings', 'icon': 'icon-puzzle-piece'}, 
      {'name': 'Sign Out', 'path': 'home.signout', 'icon': 'icon-key'}];     

    $scope.navigate = function(path) {
      $state.go(path); 
      $scope.show.options = false;
    }
  });
