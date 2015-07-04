'use strict';

var services = angular.module('Services', []);

services
  .factory('services', ['APP_CFG', '$http', function (APP_CFG, $http) {
    var service = {
      "endpoint": APP_CFG.request.url
    };

    service.init = function () {

      service.endpoint = APP_CFG.environment != null ? APP_CFG[APP_CFG.environment].request.url : APP_CFG.request.url;
    }
    service.getFromRESTServer = function (msg, callback) {
      service.init();
      return $http.jsonp(service.endpoint + "?callback=JSON_CALLBACK&action=" + callback + "&" + msg);
    }
    service.getCodeTable = function (msg, callback) {
      service.init();
      return $http.jsonp(service.endpoint + "?callback=JSON_CALLBACK&action=get_codetable&" + msg);
    }

    service.getConfiguration = function (callback) {
      service.init();

      return $http.jsonp(APP_CFG[APP_CFG.environment].urls.config_endpoint + "?callback=JSON_CALLBACK");
      //equivalente return $http.get(APP_CFG[APP_CFG.environment].urls.config_endpoint, {headers:{'Content-Type':'application/javascript'}});
    }

    function getUserInfo () {
      FB.api('/me', function (res) {
        $rootScope.$apply(function () {
          $rootScope.user = res;
        });
      });
    }

    service.watchAuthenticationStatusChange = function () {
      var _self = this;
      FB.Event.subscribe('auth.authResponseChange', function (res) {
        if (res.status === 'connected') {
          /*
           The user is already logged,
           is possible retrieve his personal info
           */
          getUserInfo();
          /*
           This is also the point where you should create a
           session for the current user.
           For this purpose you can use the data inside the
           res.authResponse object.
           */
        }
        else {
          /*
           The user is not logged to the app, or into Facebook:
           destroy the session on the server.
           */
        }
      });
    };

    /***************** RETURN PER TUTTI I SERVICES ****************/
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
