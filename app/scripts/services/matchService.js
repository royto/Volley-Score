'use strict';

angular.module('volleyApp')
  .service('MatchService', function MartchService() {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var self = this;

    this.initGame = function() {
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
    };

    var match = self.initGame();

    this.newGame = function() {
      match = self.initGame();
      return self.getMatch();
    }

    this.getMatch = function() {
      return match;
    };

    this.startGame = function () {
      match.isMatchStarted = true;
      match.currentService = match.startService;
    };

    this.addPoint = function (team) {

        //Add point to the winning point team
        if (team === 1) {
          match.scoreTeam1[match.currentSet - 1] += 1;
        } else {
          match.scoreTeam2[match.currentSet - 1] += 1;
        }
        //Set service to winning point team
        match.currentService = team;

        match.score[match.currentSet - 1].push(team);

        //Check is set is over
        var isSetOver = self.isSetOver();

        //manage set change
        if (isSetOver) {
          //calculate teams which will start service alternate service
          match.currentService = ((match.startService + match.currentSet + 1) % 2) + 1;
          match.currentSet += 1;
          if (team === 1) {
            match.setWinTeam1 += 1;
          } else {
            match.setWinTeam2 += 1;
          }
          //Manage timeout
          match.timeOut1 = 2;
          match.timeOut2 = 2;

          if (match.setWinTeam1 === 3 || match.setWinTeam2 === 3) {
            match.isMatchOver = true;
            window.alert('Match terminé');
          }
        }

      };

      this.isSetOver = function () {
        var setMinimumPoint = 25;
        if (match.currentSet === 5) {
          setMinimumPoint = 15;
        }

        //Check if one team has reach the set victory point with 2 points far ?
        if ((match.scoreTeam1[match.currentSet - 1] >= setMinimumPoint ||
            match.scoreTeam2[match.currentSet - 1] >= setMinimumPoint) &&
          Math.abs(match.scoreTeam1[match.currentSet - 1] - match.scoreTeam2[match.currentSet - 1]) >= 2) {
          return true;
        }
        return false;
      };
  });
