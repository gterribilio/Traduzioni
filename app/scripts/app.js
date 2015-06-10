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
    'SearchCtrlAgenziaModule',
    'DirectivesModule',
    'JobsCtrlTraduttoreModule',
    'fileUpload',
    'ngLinkedIn'
  ]);

var app_cfg = {

  "endpoint_server": "http://explico.altervista.org",

  "endpoint_upload_server": "http://explico.altervista.org",

  "environment": "development",
  "request": {
    "url": ""
  },
  "development": {
    "urls": {
      "config_endpoint": "http://explico.altervista.org/config.json.php"
    },
    "request": {}
  },
  "production": {}
};
app.constant('APP_CFG', app_cfg);

app.config(['$routeProvider', '$httpProvider', '$linkedInProvider',
  function ($routeProvider, $httpProvider, $linkedInProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html', controller: 'HomeCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/home_agenzia', {
        templateUrl: 'views/agenzia/home_agenzia.html', controller: 'HomeAgenziaCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/home_traduttore', {
        templateUrl: 'views/traduttore/home_traduttore.html', controller: 'HomeTraduttoreCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/jobs_traduttore', {
        templateUrl: 'views/traduttore/jobs_traduttore.html', controller: 'JobsTraduttoreCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/workarea/:tipo/:id', {
        templateUrl: 'views/traduttore/workarea.html', controller: 'WorkareaTraduttoreCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/search_agenzia', {
        templateUrl: 'views/agenzia/search_agenzia.html', controller: 'SearchAgenziaCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/translatorDetail/:user_id', {
        templateUrl: 'views/agenzia/translatorDetail.html', controller: 'TranslatorDetailCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
      when('/send_a_job/:user_id', {
        templateUrl: 'views/agenzia/send_a_job.html', controller: 'SendAJobCtrl',
        resolve: {
          'MyServiceData': ['customFactory', function (customFactory) {
            return customFactory.promise;
          }]
        }
      }).
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

    //LINKEDIN SETTING
    $linkedInProvider.set('appKey', '78yuued4wl0cgc').set('scope', 'r_emailaddress r_basicprofile').set('authorize', false);
  }]);

/*********** RUN CODE **************/
app.run(['$rootScope', '$window', 'services', function ($rootScope, $window) {
    $window.fbAsyncInit = function () {
      // Executed when the SDK is loaded
      FB.init({
        /*
         The app id of the web app;
         To register a new app visit Facebook App Dashboard
         ( https://developers.facebook.com/apps/ )
         */
        appId: '456422687866536',
        /*
         Adding a Channel File improves the performance
         of the javascript SDK, by addressing issues
         with cross-domain communication in certain browsers.
         */
        channelUrl: 'app/channel.html',
        /*
         Set if you want to check the authentication status
         at the start up of the app
         */
        status: true,
        /*
         Enable cookies to allow the server to access
         the session
         */
        cookie: true,
        /* Parse XFBML */
        xfbml: true
      });
    };
    // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?
    (function (d) {
      // load the Facebook javascript SDK
      var js,
        id = 'facebook-jssdk',
        ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "http://connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));
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


