'use strict';

var home = angular.module('JobsCtrlTraduttoreModule', []);

home.controller('JobsTraduttoreCtrl',  ['$scope', '$rootScope', '$window', 'services', '$location', 'customFactory',
	function ($scope, $rootScope, $window, services, $location, customFactory) {  

		$rootScope.isLogged = customFactory.get('isLogged');
		$rootScope.userData =  customFactory.get('userData');
        if(customFactory.get('isLogged')==null || customFactory.get('userData')== null ) {
            $location.path("/");
        }

		//init function: indeadlinejabs, donejobs
		(function init(){

            services.getFromRESTServer(
                "user_id=" + $rootScope.userData.ID,"getInDeadlineTranslationJobs")
            .success(function (data) {
                if(data.jsonError != null || data.errCode != null)
                {
    			//alert (data.errMsg); Nessun dato trovato
    			$scope.indeadlineTranslationList=null;
    			//alert(JSON.stringify(data));
    		}
    		else {
    			$scope.indeadlineTranslationList = data;
    			//alert(JSON.stringify(data));
    		}
		});//end success

            services.getFromRESTServer(
                "user_id=" + $rootScope.userData.ID,"getDoneTranslationJobs")
            .success(function (data) {
                if(data.jsonError != null || data.errCode != null)
                {
                //alert (data.errMsg); Nessun dato trovato
                $scope.doneTranslationList=null;
                //alert(JSON.stringify(data));
            }
            else {
            	$scope.doneTranslationList = data;
                //alert(JSON.stringify(data));
            }
        });//end success

            services.getFromRESTServer(
                "user_id=" + $rootScope.userData.ID,"getInDeadlineCorrectionJobs")
            .success(function (data) {
                if(data.jsonError != null || data.errCode != null)
                {
    			//alert (data.errMsg); Nessun dato trovato
    			$scope.indeadlineCorrectionList=null;
    			//alert(JSON.stringify(data));
    		}
    		else {
    			$scope.indeadlineCorrectionList = data;
    			//alert(JSON.stringify(data));
    		}
		});//end success

            services.getFromRESTServer(
                "user_id=" + $rootScope.userData.ID,"getDoneCorrectionJobs")
            .success(function (data) {
                if(data.jsonError != null || data.errCode != null)
                {
    			//alert (data.errMsg); Nessun dato trovato
    			$scope.doneCorrectionList=null;
    			//alert(JSON.stringify(data));
    		}
    		else {
    			$scope.doneCorrectionList = data;
    			//alert(JSON.stringify(data));
    		}
		});//end succes

		})(); //end init function

	}]);