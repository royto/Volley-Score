'use strict';

angular.module('volleyApp')
  .controller('StatCtrl', ['$scope', '$routeParams',
      'gamesService', 'StatService',
    function ($scope, $routeParams, gamesService, statService) {
      $scope.matchId = $routeParams.matchId;

      $scope.games = gamesService.getSavedGames();
      $scope.currentGame = $scope.games[$routeParams.matchId] || [];

      $scope.currentSet = 1;
      $scope.currentPoint = 1;

      $scope.nbSet = function() {
        return $scope.currentGame.score.reduce(function(previous, current, index, array) {
          if (angular.isArray(current) && current.length > 0) {
            return previous + 1;
          }
          return previous;
        }, 0);
      };

      $scope.currentSetPoints = function() {
        return $scope.currentGame.score[$scope.currentSet - 1].length;
      };

      $scope.totalPoints = function () {
        return statService.totalPoints($scope.currentGame.score);
      };

      $scope.totalPointsWinForATeam = function (team) {
        return statService.totalPointsWinForATeam($scope.currentGame.score, team);
      };

      $scope.tmSetChanged = function() {
        $scope.currentPoint = $scope.currentGame.score[$scope.currentSet - 1].length;
      };

      $scope.currentSetScore = function(team) {
        return $scope.currentGame.score[$scope.currentSet - 1].reduce(function (previous, current, index, array) {
          if (index >= $scope.currentPoint) {
            return previous;
          }
          //Add point only if win by team
          if (team === current) {
            return previous + 1;
          }
          return previous;
        }, 0);
      };

      $scope.scoreDifferenceEvolution = function() {
        var setScore = $scope.currentGame.score[$scope.diffCurrentSet - 1];
        var diff = statService.getDifference(setScore);
        var tmpData = [];
        diff.forEach(function(element, index, array) {
          tmpData.push({x : index, y : [element] });
        });

        $scope.data = {
          series: [''],
          data : tmpData
        };
      };

      $scope.diffCurrentSet = 1;

      $scope.data = {
        series: [''],
        data : []
      };

      $scope.scoreDifferenceEvolution();

      $scope.chartType = 'line';
      $scope.config = {
        labels: false,
        title : 'Evolution',
        legend : {
          display: true,
          position:'right'
        }
      };
    }]);
