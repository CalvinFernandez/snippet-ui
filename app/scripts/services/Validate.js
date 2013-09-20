angular.module('snippetUiApp')
  .factory('Validate', function ($rootScope, $state, Session) {
    var validate = 
    {
      'user': function() {
        return Session.loggedIn(); 
      }, 
      'tos': function() {
        return Session.signedTOS();
      }
    };
    var redirect = 
    {   
      'user': function() {
        $state.go('login'); 
      },
      'tos': function() {
        $state.go('tos');
      }
    };

    var validations = {};

    $rootScope.validates = function(stateName) {
      if (validations[stateName]) {
        for (var i = 1; i < arguments.length; i ++) {
          validations[stateName].push(arguments[i]);
        }
      } else {
        validations[stateName] = Array.prototype.slice.call(arguments, 1); 
      }  
    }      

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams) {
        var toValidate = validations[toState.name];      
        var len = (toValidate && toValidate.length) || 0;
        for (var i = 0; i < len; i ++ ) {
          var type = toValidate[i];
          if (!validate[type]()) {
            event.preventDefault();
            return redirect[type](); 
          } 
        } 
      }
    );
  });

