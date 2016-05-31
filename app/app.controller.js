angular.module('ocelotApp')
.controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
});