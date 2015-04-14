'use strict';

var services = angular.module('Services', []);

services
.factory('services', ['APP_CFG','$http', function(APP_CFG, $http) {
	var service = {
		"endpoint" : APP_CFG.request.url
	};

	service.init = function() {

		service.endpoint = APP_CFG.environment != null ? APP_CFG[APP_CFG.environment].request.url : APP_CFG.request.url;
	}
	service.getFromRESTServer = function(msg,callback) {
		service.init();
		return $http.jsonp(service.endpoint + "?callback=JSON_CALLBACK&action="+callback+"&"+msg);
	}
	service.getCodeTable = function(msg, callback) {
		service.init();
		return $http.jsonp(service.endpoint +"?callback=JSON_CALLBACK&action=get_codetable&"+msg);
	}

	service.getConfiguration = function (callback){
		service.init();
		return $http({url: APP_CFG[APP_CFG.environment].urls.config_endpoint, method:"get",headers:{'Content-Type':'application/javascript'}, data:{}});
		//equivalente return $http.get(APP_CFG[APP_CFG.environment].urls.config_endpoint, {headers:{'Content-Type':'application/javascript'}});
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
