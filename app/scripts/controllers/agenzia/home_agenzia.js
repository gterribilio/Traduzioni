'use strict';

var home = angular.module('HomeCtrlAgenziaModule', []);

home.controller('HomeAgenziaCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory', 'APP_CFG',
  function ($scope, $rootScope, $window, services, $location, customFactory, APP_CFG) {

    $rootScope.image = null;
    $scope.comments = null;
    $scope.commentsAll = null;

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if ($rootScope.isLogged == null || $rootScope.userData == null) {
      $location.path("/");
    }
    if ($rootScope.isLogged != null && $rootScope.userData != null && $rootScope.userData.RUOLO == 'TRADUTTORE') {
      $location.path("/home_traduttore");
    }

    //RECUPERO I DATI DALLO USERDATA E LI RIPASSO A VARIABILI TEMPORANEE IN MODO TALE DA
    //USARLE NEI CAMPI INPUT DELLA FORM
    $scope.nomeAgenzia = $rootScope.userData.NOME;
    $scope.indirizzoAgenzia = $rootScope.userData.INDIRIZZO;
    $scope.cittaAgenzia = $rootScope.userData.CITTA;
    $scope.countryAgenzia = $rootScope.userData.PAESE;
    $scope.codicePostaleAgenzia = $rootScope.userData.CODICE_POSTALE;
    $scope.telefonoAgenzia = $rootScope.userData.PHONE;
    $scope.emailAgenzia = $rootScope.userData.EMAIL;
    $scope.webAgenzia = $rootScope.userData.SITO_WEB;
    $scope.vat = $rootScope.userData.VAT;

    services.getFromRESTServer("user_id=" + $rootScope.userData.ID, "getImagePath").success(function (data) {
      if (data.jsonError != null || data.errCode != null) {
        //alert (data.errMsg); Nessun dato trovato
        //alert(JSON.stringify(data));
      }
      else {
        //alert(data[0]["IMAGE"]);
        //alert($rootScope.userData.IMAGE);

        //if (data[0]["IMAGE"] != $rootScope.userData.IMAGE) {
        //riscrivo l'oggetto userData nel localStorage

        if (customFactory.getSessionStorage('userProfileImage') == null) {
          services.getFromRESTServer("user_id=" + $rootScope.userData.ID, "getUserProfilePicture")
            .success(function (data) {
              if (data.jsonError != null || data.errCode != null) {
                //alert(JSON.stringify(data));
              }
              else {
                customFactory.setSessionStorage('userProfileImage',data.base64);
                $rootScope.image = customFactory.getSessionStorage('userProfileImage');
              }
            });//end success
        }
        else {
          $rootScope.image = customFactory.getSessionStorage('userProfileImage');
        }
        //}
        //else {
        //alert('immagini uguali');
        //}
      }
    });//end success

    services.getFromRESTServer("user_id=" + $rootScope.userData.ID, "getAgencyComments").success(function (data) {
      if (data.jsonError != null || data.errCode != null) {
        //alert(JSON.stringify(data));
      }
      else {
        $scope.comments = data;
        //alert(JSON.stringify(data));
      }
    });//end success

    services.getFromRESTServer("user_id=" + $rootScope.userData.ID, "getAllAgencyComments").success(function (data) {
      if (data.jsonError != null || data.errCode != null) {
        //alert(JSON.stringify(data));
      }
      else {
        $scope.commentsAll = data;
        //alert(JSON.stringify(data));
      }
    });//end success

    //tiro su la codetable delle città
    function setCodeTableEntry2() {
      for (var i = 0; i < $rootScope.countries.length; i++) {
        if ($rootScope.countries[i].DESCRIZIONE == $rootScope.userData.PAESE) {
          $scope.countryAgenzia = $rootScope.countries[i];
        }
      }
    }

    services.getCodeTable("codetable=2").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.countries = data;
      setCodeTableEntry2();
    });

    //tiro su la codetable del numero degli impiegati per agenzia
    function setCodeTableEntry1() {
      for (var i = 0; i < $rootScope.employees.length; i++) {
        if ($rootScope.employees[i].DESCRIZIONE == $rootScope.userData.NUM_IMPIEGATI) {
          $scope.impiegatoAgenzia = $rootScope.employees[i];
        }
      }
    }

    services.getCodeTable("codetable=1").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.employees = data;
      setCodeTableEntry1();
    });

    //aggiorna profilo agenzia
    $scope.doUpdateProfileAgenzia = function () {
      var conferma = confirm("Do you really want to save your changes?");
      if (conferma) {
        var temp_country = ($scope.countryAgenzia === null) ? null : $scope.countryAgenzia.DESCRIZIONE;
        var temp_employee = ($scope.impiegatoAgenzia === null) ? null : $scope.impiegatoAgenzia.DESCRIZIONE;
        services.getFromRESTServer(
          "nome=" + $scope.nomeAgenzia + "&impiegati=" + temp_employee +
          "&indirizzo=" + $scope.indirizzoAgenzia + "&citta=" + $scope.cittaAgenzia +
          "&country=" + temp_country +
          "&codicePostale=" + $scope.codicePostaleAgenzia + "&telefono=" + $scope.telefonoAgenzia +
          "&email=" + $scope.emailAgenzia + "&web=" + $scope.webAgenzia +
          "&vat=" + $scope.vat +
          "&ruolo=AGENZIA" + "&id=" + $rootScope.userData.ID, "updateProfile")
          .success(function (data) {
            if (data.jsonError != null || data.errCode != null) {
              //alert (data.errMsg);
            }
            else {
              //vado a re-settare i dati ottenuti
              $rootScope.userData = data[0];
              customFactory.set('userData', $scope.userData);
              $.notify("Your profile has been successfully updated!", {
                type: 'success',
                allow_dismiss: true
              });
            }
          });
      }//end conferma
    }//end doUpdateProfileAgenzia

    $scope.reportAbuse = function (id_comment) {
      services.getFromRESTServer(
        "&id=" + id_comment, "reportAbuse")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            alert(data.errMsg);
          }
          else {
            $.notify("A notification has been sent to us! We'll contact you as soon as possible! King regards!", {
              type: 'success',
              allow_dismiss: true
            });
          }
        });
    }


    //permette di utilizzare il readmore - VEDI anche la direttiva che la richiama
    $scope.$on('ngRepeatFinished', function () {
      $('article').readmore({
        speed: 75,
        lessLink: '<a href="#">Read less</a>',
        collapsedHeight: 40
      }) //end readmore
    }); //end $on event

  }]);
