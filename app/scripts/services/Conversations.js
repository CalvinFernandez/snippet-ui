'use strict';

angular.module('snippetUiApp')
  .factory('Conversations', function ($http) {
    // Service logic
    // ...
    var messagesPath = '/api/messages/all';
    
    var messagePath = '/api/users/messages';
    var newMessagePath = '/api/messages/new';
    
    return {
      // Public API 
      all: function (id) {
        return $http({
          method: 'GET',
          url: messagesPath,
          params: {
            id: id
          }
        }).then(function(resp) {
          return resp.data;
        });
      },

      show: function(userId, contactId) {
        return $http({
          method: 'GET',
          url: messagePath,
          params: {
            id: userId,
            contact_id: contactId
          } 
        }).then(function(resp) {
          return resp.data;
        });
      }, 
      newMessage: function(_params) {
        return $http({
          method: 'POST',
          url: newMessagePath,
          data: _params
        }).then(function(resp) {
          return resp.data;
        });
      }
    };
  });
