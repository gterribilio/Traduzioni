'use strict';

//Dettaglio del traduttore dalla search dell'agenzia
search.controller('TranslatorDetailCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory', '$routeParams',
  function ($scope, $rootScope, $window, services, $location, customFactory, $routeParams) {

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if (customFactory.get('isLogged') == null || customFactory.get('userData') == null) {
      $location.path("/");
    }
    if ($rootScope.isLogged != null && $rootScope.userData != null && $rootScope.userData.RUOLO == 'TRADUTTORE') {
      $location.path("/home_traduttore");
    }

    $scope.user_id = $routeParams.user_id;
    $scope.showComments=false;

    $rootScope.image = null;

    //ottengo le lenguage pair al caricamento della pagina
    services.getFromRESTServer(
      "user_id=" + $scope.user_id, "getUserData")
      .success(function (data) {
        if (data.jsonError != null || data.errCode != null) {
          //alert (data.errMsg); Nessun dato trovato
        }
        else {
          $scope.traduttoreDetail = data[1];
          //alert(JSON.stringify($scope.traduttoreDetail));
        }
      });//end success

    services.getFromRESTServer("user_id=" + $scope.user_id, "getAllTranslatorComments").success(function (data) {
      if (data.jsonError != null || data.errCode != null) {
        //alert(JSON.stringify(data));
      }
      else {
        $scope.commentsAll = data;
        //alert(JSON.stringify(data));
      }
    });//end success

    services.getFromRESTServer(
      "user_id=" + $scope.user_id, "getPair")
      .success(function (data) {
        if (data.jsonError != null || data.errCode != null) {
          //alert (data.errMsg); Nessun dato trovato
          $scope.pairList = null;
          //alert(JSON.stringify(data));
        }
        else {
          $scope.pairList = data;
          //alert(JSON.stringify(data));
        }
      });//end success

    services.getFromRESTServer(
      "user_id=" + $scope.user_id, "getEducation")
      .success(function (data) {
        if (data.jsonError != null || data.errCode != null) {
          //alert (data.errMsg); Nessun dato trovato
          $scope.educationList = null;
          //alert(JSON.stringify(data));
        }
        else {
          $scope.educationList = data;
          //alert(JSON.stringify(data));
        }
      });//end succes

    services.getFromRESTServer(
      "user_id=" + $scope.user_id, "getCertification")
      .success(function (data) {
        if (data.jsonError != null || data.errCode != null) {
          //alert (data.errMsg); Nessun dato trovato
          $scope.certificationList = null;
          //alert(JSON.stringify(data));
        }
        else {
          $scope.certificationList = data;
          //alert(JSON.stringify(data));
        }
      });//end success

    services.getFromRESTServer("user_id=" + $scope.user_id, "getImagePath").success(function (data) {
      if (data.jsonError != null || data.errCode != null) {
        //alert (data.errMsg); Nessun dato trovato
        //alert(JSON.stringify(data));
      }
      else {

        services.getFromRESTServer("user_id=" + $scope.user_id, "getUserProfilePicture")
          .success(function (data) {
            if (data.jsonError != null || data.errCode != null) {
              alert(JSON.stringify(data));
            }
            else {
              $scope.image = data.base64;
            }
          });//end success
      }
    });//end success

  }]);
