'use strict';

angular.module('snippetUiApp')
  .controller('ContactsCtrl', function ($scope, $state, Contacts) {

    $scope.header.headerName = 'Contacts';
    if ($state.data.caller.name === 'conversation' || 
        $state.data.caller.name === 'newConversation') {
      //  State 1: contacts accessed from the conversation
      //  state. Selecting a contact should go back to the 
      //  previous conversation with this as the contact.
      //  Top right button should say cancel and should 
      //  go back the previous conversation WITHOUT selecting
      //  a new contact
      $scope.header.leftBtn = 'Back'; 
      $scope.header.leftBtnFn = function() {
        window.history.back();  
      }
      $scope.header.rightBtn = 'Cancel';
      $scope.header.rightBtnFn = function() {
        window.history.back();
      }
      $scope.select = function(contact) {
        $state.go('conversation', {id: contact.id});
      }
    } else {
      // State 2: Contacts accessed from somewhere else.
      // Default. Selecting a contact should show more 
      // contact details. Top Left should list options
      // top right should go to new contact
      $scope.header.leftBtn = "<i class='icon-reorder'></i>";
      $scope.header.leftBtnFn = function() {
        $scope.sidebar.show = !$scope.sidebar.show;        
      }

      $scope.header.rightBtn = '';//"<i class='icon-plus'></i>";
      $scope.header.rightBtnFn = function() {
        $state.go('contacts.new'); 
      }   
      $scope.select = function(contact) {
        $state.go('contact', {id: contact.id});  
      }
    }

    $scope.contacts = Contacts.all();
    $scope.newContact = {};

    $scope.saveContact = function() {
      $scope.newContact.id = $scope.contacts.length;
      $scope.contacts.push($scope.newContact);
      $scope.newContact = {};   
    }
  })
  .controller('ContactCtrl', function ($scope, $state, $stateParams, Contacts) {
    $scope.contact = Contacts.show($stateParams.id);
    $scope.header.headerName = 'Contact';
    $scope.header.leftBtn = '<small>Back</small>';
    $scope.header.leftBtnFn = function() {
      window.history.back();      
    } 
    $scope.header.rightBtn = '';
    $scope.header.rightBtnFn = function() {
       
    }
  });
