'use strict';

angular.module('snippetUiApp')
  .factory('Contacts', function ($http) {
    var path = '/api/users/all'

    var contacts = $http.get(path);

    return {
      all: function (cb) {
        return contacts.then(function(resp) {
          cb.call(this, resp);
        })
      }
    }
  });

