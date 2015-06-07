class matchScore {
  constructor() {
    this.templateUrl = 'views/directives/match-score.html';
    this.restrict = 'E';
    this.scope = true;
    this.bindToController = {
        match : '='
    };
    this.controllerAs = 'matchScore';
    this.controller = () => {
      return {
        scoreSets : function (set, team) {
          return this.match.score[set].reduce(function (previous, current, index, array) {
            //Add point only if win by team
            if (team === current) {
              return previous + 1;
            }
            return previous;
          }, 0);
        }
      }
    }
  }
}

angular.module('volleyApp').directive('matchScore', () => new matchScore());
