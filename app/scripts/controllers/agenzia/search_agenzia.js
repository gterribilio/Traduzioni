'use strict';

var search = angular.module('SearchCtrlAgenziaModule', []);

search.controller('SearchAgenziaCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory', 'APP_CFG',
  function ($scope, $rootScope, $window, services, $location, customFactory, APP_CFG) {

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if (customFactory.get('isLogged') == null || customFactory.get('userData') == null) {
      $location.path("/");
    }

    //tiro su la codetable delle languages
    services.getCodeTable("codetable=3").success(function (data){
      //alert(JSON.stringify(data));
      $scope.languages=data;
    });

    //fields
    services.getCodeTable("codetable=4").success(function (data){
      //alert(JSON.stringify(data));
      $scope.fields=data;
    });

    services.getCodeTable("codetable=5").success(function (data){
      //alert(JSON.stringify(data));
      $scope.services=data;
    });

  }]);
