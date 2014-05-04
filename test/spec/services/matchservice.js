'use strict';

describe('Service: MatchService', function () {

  // load the service's module
  beforeEach(module('volleyApp'));

  // instantiate service
  var MatchService;
  beforeEach(inject(function (_MatchService_) {
    MatchService = _MatchService_;
  }));

  it('should do something', function () {
    expect(!!MatchService).toBe(true);
  });

  describe('startGame', function () {
    it('should start game', function () {
      var match = MatchService.getMatch();
      MatchService.startGame();
      expect(match.isMatchStarted).toBeTruthy();
    });
  });

  describe('addPoint', function () {
    it('should add point to team 1', function () {
      var match = MatchService.getMatch();
      MatchService.addPoint(1);
      expect(match.scoreTeam1[0]).toBe(1);
      expect(match.scoreTeam2[0]).toBe(0);
      expect(match.score[0].length).toBe(1);
      expect(match.score[0][0]).toBe(1);
    });

     it('should add point to team 2', function () {
      var match = MatchService.getMatch();
      MatchService.addPoint(2);
      expect(match.scoreTeam1[0]).toBe(0);
      expect(match.scoreTeam2[0]).toBe(1);
      expect(match.score[0].length).toBe(1);
      expect(match.score[0][0]).toBe(2);
    });

    it('should add point to team 2 and change set', function () {
      var match = MatchService.getMatch();
      //configure set to be the set winning point
      match.scoreTeam2[0] = 24;

      MatchService.addPoint(2);
      expect(match.currentSet).toBe(2);
      expect(match.scoreTeam1[0]).toBe(0);
      expect(match.scoreTeam2[0]).toBe(25);
    });
  });

  describe('isSetOver', function () {
    var match;

    describe('normal Set', function () {

       beforeEach(function () {
        match = MatchService.getMatch();
        match.currentSet = 1;
      });

      it('should return set over', function () {
        match.scoreTeam1[0] = 25;
        match.scoreTeam2[0] = 13;

        expect(MatchService.isSetOver()).toBeTruthy();
      });

      it('should return set not over', function () {
        match.scoreTeam1[0] = 15;
        match.scoreTeam2[0] = 14;

        expect(MatchService.isSetOver()).toBeFalsy();
      });

      it('should return set not over', function () {
        match.scoreTeam1[0] = 25;
        match.scoreTeam2[0] = 24;

        expect(MatchService.isSetOver()).toBeFalsy();
      });
    });

    describe('5th Set', function () {

      beforeEach(function () {
        match = MatchService.getMatch();
        match.currentSet = 5;
      });

      it('should return set not over', function () {
        match.scoreTeam1[4] = 12;
        match.scoreTeam2[4] = 14;

        expect(MatchService.isSetOver()).toBeFalsy();
      });

      it('should return set over', function () {
        match.scoreTeam1[4] = 15;
        match.scoreTeam2[4] = 13;

        expect(MatchService.isSetOver()).toBeTruthy();
      });

      it('should return set not over', function () {
        match.scoreTeam1[4] = 15;
        match.scoreTeam2[4] = 14;

        expect(MatchService.isSetOver()).toBeFalsy();
      });
    });
  });
});
