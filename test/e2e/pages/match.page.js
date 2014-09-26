'use strict';

var MatchPage = function () {
  browser.get('http://localhost:9000/#/match');
};

MatchPage.prototype = Object.create({}, {
  team1Input: { get: function () { return element(by.model('match.team1Name')); }},
  team2Input: { get: function () { return element(by.model('match.team2Name')); }},
  submitBtn: { get: function () { return element(by.id('startBtn')); }},
  matchScoreDiv: { get: function () { return element(by.id('matchScore')); }},
  scoreTeam1Set1: { get: function () { return element(by.css('#scoreTeam1 .set1 span')).getText(); }},
  scoreTeam2Set1: { get: function () { return element(by.css('#scoreTeam2 .set1 span')).getText(); }},
  addPointTeam1Btn : { get: function () { return element(by.css('div#matchScore div.form-group:nth-of-type(1) button:nth-of-type(1)')); }},
  addPointTeam2Btn : { get: function () { return element(by.css('div#matchScore div.form-group:nth-of-type(1) button:nth-of-type(2)')); }},
  timeOutTeam1Btn : { get: function () { return element(by.css('div#matchScore div.form-group:nth-of-type(2) button:nth-of-type(1)')); }},
  timeOutTeam2Btn : { get: function () { return element(by.css('div#matchScore div.form-group:nth-of-type(2) button:nth-of-type(2)')); }},
  timeOutTeam1BtnEnabled : { get: function () { return this.timeOutTeam1Btn.isEnabled(); }},
  timeOutTeam2BtnEnabled : { get: function () { return this.timeOutTeam2Btn.isEnabled(); }},
  isMatchScoreDisplayed : { value : function () {
    return this.matchScoreDiv.isDisplayed();
  }},
  setTeamName : { value : function (input, value) {
      input.clear();
      input.sendKeys(value);
  }},
  startMatch: { value: function (team1, team2) {
    this.setTeamName(this.team1Input, team1);
    this.setTeamName(this.team2Input, team2);
    this.submitBtn.click();
  }},
  addPointToTeam1: { value: function () {
    this.addPointTeam1Btn.click();
  }},
  addPointToTeam2: { value: function () {
    this.addPointTeam2Btn.click();
  }},
  askTimeOutForTeam1: { value: function () {
    this.timeOutTeam1Btn.click();
  }},
  askTimeOutForTeam2: { value: function () {
    this.timeOutTeam2Btn.click();
  }},
});

module.exports = MatchPage;
