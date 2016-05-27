'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [])

// var teamsModel = [["bob", "john", "smith"], ["tom"], ["circle", "triangle"]];
var teamsModel = [{name:"bob"}, {name:"john"}, {name:"smith"}];

myApp.controller("TeamSideBarController", function() {
	this.teams = teamsModel;
});
