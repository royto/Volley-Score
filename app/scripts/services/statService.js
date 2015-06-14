class StatService {
  constructor(_) {
    this._ = _;
  }
  /**
   * Calculates the history of point diff for a set
   * @param {Array} set
   */
  getDifference (set) {
    return this._.chain(set)
            .transform(function(result, val, index, arr) {
              let diff = val === 1 ? 1 : -1;
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
    return this._.max(this.getDifference(set));
  }

  /**
   * Calculates the Max consecutives points win per set
   * @param {Array} set
   */
  getMaxConsecutivePoints (set) {
    //var array = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    //Must return 6 -> Unit Test
    return this._.chain(set)
             .transform(function(result, val, index, arr) {
              if (index > 0 && val === arr[index - 1]) {
                result[result.length - 1] ++;
              } else {
                result.push(1);
              }
            })
            .max()
            .value();
  }

  getMaxConsecutivePointForTeam (match, team) {
    //Predicate : we take into account consecutive points win on different sets
    return this._.chain(match.score)
            .flatten()
            .transform(function(result, val, index) {
              if (index > 0 && val === team) {
                result[result.length - 1] ++;
              } else {
                result.push(0);
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
                  if (index > 0 && val === team && arr[index - 1] === team) {
                    return result += 1;
                  }
                  return result;
                }, 0)
              )
              .reduce((res, val) => val + res);
  }

  /**
   * Calculates the Max consecutives points win per match
   * @param {Array} score
   */
  getMaxConsecutivePointsForMatch (score) {
    let self = this;
    return score.reduce((previous, current) => Math.max(previous, self.getMaxConsecutivePoints(current)), 0);
  }

  /**
   * Get Max points of difference in a set
   * @param {Array} set as arrray
   */
  getMaxDifference (set) {
    let setDiff = this.getDifference(set);
    return setDiff.reduce((previousValue, currentValue) => {
      if (Math.abs(currentValue) > Math.abs(previousValue)) {
        return currentValue;
      }
      return previousValue;
    });
  }

  totalPoints (score) {
    return this._(score).flatten().value().length;
  }

  totalPointsWinForATeam (score, team) {
    return this._(score).flatten().filter(val => val === team).value().length;
  }

  nbSetsPlayed (score) {
    return score.filter(set => angular.isArray(set) && set.length > 0).length;
  }
}

angular.module('volleyApp').service('StatService', ['_', StatService]);
