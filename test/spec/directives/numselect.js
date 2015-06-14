'use strict';

describe('Directive: numselect', function () {

  // load the directive's module
  beforeEach(module('volleyApp'));
  // load the template
  beforeEach(module('views/directives/num-select.html'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
    scope.options = 5;
    scope.selected = 1;
  }));

  it('should create select with 4 options', inject(function ($compile) {
    element = angular.element('<num-select ng-model="selected" nb-options="options"></num-select>');
    element = $compile(element)(scope);

    scope.$digest();

    expect(element.find('select').length).toBe(1);
    expect(element.isolateScope().num.length).toBe(6);
  }));

  it('should create select with 3 options with start at one option enabled', inject(function ($compile) {
    element = angular.element('<num-select  ng-model="selected" nb-options="options" start-at-one="true"></num-select>');
    element = $compile(element)(scope);

    scope.$digest();

    expect(element.find('select').length).toBe(1);
    expect(element.isolateScope().num.length).toBe(5);
  }));

  it('should update select with 10 options', inject(function ($compile) {
    element = angular.element('<num-select ng-model="selected" nb-options="options"></num-select>');
    element = $compile(element)(scope);

    scope.options = 9;
    scope.$digest();

    expect(element.find('select').length).toBe(1);
    expect(element.isolateScope().num.length).toBe(10);
  }));

  it('should trigger handler on change', inject(function ($compile) {
    //Create Spy
    scope.fn = jasmine.createSpy();

    element = angular.element('<num-select ng-model="selected" nb-options="options" on-change="fn()"></num-select>');
    element = $compile(element)(scope);

    scope.$digest();

    //trigger change
    element.triggerHandler('change');

    //Verify that the function has been called
    expect(scope.fn).toHaveBeenCalled();
  }));
});
