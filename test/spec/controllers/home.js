'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var HomeCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    HomeCtrl = $controller('HomeCtrl');
  }));

  it('should attach a version to the scope', function () {
    expect(HomeCtrl.version).toBe('0.0.1');
  });
});
