'use strict';

describe('Filter: service', function () {

  // load the filter's module
  beforeEach(module('volleyApp'));

  // initialize a new instance of the filter before each test
  var service;
  beforeEach(inject(function ($filter) {
    service = $filter('service');
  }));

  it('should return S if number are equal', function () {
    expect(service(1,1)).toBe('S');
    expect(service(1,2)).toBe('');
    expect(service(2,1)).toBe('');
    expect(service(2,2)).toBe('S');
  });

});
