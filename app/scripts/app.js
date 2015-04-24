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
    'JobsCtrlTraduttoreModule',
    'fileUpload'
  ]);

var app_cfg = {

  "endpoint_server" : "http://explico.altervista.org",

  "endpoint_upload_server" : "http://www.pastafrescalioni.it",

  "environment": "development",
  "request" : {
    "url" : ""
  },
  "development" : {
    "urls" : {
      "config_endpoint" : "http://www.pastafrescalioni.it/config.json.php"
    },
    "request" : {
    }
  },
  "production" : {}
};
app.constant('APP_CFG', app_cfg);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.
    when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl',
      resolve:{
        'MyServiceData': ['customFactory', function(customFactory){
          return customFactory.promise;
        }]
      }}).
    when('/home_agenzia', {templateUrl: 'views/agenzia/home_agenzia.html', controller: 'HomeAgenziaCtrl',
      resolve:{
        'MyServiceData': ['customFactory', function(customFactory){
          return customFactory.promise;
        }]
      }}).
    when('/home_traduttore', {templateUrl: 'views/traduttore/home_traduttore.html', controller: 'HomeTraduttoreCtrl',
      resolve:{
        'MyServiceData': ['customFactory', function(customFactory){
          return customFactory.promise;
        }]
      }}).
    when('/jobs_traduttore', {templateUrl: 'views/traduttore/jobs_traduttore.html', controller: 'JobsTraduttoreCtrl',
      resolve:{
        'MyServiceData': ['customFactory', function(customFactory){
          return customFactory.promise;
        }]
      }}).
    when('/workarea/:tipo/:id', {templateUrl: 'views/traduttore/workarea.html', controller: 'WorkareaTraduttoreCtrl',
      resolve:{
        'MyServiceData': ['customFactory', function(customFactory){
          return customFactory.promise;
        }]
      }}).
    otherwise({redirectTo: '/'});

  var $http,
    interceptor = ['$q', '$injector', function ($q, $injector) {

      function hide() {
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length < 1) {
          showModal(false);
        }
      }

      return {
        request: function (config) {
          showModal(true);
          return config || $q.when(config);
        },
        requestError: function (request) {
          hide();
          return $q.reject(request);
        },
        response: function (response) {
          hide();
          return response || $q.when(response);
        },
        responseError: function (error) {
          hide();
          return $q.reject(error);
        }
      };

    }];

  $httpProvider.interceptors.push(interceptor);
}]);

function showModal(value, id) {
  var isAlert;
  if (id == undefined) id = "loading";

  if (navigator.notification && id == "loading") {
    $('#overlay')['addClass']('ng-hide');
    if (value) {
      spinnerplugin.show();
    } else {
      spinnerplugin.hide();
    }
    return;
  }
  if (id == 'alert' && !value) {
    isAlert = false;
  }
  if (isAlert) return;
  var fn = (value ? 'removeClass' : 'addClass');
  if (id == 'alert' && value) {
    isAlert = true;
    $('#loading').addClass('ng-hide');
  }
  else $('#loading').removeClass('ng-hide');
  if (id == 'alert') $('#' + id)[fn]('ng-hide');
  $('#overlay')[fn]('ng-hide');
}


