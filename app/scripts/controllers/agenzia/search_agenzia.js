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

    $scope.doSearch = function (filter) {

      var filter = {
        mothertongueSearchFrom: $scope.mothertongueSearchFrom == null ? (filter != null && filter.mothertongueSearchFrom != null ? filter.mothertongueSearchFrom : null) : $scope.mothertongueSearchFrom.DESCRIZIONE,
        mothertongueSearchTo: $scope.mothertongueSearchTo == null ? (filter != null && filter.mothertongueSearchTo != null ? filter.mothertongueSearchTo : null) : $scope.mothertongueSearchTo.DESCRIZIONE,
        service: $scope.service == null ? (filter != null && filter.service != null ? filter.service : null) : $scope.service.DESCRIZIONE,
        field: ($scope.field != null && $scope.field.DESCRIZIONE != null) ? $scope.field.DESCRIZIONE : (filter != null && filter.field != null ? filter.field : null),
        pricefrom: $scope.pricefrom == null ? (filter != null ? filter.pricefrom : null) : ($scope.pricefrom != null ? filter.pricefrom : null),
        priceto: $scope.priceto == null ? (filter != null ? filter.priceto : null) : ($scope.priceto != null ? filter.priceto : null)
      }

      customFactory.setSessionStorage('filter', filter);

      services.getFromRESTServer(
        //"mothertongueSearchFrom=Italian" /*+ $scope.mothertongueSearchFrom.DESCRIZIONE*/ +
        "mothertongueSearchFrom=" + filter.mothertongueSearchFrom +
          //"&mothertongueSearchTo=French" /*+ $scope.mothertongueSearchTo.DESCRIZIONE*/ +
        "&mothertongueSearchTo=" + filter.mothertongueSearchTo +
          //"&service=simultaneous interpretation" /*$scope.service.DESCRIZIONE*/ +
        "&service=" + filter.service +
        (filter.field != null ? "&field=" + filter.field : "") +
        (filter.pricefrom != null ? "&pricefrom=" + filter.pricefrom : "") +
        (filter.priceto != null ? "&priceto=" + filter.priceto : "") +
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

    //recupero i filtri
    $scope.filter = customFactory.getSessionStorage('filter');
    if ($scope.filter != null) {

      if ($scope.filter.pricefrom != null) {
        $scope.pricefrom = $scope.filter.pricefrom;
      }
      if ($scope.filter.priceto != null) {
        $scope.priceto = $scope.filter.priceto;
      }

      //Se i filtri non sono nulli allora posso ripristinare la vecchia ricerca
      $scope.doSearch($scope.filter);
    }

    $scope.orderByField = '';
    $scope.reverseSort = false;

    //tiro su la codetable delle languages
    services.getCodeTable("codetable=3").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.languages = data;
      if ($scope.filter != null && $scope.filter.mothertongueSearchFrom != null) {
        for (var i = 0; i < $rootScope.languages.length; i++) {
          if ($rootScope.languages[i].DESCRIZIONE == $scope.filter.mothertongueSearchFrom) {
            $scope.mothertongueSearchFrom = $rootScope.languages[i];
          }
        }
      }
      if ($scope.filter != null && $scope.filter.mothertongueSearchTo != null) {
        for (var i = 0; i < $rootScope.languages.length; i++) {
          if ($rootScope.languages[i].DESCRIZIONE == $scope.filter.mothertongueSearchTo) {
            $scope.mothertongueSearchTo = $rootScope.languages[i];
          }
        }
      }
    });

    //fields
    services.getCodeTable("codetable=4").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.fields = data;
      if ($scope.filter != null && $scope.filter.field != null) {
        for (var i = 0; i < $rootScope.fields.length; i++) {
          if ($rootScope.fields[i].DESCRIZIONE == $scope.filter.field) {
            $scope.field = $rootScope.fields[i];
          }
        }
      }

    });

    //services
    services.getCodeTable("codetable=5").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.services = data;
      $scope.service = data[0];
      if ($scope.filter != null && $scope.filter.service != null) {
        for (var i = 0; i < $rootScope.services.length; i++) {
          if ($rootScope.services[i].DESCRIZIONE == $scope.filter.service) {
            $scope.service = $rootScope.services[i];
          }
        }
      }
    });

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
