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
    scope.difference = [[0,1,2,3,4,5,6,7,8,7], [0,1,2,3,4,5,6,7,8,9], [0,1,2,1,0,1,2,3,4,5,6]];
      expect(scope.totalPoints()).toBe(28);
  });

  it('should return correct total points win by team 1', function () {
    scope.difference = [[0,1,2,3,4,5,6,7,8,7], [0,1,2,3,4,5,6,7,8,9], [0,1,2,1,0,1,2,3]];
      expect(scope.totalPointsWinForATeam(1)).toBe(22);
  });

  it('should return correct total points win by team 2', function () {
    scope.difference = [[0,1,2,3,5,6,7,8,7], [0,1,2,3,5,6,7,8,9,10], [0,1,2,1,0,1,2,3,5,6]];
      expect(scope.totalPointsWinForATeam(2)).toBe(3);
  });
});
