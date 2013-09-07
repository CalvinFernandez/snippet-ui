'use strict';

angular.module('snippetUiApp')
  .factory('Conversations', function (Songs) {
    // Service logic
    // ...
    
    var songs = Songs.all();

    var _me = {
      'number': 0,
      'name': 'Walter White'
    }; 

    var conversations = [
      { 
      'recipient': {
        'number': 1,
        'name': 'Gale'
      },
      'unread': true,

      'messages': [{
        'author': {
          'number': 0,
          'name': 'Walter White'
        },
        'song': songs[0], 
        'listened': 'true', 
        'text': 'Hey Gale, hows it going?'
      }, 
      {
        'author': {
          'number': 1,
          'name': 'Gale'
        },
        'text': 'Hey, doing fine. Just making some coffee.'
      },
      {
        'author': {
          'number': 1,
          'name': 'Gale'
        },
        'song': songs[1], 
        'listened': 'false',
        'text': 'I think youll like this'
      }
      ]
    },
    {
    'recipient': {
        'number': 2,
        'name': 'Skyler'
      },
      'unread': true,

      'messages': [{
        'author': {
          'number': 2,
          'name': 'Skyler'
        },
        'text': 'Hey honey, where are you?'
      }, 
      {
        'author': {
          'number': 0,
          'name': 'Walter White'
        },
        'text': 'Hey Skyler, I"m still at work, don"t worry, Ill be back soon!'
      },
      {
        'author': {
          'number': 0,
          'name': 'Walter White'
        },
        'text': "What are we having for dinner?"
      },
      {
        'author': {
          'number': 2,
          'name': 'Skyler'
        },
        'text': "How does this sound?",
        'song': songs[4], 
        'listened': 'false' 
      }
      ]
    }
    ];

    return {
      // Public API 
      all: function () {
        return conversations;
      },
      me: function() {
        return _me;
      }
    };
  });
