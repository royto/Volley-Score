'use strict';

describe('Controller: StatCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var StatCtrl,
    location,
    rootScope,
    window,
    scope;

  var store = [
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
          team1 :'Barcelona',
          team2:'Equipe 2'
        },
        score:[[1,1,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1],
                [1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,2],
                [1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,1,1,1,2,1,1],
                [2,2,2,2,1,1,1,2,2,2,2,1,1,1,1,2,2,2,2,2,1,1,2,2]]
      }
    ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location, $window) {
    scope = $rootScope.$new();
    location = $location;
    rootScope = $rootScope;
    window = $window;

    //Register Spy
    spyOn(window.localStorage, 'getItem').andCallFake(function(key) {
      if (key === 'ngMatchs') {
        return angular.toJson(store);
      }
      return {};
    });

    StatCtrl = $controller('StatCtrl', {
      $scope: scope,
      $routeParams : { matchId : 1 }
    });
  }));

  it('init scope with the game relative to params', function () {

    expect(scope.nbSet()).toBe(3);
    expect(scope.totalPoints()).toBe(97);
    expect(scope.totalPointsWinForATeam(2)).toBe(22);
    expect(scope.getMaxConsecutivePointsForMatch()).toBe(25);

  });

  it('should return valid current score', function () {
    scope.currentSet = 2;
    scope.currentPoint = 18;

    expect(scope.currentSetScore(1)).toBe(16);
    expect(scope.currentSetScore(2)).toBe(2);

  });

  it('should return nb points of current set', function () {
    expect(scope.currentSetPoints()).toBe(store[1].score[0].length);
    //change set
    scope.currentSet = 3;
    expect(scope.currentSetPoints()).toBe(store[1].score[2].length);
  });

  it('should assign currentPoint to nb points of current set', function () {
    //change set
    scope.currentSet = 3;
    scope.tmSetChanged();
    expect(scope.currentPoint).toBe(store[1].score[2].length);
  });
});
