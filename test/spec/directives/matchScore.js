'use strict';

describe('Directive: MatchScore', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));
  // load the template
  beforeEach(module('views/directives/match-score.html'));

  var match = {
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
  };

  var element,
    $compile,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, _$compile_) {
    $compile = _$compile_;

    scope = $rootScope.$new();
    scope.match = match;
  }));


  it('should return the right score for a team / set / macthes', function () {
    element = angular.element('<match-score match="match"></match-score>');
    element = $compile(element)(scope);

    scope.$digest();

    var ctrl = element.controller('matchScore');
    expect(ctrl.scoreSets(0, 1)).toBe(25);
    expect(ctrl.scoreSets(0, 2)).toBe(14);
    expect(ctrl.scoreSets(1, 1)).toBe(25);
    expect(ctrl.scoreSets(1, 2)).toBe(10);
    expect(ctrl.scoreSets(2, 1)).toBe(25);
    expect(ctrl.scoreSets(2, 2)).toBe(11);
  });
});
