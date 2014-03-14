'use strict';

describe('Service: StatService', function () {

  // load the service's module
  beforeEach(module('volleyApp'));

  // instantiate service
  var StatService;
  beforeEach(inject(function (_StatService_) {
    StatService = _StatService_;
  }));

  it('should do something', function () {
    expect(!!StatService).toBe(true);
  });

  it('should return correct total points', function () {
    var score = [[1,1,2,1,2,1,1,2,1,1], [1,1,2,2,2,2,1,1,1,2], [1,1,2,1,2,1,2,2,2,1,2]];
    expect(StatService.totalPoints(score)).toBe(31);
  });

  it('should return valid difference array', function () {
    var set = [1,1,2,1,1,1,2,2,1,1,2,2,2,1,2,2,1,1,2];

    expect(StatService.getDifference(set)).toEqual([0,1,2,1,2,3,4,3,2,3,4,3,2,1,2,1,0,1,2,1]);
  });


  it('should return correct total points win by team 1', function () {
    var score = [[1,1,2,1,2,1,1,2,1,1], [1,1,2,2,2,2,1,1,1,2], [1,1,2,1,2,1,2,2,2,1,2]];
    expect(StatService.totalPointsWinForATeam(score, 1)).toBe(17);
  });

  it('should return correct total points win by team 2', function () {
    var score = [[1,1,2,1,2,1,1,2,1,1], [1,1,2,2,2,2,1,1,1,2], [1,1,2,1,2,1,2,2,2,1,2]];
    expect(StatService.totalPointsWinForATeam(score, 2)).toBe(14);
  });

  it('should return max consecutive points win for a set', function () {
    var array = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    expect(StatService.getMaxConsecutivePoints(array)).toBe(6);

    array = [1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1];
    expect(StatService.getMaxConsecutivePoints(array)).toBe(5);
  });

  it('should return max Difference for a set', function() {
    var set = [1,1,2,1,1,1,2,2,1,1,2,2,2,1,2,2,1,1,2];
    expect(StatService.getMaxDifference(set)).toBe(4);

    set = [2,2,1,1,2,2,2,1,2,2,2,1,2,2,2,1,1,1,1,1,2];
    expect(StatService.getMaxDifference(set)).toBe(-7);
  });

});
