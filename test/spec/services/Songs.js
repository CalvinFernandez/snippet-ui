'use strict';

describe('Service: Songs', function () {

  // load the service's module
  beforeEach(module('snippetUiApp'));

  // instantiate service
  var Songs;
  beforeEach(inject(function (_Songs_) {
    Songs = _Songs_;
  }));

  it('should do something', function () {
    expect(!!Songs).toBe(true);
  });

});
