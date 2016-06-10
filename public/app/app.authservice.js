angular.module('ocelotApp') 
.service('AuthService', function($q, $http, jwtHelper) {
	var LOCAL_TOKEN_KEY = 'yourTokenKey';
	var username = '';
	var isAuthenticated = false;
	var role = '';
	var authToken;

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
		if (token) {
			useCredentials(token);
		}
	}

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}

	function useCredentials(token) {
		var tokenPayload;
		try {
			tokenPayload = jwtHelper.decodeToken(token);
		} catch ($e) {
			destroyUserCredentials();
			return;
		}
		
		username = tokenPayload.data.userName;
		isAuthenticated = true;
		authToken = token;

		// Set the token as header for your requests!
		$http.defaults.headers.common['X-Auth-Token'] = token;
	}

	function destroyUserCredentials() {
		authToken = undefined;
		username = '';
		isAuthenticated = false;
		$http.defaults.headers.common['X-Auth-Token'] = undefined;
		window.localStorage.removeItem(LOCAL_TOKEN_KEY);
	}

	var login = function(name, pw) {
		var data = $.param({username: name, password: pw});
		
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		
		return $http.post('api/login', data)
		.then(function(response) {
			if (response.data != 'login failed') {
				storeUserCredentials(response.data.jwt);
				return response.data;
			} else {
				// invalid response
				return $q.reject(response.data);
			}

		}, function(response) {
			// something went wrong
			return $q.reject(response.data);
		});
	};

	var signup = function(name, pw, em) {
		var data = $.param({username: name, password: pw, email: em});
		
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		
		return $http.post('api/signup.php', data)
		.then(function(response) {
			if (response.data != 'signup failed') {
				storeUserCredentials(response.data.jwt);
				return response.data;
			} else {
				// invalid response
				return $q.reject(response.data);
			}

		}, function(response) {
			// something went wrong
			return $q.reject(response.data);
		});
	};

	var checkEmail = function(v) {
		return $http.get('api/signup.php', {params: {type: 'email', value: v}})
		.then(function(response) {
			if (response.data == 'ok') {
				return $q.resolve();
			} else {
				return $q.reject();
			}
		}, function(response) {
			return $q.resolve();
		});
	};
	
	var checkUsername = function(v) {
		return $http.get('api/signup.php', {params: {type: 'username', value: v}})
		.then(function(response) {
			if (response.data == 'ok') {
				return $q.resolve();
			} else {
				return $q.reject();
			}
		}, function(response) {
			return $q.resolve();
		});
	};

	var logout = function() {
		destroyUserCredentials();
	};

	loadUserCredentials();

	return {
		login: login,
		logout: logout,
		signup: signup,
		checkEmail: checkEmail,
		checkUsername: checkUsername,
		isAuthenticated: function() {return isAuthenticated;},
		username: function() {return username;},
		role: function() {return role;}
	};
});

angular.module('ocelotApp')
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
	return {
		responseError: function (response) {
			$rootScope.$broadcast({
				401: AUTH_EVENTS.notAuthenticated,
			}[response.status], response);
			return $q.reject(response);
		}
	};
})

.config(function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});