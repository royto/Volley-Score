'use strict';

describe('Controller: MatchCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var MatchCtrl,
    _matchsStorageService,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, matchsStorageService) {
    scope = $rootScope.$new();
    _matchsStorageService = matchsStorageService;

    spyOn(_matchsStorageService, 'getTeamName').andCallFake(function(team) {
      return 'mockNameTeam' + team;
    });

    spyOn(_matchsStorageService, 'saveMatch');

    MatchCtrl = $controller('MatchCtrl', {
      $scope: scope
    });
  }));

  it('should init the game', function () {
    expect(scope.match.isMatchStarted).toBeFalsy();
    expect(scope.match.currentSet).toBe(1);
    expect(scope.match.score).toEqual([[], [], [], [], []]);
    expect(scope.match.team1Name).toBe('mockNameTeam1');
    expect(scope.match.team2Name).toBe('mockNameTeam2');
  });

  it('should start the game', function () {
    scope.startGame();
    expect(scope.match.isMatchStarted).toBeTruthy();
  });

  it('should decrease timeOut for the specfied team', function () {
    scope.askTimeOut(1);
    expect(scope.match.timeOut1).toBe(1);
    expect(scope.match.timeOut2).toBe(2);

    scope.askTimeOut(2);
    expect(scope.match.timeOut1).toBe(1);
    expect(scope.match.timeOut2).toBe(1);

  });

  it('should add points to team 1', function () {
    scope.match.score = [[1,1,2,1,2,1,1,2,1,2]];
    scope.match.scoreTeam1[0] = 6;

    scope.addPoint(1);
    expect(scope.match.score[0].length).toBe(11);
    expect(scope.match.score[0][scope.match.score[0].length -1]).toBe(1);
    expect(scope.match.scoreTeam1[0]).toBe(7);
  });

  it('should add points to team 2', function () {
    scope.match.score = [[1,1,2,1,2,1,1,2,1,2]];
    scope.match.scoreTeam2[0] = 4;

    scope.addPoint(2);
    expect(scope.match.score[0].length).toBe(11);
    expect(scope.match.score[0][scope.match.score[0].length -1]).toBe(2);
    expect(scope.match.scoreTeam2[0]).toBe(5);
  });

  it('should add points and change current set', function () {
    scope.match.score = [[1,1,2,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    scope.match.scoreTeam1[0] = 24;
    scope.match.scoreTeam2[0] = 4;

    scope.addPoint(1);
    expect(scope.match.score[0].length).toBe(29);
    expect(scope.match.score[0][scope.match.score[0].length -1]).toBe(1);
    expect(scope.match.currentSet).toBe(2);
  });

  it('should call save match', function () {
    scope.match.team1Name = 'foo';
    scope.match.team2Name = 'bar';

    scope.match.score = [[1,1,2,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

    scope.saveMatch();
    expect(_matchsStorageService.saveMatch).toHaveBeenCalled();

    //Get function last called args
    var args = _matchsStorageService.saveMatch.mostRecentCall.args;

    //Verifiy args are correct
    expect(args.length).toBe(1);
    expect(args[0].teams.team1).toBe('foo');
    expect(args[0].teams.team2).toBe('bar');
    expect(args[0].score).toEqual(scope.match.score);
    expect(args[0].score).toBeArray();

    //Must set match as saved
    expect(scope.match.isMatchSaved).toBeTruthy();
  });

  it('should create a new game', function () {
    scope.newGame();

    expect(scope.match.isMatchStarted).toBeFalsy();
    expect(scope.match.currentSet).toBe(1);
    expect(scope.match.score).toEqual([[], [], [], [], []]);
  });
});
