'use strict';

var home = angular.module('HomeCtrlModule', []);

home.controller('HomeCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', '$anchorScroll', 'customFactory',
  function ($scope, $rootScope, $window, services, $location, $anchorScroll, customFactory) {


    // questa funzione di init permette ogni qualvolta l'utente esce senza chiudere la pagina in cui si trova di mandarlo alla home da loggato nel caso
    //in cui nel session storage ci siano ancora i dati
    (function init(){
      if(customFactory.get('isLogged') && customFactory.get('userData')!= null ) {
        $rootScope.userData = customFactory.get('userData');
        if($rootScope.userData.RUOLO=='TRADUTTORE') $location.path("/home_traduttore");
        else $location.path("/home_agenzia");
      }

    })(); //end function

    $rootScope.showLogin=false;

    $rootScope.showWorkarea=false;

    //tiro su la codetable del numero degli impiegati per agenzia
    services.getCodeTable("codetable=1").success(function (data){
      //alert(JSON.stringify(data));
      $scope.employeesAgenzia=data;
    });

    //tiro su la codetable delle città
    services.getCodeTable("codetable=2").success(function (data){
      //alert(JSON.stringify(data));
      $scope.cittaeAgenzia=data;
      $scope.mothertonguesTraduttore=data;
      $scope.countriesTraduttore=data;
    });

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
            customFactory.set('userData',$rootScope.userData);

            if($scope.userData.RUOLO=='TRADUTTORE') {
              //alert("Welcome " + $rootScope.userData.NOME +"! Find your translations now!");
              $.notify("Welcome " + $rootScope.userData.NOME +"! Find your translations now!",{
                type: 'success',
                allow_dismiss: true
              });
              $location.path("/home_traduttore");
            }
            else {
              //alert("Welcome " + $rootScope.userData.NOME +"! Post your translation now!");
              $.notify("Welcome " + $rootScope.userData.NOME +"! Post your translation now!",{
                type: 'success',
                allow_dismiss: true
              });
              $location.path("/home_agenzia");
            }
          }
          //stampa il JSON Object
          //alert(JSON.stringify(data));
        });
    } //end doAccedi

    $rootScope.doLogout = function() {
      localStorage.clear();
      $location.path("/");
      $rootScope.isLogged = false;
    };

    $rootScope.doJobsTraduttore = function() {
      $location.hash('#/jobs_traduttore');
      $anchorScroll();
    };

    $scope.doContatta = function() {
      services.getFromRESTServer(
        "email="+$scope.email+"&subject="+$scope.subject+"&text="+$scope.text ,"contact")
        .success(function (data) {
          if(data.jsonError != null || data.errCode != null)
          {
            alert (data.errMsg);
          }
          else {
            alert("Thanks for your support! We'll call you as soon as possible!");
            //chiama anchor scroll
            $location.hash('intro');
            $anchorScroll();
          }
        });
    };

  }]);// end controller

home.controller('registrazioneCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory',
  function ($scope, $rootScope, $window, services, $location, customFactory) {
    $scope.doRegisterTraduttore = function() {
      var temp_mothertongue = ($scope.mothertongueTraduttore===null) ? null : $scope.mothertongueTraduttore.DESCRIZIONE;
      var temp_country= ($scope.countryTraduttore===null) ? null : $scope.countryTraduttore.DESCRIZIONE;
      services.getFromRESTServer(
        "username="+$scope.usernameTraduttore+"&password="+$scope.passwordTraduttore+"&nome="+$scope.nomeTraduttore+
        "&cognome="+$scope.cognomeTraduttore+"&email="+$scope.emailTraduttore+ "&ruolo=TRADUTTORE"+
        "&country=" + temp_country + "&mothertongue=" + temp_mothertongue,"register")
        .success(function (data) {
          if(data.jsonError != null || data.errCode != null)
          {
            alert (data.errMsg);
          }
          else {
            doAccedi($scope.usernameTraduttore, $scope.passwordTraduttore);
          }
        });
    }

    $scope.doRegisterAgenzia = function() {
      var temp_citta = ($scope.countryAgenzia===null) ? null : $scope.countryAgenzia.DESCRIZIONE;
      var temp_employee= ($scope.employeeAgenzia===null) ? null : $scope.employeeAgenzia.DESCRIZIONE;
      services.getFromRESTServer(
        "username=" + $scope.usernameAgenzia + "&password=" + $scope.passwordAgenzia + "&nome=" + $scope.nomeAgenzia +
        "&email=" + $scope.emailAgenzia+ "&ruolo=AGENZIA"+ "&employees=" + temp_employee +
        "&country=" + temp_citta + "&website=" + $scope.websiteAgenzia,"register").
        success(function (data) {
          if(data.jsonError != null || data.errCode != null)
          {
            alert (data.errMsg);
          }
          else {
            doAccedi($scope.usernameAgenzia, $scope.passwordAgenzia);
          }
        });
    }

    function doAccedi(a, b) {
      services.getFromRESTServer("username="+a+"&password="+b,"login").
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

  }]);//end Controller
