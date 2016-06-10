angular.module('ocelotApp')
.controller("DashSideBarCtrl", ['$state', 'AuthService', function($state, AuthService) {
	this.teams = [];
	
	this.logout = function() {
		AuthService.logout();
		$state.go('login');
	}
}]);