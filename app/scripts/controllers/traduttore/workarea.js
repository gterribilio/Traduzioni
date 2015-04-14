'use strict';

/**
 * @ngdoc function
 * @name lemieripetizioniApp.controller:DettripetizioniCtrl
 * @description
 * # DettripetizioniCtrl
 * Controller of the lemieripetizioniApp
 */

/* When defining a module with no module dependencies, the array of dependencies should be defined and empty.Non ci deve essere proprio!
Lo indico solo in app.js */

var dett = angular.module('JobsCtrlTraduttoreModule');

dett.controller('WorkareaTraduttoreCtrl', [ '$scope','$rootScope', '$routeParams', '$location', 'services','customFactory',
	function ($scope, $rootScope, $routeParams, $location, services, customFactory) {

		$rootScope.showWorkarea=true;
		$scope.accepted = false;

		//alert(CKEDITOR.basePath + ' before');
		//CKEDITOR.basePath=location.protocol + "//" + location.host + '/ckeditor/';
		//alert(CKEDITOR.basePath + ' before');

		$rootScope.isLogged = customFactory.get('isLogged');
		$rootScope.userData =  customFactory.get('userData');
		if(customFactory.get('isLogged')==null || customFactory.get('userData')== null ) {
			$location.path("/");
		}

		$scope.id_job = $routeParams.id; //ID DI JOB_TRANSLATION O JOB_CORRECTION
		$scope.tipo_job = $routeParams.tipo; //CORRECTION O TRANSLATION, in base al tipo job, aggiornerò sul backend una
		//tabella piuttosto che l'altra

		services.getFromRESTServer("id_job="+$scope.id_job + "&tipo_job="+$scope.tipo_job,"dettaglio_job")
		.success(function (response) {
			$scope.job=response[0];

			/*FIX TEXTEDITOR PERCHE' NON FACEVA VEDERE IL CONTENUTO DELLA TEXTAREA E BISOGNAVA FARE REFRESH PAGINA
			http://stackoverflow.com/questions/3147670/ckeditor-update-textarea*/
			CKEDITOR.instances['todo'].setData($scope.job.TEXT_TODO);
			CKEDITOR.instances['done'].setData($scope.job.TEXT_DONE);
			/*END FIX*/

			if($scope.job.STATO == 'ENGAGMENT' || $scope.job.STATO == 'COMPETITION' || $scope.job.STATO == 'DECLINED') {
				$scope.accepted = false;
			}
			else {
				$scope.accepted = true;
			}
		});

		$scope.doAccept = function() {
			var conf = confirm("Do you really want to accept this job?");

			if(conf == true) {
				$scope.accepted="true";
				//aggiorna status a ACTIVE
				services.getFromRESTServer("id_job="+$scope.id_job + "&tipo_job="+$scope.tipo_job
					+ "&status=ACTIVE","update_job_status")
				.success(function (response) {
				});
				//aggiorna ID_TRADUTTORE sul JOB
				services.getFromRESTServer("id_job=" + $scope.id_job + "&tipo_job=" + $scope.tipo_job +
					"&user_id=" + $rootScope.userData.ID,"doAccept")
				.success(function (response) {
					alert('Congratulation! You have just accepted this job!');
				});
			}
		};

		$scope.doDecline = function() {
			var conf = confirm("Do you really want to decline this job? It will never ever available!");

			if(conf == true) {
				//aggiorna status a DECLINE
				services.getFromRESTServer("id_job=" + $scope.id_job + "&tipo_job=" + $scope.tipo_job
					+ "&status=DECLINED","update_job_status")
				.success(function (response) {
				});
				services.getFromRESTServer("id_job=" + $scope.id_job + "&tipo_job="  +$scope.tipo_job +
					"&user_id=" + $rootScope.userData.ID,"doDecline")
				.success(function (response) {
					$location.path("/jobs_traduttore");
					alert('We are very sad! We hope you\'ll find something else!');
				});
			}
		};

		$scope.doSave = function() {

			//FIX FORZO AGGIORNAMENTO CKEDITOR ALTRIMENTI PASSA VALORE VECCHIO
			for(var instanceName in CKEDITOR.instances)
				CKEDITOR.instances[instanceName].updateElement();

			services.getFromRESTServer("id_job=" + $scope.id_job + "&text=" + CKEDITOR.instances['done'].getData() +
				"&tipo_job=" + $scope.tipo_job,"save_job")
			.success(function (response) {
			});
		};

    $scope.doSend = function() {
      var conf = confirm("Do you really want to send and finish this job?");

      if(conf == true) {
        //aggiorna status a a "in approval"
        services.getFromRESTServer("id_job=" + $scope.id_job + "&tipo_job=" + $scope.tipo_job
        + "&status=IN APPROVAL","update_job_status")
          .success(function (response) {
          });
        //TODO invia mail all'agenzia per scaricare il file
        services.getFromRESTServer("id_job=" + $scope.id_job + "&tipo_job="  +$scope.tipo_job +
        "&id_agenzia=" + $scope.job.ID_AGENZIA,"doSend")
          .success(function (response) {
            $location.path("/jobs_traduttore");
            alert("Thank you very much! Agency is going to approve your work!");
          });
      }
    };

	}]);
