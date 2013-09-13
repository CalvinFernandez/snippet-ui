'use strict';

angular.module('snippetUiApp', ['ui.router'])
  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('inbox', {
        url: '/inbox',
        templateUrl: 'views/inbox.html',
        controller: 'MainCtrl'
      })
      .state('inbox.options', {
        url: '',
        templateUrl: 'views/inbox.options.html',
        onEnter: function(){
          var inbox = document.getElementById('inbox-container');
          var width = inbox.offsetWidth;
          inbox.style.width = width + 'px';
          inbox.parentNode.style.overflow = 'hidden';
          inbox.style.marginLeft = '75%';
        },
        onExit: function(){
          var inbox = document.getElementById('inbox-container');
          inbox.parentNode.style.overflow = 'auto';
          inbox.style.width = 'inherit';
          inbox.style.position = 'static';
          inbox.style.marginLeft = 'auto';
        }
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
