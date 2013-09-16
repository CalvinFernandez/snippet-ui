'use strict';

angular.module('snippetUiApp', ['ui.router', 'ngAnimate'])
  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.options = false;

    $state.data = {};  
    $rootScope.$on('$stateChangeSuccess', 
      //  Assign previous state to
      //  root scope so we can navigate 
      //  back and forth
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
          $scope.conversations = Conversations.all();
        }
      }) 
      .state('messages.conversation', {
        url: '/conversations/:id',
        templateUrl: 'views/messages.conversation.html',
        controller: 'ConversationCtrl'
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
      //.state('music.

      /*
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
          '@home': {
            templateUrl: 'views/conversation.html',
            controller: 'ConversationCtrl'
          }
        }
      })
      .state('home.messages.conversation.picksong', {
        url: '/songs',
        views: {
          '@home': {
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
      .state('home.songs.info', {
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
      */
  }); 
