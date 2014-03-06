angular.module('volleyApp')
    .controller('HistoryCtrl', ['$scope', 'gamesService', function ($scope, gamesService) {

        'use strict';

        $scope.games = gamesService.getSavedGames();
        $scope.removeGame = function (index) {
            gamesService.removeSavedMatch(index);
            $scope.games = gamesService.getSavedGames();
        };
        $scope.clearGames = function () {
            gamesService.clearSavedMatch();
            $scope.games = [];
        };
    }]);
