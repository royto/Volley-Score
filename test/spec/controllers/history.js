'use strict';

describe('Controller: HistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var store = [
      {
        teams: {
          team1:'Barcelona',
          team2:'Madrid'
        },
        score:[
          [1,1,1,1,2,2,2,1,1,1,1,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,2,2,2,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,2,2,2,1,1],
          [1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2,2,2,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1],
          [],
          []
        ]
      },
      {
        teams:{
          team1:'Barcelona',
          team2:'Equipe 2'
        },
        score:[[1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [],
              []]
      },
      {
        teams:{
          team1 :'Barcelona',
          team2:'Equipe 2'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
                [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
                [1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,2,1,1],
                [2,2,2,2,1,1,1,2,2,2,2,1,1,1,1,2,2,2,2,2,1,1,2,2]]
      }
    ];

  var HistoryCtrl,
      _matchsStorageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, matchsStorageService) {
    _matchsStorageService = matchsStorageService;

    //Register Spy
    spyOn(window.localStorage, 'getItem').and.callFake(function(key) {
      if (key === 'ngMatchs') {
        return angular.toJson(store);
      }
      return {};
    });

    spyOn(_matchsStorageService, 'clearSavedMatch');

    spyOn(_matchsStorageService, 'removeSavedMatch').and.callFake(function(index) {
      store.splice(index, 1);
    });

    HistoryCtrl = $controller('HistoryCtrl');
  }));

  it('should attach a macthes to the scope', function () {
    expect(HistoryCtrl.matchs.length).toBe(3);
  });

  it('should clear saved matches', function() {
    HistoryCtrl.clearMatchs();
    expect(_matchsStorageService.clearSavedMatch).toHaveBeenCalled();
    expect(HistoryCtrl.matchs.length).toBe(0);
  });

  it('should remove match at specified index', function() {
    HistoryCtrl.removeMatch(1);
    expect(_matchsStorageService.removeSavedMatch).toHaveBeenCalled();
    var args = _matchsStorageService.removeSavedMatch.calls.mostRecent().args;

    expect(args.length).toBe(1);
    expect(args[0]).toBe(1);
    expect(HistoryCtrl.matchs.length).toBe(2);
  });

  it('should return the right score for a team / set / macthes', function () {
    expect(HistoryCtrl.scoreSets(0,0,1)).toBe(25);
    expect(HistoryCtrl.scoreSets(0,0,2)).toBe(14);
  });
});
