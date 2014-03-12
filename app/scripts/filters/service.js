'use strict';

angular.module('volleyApp')
  .filter('service', function () {
    return function (input, team) {
      if (angular.isUndefined(team)) {
        return '';
      }
      return (input === team) ? 'S' : '';
    };
  });
