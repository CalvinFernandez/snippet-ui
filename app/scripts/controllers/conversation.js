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

    $scope.session = Session;

    var removeSong = function() {
      $scope.session.conversation.song = '';
    }

    var removeText = function() {
      $scope.session.conversation.content = '';  
    }
    var removeHint = function() {
      $("#hints2").hide();
    }

    $scope.removeSong = removeSong;

    $scope.header.headerName = '';
    $scope.header.leftBtn = '<small> Messages </small>';
    $scope.header.leftBtnFn = function() {
      window.history.back();
    }     
    $scope.header.rightBtn = '';

    $scope.conversation = [];

    // Not a new conversation 
    if ($stateParams.id) {  
      Conversations.show(Session.getId(), $stateParams.id).then(function(resp){
        $scope.conversation = resp.data;
        if ($scope.conversation.length === 0 ) {
          $("#hints2").show();
        }
      }) 
    } else {
      $("#hints2").show();
    }

    $scope.sendMessage = function() {
      if (Assert($scope.session.conversation.email || $stateParams.id, "Please select a contact or include an email address")) {
        return;
      }        
      var message = {
        src_id: Session.getId(),      
        content: $scope.session.conversation.content, 
        sent: true, 
        song: $scope.session.conversation.song,
        dst_id: $stateParams.id, 
        dst_email: $scope.session.conversation.email
      };

      $scope.conversation.push(message);

      if  ($stateParams.id) {
        Conversations.newMessage({  
          src_id: Session.getId(),
          dst_id: $stateParams.id, 
          content: $scope.session.conversation.content,
          song_id: $scope.session.conversation.song.id
        })
      } else {
        Conversations.newMessage({  
          src_id: Session.getId(),
          dst_email: $scope.session.conversation.email, 
          content:   $scope.session.conversation.content,
          song_id:   $scope.session.conversation.song.id
        })
      }
      removeSong();
      removeText(); 
      removeHint();
    }
  });
