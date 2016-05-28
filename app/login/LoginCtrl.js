'use strict';

angular.module('ocelotApp')
.controller('LoginCtrl', function($scope, $state, AuthService) {
  $scope.data = {};
  $scope.loginError = false;
  
  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      loginError = true;
    });
  };
})