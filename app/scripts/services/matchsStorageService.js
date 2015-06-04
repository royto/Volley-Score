/*global angular */
class MatchsStorageService {
  constructor($window) {
    this.storage = $window.localStorage;
    this.matchsStorageName = 'ngMatchs';
    this.teamPrefixStorageName = 'Team';
  }
  getTeamName(nb) {
    if (this.storage && this.storage.getItem(this.teamPrefixStorageName + nb)) {
      return this.storage.getItem(this.teamPrefixStorageName + nb);
    }
    return 'Equipe ' + nb;
  }
  saveTeamName (nb, value) {
    if (this.storage) {
      this.storage.setItem(this.teamPrefixStorageName + nb, value);
    }
  }
  saveMatch (match) {
    var savedMatchs;
    if (this.storage) {
      savedMatchs = angular.fromJson(this.storage.getItem(this.matchsStorageName)) || [];
      savedMatchs.push(match);
      this.storage.setItem(this.matchsStorageName, angular.toJson(savedMatchs));
    }
  }
  getSavedMatchs () {
    if (this.storage) {
      return angular.fromJson(this.storage.getItem(this.matchsStorageName)) || [];
    }
  }
  getSavedMatch (index) {
    var matchs = this.getSavedMatchs();
    if (matchs.length >= index) {
      return matchs[index];
    }
    return null;
  }
  removeSavedMatch (i) {
    if (this.storage) {
      var savedMatchs = this.getSavedMatchs();
      savedMatchs.splice(i, 1);
      this.storage.setItem(this.matchsStorageName, angular.toJson(savedMatchs));
    }
  }
  clearSavedMatch () {
    if (this.storage) {
      this.storage.removeItem(this.matchsStorageName);
    }
  }
}

angular.module('volleyApp').service('matchsStorageService', ['$window', MatchsStorageService]);
