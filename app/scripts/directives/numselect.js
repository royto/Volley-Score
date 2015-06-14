/*
Usage :
    <num-select nb-options="5" ng-model="point"></num-select>
    Valeur sélectionnée : {{point}}
    <input type="button" ng-click="point = 3" value="Set to 3">
    demo : http://jsfiddle.net/royto/8L1jLrf1/
*/
(function (angular) {
  'use strict';
  angular.module('volleyApp').
  directive('numSelect', function () {
    return {
      restrict: 'E',
      scope: {
        nbOptions: '=',
        ngModel: '=',
        onChange: '&'
      },
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {

        scope.num = [];

        var updateOptions = function () {
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

        //watch to nbOptions Change
        scope.$watch('nbOptions', function () {
          updateOptions();
        }, true);

        element.bind('change', function () {
          scope.$apply(function () {
            scope.onChange();
          });
        });
      },
      templateUrl: 'views/directives/num-select.html'
    };
  });
})(angular);
