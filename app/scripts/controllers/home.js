'use strict';

var home = angular.module('HomeCtrlModule', []);

home.controller('HomeCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', '$anchorScroll', 'customFactory', '$q',
  function ($scope, $rootScope, $window, services, $location, $anchorScroll, customFactory, $q) {

    $rootScope.showLogin = false;
    $rootScope.showWorkarea = false;
    $scope.usernamePresent = false;

    // questa funzione di init peermette ogni qualvolta l'utente esce senza chiudere la pagina in cui si trova di mandarlo alla home da loggato nel caso
    //in cui nel session storage ci siano ancora i dati
    (function init() {
      if (customFactory.get('isLogged') && customFactory.get('userData') != null) {
        $rootScope.userData = customFactory.get('userData');
        if ($rootScope.userData.RUOLO == 'TRADUTTORE') $location.path("/home_traduttore");
        else $location.path("/home_agenzia");
      }
    })(); //end function

    //tiro su la codetable del numero degli impiegati per agenzia
    if (customFactory.get('employees') == null) {
      services.getCodeTable("codetable=1").success(function (data) {
        //alert(JSON.stringify(data));
        $rootScope.employees = data;
        customFactory.set('employees', $rootScope.employees);
      });
    }
    else {
      $rootScope.employees = customFactory.get('employees');
    }

    //tiro su la codetable delle città
    if (customFactory.get('countries') == null) {
      services.getCodeTable("codetable=2").success(function (data) {
        //alert(JSON.stringify(data));
        $rootScope.countries = data;
        customFactory.set('countries', $rootScope.countries);
      });
    }
    else {
      $rootScope.countries = customFactory.get('countries');
    }

    //tiro su la codetable delle languages
    if (customFactory.get('languages') == null) {
      services.getCodeTable("codetable=3").success(function (data) {
        //alert(JSON.stringify(data));
        $rootScope.languages = data;
        customFactory.set('languages', $rootScope.languages);
      });
    }
    else {
      $rootScope.languages = customFactory.get('languages');
    }

    $rootScope.doLogout = function () {
      $location.path("/");
      $rootScope.isLogged = false;
      localStorage.clear();
      IN.User.logout();
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          FB.logout();
        }
      });
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
            $.notify(data.errMsg, {
              type: 'danger',
              allow_dismiss: true
            });
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
            $.notify(data.errMsg, {
              type: 'danger',
              allow_dismiss: true
            });
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

    /**************** LINKEDIN *******************/
    $scope.linkedinRegister = function (role) {
      IN.User.authorize(function () {

        IN.API.Profile("me").fields(["firstName", "lastName", "location:(name,country:(code))", "pictureUrls::(original)", "emailAddress", "id"]).result(function (data) {
          //IN.API.Raw("/people/~").result(function (data) {
          $rootScope.linkedinData = data.values[0];

          var temp_location = $rootScope.linkedinData.location.name.split(',');
          var temp_city = temp_location[0];
          var temp_country = temp_location[1];
          var temp_pictureUrls = ($rootScope.linkedinData.pictureUrls.hasOwnProperty('values')) ? $rootScope.linkedinData.pictureUrls.values[0] : '';
          services.getFromRESTServer(
            "username=" + $rootScope.linkedinData.emailAddress + "&password=" + $rootScope.linkedinData.id
            + "&nome=" + $rootScope.linkedinData.firstName +
            "&cognome=" + $rootScope.linkedinData.lastName + "&email=" + $rootScope.linkedinData.emailAddress + "&ruolo=" + role +
            "&country=" + temp_country + "&city=" + temp_city + "&pictureUrl=" + temp_pictureUrls + "&social=LINKEDIN", "register")
            .success(function (data) {
              if (data.jsonError != null || data.errCode != null) {
                $.notify("Email already present! Please sign in!", {
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

          $scope.doAccedi($rootScope.linkedinData.emailAddress, $rootScope.linkedinData.id);

        });//end  IN.API.Profile("me")
      });//end authorize
    }//end linkedinRegister
    /**************** END LINKEDIN ****************/


    /**************** FACEBOOK ****************/
    $scope.facebookRegister = function (role) {
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          doRegisterFacebook(role);
        } else { //gestisco sia lo stato NOT_AUTHORIZED che lo stato UNKNOWN
          FB.login(function (response) {
            // Handle the response object, like in statusChangeCallback() in our demo
            // code.
            if (response.status === 'connected') {
              doRegisterFacebook(role);
            }
            //else non fare niente
          }, {
            scope: 'email, public_profile, user_friends',
            return_scopes: true
          });//end login
        }
      });
    }//end facebookRegister

    function doRegisterFacebook(role) {

      FB.api('/me', function (response) {
        $rootScope.facebookData = response;
        //var temp_location = $rootScope.facebookData.location.name.split(',');
        //var temp_city = temp_location[0];
        //var temp_country = temp_location[1];
        // RECUPERO DAL SERVER CAUSA ERRORE 406
        // $scope.facebookImage = "http://graph.facebook.com/" + $rootScope.facebookData.id + "/picture?type=large";
        services.getFromRESTServer(
          "username=" + $rootScope.facebookData.email + "&password=" + $rootScope.facebookData.id
          + "&nome=" + $rootScope.facebookData.first_name +
          "&cognome=" + $rootScope.facebookData.last_name + "&email=" + $rootScope.facebookData.email + "&ruolo=" + role +
          "&social=FACEBOOK", "register")
          .success(function (data) {
            if (data.jsonError != null || data.errCode != null) {
              $.notify("Email already present! Please sign in!", {
                type: 'danger',
                allow_dismiss: true
              });
            }
            else {
              $scope.doAccedi($rootScope.facebookData.email, $rootScope.facebookData.id);
            }
          });
      });
    }

    $scope.facebookLogin = function (role) {
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          doLoginFacebook();
        } else { //gestisco sia lo stato NOT_AUTHORIZED che lo stato UNKNOWN
          FB.login(function (response) {
            // Handle the response object, like in statusChangeCallback() in our demo
            // code.
            if (response.status === 'connected') {
              doLoginFacebook();
            }
            //else non fare niente
          }, {
            scope: 'email, public_profile, user_friends',
            return_scopes: true
          });//end login
        }
      });
    }//end FacebookLogin

    function doLoginFacebook() {
      FB.api('/me', function (response) {
        $rootScope.facebookData = response;
        $scope.doAccedi($rootScope.facebookData.email, $rootScope.facebookData.id);
      });
    }

    /**************** END FACEBOOK *******************/

  }]);//end Controller
