'use strict';

angular.module('snippetUiApp')
  .factory('Session', function ($http, $cookieStore, $state) {
    //
    //  Session is a service where we 
    //  store data that will persist across the scope
    //  of multiple states
    //

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
        return $cookieStore.get('session');    
      },

      getId: function() {
        if (!this.signedTOS()) {
          $state.go('tos');
	  return;
        } 
        var session = $cookieStore.get('session');
        if (session) {
          return session.id; 
        } else {
          $state.go('login');
          return;
	} 
      },

      get: function() {

        var session = $cookieStore.get('session');
        if (!this.signedTOS()) {
          return $state.go('tos');
        } 
        if (!session) {
          $state.go('login');  
        } else {
          return session;
        }
      },

      put: function(sessionData) {
        $cookieStore.put('session', sessionData);
      }, 

      destroy: function() {
        $cookieStore.remove('session');
      },

      signedTOS: function() {
        return $cookieStore.get('tos');  
      },

      signTOS: function() {
        $cookieStore.put('tos', true);
      }
    
    }
  });

