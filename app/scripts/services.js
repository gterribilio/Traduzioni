'use strict';

var services = angular.module('Services', []);

services
.factory('services', ['$http', function($http) {
	var service = {};
	service.getFromRESTServer = function(msg,callback) {
		/*alert("msg: "+msg);*/
		return $http.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action="+callback+"&"+msg);
	}
	service.getCodeTable = function(msg, callback) {
		return $http.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action=get_codetable&"+msg);
	}
	return service;
}]);