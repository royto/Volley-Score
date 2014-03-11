'use strict';

describe('Controller: HistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var HistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistoryCtrl = $controller('HistoryCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a version to the scope', function () {
    expect(scope.version).toBe('0.0.1');
  });*/
});
