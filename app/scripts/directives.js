'use strict';

var direttive = angular.module('DirectivesModule', []);

direttive

  /* directive template */
  .directive('templateSnippet', function() {
    return {
      restrict: 'A',
      transclude: true,
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
  })

  //direttiva per le star rating
  .directive("starRating", function() {
    return {
      restrict : "A",
      template : "<ul class='rating'>" +
      "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
      "    <i class='fa fa-lg fa-star'></i>" + //&#9733
      "  </li>" +
      "</ul>",
      scope : {
        ratingValue : "=",
        max : "=",
        onRatingSelected : "&"
      },
      link : function(scope, elem, attrs) {
        var updateStars = function() {
          scope.stars = [];
          for ( var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled : i < scope.ratingValue
            });
          }
        };
        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({
            rating : index + 1
          });
        };
        scope.$watch("ratingValue", function(oldVal, newVal) {
          updateStars();
        });
      }
    };
  })

  .directive("ngTranscludeCustom", function($timeout) {
    return {
      restrict : "AE",
      link: function(scope, elm, attrs) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    }});

/*
* quando sei in un ng-repeat nel tuo scope hai la variabile $last
 la puoi usare anche nel dom hai anche la $index

 VariableTypeDetails
 $index
 number
 iterator offset of the repeated element (0..length-1)
 $first
 boolean
 true if the repeated element is first in the iterator.
 $middle
 boolean
 true if the repeated element is between the first and last in the iterator.
 $last
 boolean
 true if the repeated element is last in the iterator.
 $even
 boolean
 true if the iterator position $index is even (otherwise false).
 $odd
 boolean
 true if the iterator position $index is odd (otherwise false).
 https://docs.angularjs.org/api/ng/directive/ngRepeat


 quindi la direttiva si attacca al tuo ng-repeat e legge la variabile $last che c'è nello scope del dom
 in caso sia true setta un timeout (con delay 0 [leggi https://docs.angularjs.org/api/ng/service/$timeout])
 e genera un evento chiamato ngRepeatFinished
 a quel punto della direttiva siccome angular nel dom sta renderizzando l'ultimo elemento praticamente il timeout serve ad aspettare che sia veramente tutto finito ed emettere il segnale
 anche perchè rischieresti di non fare il digest della roba che stai aggiungendo il dom
 quindi il timeout farà il refresh del dom e quindi all'emissione dell'evento tu aggiungi senza problemi il tuo readmore()

 1. il timeout causa il refresh del dom:    If set to false skips model dirty checking, otherwise will invoke fn within the $apply block.
 (default: true)
 2. il timeout serve ad aspettare che sia veramente finito tutto (siccome ha delay uguale a 0): IL TIMEOUT SERVE PER REFRESHARE
 IL DOM!!!!!!!!!!!!!!!!

 volendo puoi migliorare la direttiva dandogli un attributo che emette l'evento che gli passi tu
 link: function(scope, elm, attrs) {
 if (scope.$last === true) {
 var eventToEmit = scope.$eval(attrs.NomeDirettiva);
 if(eventToEmit != null){
 $timeout(function () {
 scope.$emit(eventToEmit);
 });
 }
 }
 }
 };

* */
