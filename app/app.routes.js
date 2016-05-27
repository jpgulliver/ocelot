angular.module("ocelotApp")
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl'
  })
  .state('dash', {
    url: '/dash',
    templateUrl: 'app/dash/dash.html',
    controller: 'DashSideBarCtrl'
  });
  
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("dash");
  });
});