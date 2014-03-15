'use strict';

angular.module('volleyApp')
  .controller('StatCtrl', ['$scope', '$routeParams', 'gamesService',
    function ($scope, $routeParams, gamesService) {
      $scope.matchId = $routeParams.matchId;

      $scope.games = gamesService.getSavedGames();
      $scope.currentGame = $scope.games[$routeParams.matchId] || [];

      $scope.currentSet = 2;
      $scope.currentSetScore = function() {
        return $scope.currentGame.sets[$scope.currentSet];
      };
    }]);
