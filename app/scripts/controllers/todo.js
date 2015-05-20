'use strict';

angular.module('volleyApp').controller('TodoCtrl', ['$scope', scope => {
  scope.todos = [
    'Retrieve point button',
    'Reset',
    'Technical TimeOut'
  ];
}]);
