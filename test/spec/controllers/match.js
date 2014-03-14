'use strict';

describe('Controller: MatchCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var MatchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatchCtrl = $controller('MatchCtrl', {
      $scope: scope
    });
  }));

  it('should return correct total points', function () {
    scope.score = [[1,1,2,1,2,1,1,2,1,1], [1,1,2,2,2,2,1,1,1,2], [1,1,2,1,2,1,2,2,2,1,2]];
    expect(scope.totalPoints()).toBe(31);
  });

  it('should add points to team 1', function () {
    scope.score = [[1,1,2,1,2,1,1,2,1,2]];
    scope.scoreTeam1[0] = 6;

    scope.addPoint(1);
    expect(scope.score[0].length).toBe(11);
    expect(scope.score[0][scope.score[0].length -1]).toBe(1);
    expect(scope.scoreTeam1[0]).toBe(7);
  });

  it('should add points and change current set', function () {
    scope.score = [[1,1,2,1,2,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    scope.scoreTeam1[0] = 24;
    scope.scoreTeam2[0] = 4;

    scope.addPoint(1);
    expect(scope.score[0].length).toBe(29);
    expect(scope.score[0][scope.score[0].length -1]).toBe(1);
    expect(scope.currentSet).toBe(2);
  });

  it('should return correct total points win by team 1', function () {
    scope.score = [[1,1,2,1,2,1,1,2,1,1], [1,1,2,2,2,2,1,1,1,2], [1,1,2,1,2,1,2,2,2,1,2]];
    expect(scope.totalPointsWinForATeam(1)).toBe(17);
  });

  it('should return correct total points win by team 2', function () {
    scope.score = [[1,1,2,1,2,1,1,2,1,1], [1,1,2,2,2,2,1,1,1,2], [1,1,2,1,2,1,2,2,2,1,2]];
    expect(scope.totalPointsWinForATeam(2)).toBe(14);
  });

  it('should return max consecutive points win for a set', function () {
    var array = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1];
    expect(scope.getMaxConsecutivePoints(array)).toBe(6);

    array = [1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 1];
    expect(scope.getMaxConsecutivePoints(array)).toBe(5);
  });
});
