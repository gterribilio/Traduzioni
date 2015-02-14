'use strict';

/**
 * @ngdoc overview
 * @name lemietraduzioniApp
 * @description
 * # lemietraduzioniApp
 *
 * Main module of the application.
 */
 var app = angular
 .module('lemietraduzioniApp', [
 	'ngRoute',
 	'Services',
 	'CommonModule',
 	'HomeCtrlModule',
 	'HomeCtrlTraduttoreModule',
 	'HomeCtrlAgenziaModule',
 	'DirectivesModule'
 	]);

 app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
 	$routeProvider.
 	when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'}).
 	when('/home_agenzia', {templateUrl: 'views/home_agenzia.html', controller: 'HomeAgenziaCtrl'}).
 	when('/home_traduttore', {templateUrl: 'views/home_traduttore.html', controller: 'HomeTraduttoreCtrl'}).
 	otherwise({redirectTo: '/'});
 }]);