'use strict';

angular.module('snippetUiApp')
  .factory('Session', function ($http, $cookieStore, $state) {
    //
    //  Session is a service where we 
    //  store data that will persist across the scope
    //  of multiple states
    //

    var tempSession = '';
    var tempTos = false;

    return {
      //
      //  Individual with whom user 
      //  is currently speaking with 
      //
      speakingWith: '',
      
      //  
      //  Currently selected song
      //
      selectedSong: '', 
      
      //
      //  Current session
      //
      loggedIn: function() {
        return $cookieStore.get('session') || tempSession; 
      },

      getId: function() {
        var session = $cookieStore.get('session') || tempSession;
        if (session) {
          return session.id; 
        } else {
          return '';
        } 
      },

      get: function() {
        return $cookieStore.get('session') || tempSession;
      },

      put: function(sessionData) {
        $cookieStore.put('session', sessionData);
        tempSession = sessionData;
      }, 

      destroy: function() {
        $cookieStore.remove('session');
        tempSession = '';
      },

      signedTOS: function() {
        return $cookieStore.get('tos') || tempTos; 
      },

      signTOS: function() {
        $cookieStore.put('tos', true);
        tempTos = true;
      }
    }
  });

