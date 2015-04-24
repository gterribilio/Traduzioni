'use strict';

var direttive = angular.module('DirectivesModule', []);

direttive

  /* directive template */
  .directive('templateSnippet', function() {
    return {
      restrict: 'A',
      templateUrl: function(elem, attr){
        return 'views/'+attr.name+'.html';
      }
    };
  })

  /* direttiva su controllo per le password che siano uguali */
  .directive('pwCheck', [function () {
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
      scope: {
        scroll: '=scroll'
      },
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
  })
  /*direttiva che fixa ng-src attribute nell'attributo src del tag EMBED*/
  .directive('pdf', function() {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.$watch('getJobTODO', function(val) {
          var url = scope.$eval(attrs.src);
          if(url!=null) {
            element.replaceWith('<iframe src="' + scope.$eval(url) + '" style="width: 100%; height: 370px;" frameborder="0" scrolling="no" />');
          }
        });

      }
    };
  });
