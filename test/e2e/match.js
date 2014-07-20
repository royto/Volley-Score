'use strict';

describe('View: Login', function () {
  var ptor;

  beforeEach(function () {
    //Open Match page
    browser.get('http://localhost:9000/#/match');
    ptor = protractor.getInstance();
  });

  it('should not submit if team name not filled', function () {
    var team1Input = by.model('match.team1Name');
    var submitBtn = by.id('startBtn');
    var matchScoreDiv = by.id('matchScore');

    //Verify all elements are present
    expect(ptor.isElementPresent(team1Input)).toBe(true);
    expect(ptor.isElementPresent(submitBtn)).toBe(true);
    expect(ptor.isElementPresent(matchScoreDiv)).toBe(true);

    expect(element(matchScoreDiv).isDisplayed()).toBe(false);


    //Clear team 1 input
    element(team1Input).clear();

    //submit form
    element(submitBtn).click();

    expect(element(matchScoreDiv).isDisplayed()).toBe(false);
  });


  it('should not submit if team names are  filled', function () {
    var team1Input = by.model('match.team1Name');
    var team2Input = by.model('match.team2Name');
    var submitBtn = by.id('startBtn');
    var matchScoreDiv = by.id('matchScore');

    //Verify all elements are present
    expect(ptor.isElementPresent(team1Input)).toBe(true);
    expect(ptor.isElementPresent(team2Input)).toBe(true);
    expect(ptor.isElementPresent(submitBtn)).toBe(true);
    expect(ptor.isElementPresent(matchScoreDiv)).toBe(true);

    expect(element(matchScoreDiv).isDisplayed()).toBe(false);


    //Clear team name inputs and set new names
    element(team1Input).clear();
    element(team1Input).sendKeys('unit test team name 1');
    element(team2Input).clear();
    element(team2Input).sendKeys('unit test team name 2');

    //submit form
    element(submitBtn).click();

    expect(element(matchScoreDiv).isDisplayed()).toBe(true);
  });
});

