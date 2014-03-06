angular.module('volleyApp')
    .controller('MatchCtrl', ['$scope', 'gamesService', function ($scope, gamesService) {

        'use strict';
        $scope.service = 2;
        $scope.team1Name = gamesService.getTeamName(1);
        $scope.team2Name = gamesService.getTeamName(2);

        $scope.currentSet = 1;
        $scope.scoreTeam1 = [0, 0, 0, 0, 0];
        $scope.scoreTeam2 = [0, 0, 0, 0, 0];
        $scope.setWinTeam1 = 0;
        $scope.setWinTeam2 = 0;
        $scope.isMatchStarted = false;
        $scope.isMatchOver = false;
        $scope.currentService = 1;

        $scope.startGame = function () {
            $scope.isMatchStarted = true;
        };

        $scope.addPoint = function (team) {
            $scope.currentService = team;
            if (team === 1) {
                $scope.scoreTeam1[$scope.currentSet - 1]++;
            } else {
                $scope.scoreTeam2[$scope.currentSet - 1]++;
            }
            if ($scope.isSetOver()) {
                $scope.currentSet++;
                if (team === 1) {
                    $scope.setWinTeam1++;
                } else {
                    $scope.setWinTeam2++;
                }
                if ($scope.setWinTeam1 === 3 || $scope.setWinTeam2 ===3) {
                    $scope.isMatchOver = true;
                    alert('Match terminé');
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
                    teams : [{name : $scope.team1Name}, {name : $scope.team2Name}],
                    sets : []
                };

            for (i = 0; i < 5; i += 1) {
                var set = {  points : [
                        {value : $scope.scoreTeam1[i]},
                        {value : $scope.scoreTeam2[i]}
                    ]};
                match.sets.push(set);
            }

            gamesService.saveGame(match);
        };
    }]);
