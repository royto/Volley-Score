angular.module('volleyApp')
  .controller('HistoryCtrl', ['$scope', '$locale', 'matchsStorageService',
    function ($scope, $locale, matchsStorageService) {

      'use strict';

      //Pluralize nb match saved
      $scope.matchForms = {
        0: 'aucun match sauvegardé',
        one: '{} match sauvegardé',
        other: '{} matchs sauvegardés'
      };

      $scope.matchs = matchsStorageService.getSavedMatchs();

      $scope.removeMatch = function (index) {
        matchsStorageService.removeSavedMatch(index);
        $scope.matchs = gamesService.getSavedMatchs();
      };

      $scope.clearMatchs = function () {
        matchsStorageService.clearSavedMatch();
        $scope.matchs = [];
      };

      $scope.scoreSets = function(index, set, team) {
        return $scope.matchs[index].score[set].reduce(function (previous, current, index, array) {
          //Add point only if win by team
          if (team === current) {
            return previous + 1;
          }
          return previous;
        }, 0);
      };
    }]);
