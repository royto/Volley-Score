class MatchService {
  constructor() {
    this.match = this.initGame();
  }

  initGame () {
    return {
      currentSet : 1,
      team1Name : '',
      team2Name : '',
      scoreTeam1 : [0, 0, 0, 0, 0],
      scoreTeam2 : [0, 0, 0, 0, 0],
      score :  [[], [], [], [], []],
      setWinTeam1 : 0,
      setWinTeam2 : 0,
      timeOut1 : 2,
      timeOut2 : 2,
      isMatchStarted : false,
      isMatchOver : false,
      isMatchSaved : false,
      currentService : 1,
      startService : 1
    };
  }

  newGame () {
    this.match = this.initGame();
    return this.getMatch();
  }

  getMatch () { return this.match; }

  startGame () {
    this.match.isMatchStarted = true;
    this.match.currentService = this.match.startService;
  }

  addPoint (team) {
    //Add point to the winning point team
    if (team === 1) {
      this.match.scoreTeam1[this.match.currentSet - 1] += 1;
    } else {
      this.match.scoreTeam2[this.match.currentSet - 1] += 1;
    }
    //Set service to winning point team
    this.match.currentService = team;

    this.match.score[this.match.currentSet - 1].push(team);

    //Check is set is over
    let isSetOver = this.isSetOver();

    //manage set change
    if (isSetOver) {
      //calculate teams which will start service alternate service
      this.match.currentService = ((this.match.startService + this.match.currentSet + 1) % 2) + 1;
      this.match.currentSet += 1;
      if (team === 1) {
        this.match.setWinTeam1 += 1;
      } else {
        this.match.setWinTeam2 += 1;
      }
      //Manage timeout
      this.match.timeOut1 = 2;
      this.match.timeOut2 = 2;

      if (this.match.setWinTeam1 === 3 || this.match.setWinTeam2 === 3) {
        this.match.isMatchOver = true;
        window.alert('Match terminé');
      }
    }
  }

  isTechinicalTimeOut () {
    //No Technical TimeOut on 5th set
    if (this.match.currentSet === 5) {
      return false;
    }
    let maxWinPoints = Math.max(this.match.scoreTeam1[this.match.currentSet - 1], this.match.scoreTeam2[this.match.currentSet - 1]);
    //TimeOut on point 8 and 16
    return maxWinPoints === 8 || maxWinPoints === 16;
  }

  isSetOver () {
    let setMinimumPoint = 25;
    if (this.match.currentSet === 5) {
      setMinimumPoint = 15;
    }

    //Check if one team has reach the set victory point with 2 points far ?
    if ((this.match.scoreTeam1[this.match.currentSet - 1] >= setMinimumPoint ||
        this.match.scoreTeam2[this.match.currentSet - 1] >= setMinimumPoint) &&
      Math.abs(this.match.scoreTeam1[this.match.currentSet - 1] - this.match.scoreTeam2[this.match.currentSet - 1]) >= 2) {
      return true;
    }
    return false;
  }
}

angular.module('volleyApp').service('MatchService', MatchService);
