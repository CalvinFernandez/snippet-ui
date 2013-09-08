'use strict';

describe('Directive: convoSnippet', function () {
  beforeEach(module('snippetUiApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<convo-snippet></convo-snippet>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the convoSnippet directive');
  }));
});
