class StatCtrl {
  constructor($stateParams, matchsStorageService, statService) {
    this.$stateParams = $stateParams;
    this.matchsStorageService = matchsStorageService;
    this.statService = statService;

    this.matchId = this.$stateParams.matchId;

    this.currentGame = this.matchsStorageService.getSavedMatch(this.matchId);

    this.currentSet = 1;
    this.currentPoint = 1;

    this.initTeamsStats();
    this.initEvolutionChart();
  }
  nbSet () {
    return this.statService.nbSetsPlayed(this.currentGame.score);
  }

  totalPoints () {
    return this.statService.totalPoints(this.currentGame.score);
  }

  totalPointsWinForATeam (team) {
    return this.statService.totalPointsWinForATeam(this.currentGame.score, team);
  }

  getMaxConsecutivePointsForMatch () {
    return this.statService.getMaxConsecutivePointsForMatch(this.currentGame.score);
  }

  initTeamsStats () {
    this.team1 = {
      name: this.currentGame.teams.team1,
      maxConsecutivesPoints: this.statService.getMaxConsecutivePointForTeam(this.currentGame, 1),
      nbPointsWinOnService: this.statService.getNbPointsWinOnServiceForTeam(this.currentGame, 1)
    };
    this.team2 = {
      name: this.currentGame.teams.team2,
      maxConsecutivesPoints: this.statService.getMaxConsecutivePointForTeam(this.currentGame, 2),
      nbPointsWinOnService: this.statService.getNbPointsWinOnServiceForTeam(this.currentGame, 2)
    };
  }

  //Time Machine
  tmSetChanged () {
    this.currentPoint = this.currentGame.score[this.currentSet - 1].length;
  }

  currentSetPoints () {
    return this.currentGame.score[this.currentSet - 1].length;
  }

  currentSetScore (team) {
    return this.currentGame.score[this.currentSet - 1]
      .slice(0, this.currentPoint)
      .filter(val => val === team)
      .length;
  }

  //Evolution of the score difference
  scoreDifferenceEvolution () {
    var setScore = this.currentGame.score[this.diffCurrentSet - 1];
    var diff = this.statService.getDifference(setScore);
    this.maxDiff = this.statService.getSetMaxDifference(setScore);
    var tmpData = [];
    diff.forEach(function(element, index, array) {
      tmpData.push({x: index, y: [element] });
    });

    this.data = {
      series: [''],
      data: tmpData
    };
  }

  initEvolutionChart () {
    this.diffCurrentSet = 1;

    this.data = {
      series: [''],
      data: []
    };

    this.scoreDifferenceEvolution();

    this.chartType = 'line';
    this.config = {
      labels: false,
      title: 'Evolution',
      legend: {
        display: true,
        position: 'right'
      }
    };
  }
}

angular.module('volleyApp').controller('StatCtrl', ['$stateParams', 'matchsStorageService', 'StatService', StatCtrl]);
