'use strict';

var search = angular.module('SearchCtrlAgenziaModule', []);

search.controller('SearchAgenziaCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory', 'APP_CFG',
  function ($scope, $rootScope, $window, services, $location, customFactory, APP_CFG) {

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if (customFactory.get('isLogged') == null || customFactory.get('userData') == null) {
      $location.path("/");
    }

    //tiro su la codetable delle languages
    services.getCodeTable("codetable=3").success(function (data) {
      //alert(JSON.stringify(data));
      $scope.languages = data;
    });

    //fields
    services.getCodeTable("codetable=4").success(function (data) {
      //alert(JSON.stringify(data));
      $scope.fields = data;
    });

    services.getCodeTable("codetable=5").success(function (data) {
      //alert(JSON.stringify(data));
      $scope.services = data;
    });

    $scope.doResetForm = function () {
      $scope.mothertongueSearchFrom = null;
      $scope.mothertongueSearchTo = null;
      $scope.service = null;
      $scope.typeNumber = null;
      $scope.pagesNumber = null;
      $scope.typeNumberVal = null;
      $scope.pagesNumberVal = null;
      $scope.field = null;
      $scope.ktr = null;
      $scope.deadline = null;
      $scope.pricefrom = null;
      $scope.priceto = null;
      $scope.searchForm.$setPristine();
    };

    $scope.doSearch = function () {

      services.getFromRESTServer(
        "mothertongueSearchFrom=" + $scope.mothertongueSearchFrom +
        "&mothertongueSearchTo=" + $scope.mothertongueSearchTo +
        "&service=" + $scope.service +
        "&typeNumber=" + $scope.typeNumber +
        "&pagesNumber=" + $scope.pagesNumber +
        "&typeNumberVal=" + $scope.typeNumberVal +
        "&pagesNumberVal=" + $scope.pagesNumberVal +
        "&field=" + $scope.field +
        "&ktr=" + $scope.ktr +
        "&deadline=" + $scope.deadline +
        "&pricefrom=" + $scope.pricefrom +
        "&priceto=" + $scope.priceto,
        "search")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
          }
          else {
            $scope.searchResult = data[0];
          }
        });
    }
  }]);
