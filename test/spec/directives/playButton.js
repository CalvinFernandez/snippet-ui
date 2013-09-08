'use strict';

describe('Directive: playButton', function () {
  beforeEach(module('snippetUiApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<play-button></play-button>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the playButton directive');
  }));
});
