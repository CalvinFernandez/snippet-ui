'use strict';

angular.module('snippetUiApp', ['ui.router', 'ngAnimate', 'ngSanitize'])
  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.options = false;

    $state.data = {};  
    $rootScope.$on('$stateChangeSuccess', 
      function(ev, to, toParams, from, fromParams) {
        $state.data.caller = from;      
      }
    );
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/messages');

    $stateProvider
      .state('messages', {
        url: '/messages',
        abstract: true,
        views: {
          'mainView': {
            templateUrl: 'views/messages.html'
          }
        }
      })
      .state('messages.list', {
        url: '',  
        templateUrl: 'views/messages.list.html',
        controller: function($scope, $state, Conversations) {
          $scope.header.headerName = 'Messages'
          $scope.header.leftBtn = "<i class='icon-reorder'></i>";
          $scope.header.leftBtnFn = function() {
            $scope.sidebar.show = !$scope.sidebar.show;        
          }
          $scope.conversations = Conversations.all();
        }
      }) 
      .state('messages.conversation', {
        url: '/conversations/:id',
        templateUrl: 'views/messages.conversation.html',
        controller: 'ConversationCtrl'
      })
      .state('messages.new', {
        url: '/new?id',
        templateUrl: 'views/messages.conversation.html'
      })
      .state('music', {
        url: '/music',
        abstract: true,
        views: {
          'mainView': {
            templateUrl: 'views/music.html',
            controller: 'SongsCtrl'
          }
        }
      })
      .state('music.all', {
        url: '',
        templateUrl: 'views/music.all.html', 
      })
      .state('music.genres', {
        url: '',    
        templateUrl: 'views/music.genres.html',
        controller: 'GenresCtrl'
      })
      .state('music.genre', {
        url: '',
        templateUrl: 'views/music.genre.html',
        controller: 'GenreCtrl'
      })
      .state('music.genre.list', {
        url: '',    
        templateUrl: 'views/music.all.html'
      })
      .state('contacts', {
        url: '/contacts',
        abstract: true,
        views: {
          'mainView': {
            templateUrl: 'views/contacts.html',
            controller: 'ContactsCtrl' 
          }
        }
      })
      .state('contacts.list', {
        url: '',
        templateUrl: 'views/contacts.list.html',
        controller: function($scope, $state) {
          $scope.header.headerName = 'Contacts';

          $scope.header.leftBtn = "<i class='icon-reorder'></i>";
          $scope.header.leftBtnFn = function() {
                $scope.sidebar.show = !$scope.sidebar.show;        
          }

          $scope.header.rightBtn = "<i class='icon-plus'></i>";
          $scope.header.rightBtnFn = function() {
            $state.go('contacts.new'); 
          }
        }
      })
      .state('contacts.show', {
        url: '/show/:id',
        templateUrl: 'views/contacts.show.html',
        controller: function($scope, $state, $stateParams) {
          $scope.contact = $scope.contacts[$stateParams.id];

          $scope.header.headerName = 'Contact';
          $scope.header.leftBtn = '<small>Back</small>';
          $scope.header.leftBtnFn = function() {
            window.history.back();      
          } 
          $scope.header.rightBtn = 'Edit';
          $scope.header.rightBtnFn = function() {
             
          }
        }
      })
      .state('contacts.new', {
        url: '/new',
        templateUrl: 'views/contacts.new.html',
        controller: function($scope, $state, Conversations) {
          $scope.header.headerName = 'New';
          $scope.header.leftBtn = '<small>Cancel</small>';
          $scope.header.leftBtnFn = function() {
            $scope.newContact.name = ''; 
            $scope.newContact.email = '';
            window.history.back();      
          } 
          $scope.header.rightBtn = 'Done';
          $scope.header.rightBtnFn = function() {
            $scope.saveContact();       
            window.history.back();
          }
        }
      })
  }); 
