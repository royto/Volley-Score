/*global angular */
angular.module('volleyApp')
  .service('matchsStorageService', ['$window',
    function ($window) {

      'use strict';

      //Gestion du storage
      var storage = $window.localStorage,
        matchsStorageName = 'ngMatchs',
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
        saveMatch = function (match) {
          var savedMatchs;
          if (storage) {
            savedMatchs = angular.fromJson(storage.getItem(matchsStorageName)) || [];
            savedMatchs.push(match);
            storage.setItem(matchsStorageName, angular.toJson(savedMatchs));
          }
        },
        getSavedMatchs = function () {
          if (storage) {
            return angular.fromJson(storage.getItem(matchsStorageName)) || [];
          }
        },
        getSavedMatch = function (index) {
          var matchs = getSavedMatchs();
          if (matchs.length >= index) {
            return matchs[index];
          }
          return null;
        },
        removeSavedMatch = function (i) {
          if (storage) {
            var savedMatchs = getSavedMatchs();
            savedMatchs.splice(i, 1);
            storage.setItem(matchsStorageName, angular.toJson(savedMatchs));
          }
        },
        clearSavedMatch = function () {
          if (storage) {
            storage.removeItem(matchsStorageName);
          }
        };

      return {
        getTeamName: getTeamName,
        saveTeamName: saveTeamName,
        saveMatch: saveMatch,
        getSavedMatchs: getSavedMatchs,
        getSavedMatch: getSavedMatch,
        removeSavedMatch: removeSavedMatch,
        clearSavedMatch: clearSavedMatch
      };
    }]);
