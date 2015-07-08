'use strict';

var home = angular.module('HomeCtrlTraduttoreModule', []);

home.controller('HomeTraduttoreCtrl', ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory', 'APP_CFG',
  function ($scope, $rootScope, $window, services, $location, customFactory, APP_CFG) {

    $rootScope.isLogged = customFactory.get('isLogged');
    $rootScope.userData = customFactory.get('userData');
    if ($rootScope.isLogged == null || $rootScope.userData == null) {
      $location.path("/");
    }
    if ($rootScope.isLogged != null && $rootScope.userData != null && $rootScope.userData.RUOLO == 'AGENZIA') {

      $location.path("/home_agenzia");
    }

    //pre-inizializzo i valori dei campi per update registrazione
    $scope.nomeTraduttore = $rootScope.userData.NOME;
    $scope.cognomeTraduttore = $rootScope.userData.COGNOME;
    $scope.birthdayTraduttore = $rootScope.userData.DATA_NASCITA;
    $scope.cittaTraduttore = $rootScope.userData.CITTA;
    $scope.emailTraduttore = $rootScope.userData.EMAIL;
    $scope.vat = $rootScope.userData.VAT;

    //tiro su la codetable delle città
    function setCodeTableEntry2() {
      for (var i = 0; i < $rootScope.countries.length; i++) {
        if ($rootScope.countries[i].DESCRIZIONE == $rootScope.userData.PAESE) {
          $scope.countryTraduttore = $rootScope.countries[i];
        }
      }
    }

    //countries
    services.getCodeTable("codetable=2").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.countries = data;
      setCodeTableEntry2();
    });

    //tiro su la codetable delle languages
    function setCodeTableEntry3() {
      for (var i = 0; i < $rootScope.languages.length; i++) {
        if ($rootScope.languages[i].DESCRIZIONE == $rootScope.userData.MADRELINGUA) {
          $scope.mothertongueTraduttore = $rootScope.languages[i];
        }
      }
    }

    //languages
    services.getCodeTable("codetable=3").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.languages = data;
      setCodeTableEntry3();
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

    //currency
    services.getCodeTable("codetable=6").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.currencies = data;
    });

    //level
    services.getCodeTable("codetable=7").success(function (data) {
      //alert(JSON.stringify(data));
      $rootScope.levels = data;
      customFactory.set('levels', $rootScope.levels);
    });

    //ottengo le lenguage pair al caricamento della pagina
    (function init() {
      services.getFromRESTServer(
        "user_id=" + $rootScope.userData.ID, "getPair")
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
        "user_id=" + $rootScope.userData.ID, "getEducation")
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
        "user_id=" + $rootScope.userData.ID, "getCertification")
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

    })();

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

    $scope.doUpdateProfileTraduttore = function () {
      var conferma = confirm("Do you really want to save your changes?");
      if (conferma) {
        var temp_mothertongue = ($scope.mothertongueTraduttore === null) ? null : $scope.mothertongueTraduttore.DESCRIZIONE;
        var temp_country = ($scope.countryTraduttore === null) ? null : $scope.countryTraduttore.DESCRIZIONE;
        services.getFromRESTServer(
          "nomeTraduttore=" + $scope.nomeTraduttore + "&cognomeTraduttore=" + $scope.cognomeTraduttore + "&birthdayTraduttore=" + $scope.birthdayTraduttore +
          "&citta=" + $scope.cittaTraduttore + "&country=" + temp_country + "&mothertongueTraduttore=" + temp_mothertongue +
          "&email=" + $scope.emailTraduttore + "&vat=" + $scope.vat + "&ruolo=TRADUTTORE" +
          "&id=" + $rootScope.userData.ID, "updateProfile")
          .success(function (data) {
            if (data.jsonError != null || data.errCode != null) {
              alert(data.errMsg);
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
    }//end doUpdateProfileTraduttore

    $scope.doAddPair = function () {
      services.getFromRESTServer(
        "from=" + $scope.from.DESCRIZIONE + "&to=" + $scope.to.DESCRIZIONE + "&field=" + $scope.field.DESCRIZIONE +
        "&service=" + $scope.service.DESCRIZIONE + "&price=" + $scope.price + "&currency=" + $scope.currency.DESCRIZIONE + "&user_id=" + $rootScope.userData.ID, "addPair")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            //alert (data.errMsg);
            $.notify(data.errMsg, {
              type: 'danger',
              allow_dismiss: true
            });
          }
          else {
            $scope.pairList = data;
          }
        });//end succes
    } //end doAddPair

    $scope.doDeletePair = function (pairID) {
      //alert(pairID);
      services.getFromRESTServer("pair_id=" + pairID + "&user_id=" + $rootScope.userData.ID, "deletePair")
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
        });//end succes
    } //end doAddPair

    $scope.doAddEducation = function () {
      services.getFromRESTServer(
        "institute=" + $scope.institute + "&field=" + $scope.fieldE +
        "&user_id=" + $rootScope.userData.ID, "addEducation")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            $.notify(data.errMsg, {
              type: 'danger',
              allow_dismiss: true
            });
          }
          else {
            $scope.educationList = data;
          }
        });//end succes
    } //end doAddEducation

    $scope.doDeleteEducation = function (educationID) {
      //alert(pairID);
      services.getFromRESTServer("education_id=" + educationID + "&user_id="
      + $rootScope.userData.ID, "deleteEducation")
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
    } //end doAddEducation

    $scope.doAddCertification = function () {
      services.getFromRESTServer(
        "institute=" + $scope.instituteC + "&date=" + $scope.date + "&certification=" + $scope.certification
        + "&level=" + $scope.level.DESCRIZIONE +
        "&user_id=" + $rootScope.userData.ID, "addCertification")
        .success(function (data) {
          if (data.jsonError != null || data.errCode != null) {
            $.notify(data.errMsg, {
              type: 'danger',
              allow_dismiss: true
            });
          }
          else {
            $scope.certificationList = data;
          }
        });//end succes
    } //end doAddCertification

    $scope.doDeleteCertification = function (certificationID) {
      //alert(CertificationID);
      services.getFromRESTServer("certification_id=" + certificationID + "&user_id="
      + $rootScope.userData.ID, "deleteCertification")
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
        });//end succes
    } //end doAddCertification


  }
])
;
