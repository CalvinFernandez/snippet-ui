'use strict';

describe('Directive: liSong', function () {
  beforeEach(module('snippetUiApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<li-song></li-song>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the liSong directive');
  }));
});
