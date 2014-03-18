'use strict';

describe('Controller: StatCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var StatCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatCtrl = $controller('StatCtrl', {
      $scope: scope
    });
  }));


});
