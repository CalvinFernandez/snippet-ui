'use strict';

angular.module('snippetUiApp', ['ui.router', 'ngCookies', 'ngSanitize', 'ngTouch', 'http-auth-interceptor'])
  .run(function($rootScope, $state, $stateParams, Session) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.options = false;

    $state.data = {};  
    $rootScope.$on('$stateChangeSuccess', 
      function(ev, to, toParams, from, fromParams) {
        $state.data.caller = from;      

        if ($state.is('messages.list')) {
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
      .otherwise('/messages');

    $stateProvider
      .state('tos', {
        url: '/terms',
        views: {
          'mainView': {
            templateUrl: 'views/tos.html',
            controller: function($state, $scope, Session, $http) {

              $http.get('termsOfService.txt').then(function(resp) {
                $scope.terms = resp.data;
              });

              $scope.accept = function() {
                Session.signTOS(); 
                $state.go('messages.list');
              }  
            }
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'mainView': {
            templateUrl: 'views/login.html', 
            controller: 'LoginCtrl' 
          }
        }
      })
      .state('logout', {
        url: '/logout',   
        views: {
          'mainView': {
            template: '<h1> loggin out ... </h1>',
            controller: 'LogoutCtrl' 
          }
        }
      })
      .state('messages', {
        url: '/messages',
        abstract: true,
        views: {
          'mainView': {
            templateUrl: 'views/messages.html',
            controller: 'ConversationCtrl'
          }
        }
      })
      .state('messages.list', {
        url: '',  
        templateUrl: 'views/messages.list.html',
        controller: function($scope, $state) {
          $scope.header.headerName = 'Messages'
          $scope.header.leftBtn = "<i class='icon-reorder'></i>";
          $scope.header.leftBtnFn = function() {
            $scope.sidebar.show = !$scope.sidebar.show;        
          }
          $scope.header.rightBtn = "<i class='icon-plus'></i>";
          $scope.header.rightBtnFn = function() {
            $state.go('messages.new');
          }
        }
      }) 
      .state('messages.conversation', {
        url: '/conversations/:id',
        templateUrl: 'views/messages.conversation.html',
        controller: function($scope, $state, $stateParams, Conversations, Session) {
          
          var session = Session.get();

          $scope.newMessage = {
            dstEmail: Session.speakingWith.email,
            song: Session.selectedSong  
          };

          $scope.header.headerName = 'Name';
          $scope.header.leftBtn = '<small> Messages </small>';
          $scope.header.leftBtnFn = function() {
            window.history.back();
          }     
          $scope.header.rightBtn = '';


          if ($stateParams.id) {
            $scope.conversation = Conversations.show(session.id, $stateParams.id);
            $scope.newConversation = false;
          }
          $scope.removeSong = function() {
            $scope.newMessage.song = '';
            Session.selectedSong = '';
          }
          $scope.sendMessage = function() {
            $scope.conversation = Conversations.newMessage({  
              src_id: session.id,
              dst_email: $scope.newMessage.dstEmail, 
              content: $scope.newMessage.content,
              song_id: $scope.newMessage.song.id
            })
          }
        } 
      })
      .state('messages.new', {
        url: '/new?id',
        templateUrl: 'views/messages.conversation.html',
        controller: function($scope, $state, $stateParams, Session, Conversations) {

          var session = Session.get();

          $scope.newMessage = {
            dstEmail: '',
            song: Session.selectedSong  
          };

          $scope.newConversation = true;
          $scope.header.headerName = 'New Message';  

          $scope.sendMessage = function() {
            $scope.conversation = Conversations.newMessage({  
              src_id: session.id,
              dst_email: $scope.newMessage.dstEmail, 
              content: $scope.newMessage.content,
              song_id: $scope.newMessage.song.id
            })
          }

          $scope.removeSong = function() {
            $scope.newMessage.song = '';
            Session.selectedSong = '';
          }

          $scope.header.leftBtn = '';
          $scope.header.rightBtn = 'Cancel';  
          $scope.header.rightBtnFn = function() {
            window.history.back();
          }
        }  
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
        controller: function($scope, $state, Session, Contacts) {

          $scope.header.headerName = 'Contacts';

          if ($state.data.caller.name === 'messages.new') {
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
              Session.speakingWith = contact;
              $state.go('messages.conversation', {id: contact.id});
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
              Session.speakingWith = contact;
              $state.go('contacts.show', {id: contact.id});  
            }
          }
        }
      })
      .state('contacts.show', {
        url: '/show/:id',
        templateUrl: 'views/contacts.show.html',
        controller: function($scope, $state, $stateParams, Session, Contacts) {

         $scope.contact = Contacts.show($stateParams.id);

         $scope.header.headerName = 'Contact';
          $scope.header.leftBtn = '<small>Back</small>';
          $scope.header.leftBtnFn = function() {
            window.history.back();      
          } 
          $scope.header.rightBtn = '';
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
