require('babel-polyfill');

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');


/**
 * @see https://dom.spec.whatwg.org/#interface-element
 * @see https://developer.mozilla.org/docs/Web/API/Element/matches#Polyfill
 * @see https://gist.github.com/jonathantneal/3062955
 * @see https://github.com/jonathantneal/closest
 */

(function(global){
  var Element;
  var ElementPrototype;
  var matches;

  if (Element = global.Element) {
    ElementPrototype = Element.prototype;

    /**
     * @see https://dom.spec.whatwg.org/#dom-element-matches
     */
    if (!(matches = ElementPrototype.matches)) {
      if ((
        matches = ElementPrototype.matchesSelector ||
          ElementPrototype.mozMatchesSelector ||
          ElementPrototype.msMatchesSelector ||
          ElementPrototype.oMatchesSelector ||
          ElementPrototype.webkitMatchesSelector ||
          (ElementPrototype.querySelectorAll && function matches(selectors) {
            var element = this;
            var nodeList = (element.parentNode || element.document || element.ownerDocument).querySelectorAll(selectors);
            var index = nodeList.length;

            while (--index >= 0 && nodeList.item(index) !== element) {}

            return index > -1;
          })
      )) {
        ElementPrototype.matches = matches;
      }
    }

    /**
     * @see https://dom.spec.whatwg.org/#dom-element-closest
     */
    if (!ElementPrototype.closest && matches) {
      ElementPrototype.closest = function closest(selectors) {
        var element = this;

        while (element) {
          if (element.nodeType === 1 && element.matches(selectors)) {
            return element;
          }

          element = element.parentNode;
        }

        return null;
      };
    }
  }
}(Function('return this')()));