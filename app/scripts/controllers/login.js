'use strict';

angular.module('snippetUiApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $state, Session, $http, Assert) {

    var path = '/api/users/sign_in';

    $scope.header.headerName = 'Login';
    $scope.header.leftBtn = "<i class='icon-reorder'></i>";
    $scope.header.leftBtnFn = function() {
      $scope.sidebar.show = !$scope.sidebar.show;        
    }

    $scope.user = {
      email: '', 
      password: ''
    };     

    $scope.submit = function() {
      $http({
        method: 'POST', 
        url: path,
        data: {
          email: $scope.user.email,
          password: $scope.user.password
        }
      }).then(function(resp) {
        //
        //  Success
        //
        $rootScope.loggedIn = true;
        Session.put(resp.data);
        $state.go('conversations');
      }, function(resp) {
        //
        //  Error
        //
        Assert(false, 'Your username or email is incorrect. Please retry'); 
      });
    }
  })
  .controller('LogoutCtrl', function ($scope, $rootScope, $state, Session, $http) {
    var path = '/api/users/sign_out';  
        
    $http({ 
      method: 'POST',
      url: path,
      data: {
        email: Session.get().email
      }
    }).then(function(response) {
      Session.destroy();
      $rootScope.loggedIn = false;
      $state.go('login');
    });
  })
