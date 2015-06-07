class MatchCtrl {
  constructor($window, matchsStorageService, MatchService) {
    this.window = $window;
    this.matchsStorageService = matchsStorageService;
    this.matchService = MatchService;

    this.match = this.matchService.getMatch();

    if (!this.match.isMatchStarted) {
      this.match.team1Name = this.matchsStorageService.getTeamName(1);
      this.match.team2Name = this.matchsStorageService.getTeamName(2);
    }
  }
  startGame () {
    if (this.startMatchForm.$valid) {
      this.matchService.startGame();
      this.matchsStorageService.saveTeamName(1, this.match.team1Name);
      this.matchsStorageService.saveTeamName(2, this.match.team2Name);
    }
  }
  addPoint (team) {
    this.matchService.addPoint(team);
  }
  newGame () {
    this.match = this.matchService.newGame();
  }
  saveMatch () {
    var matchToSave = {
        teams: {
          team1: this.match.team1Name,
          team2: this.match.team2Name
        },
        score: this.match.score
      };

    this.matchsStorageService.saveMatch(matchToSave);
    this.match.isMatchSaved = true;
  }
  askTimeOut (team) {
    if (team === 1) {
      this.match.timeOut1 -= 1;
    } else {
      this.match.timeOut2 -= 1;
    }
  }
}

angular.module('volleyApp').controller('MatchCtrl', ['$window', 'matchsStorageService', 'MatchService', MatchCtrl]);
