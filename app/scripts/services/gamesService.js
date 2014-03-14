/*global angular, window */
angular.module('volleyApp')
  .service('gamesService', ['$window',
    function (window) {

      'use strict';

      //Gestion du storage
      var storage = window.localStorage,
        gamesStorageName = 'ngGames',
        teamPrefixStorageName = 'Team',
        getTeamName = function (nb) {
          if (storage && storage.getItem(teamPrefixStorageName + nb)) {
            return storage.getItem(teamPrefixStorageName + nb);
          }
          return 'Equipe ' + nb;
        },
        saveTeamName = function (nb, value) {
          if (storage) {
            storage.setItem(teamPrefixStorageName + nb, value);
          }
        },
        saveGame = function (game) {
          var savedGames;
          if (storage) {
            savedGames = angular.fromJson(storage.getItem(gamesStorageName)) || [];
            savedGames.push(game);
            storage.setItem(gamesStorageName, angular.toJson(savedGames));
          }
        },
        getSavedGames = function () {
          if (storage) {
            return angular.fromJson(storage.getItem(gamesStorageName)) || [];
          }
        },
        removeSavedMatch = function (i) {
          if (storage) {
            var savedGames = getSavedGames();
            savedGames.splice(i, 1);
            storage.setItem(gamesStorageName, angular.toJson(savedGames));
          }
        },
        clearSavedMatch = function () {
          if (storage) {
            storage.removeItem(gamesStorageName);
          }
        };

      return {
        getTeamName: getTeamName,
        saveTeamName: saveTeamName,
        saveGame: saveGame,
        getSavedGames: getSavedGames,
        removeSavedMatch: removeSavedMatch,
        clearSavedMatch: clearSavedMatch
      };
    }]);
