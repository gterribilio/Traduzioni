//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['angularFileUpload']);

app.controller('UploadCtrl', ['$scope', '$rootScope', '$upload', 'APP_CFG', 'customFactory', 'services',
  function ($scope, $rootScope, $upload, APP_CFG, customFactory, services) {
    $scope.$watch('files', function () {
      $scope.upload($scope.files);
    });

    $scope.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          $upload.upload({
            url: APP_CFG.endpoint_server + '/upload.php?action=uploadImage',
            fields: {
              'user_id': $rootScope.userData.ID
            },
            file: file
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            //console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));

            //faccio gli stessi step di home_traduttore.js ma qui prendo sicuramente l'ultima immagine uploadata
            $rootScope.userData.IMAGE = config.file.name;
            customFactory.set('userData', $rootScope.userData);

            services.getFromRESTServer("user_id=" + $rootScope.userData.ID, "getUserProfilePicture")
              .success(function (data) {
                if (data.jsonError != null || data.errCode != null) {
                  alert(JSON.stringify(data));
                }
                else {
                  customFactory.setSessionStorage('userProfileImage', data.base64);
                  $rootScope.image = customFactory.getSessionStorage('userProfileImage');

                }
              });//end success

          }).error(function () {
            $.notify("Error during file upload! Please check your firewall or internet connection", {
              type: 'danger',
              allow_dismiss: true
            });
          });
        }
      }
    };
  }]);
