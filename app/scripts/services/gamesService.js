/*global angular, window */
angular.module('volleyApp')
    .service('gamesService', function () {

        'use strict';

        //Gestion du storage
        var storage = window.localStorage,
            getTeamName = function (nb) {
                if (storage && storage.getItem('Team' + nb)) {
                    return storage.getItem('Team' + nb);
                }
                return "Equipe " + nb;
            },
            saveTeamName = function (nb, value) {
                if (storage) {
                    storage.setItem('Team' + nb, value);
                }
            },
            saveGame = function (game) {
                var savedGames;
                if (storage) {
                    savedGames = angular.fromJson(storage.getItem('games')) || [];
                    savedGames.push(game);
                    storage.setItem('games', angular.toJson(savedGames));
                }
            },
            getSavedGames = function () {
                if (storage) {
                    return angular.fromJson(storage.getItem('games')) || [];
                }
            },
            removeSavedMatch = function (i) {
                if (storage) {
                    var savedGames = getSavedGames();
                    savedGames.splice(i, 1);
                    storage.setItem('games', angular.toJson(savedGames));
                }
            },
            clearSavedMatch = function () {
                if (storage) {
                    storage.removeItem('games');
                }
            };

        return {
            getTeamName : getTeamName,
            saveTeamName : saveTeamName,
            saveGame : saveGame,
            getSavedGames : getSavedGames,
            removeSavedMatch : removeSavedMatch,
            clearSavedMatch : clearSavedMatch
        };
    });
