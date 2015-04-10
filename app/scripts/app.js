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
 	'DirectivesModule',
 	'JobsCtrlTraduttoreModule'
 	]);

 app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
 	$routeProvider.
 	when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'}).
 	when('/home_agenzia', {templateUrl: 'views/agenzia/home_agenzia.html', controller: 'HomeAgenziaCtrl'}).
 	when('/home_traduttore', {templateUrl: 'views/traduttore/home_traduttore.html', controller: 'HomeTraduttoreCtrl'}).
 	when('/jobs_traduttore', {templateUrl: 'views/traduttore/jobs_traduttore.html', controller: 'JobsTraduttoreCtrl'}).
 	when('/workarea/:tipo/:id', {templateUrl: 'views/traduttore/workarea.html', controller: 'WorkareaTraduttoreCtrl'}).
 	otherwise({redirectTo: '/'});
 }]);