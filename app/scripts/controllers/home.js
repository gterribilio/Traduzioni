'use strict';

var home = angular.module('HomeCtrlModule', []);

home.controller('HomeCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory',
	function ($scope, $rootScope, $window, services, $location, customFactory) {      

		$rootScope.showLogin=false;
		$rootScope.showRicercaRipetizioni=false;
		$rootScope.showLeMieRipetizioni=false;
        $rootScope.isShowRegistrazioneAgenzia=true;
        $rootScope.isShowRegistrazioneTraduttore=true;

        $scope.doAccedi= function() {
         services.getFromRESTServer("username="+$scope.username+"&password="+$scope.password,"login").
         success(function (data) {
            if(data.jsonError != null || data.errCode != null)
            {
               alert (data.errMsg);
           }
           else {

               $rootScope.isLogged = true;

               customFactory.set('isLogged',true);
                    //localStorageService.set("isLogged",true);

                    $rootScope.showLogin=false;
                    $rootScope.userData=data[0];
                    //localStorageService.set("userData",JSON.stringify($rootScope.userData));
                    customFactory.set('userData',$scope.userData);

                    if($scope.userData.RUOLO=='TRADUTTORE') 
                        $location.path("/home_traduttore");
                    else $location.path("/home_agenzia");

                    alert("Benvenuto " + $scope.userData.NOME +"! Accedi subito dal menù a tutte le funzioni e trova le tue traduzioni!");

                }
            //stampa il JSON Object
            //alert(JSON.stringify(data));
        });
    } //end doAccedi

    $rootScope.doLogout = function() {
        customFactory.logout();
        $location.path("/");
        $rootScope.isLogged = false;
    };

}]);

home.controller('registrazioneCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory',
    function ($scope, $rootScope, $window, services, $location, customFactory) {  
        $scope.doRegisterTraduttore = function() {
        //passo tutti in GET con JSONP
        services.getFromRESTServer(
            "username="+$scope.usernameTraduttore+"&password="+$scope.passwordTraduttore+"&nome="+$scope.nomeTraduttore+
            "&cognome="+$scope.cognomeTraduttore+"&email="+$scope.emailTraduttore+ "&ruolo=TRADUTTORE"+
            "&citta="+$scope.cittaTraduttore+"&mothertongue="+$scope.mothertongueTraduttore,"register").
        success(function (data) {
            if(data.jsonError != null || data.errCode != null)
            {
                alert (data.errMsg);
            }
            else {
                $scope.doAccediRegister($scope.usernameTraduttore, $scope.passwordTraduttore);
            }
        });
    }

     $scope.doRegisterAgenzia = function() {
        //passo tutti in GET con JSONP
        services.getFromRESTServer(
            "username="+$scope.usernameAgenzia+"&password="+$scope.passwordAgenzia+"&nome="+$scope.nomeAgenzia+
            "&email="+$scope.emailAgenzia+ "&ruolo=AGENZIA"+ "&employees=" +$scope.employeesAgenzia+
            "&citta="+$scope.cittaAgenzia + "&website="+$scope.websiteAgenzia,"register").
        success(function (data) {
            if(data.jsonError != null || data.errCode != null)
            {
                alert (data.errMsg);
            }
            else {
                $scope.doAccediRegister($scope.usernameAgenzia, $scope.passwordAgenzia);
            }
        });
    }

    $scope.doAccediRegister= function(username, password) {
        services.getFromRESTServer("username="+username+"&password="+password,"login").
        success(function (data) {
            if(data.jsonError != null || data.errCode != null)
            {
               alert (data.errMsg);
           }
           else {

               $rootScope.isLogged = true;

               customFactory.set('isLogged',true);
                    //localStorageService.set("isLogged",true);

                    $rootScope.showLogin=false;
                    $rootScope.userData=data[0];
                    //localStorageService.set("userData",JSON.stringify($rootScope.userData));
                    customFactory.set('userData',$rootScope.userData);

                    if($rootScope.userData.RUOLO=='TRADUTTORE') 
                        $location.path("/home_traduttore");
                    else $location.path("/home_agenzia");

                    alert("Benvenuto " + $rootScope.userData.USERNAME +"! Accedi subito dal menù a tutte le funzioni e trova le tue traduzioni!");

                }
            //stampa il JSON Object
            //alert(JSON.stringify(data));
        }).error(function(data, status) {
          console.error('Repos error', status, data);
      })

        .finally(function() {
          console.log("finally finished repos");
      });
    } //end doAccedi

}]);