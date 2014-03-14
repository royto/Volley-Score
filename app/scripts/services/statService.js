'use strict';

angular.module('volleyApp')
  .service('StatService', function StatService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getDifference = function(set) {
      var diff = [0],
          last = 0,
          i;

      for (i = 0; i < set.length; i += 1) {
        if (set[i] === 1) {
          last += 1;
        } else {
          last -= 1;
        }
        diff.push(last);
      }

      return diff;
    };
  });
