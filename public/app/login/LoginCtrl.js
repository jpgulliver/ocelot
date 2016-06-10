'use strict';

angular.module('ocelotApp')
.controller('LoginCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
  $scope.data = {};
  $scope.loginError = false;
  
  
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('dash');
    }, function(err) {
      $scope.loginError = true;
    });
  };
}]);