'use strict';

describe('Service: gamesService', function () {

  // load the service's module
  beforeEach(module('volleyApp'));

  // instantiate service
  var gamesService,
      window,
      team1Name,
      store;

  beforeEach(inject(function (_gamesService_, $window) {
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
      if (key === 'ngGames') {
        return angular.toJson(store);
      }
      if (key === 'Team1') {
        return team1Name;
      }
      return undefined;
    });

    spyOn(window.localStorage, 'removeItem').andCallFake(function(key) {
      if (key === 'ngGames') {
        store = null;
      }
    });

    spyOn(window.localStorage, 'setItem').andCallFake(function(key, value) {
      if (key === 'ngGames') {
        store = angular.fromJson(value);
      }
      if (key === 'Team1') {
        team1Name = value;
      }
    });

    gamesService = _gamesService_;
  }));

  it('should return saved games', function () {
    expect(!!gamesService).toBe(true);
    expect(angular.isArray(gamesService.getSavedGames())).toBeTruthy();
    expect(gamesService.getSavedGames().length).toBe(3);
  });

  it('should return game if saved game exists at index', function () {
    var game = gamesService.getSavedGame(2);
    expect(game).toBeDefined();
    expect(game.teams.team1).toBe('Madrid');
  });

  it('should return null if no saved game at index', function () {
    expect(gamesService.getSavedGame(1000000)).toBeNull();

  });

  it('should save game', function () {

    var game = {
        teams:{
          team1 : 'Grenoble',
          team2 : 'Marseille'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
              [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
              [],[]]
      };

    gamesService.saveGame(game);
    expect(gamesService.getSavedGames().length).toBe(4);
  });

  it('should save game if no game exist', function () {
    //Clear games
    gamesService.clearSavedMatch();

    var game = {
        teams:{
          team1 : 'Grenoble',
          team2 : 'Marseille'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
              [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
              [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
              [],[]]
      };
    //Save Game
    gamesService.saveGame(game);

    //Asserts
    expect(gamesService.getSavedGames().length).toBe(1);
  });

  it('should remove game', function () {
    gamesService.removeSavedMatch(1);
    var games = gamesService.getSavedGames();

    expect(games.length).toBe(2);
    expect(games[1].teams.team1).toBe('Madrid');
  });

  it('should remove all game', function () {

    gamesService.clearSavedMatch();
    var games = gamesService.getSavedGames();

    expect(games.length).toBe(0);
  });

  it('should returns team Name', function () {
    //Return name if exists
    expect(gamesService.getTeamName(1)).toBe('MockTeamName1');
    //return default name if undefined
    expect(gamesService.getTeamName(2)).toBe('Equipe 2');
  });

  it('should save team Name', function () {
    gamesService.saveTeamName(1, 'TestName');

    //Return name if exists
    expect(gamesService.getTeamName(1)).toBe('TestName');
  });

});
