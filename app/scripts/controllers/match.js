angular.module('volleyApp')
  .controller('MatchCtrl', ['$scope', '$window', 'gamesService', 'StatService',
    function ($scope, window, gamesService, statService) {

      'use strict';
      $scope.team1Name = gamesService.getTeamName(1);
      $scope.team2Name = gamesService.getTeamName(2);

      $scope.currentSet = 1;
      $scope.scoreTeam1 = [0, 0, 0, 0, 0];
      $scope.scoreTeam2 = [0, 0, 0, 0, 0];
      $scope.score = [[], [], [], [], []];
      $scope.setWinTeam1 = 0;
      $scope.setWinTeam2 = 0;
      $scope.timeOut1 = 2;
      $scope.timeOut2 = 2;
      $scope.isMatchStarted = false;
      $scope.isMatchOver = false;
      $scope.isMatchSaved = false;
      $scope.currentService = 1;


      //public functions
      $scope.startGame = function () {
        $scope.isMatchStarted = true;
      };

      $scope.addPoint = function (team) {

        //Add point to the winning point team
        if (team === 1) {
          $scope.scoreTeam1[$scope.currentSet - 1] += 1;
        } else {
          $scope.scoreTeam2[$scope.currentSet - 1] += 1;
        }
        //Set service to winning point team
        $scope.currentService = team;

        $scope.score[$scope.currentSet - 1].push(team);

        //Check is set is over
        var isSetOver = $scope.isSetOver();

        //manage set change
        if (isSetOver) {
          $scope.currentSet += 1;
          if (team === 1) {
            $scope.setWinTeam1 += 1;
          } else {
            $scope.setWinTeam2 += 1;
          }
          //Manage timeout
          $scope.timeOut1 = 2;
          $scope.timeOut2 = 2;

          if ($scope.setWinTeam1 === 3 || $scope.setWinTeam2 === 3) {
            $scope.isMatchOver = true;
            window.alert('Match terminé');
          }
        }

      };

      $scope.isSetOver = function () {
        var setMinimumPoint = 25;
        if ($scope.currentSet === 5) {
          setMinimumPoint = 15;
        }

        //Check if one team has reach the set victory point with 2 points far ?
        if (($scope.scoreTeam1[$scope.currentSet - 1] >= setMinimumPoint ||
            $scope.scoreTeam2[$scope.currentSet - 1] >= setMinimumPoint) &&
          Math.abs($scope.scoreTeam1[$scope.currentSet - 1] - $scope.scoreTeam2[$scope.currentSet - 1]) >= 2) {
          return true;
        }
        return false;
      };

      $scope.saveMatch = function () {
        var match = {
            teams: {
              team1: $scope.team1Name,
              team2: $scope.team2Name
            },
            score: $scope.score
          };

        gamesService.saveGame(match);
        $scope.isMatchSaved = true;
      };

      $scope.askTimeOut = function(team) {
        if (team === 1) {
          $scope.timeOut1 -= 1;
        } else {
          $scope.timeOut2 -= 1;
        }
      };

      $scope.totalPoints = function () {
        return statService.totalPoints($scope.score);
      };

      $scope.totalPointsWinForATeam = function (team) {
        return statService.totalPointsWinForATeam($scope.score, team);
      };
    }]);
