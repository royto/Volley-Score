class MatchScore {
  constructor() {
    this.templateUrl = 'views/directives/match-score.html';
    this.restrict = 'E';
    this.scope = true;
    this.bindToController = {
        match: '='
    };
    this.controllerAs = 'matchScore';
    this.controller = () => {
      return {
        scoreSets: function (set, team) {
          return this.match.score[set]
          .filter(val => val === team)
          .length;
        }
      };
    };
  }
}

angular.module('volleyApp').directive('matchScore', () => new MatchScore());
