/*
Usage :
    <selectnum nb-options="5" model="point"></selectnum>
    Valeur sélectionnée : {{point}}
    <input type="button" ng-click="point = 3" value="Set to 3">
    demo : http://jsfiddle.net/6vu7N/10/
*/
'use strict';
angular.module('volleyApp').
directive('numselect', function () {
  return {
    restrict: 'E',
    scope: {
      nbOptions: '=',
      model: '=',
      onChange : '&'
    },
    link: function (scope, element, attrs, controller) {

      //watch to nbOptions Change
      scope.$watch('nbOptions', function() {
        updateOptions();
      }, true);

      scope.num = [];

      var updateOptions = function() {
        var i = 0;
        if (angular.isDefined(attrs.startAtOne) &&
            attrs.startAtOne === 'true') {
          i = 1;
        }
        scope.num = [];
        for (; i <= scope.nbOptions; i += 1) {
          scope.num.push(i);
        }
      };

      element.bind('change', function() {
        scope.$apply(function() {
          scope.onChange();
        });
      });
    },
    template: '<select ng-model="model"><option ng-repeat="n in num">{{n}}</option></select>'
  };
});
