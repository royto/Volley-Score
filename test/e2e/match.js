'use strict';

describe('View: Login', function () {
  var ptor;

  var MatchPage = require('./pages/match.page.js');
  var page;

  beforeEach(function () {
    //Open Match page
    page = new MatchPage();
    ptor = protractor.getInstance();
  });

  it('should not submit if team name not filled', function () {
    //Verify all elements are present
    expect(page.team1Input.isPresent()).toBe(true);
    expect(page.submitBtn.isPresent()).toBe(true);
    expect(page.matchScoreDiv.isPresent()).toBe(true);

    expect(page.isMatchScoreDisplayed()).toBe(false);

    page.startMatch('', '');

    expect(page.isMatchScoreDisplayed()).toBe(false);
  });


  it('should submit if team names are filled', function () {
    expect(page.isMatchScoreDisplayed()).toBe(false);

    page.startMatch('unit test team name 1', 'unit test team name 2');

    expect(page.isMatchScoreDisplayed()).toBe(true);
  });

  describe('Score Management', function () {
    beforeEach(function () {
      page.startMatch('Paris Volley', 'Avignon Volley Ball')
    });

    it('should add point to team1', function () {
      page.addPointToTeam1();

      expect(page.scoreTeam1Set1).toBe('1');
    });

    it('should add point to team2', function () {
      page.addPointToTeam2();

      expect(page.scoreTeam2Set1).toBe('1');
    });

    it('should disable timeOut button after 2 timeout', function () {
      page.askTimeOutForTeam1();
      expect(page.timeOutTeam1BtnEnabled).toBe(true);
      page.askTimeOutForTeam1();
      expect(page.timeOutTeam1BtnEnabled).toBe(false);
    });
  });
});
