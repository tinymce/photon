import { setTimeout } from '@ephox/dom-globals';
import { Fun } from '@ephox/katamari';
import { Css, DomEvent, Element, Insert, Remove } from '@ephox/sugar';

import Writer from './Writer';



export default <any> function (uiContainer) {
   /**
    * Creates a sandbox to play in.
    *
    * Asynchronously creates an iframe, runs the synchronous function `f` on the DOM, and then passes the result to the callback.
    *
    * This is done so that the sandbox can guarantee the iframe has been removed from the page, and available for garbage collection, before the callback is executed.
    *
    * html:
    *   source to load into the iframe
    * f: (document -> body -> A)
    *   function that operates on the iframe DOM, passed both document reference and body element
    * callback: (A -> Unit)
    *   function that receives the output of `f` when the iframe has been cleaned up
    */
  var play = function (html, f, callback) {
    var outputContainer = Element.fromTag('div');
    var iframe = Element.fromTag('iframe');

    Css.setAll(outputContainer, {
      display: 'none'
    });

    var load = DomEvent.bind(iframe, 'load', function () {
      load.unbind();

      // This fires a load event on Edge
      Writer.write(iframe, html);

      var rawDoc = iframe.dom().contentWindow.document;
      if (rawDoc === undefined) throw "sandbox iframe load event did not fire correctly";
      var doc = Element.fromDom(rawDoc);

      var rawBody = rawDoc.body;
      if (rawBody === undefined) throw "sandbox iframe does not have a body";
      var body = Element.fromDom(rawBody);

      // cache
      var result = f(doc, body);

      // unbind and remove everything
      Remove.remove(outputContainer);

      // setTimeout should allow the garbage collector to cleanup if necessary
      setTimeout(Fun.curry(callback, result), 0);
    });
    Insert.append(outputContainer, iframe);
    Insert.append(uiContainer, outputContainer);
  };

  return {
    play: play
  };
};