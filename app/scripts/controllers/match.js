angular.module('volleyApp')
  .controller('MatchCtrl', ['$scope', '$window', 'matchsStorageService', 'MatchService',
    function ($scope, window, matchsStorageService, matchService) {

      'use strict';

      $scope.match = matchService.getMatch();

      //public functions
      $scope.startGame = function () {
        if ($scope.startMatchForm.$valid) {
          matchService.startGame();
        }
      };

      $scope.addPoint = function (team) {
        matchService.addPoint(team);
      };

      $scope.newGame = function() {
        $scope.match = matchService.newGame();
      };

      $scope.saveMatch = function () {
        var match = {
            teams: {
              team1: $scope.match.team1Name,
              team2: $scope.match.team2Name
            },
            score: $scope.match.score
          };

        matchsStorageService.saveMatch(match);
        $scope.match.isMatchSaved = true;
      };

      $scope.askTimeOut = function(team) {
        if (team === 1) {
          $scope.match.timeOut1 -= 1;
        } else {
          $scope.match.timeOut2 -= 1;
        }
      };

      if (!$scope.match.isMatchStarted) {
        $scope.match.team1Name = matchsStorageService.getTeamName(1);
        $scope.match.team2Name = matchsStorageService.getTeamName(2);
      }

    }]);
