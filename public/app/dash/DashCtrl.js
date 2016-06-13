angular.module('ocelotApp')
.controller("DashCtrl", ['$scope', '$state', '$http', '$q', 'AuthService', function($scope, $state, $http, $q, AuthService) {
	$scope.friends = [];
	
	$http.get('api/friends').then(function(response) {
		if (response.data.success) {
			$scope.friends = response.data.friends;
			return response.data;
		} else {
			// invalid response
			return $q.reject(response.data);
		}
	}, function(response) {
		// something went wrong
		return $q.reject(response.data);
	});
	
	$scope.logout = function() {
		AuthService.logout();
		$state.go('login');
	}
}]);