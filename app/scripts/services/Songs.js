'use strict';

angular.module('snippetUiApp')
  .factory('Songs', function () {
    // Service logic
    // ...

    var birthday = document.createElement('audio'); 
    birthday.src = '/audio/birthday.mp3';

    var hawaii = document.createElement('audio'); 
    hawaii.src = '/audio/hawaii.mp3';

    var coming_home = document.createElement('audio'); 
    coming_home.src = '/audio/coming_home.mp3';

    var tiny_dancer = document.createElement('audio'); 
    tiny_dancer.src = '/audio/tiny_dancer.mp3';

    var chicken_fried = document.createElement('audio'); 
    chicken_fried.src = '/audio/chicken_fried.mp3';

    var songs = [{
      'id': 0,
      'name': 'Happy Birthday',  
      'artist': 'The Beatles',
      'album': 'The White Album',
      'length': '2:44',
      'url': 'testing.com',
      'element': birthday
    },
    {
      'id': 1,
      'name': 'Mele Kalikimaka',
      'artist': 'Bing Crosby',
      'album': '',
      'length': '3:23',
      'url': 'testing1.com',
      'element': hawaii 
    },
    {
      'id': 2,
      'name': "Mama I'm coming home",
      'artist': 'Ozzy Osbourne',
      'album': 'No More Tears',
      'length': '4:15',
      'url': 'testing2.com',
      'element': coming_home
    },
    {
      'id': 3,
      'name': 'Tiny Dancer',
      'artist': 'Billy Joel',
      'album': 'Madman Across the Water',
      'length': '6:01',
      'url': 'testing3.com',
      'element': tiny_dancer
    },
    {
      'id': 4,
      'name': 'Chicken Fried',
      'artist': 'Zac Brown Band',
      'album': 'Home Grown',
      'length': '4:56',
      'url': 'testing4.com',
      'element': chicken_fried 
    }
    ];
    

    // Public API here
    return {
      all: function () {
        return songs;
      }
    };
  });
