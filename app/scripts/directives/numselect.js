/*
Usage :
    <selectnum nb-options="5" model="point"></selectnum>
    Valeur sélectionnée : {{point}}
    <input type="button" ng-click="point = 3" value="Set to 3">
    demo : http://jsfiddle.net/6vu7N/8/
*/
'use strict';
angular.module('volleyApp').
directive('selectnum', function () {
  return {
    restrict: 'E',
    scope: {
      nbOptions: '=nbOptions',
      model: '=model'
    },
    link: function (scope, element, attrs, controller) {
      scope.num = [];
      for (var i = 0; i <= scope.nbOptions; i += 1) {
        scope.num.push(i);
      }
    },
    template: '<select ng-model="model"><option ng-repeat="n in num">{{n}}</option></select>'
  };
});
