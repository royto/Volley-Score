'use strict';

describe('Controller: MatchCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var MatchCtrl,
    _matchsStorageService;

  // Initialize the controller
  beforeEach(inject(function ($controller, matchsStorageService) {
    _matchsStorageService = matchsStorageService;

    spyOn(_matchsStorageService, 'getTeamName').and.callFake(function(team) {
      return 'mockNameTeam' + team;
    });

    spyOn(_matchsStorageService, 'saveMatch');

    MatchCtrl = $controller('MatchCtrl');
    MatchCtrl.startMatchForm = {};

  }));

  it('should init the game', function () {
    expect(MatchCtrl.match.isMatchStarted).toBeFalsy();
    expect(MatchCtrl.match.currentSet).toBe(1);
    expect(MatchCtrl.match.score).toEqual([[], [], [], [], []]);
    expect(MatchCtrl.match.team1Name).toBe('mockNameTeam1');
    expect(MatchCtrl.match.team2Name).toBe('mockNameTeam2');
  });

  it('should start the game', function () {
    MatchCtrl.startMatchForm.$valid = true;

    MatchCtrl.startGame();
    expect(MatchCtrl.match.isMatchStarted).toBeTruthy();
  });

  it('should decrease timeOut for the specfied team', function () {
    MatchCtrl.askTimeOut(1);
    expect(MatchCtrl.match.timeOut1).toBe(1);
    expect(MatchCtrl.match.timeOut2).toBe(2);

    MatchCtrl.askTimeOut(2);
    expect(MatchCtrl.match.timeOut1).toBe(1);
    expect(MatchCtrl.match.timeOut2).toBe(1);

  });

  it('should add points to team 1', function () {
    MatchCtrl.match.score = [[1,1,2,1,2,1,1,2,1,2]];
    MatchCtrl.match.scoreTeam1[0] = 6;

    MatchCtrl.addPoint(1);
    expect(MatchCtrl.match.score[0].length).toBe(11);
    expect(MatchCtrl.match.score[0][MatchCtrl.match.score[0].length -1]).toBe(1);
    expect(MatchCtrl.match.scoreTeam1[0]).toBe(7);
  });

  it('should add points to team 2', function () {
    MatchCtrl.match.score = [[1,1,2,1,2,1,1,2,1,2]];
    MatchCtrl.match.scoreTeam2[0] = 4;

    MatchCtrl.addPoint(2);
    expect(MatchCtrl.match.score[0].length).toBe(11);
    expect(MatchCtrl.match.score[0][MatchCtrl.match.score[0].length -1]).toBe(2);
    expect(MatchCtrl.match.scoreTeam2[0]).toBe(5);
  });

  it('should add points and change current set', function () {
    MatchCtrl.match.score = [[1,1,2,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    MatchCtrl.match.scoreTeam1[0] = 24;
    MatchCtrl.match.scoreTeam2[0] = 4;

    MatchCtrl.addPoint(1);
    expect(MatchCtrl.match.score[0].length).toBe(29);
    expect(MatchCtrl.match.score[0][MatchCtrl.match.score[0].length -1]).toBe(1);
    expect(MatchCtrl.match.currentSet).toBe(2);
  });

  it('should call save match', function () {
    MatchCtrl.match.team1Name = 'foo';
    MatchCtrl.match.team2Name = 'bar';

    MatchCtrl.match.score = [[1,1,2,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    MatchCtrl.saveMatch();
    expect(_matchsStorageService.saveMatch).toHaveBeenCalled();

    //Get function last called args
    var args = _matchsStorageService.saveMatch.calls.mostRecent().args;

    //Verifiy args are correct
    expect(args.length).toBe(1);
    expect(args[0].teams.team1).toBe('foo');
    expect(args[0].teams.team2).toBe('bar');
    expect(args[0].score).toEqual(MatchCtrl.match.score);
    expect(args[0].score).toBeArray();

    //Must set match as saved
    expect(MatchCtrl.match.isMatchSaved).toBeTruthy();
  });

  it('should create a new game', function () {
    MatchCtrl.newGame();

    expect(MatchCtrl.match.isMatchStarted).toBeFalsy();
    expect(MatchCtrl.match.currentSet).toBe(1);
    expect(MatchCtrl.match.score).toEqual([[], [], [], [], []]);
  });
});
