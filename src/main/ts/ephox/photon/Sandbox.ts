import { Fun } from '@ephox/katamari';
import { Css, DomEvent, SugarElement, Insert, Remove } from '@ephox/sugar';

import * as Writer from './Writer';

export const Sandbox = (uiContainer: SugarElement<Element>) => {
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
  const play = <T>(html: string, f: (document: SugarElement<HTMLDocument>, body: SugarElement<HTMLElement>) => T, callback: (result: T) => void) => {
    const outputContainer = SugarElement.fromTag('div');
    const iframe = SugarElement.fromTag('iframe');

    Css.setAll(outputContainer, {
      display: 'none'
    });

    const load = DomEvent.bind(iframe, 'load',  () => {
      load.unbind();

      // This fires a load event on Edge
      Writer.write(iframe, html);

      const rawDoc = iframe.dom.contentWindow?.document;
      if (rawDoc === undefined) throw "sandbox iframe load event did not fire correctly";
      const doc = SugarElement.fromDom(rawDoc);

      const rawBody = doc.dom.body;
      if (rawBody === undefined) throw "sandbox iframe does not have a body";
      const body = SugarElement.fromDom(rawBody);

      // cache
      const result = f(doc, body);

      // unbind and remove everything
      Remove.remove(outputContainer);

      // setTimeout should allow the garbage collector to cleanup if necessary
      setTimeout(Fun.curry(callback, result), 0);
    });
    Insert.append(outputContainer, iframe);
    Insert.append(uiContainer, outputContainer);
  };

  return {
    play
  };
};