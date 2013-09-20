'use strict';

angular.module('snippetUiApp')
  .controller('ConversationsCtrl', function ($scope, $state, Conversations, Session) {

    $scope.header.headerName = 'Messages'
    $scope.header.leftBtn = "<i class='icon-reorder'></i>";
    $scope.header.leftBtnFn = function() {
      $scope.sidebar.show = !$scope.sidebar.show;        
    }
    $scope.header.rightBtn = "<i class='icon-plus'></i>";
    $scope.header.rightBtnFn = function() {
      $state.go('newConversation');
    }

    Conversations.all(Session.getId()).then(function(resp) {
      $scope.conversations = resp.data;
      if ($scope.conversations.length === 0) {
	$('#hints1').show();
      }
    });

    $scope.selectConversation = function(conversation) {
      Session.speakingWith = conversation.contact;
      $state.go('conversation', {id: conversation.contact.id});
    }   
  })

  .controller('ConversationCtrl', function($scope, $rootScope, $state, $stateParams, Conversations, Session, Assert) {

    var removeSong = function() {
      $scope.newMessage.song = '';
      Session.selectedSong = '';
    }

    var removeText = function() {
      $scope.newMessage.content = '';  
    }

    $scope.removeSong = removeSong;

    $scope.header.headerName = 'Name';
    $scope.header.leftBtn = '<small> Messages </small>';
    $scope.header.leftBtnFn = function() {
      window.history.back();
    }     
    $scope.header.rightBtn = '';

    $scope.conversation = [];
    $scope.newMessage = {
      song: Session.selectedSong
    };

    // Not a new conversation 
    if ($stateParams.id) {  
      Conversations.show(Session.getId(), $stateParams.id).then(function(resp){
        $scope.conversation = resp.data;
	if ($scope.conversation.length === 0 ) {
          $("#hints2").show();
        }
      }) 
    }

    $scope.sendMessage = function() {
      if (Assert($scope.newMessage.dstEmail || $stateParams.id, "Please select a contact or include an email address")) {
        return;
      }        
      var message = {
        src_id: Session.getId(),      
        content: $scope.newMessage.content, 
        sent: true, 
        song: $scope.newMessage.song,
        dst_id: $stateParams.id, 
        dst_email: $scope.newMessage.dstEmail
      };

      $scope.conversation.push(message);

      if  ($stateParams.id) {
        Conversations.newMessage({  
          src_id: Session.getId(),
          dst_id: $stateParams.id, 
          content: $scope.newMessage.content,
          song_id: $scope.newMessage.song.id
        })
      } else {
        Conversations.newMessage({  
          src_id: Session.getId(),
          dst_email: $scope.newMessage.dstEmail, 
          content: $scope.newMessage.content,
          song_id: $scope.newMessage.song.id
        })
      }
      removeSong();
      removeText(); 
    }
  });
