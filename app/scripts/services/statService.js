class StatService {
  /**
   * Calculates the history of point diff for a set
   * @param {Array} set
   */
  getDifference (set) {
    return _.chain(set)
            .transform(function(result, val, index, arr) {
              var diff = val === 1 ? 1 : -1;
              if (index === 0) {
                result.push(diff);
              } else {
                result.push(result[index - 1] + diff);
              }
            })
            .unshift(0)
            .value();
  }

  getSetMaxDifference (set) {
    return _.max(this.getDifference(set));
  }

  /**
   * Calculates the Max consecutives points win per set
   * @param {Array} set
   */
  getMaxConsecutivePoints (set) {
    //var array = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    //Must return 6 -> Unit Test
    return _.chain(set)
             .transform(function(result, val, index, arr) {
              if (index > 0 && val === arr[index-1]) {
                result[result.length -1] ++;
              } else {
                result.push(1);
              }
            })
            .max()
            .value();
  }

  getMaxConsecutivePointForTeam (match, team) {
    //TODO Add Tests
    //Predicate : we take into account consecutive points win on different sets
    return _.chain(match.score)
            .flatten()
             .transform(function(result, val, index, arr) {
              if (index > 0 && val === team) {
                result[result.length -1] ++;
              } else {
                result.push(1);
              }
            })
            .max()
            .value();
  }

  getNbPointsWinOnServiceForTeam (match, team) {
    //TODO Add Tests
    //MapReduce ?
    return match.score
             .map((setScore, setNumber) => setScore
              .reduce((result, val, index, arr) => {
                //special case of 1st point
                if (index === 0 && val === team && match.startService + setNumber % 2 === team) {
                   return result += 1;
                }
                //Other points
                if (index > 0 && val === team && arr[index -1] === team) {
                  return result += 1;
                }
                return result;
              }, 0)
             ).reduce((res, val) => val + res);
  }

  /**
   * Calculates the Max consecutives points win per match
   * @param {Array} score
   */
  getMaxConsecutivePointsForMatch (score) {
    let self = this;
    return score.reduce(function(previous, current) {
      return Math.max(previous, self.getMaxConsecutivePoints(current));
    }, 0);
  }

  /**
   * Get Max points of difference in a set
   * @param {Array} set as arrray
   */
  getMaxDifference (set) {
    var setDiff = this.getDifference(set);
    return setDiff.reduce(function (previousValue, currentValue, index, array) {
      if (Math.abs(currentValue) > Math.abs(previousValue)) {
        return currentValue;
      }
      return previousValue;
    });
  }

  totalPoints (score) {
    return score.reduce(function (previous, current, index, array) {
      //sum of legnth of sets score arrays
      return previous + current.length;
    }, 0);
  }

  totalPointsWinForATeam (score, team) {
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
  }
}

angular.module('volleyApp').service('StatService', ['_', StatService]);
