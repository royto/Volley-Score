'use strict';

describe('Service: matchsStorageService', function () {

  // load the service's module
  beforeEach(module('volleyApp'));

  // instantiate service
  var matchsStorageService,
      window,
      team1Name,
      store;

  beforeEach(inject(function (_matchsStorageService_, $window) {
    window = $window;

    store = [
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
          team1 : 'Madrid',
          team2 : 'New York'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
                [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
                [1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,2,1,1],
                [2,2,2,2,1,1,1,2,2,2,2,1,1,1,1,2,2,2,2,2,1,1,2,2]]
      }
    ];

    team1Name = 'MockTeamName1';

    //Register Spy
    spyOn(window.localStorage, 'getItem').andCallFake(function(key) {
      if (key === 'ngMatchs') {
        return angular.toJson(store);
      }
      if (key === 'Team1') {
        return team1Name;
      }
      return undefined;
    });

    spyOn(window.localStorage, 'removeItem').andCallFake(function(key) {
      if (key === 'ngMatchs') {
        store = null;
      }
    });

    spyOn(window.localStorage, 'setItem').andCallFake(function(key, value) {
      if (key === 'ngMatchs') {
        store = angular.fromJson(value);
      }
      if (key === 'Team1') {
        team1Name = value;
      }
    });

    matchsStorageService = _matchsStorageService_;
  }));

  it('should return saved matchs', function () {
    expect(!!matchsStorageService).toBe(true);
    expect(angular.isArray(matchsStorageService.getSavedMatchs())).toBeTruthy();
    expect(matchsStorageService.getSavedMatchs().length).toBe(3);
  });

  it('should return match if saved match exists at index', function () {
    var match = matchsStorageService.getSavedMatch(2);
    expect(match).toBeDefined();
    expect(match.teams.team1).toBe('Madrid');
  });

  it('should return null if no saved match at index', function () {
    expect(matchsStorageService.getSavedMatch(1000000)).toBeNull();
  });

  it('should save match', function () {

    var match = {
        teams:{
          team1 : 'Grenoble',
          team2 : 'Marseille'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
              [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
              [],[]]
      };

    matchsStorageService.saveMatch(match);
    expect(matchsStorageService.getSavedMatchs().length).toBe(4);
  });

  it('should save match if no match exist', function () {
    //Clear matchs
    matchsStorageService.clearSavedMatch();

    var match = {
        teams:{
          team1 : 'Grenoble',
          team2 : 'Marseille'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
              [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
              [],[]]
      };
    //Save Match
    matchsStorageService.saveMatch(match);

    //Asserts
    expect(matchsStorageService.getSavedMatchs().length).toBe(1);
  });

  it('should remove specfied match', function () {
    matchsStorageService.removeSavedMatch(1);
    var matchs = matchsStorageService.getSavedMatchs();

    expect(matchs.length).toBe(2);
    expect(matchs[1].teams.team1).toBe('Madrid');
  });

  it('should remove all matchs', function () {

    matchsStorageService.clearSavedMatch();
    var matchs = matchsStorageService.getSavedMatchs();

    expect(matchs.length).toBe(0);
  });

  it('should returns team Name', function () {
    //Return name if exists
    expect(matchsStorageService.getTeamName(1)).toBe('MockTeamName1');
    //return default name if undefined
    expect(matchsStorageService.getTeamName(2)).toBe('Equipe 2');
  });

  it('should save team Name', function () {
    matchsStorageService.saveTeamName(1, 'TestName');

    //Return name if exists
    expect(matchsStorageService.getTeamName(1)).toBe('TestName');
  });

});
