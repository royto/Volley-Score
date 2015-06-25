/*
Usage :
    <num-select nb-options="5" ng-model="point"></num-select>
    Valeur sélectionnée : {{point}}
    <input type="button" ng-click="point = 3" value="Set to 3">
    demo : http://jsfiddle.net/royto/8L1jLrf1/
*/

class NumSelect {
  constructor() {
    this.templateUrl = 'views/directives/num-select.html';
    this.restrict = 'E';
    this.scope = {
        nbOptions: '=',
        ngModel: '=',
        onChange: '&'
    };
    this.require = 'ngModel';
    this.link = function(scope, element, attrs, ngModelCtrl) {
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
    };
  }
}

angular.module('volleyApp').directive('numSelect', [() => new NumSelect()]);
