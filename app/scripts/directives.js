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
})

.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top}, 1000);
      });
    }
  }
});