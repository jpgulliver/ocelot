angular.module('ocelotApp')
.controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    // var alertPopup = $ionicPopup.alert({
      // title: 'Session Lost!',
      // template: 'Sorry, You have to login again.'
    // });
  });
 
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
});