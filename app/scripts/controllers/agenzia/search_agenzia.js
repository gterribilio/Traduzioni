'use strict';

var search = angular.module('SearchCtrlAgenziaModule', []);

search.controller('SearchAgenziaCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory',
  function ($scope, $rootScope, $window, services, $location, customFactory) {

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if (customFactory.get('isLogged') == null || customFactory.get('userData') == null) {
      $location.path("/");
    }
    if ($rootScope.isLogged != null && $rootScope.userData != null && $rootScope.userData.RUOLO == 'TRADUTTORE') {
      $location.path("/home_traduttore");
    }

    $scope.mothertongueSearchFrom = null;
    $scope.mothertongueSearchTo = null;
    $scope.service = null;
    $scope.field = null;
    $scope.pricefrom = null;
    $scope.priceto = null;

    $scope.orderByField = '';
    $scope.reverseSort = false;

    //tiro su la codetable delle languages
    services.getCodeTable("codetable=3").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.languages = data;
    });

    //fields
    services.getCodeTable("codetable=4").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.fields = data;
    });

    //services
    services.getCodeTable("codetable=5").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.services = data;
    });


    $scope.doSearch = function () {

      var filter = {
        mothertongueSearchFrom: $scope.mothertongueSearchFrom.DESCRIZIONE,
        mothertongueSearchTo: $scope.mothertongueSearchTo.DESCRIZIONE,
        service: $scope.service.DESCRIZIONE,
        field: (($scope.field && $scope.field.DESCRIZIONE) ? $scope.field.DESCRIZIONE : ""),
        pricefrom: $scope.pricefrom,
        priceto: $scope.priceto
      }

      customFactory.setSessionStorage('filter', filter);

      services.getFromRESTServer(
        //"mothertongueSearchFrom=Italian" /*+ $scope.mothertongueSearchFrom.DESCRIZIONE*/ +
        "mothertongueSearchFrom=" + $scope.mothertongueSearchFrom.DESCRIZIONE +
          //"&mothertongueSearchTo=French" /*+ $scope.mothertongueSearchTo.DESCRIZIONE*/ +
        "&mothertongueSearchTo=" + $scope.mothertongueSearchTo.DESCRIZIONE +
          //"&service=simultaneous interpretation" /*$scope.service.DESCRIZIONE*/ +
        "&service=" + $scope.service.DESCRIZIONE +
        (($scope.field && $scope.field.DESCRIZIONE) ? "&field=" + $scope.field.DESCRIZIONE : "") +
        ($scope.pricefrom ? "&pricefrom=" + $scope.pricefrom : "") +
        ($scope.priceto ? "&priceto=" + $scope.priceto : "") +
        "&user_id=" + $rootScope.userData.ID,
        "search")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            $scope.searchResult = null;
          }
          else {
            $scope.searchResult = data;
            for (var i = 0; i < $scope.searchResult.length; i++) {
              services.getFromRESTServer("user_id=" + $scope.searchResult[i].ID, "getUserProfilePicture")
                .success(function (data) {
                  if (data.jsonError != null || data.errCode != null) {
                    alert(JSON.stringify(data));
                  }
                  else {
                    for (var j = 0; j < $scope.searchResult.length; j++) {
                      if ($scope.searchResult[j].ID == data.id) {
                        $scope.searchResult[j].image = data.base64;
                      }
                    }
                  }
                });//end succes
            }
          }
        });
    }

    //TODO CANCELLARE E RIPRISTINARE I CAMPI DELLA SUBMIT
    //$scope.doSearch();

    $scope.doResetForm = function () {
      $scope.mothertongueSearchFrom = null;
      $scope.mothertongueSearchTo = null;
      $scope.service = null;
      $scope.field = null;
      $scope.pricefrom = null;
      $scope.priceto = null;
      $scope.searchForm.$setPristine();
    };
  }
])
;
