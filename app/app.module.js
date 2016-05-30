'use strict';

// Declare app level module which depends on views, and components
angular.module('ocelotApp', ['ui.router', 'angular-jwt'])
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
	if (next.name !== 'signup' && next.name !== 'login') {
		if (!AuthService.isAuthenticated()) {
			event.preventDefault();
			$state.go('login');
		}
	}
  });
});