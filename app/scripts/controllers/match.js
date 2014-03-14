angular.module('volleyApp')
  .controller('MatchCtrl', ['$scope', '$window', 'gamesService',
    function ($scope, window, gamesService) {

      'use strict';
      $scope.service = 2;
      $scope.team1Name = gamesService.getTeamName(1);
      $scope.team2Name = gamesService.getTeamName(2);

      $scope.currentSet = 1;
      $scope.scoreTeam1 = [0, 0, 0, 0, 0];
      $scope.scoreTeam2 = [0, 0, 0, 0, 0];
      $scope.score = [[], [], [], [], []];
      $scope.difference = [[0]];
      $scope.setWinTeam1 = 0;
      $scope.setWinTeam2 = 0;
      $scope.isMatchStarted = false;
      $scope.isMatchOver = false;
      $scope.currentService = 1;

      //private functions
      var manageDifference = function (team, isSetOver) {
        //get last value
        var currentArray = $scope.difference[$scope.currentSet - 1],
          lastValue = currentArray[currentArray.length - 1];

        if (team === 1) {
          currentArray.push(lastValue + 1);
        } else {
          currentArray.push(lastValue - 1);
        }

        if (isSetOver) {
          $scope.difference.push([0]);
        }
      };

      //Externalize to stat service ??
      /**
       * Description
       * @param {Array} set
       */
      $scope.getMaxConsecutivePoints = function (set) {
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
       * Get Max points of difference in a set
       * @param {Array} set as arrray
       */
      var getMaxDifference = function (set) {
        return set.reduce(function (previousValue, currentValue, index, array) {
          if (Math.abs(currentValue) > Math.abs(previousValue)) {
            return currentValue;
          }
          return previousValue;
        });
      };

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

        //manage points difference history
        manageDifference(team, isSetOver);

        //manage set change
        if (isSetOver) {
          $scope.currentSet += 1;
          if (team === 1) {
            $scope.setWinTeam1 += 1;
          } else {
            $scope.setWinTeam2 += 1;
          }
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
        var i,
          match = {
            teams: {
              team1: $scope.team1Name,
              team2: $scope.team2Name
            },
            sets: []
          };

        //Set points for each set
        for (i = 0; i < 5; i += 1) {
          var set = {
            team1: $scope.scoreTeam1[i],
            team2: $scope.scoreTeam2[i]
          };
          match.sets.push(set);
        }

        gamesService.saveGame(match);
      };

      $scope.totalPoints = function () {
        return $scope.score.reduce(function (previous, current, index, array) {
          //sum of legnth of sets score arrays
          return previous + current.length;
        }, 0);
      };

      $scope.totalPointsWinForATeam = function (team) {
        return $scope.score.reduce(function (previous, current, index, array) {
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

    }]);
