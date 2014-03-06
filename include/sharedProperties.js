/*global angular */
angular.module('volleyApp')
    .service('sharedProperties', function () {
        
        'use strict';
        
        var team1 = 'First',
            team2 = 'Second';

        return {
            getTeam1: function () {
                return team1;
            },
            setTeam1: function (value) {
                team1 = value;
            },
            getTeam2: function () {
                return team2;
            },
            setTeam2: function (value) {
                team2 = value;
            }
        };
    });
    