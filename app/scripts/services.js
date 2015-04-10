'use strict';

var services = angular.module('Services', []);


services
.factory('services', ['$http', function($http) {
	var service = {};
	service.getFromRESTServer = function(msg,callback) {
		return $http.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action="+callback+"&"+msg);
	}
	service.getCodeTable = function(msg, callback) {
		return $http.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action=get_codetable&"+msg);
	}
	return service;
}]);

/*  FACTORY  ASINCRONA

(function () {
	'use strict';
	angular
	.module('Services', []).factory('services', ['$http', services]);
	function services($http) {

		var serviceProvider = function () {
			this.data = [];
			this.errors = [];
		}
		var model = {
			getInstance:function(){ return new serviceProvider(); }
		}
        		serviceProvider.prototype.init = function(){//put some init stuff here
        		}
        		serviceProvider.prototype.getFromRESTServer = function(msg,callback){
        			return $http.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action="+callback+"&"+msg);
        		}
        		return model;
        	}	
        })();*/