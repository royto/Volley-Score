'use strict';

angular.module('volleyApp')
  .controller('TodoCtrl', function ($scope) {
    $scope.todos = [
      'Retrieve point button',
      'Reset',
      'Technical TimeOut',
      'Stats'
    ];
  });
