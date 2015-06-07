class HistoCtrl {
  constructor($locale, matchsStorageService) {
    this.locale = $locale;
    this.matchsStorageService = matchsStorageService;

    this.matchForms = {
        0: 'aucun match sauvegardé',
        one: '{} match sauvegardé',
        other: '{} matchs sauvegardés'
      };

    this.matchs = matchsStorageService.getSavedMatchs();
  }
  clearMatchs () {
    this.matchsStorageService.clearSavedMatch();
    this.matchs = [];
  }
  removeMatch (index) {
    this.matchsStorageService.removeSavedMatch(index);
    this.matchs = this.matchsStorageService.getSavedMatchs();
  }
}

angular.module('volleyApp').controller('HistoryCtrl', ['$locale', 'matchsStorageService', HistoCtrl]);
