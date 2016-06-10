'use strict';

angular.module('ocelotApp')
.controller('SignupCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
	$scope.data = {};
	$scope.signupError = false;

	$scope.signup = function(data) {
		AuthService.signup(data.username, data.password, data.email).then(function(authenticated) {
			$state.go('dash');
		}, function(err) {
			$scope.signupError = true;
		});
	};
	
	$scope.checkEmail = function(data) {
		return AuthService.checkEmail(data);
	};
	
	$scope.checkUsername = function(data) {
		return AuthService.checkUsername(data);
	};
}]);