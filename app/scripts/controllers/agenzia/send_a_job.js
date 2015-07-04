/**
 * Created by terribilio.gi on 08/06/2015.
 */

'use strict';

search.controller('SendAJobCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory', '$routeParams',
  function ($scope, $rootScope, $window, services, $location, customFactory, $routeParams) {

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if (customFactory.get('isLogged') == null || customFactory.get('userData') == null) {
      $location.path("/");
    }

    if ($rootScope.isLogged != null && $rootScope.userData != null && $rootScope.userData.RUOLO == 'TRADUTTORE') {
      $location.path("/home_traduttore");
    }

    $scope.recipientList  = [];

    $scope.filter = customFactory.getSessionStorage('filter');

    //E' l'ID del traduttore a cui mandare il lavoro
    $scope.user_id = $routeParams.user_id;
    services.getFromRESTServer(
      "user_id=" + $scope.user_id, "getUserData")
      .success(function (data) {
        if (data.jsonError != null || data.errCode != null) {
          //alert (data.errMsg); Nessun dato trovato
        }
        else {
          $scope.recipient = data[1];
          //alert(JSON.stringify($scope.recipient));

          $scope.recipientList.push($scope.recipient.NOME+ ' ' + ($scope.recipient.COGNOME));
        }
      });//end success
  }]);
