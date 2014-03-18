angular.module('volleyApp')
  .controller('HistoryCtrl', ['$scope', '$locale', 'gamesService',
    function ($scope, $locale, gamesService) {

      'use strict';

      //Pluralize nb games saved
      $scope.gameForms = {
        0: 'aucun match sauvegardé',
        one: '{} match sauvegardé',
        other: '{} matchs sauvegardés'
      };

      $scope.games = gamesService.getSavedGames();

      $scope.removeGame = function (index) {
        gamesService.removeSavedMatch(index);
        $scope.games = gamesService.getSavedGames();
      };

      $scope.clearGames = function () {
        gamesService.clearSavedMatch();
        $scope.games = [];
      };

      $scope.scoreSets = function(index, set, team) {
        return $scope.games[index].score[set].reduce(function (previous, current, index, array) {
          //Add point only if win by team
          if (team === current) {
            return previous + 1;
          }
          return previous;
        }, 0);
      };
    }]);
