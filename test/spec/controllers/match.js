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

  it('should add points to team 1', function () {
    scope.match.score = [[1,1,2,1,2,1,1,2,1,2]];
    scope.match.scoreTeam1[0] = 6;

    scope.addPoint(1);
    expect(scope.match.score[0].length).toBe(11);
    expect(scope.match.score[0][scope.match.score[0].length -1]).toBe(1);
    expect(scope.match.scoreTeam1[0]).toBe(7);
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
});
