'use strict';

describe('Service: StatService', function () {

  // load the service's module
  beforeEach(module('volleyApp'));

  // instantiate service
  var StatService;
  beforeEach(inject(function (_StatService_) {
    StatService = _StatService_;
  }));

  it('should do something', function () {
    expect(!!StatService).toBe(true);
  });

  it('should return valid difference array', function () {
    var set = [1,1,2,1,1,1,2,2,1,1,2,2,2,1,2,2,1,1,2];

    expect(StatService.getDifference(set)).toEqual([0,1,2,1,2,3,4,3,2,3,4,3,2,1,2,1,0,1,2,1]);
  });

});
