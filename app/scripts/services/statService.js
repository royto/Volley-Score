'use strict';

angular.module('volleyApp')
  .service('StatService', function StatService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var self = this;

    this.getDifference = function (set) {
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

    /**
     * Calculates the Max consecutives points win per set
     * @param {Array} set
     */
    this.getMaxConsecutivePoints = function (set) {
      //var array = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
      //Must return 6 -> Unit Test

      //init vars
      var max = 0,
        i, team,
        current = 0;

      //loop on values
      for (i = 0; i < set.length; i += 1) {
        //Check if same team win or 1st point of the set
        if (angular.isUndefined(team) ||
          (team === set[i])) {
          current += 1;
        } else {
          current = 1;
        }
        //update max if needed
        if (max < current) {
          max = current;
        }
        //update raise
        team = set[i];
      }
      return max;
    };

    /**
     * Calculates the Max consecutives points win per match
     * @param {Array} score
     */
    this.getMaxConsecutivePointsForMatch = function (score) {
      return score.reduce(function(previous, current) {
        return Math.max(previous, self.getMaxConsecutivePoints(current));
      }, 0);
    }

    /**
     * Get Max points of difference in a set
     * @param {Array} set as arrray
     */
    this.getMaxDifference = function (set) {
      var setDiff = self.getDifference(set);
      return setDiff.reduce(function (previousValue, currentValue, index, array) {
        if (Math.abs(currentValue) > Math.abs(previousValue)) {
          return currentValue;
        }
        return previousValue;
      });
    };

    this.totalPoints = function (score) {
      return score.reduce(function (previous, current, index, array) {
        //sum of legnth of sets score arrays
        return previous + current.length;
      }, 0);
    };

    this.totalPointsWinForATeam = function (score, team) {
      return score.reduce(function (previous, current, index, array) {
        //sum of points win by team by set
        return previous + current.reduce(function (previous, current, index, array) {
          //Add point only if win by team
          if (team === current) {
            return previous + 1;
          }
          return previous;
        }, 0);
      }, 0);
    };

  });
