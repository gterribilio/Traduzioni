'use strict';

var direttive = angular.module('DirectivesModule', []);

direttive
/*direttiva su controllo per le password che siano uguali*/
.directive('loginElement', function() {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        rip: '=login',
        actionpath: '=',
      },
      templateUrl: 'views/snippet/loginSnippet.html'
    };
  });

