angular.module('snippetUiApp')
  .controller('SidebarCtrl', function ($scope, $state) {
    $scope.categories = [
      {'name': 'Messages', 'path': 'messages.list', 'icon': 'icon-envelope'}, 
      {'name': 'Songs', 'path': 'music.all', 'icon': 'icon-music'}, 
      {'name': 'Contacts', 'path': 'contacts.list', 'icon': 'icon-group'}, 
      {'name': 'Settings', 'path': 'settings', 'icon': 'icon-puzzle-piece'}, 
      {'name': 'Sign Out', 'path': 'signout', 'icon': 'icon-key'}];     

    $scope.navigate = function(path) {
      $state.go(path); 
      //$scope.show.options = false;
    }
      });
