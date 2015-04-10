'use strict';

var home = angular.module('HomeCtrlAgenziaModule', []);

home.controller('HomeAgenziaCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory',
	function ($scope, $rootScope, $window, services, $location, customFactory) {  

		$rootScope.isLogged = customFactory.get('isLogged');
		$rootScope.userData =  customFactory.get('userData');
	}]);