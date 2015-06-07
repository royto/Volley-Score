'use strict';

describe('Controller: StatCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var StatCtrl,
    location,
    window;

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
  beforeEach(inject(function ($controller, $location, $window) {
    location = $location;
    window = $window;

    //Register Spy
    spyOn(window.localStorage, 'getItem').and.callFake(function(key) {
      if (key === 'ngMatchs') {
        return angular.toJson(store);
      }
      return {};
    });

    StatCtrl = $controller('StatCtrl', {
      $stateParams : { matchId : 1 }
    });
  }));

  it('init scope with the game relative to params', function () {

    expect(StatCtrl.nbSet()).toBe(3);
    expect(StatCtrl.totalPoints()).toBe(97);
    expect(StatCtrl.totalPointsWinForATeam(2)).toBe(22);
    expect(StatCtrl.getMaxConsecutivePointsForMatch()).toBe(25);

  });

  it('should return valid current score', function () {
    StatCtrl.currentSet = 2;
    StatCtrl.currentPoint = 18;

    expect(StatCtrl.currentSetScore(1)).toBe(16);
    expect(StatCtrl.currentSetScore(2)).toBe(2);

  });

  it('should return nb points of current set', function () {
    expect(StatCtrl.currentSetPoints()).toBe(store[1].score[0].length);
    //change set
    StatCtrl.currentSet = 3;
    expect(StatCtrl.currentSetPoints()).toBe(store[1].score[2].length);
  });

  it('should assign currentPoint to nb points of current set', function () {
    //change set
    StatCtrl.currentSet = 3;
    StatCtrl.tmSetChanged();
    expect(StatCtrl.currentPoint).toBe(store[1].score[2].length);
  });
});
