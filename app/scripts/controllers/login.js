'use strict';

angular.module('snippetUiApp')
  .controller('LoginCtrl', function ($scope, $state, Session, $http) {

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
        //  Set the new session
        //
        Session.put(resp.data);
        $state.go('conversations');
      });
    }
  })
  .controller('LogoutCtrl', function ($scope, $state, Session, $http) {
    var path = '/api/users/sign_out';  
        
    $http({ 
      method: 'POST',
      url: path,
      data: {
        email: Session.get().email
      }
    }).then(function(response) {
      Session.destroy();
      $state.go('login');
    });
  })
