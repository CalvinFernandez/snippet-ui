'use strict';

angular.module('snippetUiApp', ['ui.router', 'ngCookies', 'ngSanitize', 'ngTouch', 'http-auth-interceptor'])
  .run(function($rootScope, $state, $stateParams, Session, Validate) {
    
    $rootScope.validates('conversations', 'user', 'tos')
    $rootScope.validates('conversation', 'user', 'tos')
    $rootScope.validates('newConversation', 'user', 'tos')
    $rootScope.validates('contacts', 'user', 'tos')


    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.options = false;

    $state.data = {};  

    $rootScope.$on('$stateChangeSuccess', 
      function(ev, to, toParams, from, fromParams) {
        $state.data.caller = from;      

        if ($state.is('conversations')) {
          //
          // If you're in the messages.list 
          // state, you aren't speaking with
          // anyone yet
          //
          Session.speakingWith = '';  
          //
          // If you're in messages.list
          // state clear the selected 
          // song
          //
          Session.selectedSong = '';
        }
      }
    );
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/conversations');

    $stateProvider
      .state('tos', {
        url: '/terms',
        templateUrl: 'views/tos.html',
        controller: function($state, $scope, Session, $http) {
	  $scope.header.headerName = 'Terms of Service';
          $http.get('termsOfService.txt').then(function(resp) {
            $scope.terms = resp.data;
          });

          $scope.accept = function() {
            Session.signTOS(); 
            $state.go('conversations');
          }   
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html', 
        controller: 'LoginCtrl' 
      })
      .state('logout', {
        url: '/logout',   
        template: '<h1> loggin out ... </h1>',
        controller: 'LogoutCtrl' 
      })
      .state('conversations', {
        url: '/conversations',
        templateUrl: 'views/conversations.list.html',
        controller: 'ConversationsCtrl'
      })
      .state('newConversation', {
        url: '/conversations/new',
        templateUrl: 'views/conversation.show.html',
        controller: 'ConversationCtrl'
      })
      .state('conversation', {
        url: '/conversations/:id',
        templateUrl: 'views/conversation.show.html',
        controller: 'ConversationCtrl'
      })

      .state('music', {
        url: '/music',
        abstract: true,
        views: {
          '': {
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
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl' 
      })
      .state('contact', {
        url: '/contacts/:id',
        templateUrl: 'views/contacts.show.html',
        controller: 'ContactCtrl'
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
