'use strict';

angular.module('snippetUiApp')
  .directive('liConversation', function () {
    return {
      template: 
        "<a class='no-styling' href='#/{{$index}}'>" +
          "<div class='col-xs-2'>" +
            "<span ng-show='convo.unread' class='glyphicon glyphicon-unchecked unread vertical-align'></span>" +
          "</div>" + 
          "<div class='col-xs-8'>" + 
            "<h1 class='overflow-ellipses no-wrap'>" +   
              "{{convo.recipient.name}}" +
            "</h1>" +
            "<p class='overflow-ellipsis no-wrap'>" +
              "{{convo.messages[convo.messages.length - 1].text}}" +
            "</p>" +
          "</div>" +
          "<div class='col-xs-2 vertical-align'>" + 
            "<span class='glyphicon glyphicon-chevron-right'></span>" +
          "</div>" +
        "</a>",

      restrict: 'EA',
    };
  });
