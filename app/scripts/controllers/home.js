'use strict';

var home = angular.module('HomeCtrlModule', []);

home.controller('HomeCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', '$anchorScroll', 'customFactory', '$timeout',
  function ($scope, $rootScope, $window, services, $location, $anchorScroll, customFactory, $timeout) {

    $rootScope.showLogin = false;
    $rootScope.showWorkarea = false;
    $scope.usernamePresent = false;

    // questa funzione di init permette ogni qualvolta l'utente esce senza chiudere la pagina in cui si trova di mandarlo alla home da loggato nel caso
    //in cui nel session storage ci siano ancora i dati
    (function init() {
      if (customFactory.get('isLogged') && customFactory.get('userData') != null) {
        $rootScope.userData = customFactory.get('userData');
        if ($rootScope.userData.RUOLO == 'TRADUTTORE') $location.path("/home_traduttore");
        else $location.path("/home_agenzia");
      }
    })(); //end function

    //tiro su la codetable del numero degli impiegati per agenzia
    services.getCodeTable("codetable=1").success(function (data) {
      //alert(JSON.stringify(data));
      $scope.employeesAgenzia = data;
    });

    //tiro su la codetable delle città
    services.getCodeTable("codetable=2").success(function (data) {
      //alert(JSON.stringify(data));
      $scope.cittaeAgenzia = data;
      $scope.mothertonguesTraduttore = data;
      $scope.countriesTraduttore = data;
    });

    $rootScope.doLogout = function () {
      $location.path("/");
      $rootScope.isLogged = false;
      localStorage.clear();
    };

    $rootScope.doJobsTraduttore = function () {
      $location.hash('#/jobs_traduttore');
      $anchorScroll();
    };

    $scope.doContatta = function () {
      services.getFromRESTServer(
        "email=" + $scope.email + "&subject=" + $scope.subject + "&text=" + $scope.text, "contact")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            alert(data.errMsg);
          }
          else {
            alert("Thanks for your support! We'll call you as soon as possible!");
            //chiama anchor scroll
            $location.hash('intro');
            $anchorScroll();
          }
        });
    };

    $scope.doRegisterTraduttore = function () {
      var temp_mothertongue = ($scope.mothertongueTraduttore == null) ? null : $scope.mothertongueTraduttore.DESCRIZIONE;
      var temp_country = ($scope.countryTraduttore == null) ? null : $scope.countryTraduttore.DESCRIZIONE;
      services.getFromRESTServer(
        "username=" + $scope.usernameTraduttore + "&password=" + $scope.passwordTraduttore + "&nome=" + $scope.nomeTraduttore +
        "&cognome=" + $scope.cognomeTraduttore + "&email=" + $scope.emailTraduttore + "&ruolo=TRADUTTORE" +
        "&country=" + temp_country + "&mothertongue=" + temp_mothertongue, "register")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            alert(data.errMsg);
          }
          else {
            $scope.doAccedi($scope.usernameTraduttore, $scope.passwordTraduttore);
          }
        });
    }

    $scope.doRegisterAgenzia = function () {
      var temp_citta = ($scope.countryAgenzia == null) ? null : $scope.countryAgenzia.DESCRIZIONE;
      var temp_employee = ($scope.employeeAgenzia == null) ? null : $scope.employeeAgenzia.DESCRIZIONE;
      services.getFromRESTServer(
        "username=" + $scope.usernameAgenzia + "&password=" + $scope.passwordAgenzia + "&nome=" + $scope.nomeAgenzia +
        "&email=" + $scope.emailAgenzia + "&ruolo=AGENZIA" + "&employees=" + temp_employee +
        "&country=" + temp_citta + "&website=" + $scope.websiteAgenzia, "register").
        success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            alert(data.errMsg);
          }
          else {
            $scope.doAccedi($scope.usernameAgenzia, $scope.passwordAgenzia);
          }
        });
    }

    $scope.doAccedi = function (a, b) {
      services.getFromRESTServer("username=" + a + "&password=" + b, "login").
        success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            $.notify(data.errMsg, {
              type: 'danger',
              allow_dismiss: true
            });
          }
          else {

            $rootScope.isLogged = true;

            customFactory.set('isLogged', true);
            //localStorageService.set("isLogged",true);

            $rootScope.showLogin = false;
            $rootScope.userData = data[0];
            //localStorageService.set("userData",JSON.stringify($rootScope.userData));
            customFactory.set('userData', $rootScope.userData);

            if ($rootScope.userData.RUOLO == 'TRADUTTORE') {
              //alert("Welcome " + $rootScope.userData.NOME +"! Find your translations now!");
              $.notify("Welcome " + $rootScope.userData.NOME + "! Find your translations now!", {
                type: 'success',
                allow_dismiss: true
              });
              $location.path("/home_traduttore");
            }
            else {
              //alert("Welcome " + $rootScope.userData.NOME +"! Post your translation now!");
              $.notify("Welcome " + $rootScope.userData.NOME + "! Post your translation now!", {
                type: 'success',
                allow_dismiss: true
              });
              $location.path("/home_agenzia");
            }

          }
          //stampa il JSON Object
          //alert(JSON.stringify(data));
        }).error(function (data, status) {
          console.error('Repos error', status, data);
        });
    } //end doAccedi

    $scope.checkUsername = function (username) {
      services.getFromRESTServer(
        "username=" + username, "checkUsername")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            $scope.usernamePresent = true;
            $.notify("Username already present! Please sign in!", {
              type: 'danger',
              allow_dismiss: true
            });

          }
          else {
            //username not yet present
            $scope.usernamePresent = false;
          }
        });
    }

    $scope.linkedinRegister = function (role) {
      IN.User.authorize(function () {

        IN.API.Profile("me").fields(["firstName", "lastName", "location:(name,country:(code))", "pictureUrl", "emailAddress", "id"]).result(function (data) {

          $rootScope.linkedinData = data.values[0];

          var temp_location = $rootScope.linkedinData.location.name.split(',');
          var temp_city = temp_location[0];
          var temp_country = temp_location[1];
          services.getFromRESTServer(
            "username=" + $rootScope.linkedinData.emailAddress + "&password=" + $rootScope.linkedinData.id
            + "&nome=" + $rootScope.linkedinData.firstName +
            "&cognome=" + $rootScope.linkedinData.lastName + "&email=" + $rootScope.linkedinData.emailAddress + "&ruolo=" + role +
            "&country=" + temp_country + "&city=" + temp_city, "register")
            .success(function (data) {
              if (data.jsonError != null || data.errCode != null) {
                $.notify("Username already present! Please sign in!", {
                  type: 'danger',
                  allow_dismiss: true
                });
              }
              else {

                $scope.doAccedi($rootScope.linkedinData.emailAddress, $rootScope.linkedinData.id);
              }
            });

        });//end  IN.API.Profile("me")
      });//end authorize
    }//end linkedinRegister

    $scope.linkedinLogin = function (role) {
      IN.User.authorize(function () {

        IN.API.Profile("me").fields(["firstName", "lastName", "location:(name,country:(code))", "pictureUrl", "emailAddress", "id"]).result(function (data) {

          $rootScope.linkedinData = data.values[0];

          $scope.doAccedi($rootScope.linkedinData.emailAddress,$rootScope.linkedinData.id);

        });//end  IN.API.Profile("me")
      });//end authorize
    }//end linkedinRegister

  }]);//end Controller
