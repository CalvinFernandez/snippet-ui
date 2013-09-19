'use strict';

angular.module('snippetUiApp')
  .controller('ContactsCtrl', function ($scope, $state, Contacts) {

    $scope.contacts = Contacts.all();
    $scope.newContact = {};

    $scope.saveContact = function() {
      $scope.newContact.id = $scope.contacts.length;
      $scope.contacts.push($scope.newContact);
      $scope.newContact = {};   
    }
  })
