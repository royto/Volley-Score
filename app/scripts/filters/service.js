'use strict';

angular.module('volleyApp')
  .filter('service', function () {
    return function (input, team) {
      return (input === team) ? 'S' : '';
    };
  });
