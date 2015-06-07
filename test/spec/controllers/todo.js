'use strict';

describe('Controller: TodoCtrl', function () {

  // load the controller's module
  beforeEach(module('volleyApp'));

  var TodoCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    TodoCtrl = $controller('TodoCtrl');
  }));

  it('should attach a list of todos to the scope', function () {
    expect(angular.isArray(TodoCtrl.todos)).toBeTruthy();
  });
});
