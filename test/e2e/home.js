'use strict';

describe('View: Login', function () {
  var ptor;

  beforeEach(function () {
    browser.get('http://localhost:9000/');
    ptor = protractor.getInstance();
  });

  it('should find title element', function () {
    var ele = by.binding('version');

    expect(ptor.isElementPresent(ele)).toBe(true);
  });
});
