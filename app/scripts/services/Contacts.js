'use strict';

angular.module('snippetUiApp')
  .factory('Contacts', function ($http, Session) {
    var path = '/api/users/contacts';
    var showPath = '/api/users/show';

    return {
      all: function () {
        var _params = Session.get();  
        return $http({
          method: 'GET',
          url: path,
          params: _params
        }).then(function(resp) {
          if (resp.data instanceof Array) {
            return resp.data;
          } else { 
            return [resp.data];
          }
        })
      },
      show: function(id) {
        return $http({
          method: 'GET',  
          url: showPath,   
          params: {
            id: id
          }
        }).then(function(resp) {
          return resp.data;
        });
      }
    }
  });

