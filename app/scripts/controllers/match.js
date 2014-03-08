angular.module('volleyApp')
    .controller('MatchCtrl', ['$scope', 'gamesService', function ($scope, gamesService) {

        'use strict';
        $scope.service = 2;
        $scope.team1Name = gamesService.getTeamName(1);
        $scope.team2Name = gamesService.getTeamName(2);

        $scope.currentSet = 1;
        $scope.scoreTeam1 = [0, 0, 0, 0, 0];
        $scope.scoreTeam2 = [0, 0, 0, 0, 0];
        $scope.difference = [[0]];
        $scope.setWinTeam1 = 0;
        $scope.setWinTeam2 = 0;
        $scope.isMatchStarted = false;
        $scope.isMatchOver = false;
        $scope.currentService = 1;

        //private functions
        var manageDifference = function(team, isSetOver) {
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
        var getMaxConsecutivePoints = function(set) {
            //var array = [0, 1, 2, 3, 4, 3, 2, 1, 0, -1, -2, -1, 0, 1, 2, 3];
            //Must return 6 -> Unit Test

            //init vars
            var max = 0, i, raise = true,
            current = 0;

            //loop on values
            for (i = 0; i < set.length; i += 1) {
                //premier element
                if (i === 0) {
                    continue;
                }
                //Check if same team win
                if ((raise && set[i] > set[i-1]) ||
                    !raise && set[i-1] > set[i]) {
                    current++;
                } else {
                    current = 1;
                }
                //update max if needed
                if (max < current) {
                    max = current;
                }
                //update raise
                raise = set[i] > set[i-1];
            }
            return max;
        };

        /**
        * Get Max points of difference in a set
        * @param {Array} set as arrray
        */
        var getMaxDifference = function (set) {
            return set.reduce(function(previousValue, currentValue, index, array) {
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
                $scope.scoreTeam1[$scope.currentSet - 1]++;
            } else {
                $scope.scoreTeam2[$scope.currentSet - 1]++;
            }
            //Set service to winning point team
            $scope.currentService = team;

            //Check is set is over
            var isSetOver = $scope.isSetOver();

            //manage points difference history
            manageDifference(team, isSetOver);

            //manage set change
            if (isSetOver) {
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
                    teams : {
                        "team1" : $scope.team1Name,
                        "team2" : $scope.team2Name
                    },
                    sets : []
                };

            //Set points for each set
            for (i = 0; i < 5; i += 1) {
                var set = {
                    "team1" : $scope.scoreTeam1[i],
                    "team2" : $scope.scoreTeam2[i]
                    };
                match.sets.push(set);
            }

            gamesService.saveGame(match);
        };

        $scope.totalPoints = function() {
            return $scope.difference.reduce(function(previous, current, index, array) {
                //difference start at 0 for each set
                return previous + current.length - 1;
            }, 0);
        };

        $scope.totalPointsWinForATeam = function(team) {
            var total = 0, i, j, set,
                raise = team === 1;

            for (j = 0; j < $scope.difference.length; j += 1) {
                set = $scope.difference[j];
                //loop on values
                for (i = 0; i < set.length; i += 1) {
                    //premier element
                    if (i === 0) {
                        continue;
                    }
                    //Check if same team win
                    if ((raise && set[i] > set[i-1]) ||
                        !raise && set[i-1] > set[i]) {
                        total += 1;
                    }
                }
            }
            return total;
        };

    }]);
