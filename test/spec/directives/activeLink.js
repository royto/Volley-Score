'use strict';

describe('Directive: activeLink', function () {

  // load the directive's module
  beforeEach(module('volleyApp'));

  var element,
    parent,
    location,
    rootScope,
    scope;

  beforeEach(inject(function ($location, $rootScope) {
    location = $location;
    rootScope = $rootScope;
    scope = $rootScope.$new();
  }));

  it('should set parent as active', inject(function ($compile) {
    parent = angular.element('<li></li>');

    element = angular.element('<a active-link="active" id="homeMenu" href="#/Home">Home</a>');
    element = $compile(element)(scope);

    parent.append(element);

    location.path('/Home');
    rootScope.$apply();

    scope.$digest();

    expect(parent.hasClass('active')).toBeTruthy();
  }));

  it('should not set parent as active', inject(function ($compile) {
    parent = angular.element('<li></li>');

    element = angular.element('<a active-link="active" id="homeMenu" href="#/Home">Home</a>');
    element = $compile(element)(scope);

    parent.append(element);

    location.path('/Contact');
    rootScope.$apply();

    scope.$digest();

    expect(parent.hasClass('active')).toBeFalsy();
  }));

});
