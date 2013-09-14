'use strict';

angular.module('snippetUiApp', ['ui.router'])
  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        abstract: true,
        views: {
          'mainView': {
            templateUrl: 'views/home.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('home.messages', {
        url: '',
        templateUrl: 'views/home.messages.html',
        controller: function($scope, $state, Conversations) {
          $scope.conversations = Conversations.all();
        } 
      })
      .state('home.messages.conversation', {
        url: 'conversations/:id',
        views: {
          'mainView@': {
            templateUrl: 'views/conversation.html',
            controller: 'ConversationCtrl'
          }
        }
      })
      .state('home.messages.conversation.picksong', {
        url: '/songs',
        views: {
          'mainView@': {
            templateUrl: 'views/songs.html',
            controller: 'SongsCtrl'
          }
        }
      })
      .state('home.songs', {
        url: 'songs',
        templateUrl: 'views/songs.html',
        controller: 'SongsCtrl' 
      })
      .state('home.contacts', {
        url: 'contacts',
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl' 
      })
      .state('home.settings', {
        url: 'settings',
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl' 
      })


      /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl'
      })
      .when('/:number', {
        templateUrl: 'views/conversation.html',
        controller: 'ConversationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });*/
  }); 
