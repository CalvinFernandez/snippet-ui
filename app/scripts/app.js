'use strict';

angular.module('snippetUiApp', ['ngRoute', 'ngAnimate'])
  .config(function ($routeProvider) {
    $routeProvider
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
      });
  });
