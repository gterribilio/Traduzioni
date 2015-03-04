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
}).

directive('registrazioneTraduttoreElement', function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      rip: '=ripetizioni',
      actionpath: '=',
    },
    templateUrl: 'views/snippet/registrazioneTraduttoreSnippet.html'
  };
}).

directive('registrazioneAgenziaElement', function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      rip: '=ripetizioni',
      actionpath: '=',
    },
    templateUrl: 'views/snippet/registrazioneAgenziaSnippet.html'
  };
}).

/*direttiva su controllo per le password che siano uguali*/
directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}])
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