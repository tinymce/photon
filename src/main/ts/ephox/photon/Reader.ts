import { console, Document, HTMLIFrameElement } from '@ephox/dom-globals';
import { Option, Options } from '@ephox/katamari';
import { Element, Traverse } from '@ephox/sugar';

const iframeDoc = (element: Element<HTMLIFrameElement>): Option<Element<Document>> => {
  const dom = element.dom();
  try {
    const idoc = dom.contentWindow ? dom.contentWindow.document : dom.contentDocument;
    return Options.mapFrom(idoc, Element.fromDom);
  } catch (err) {
    // ASSUMPTION: Permission errors result in an unusable iframe.
    console.log('Error reading iframe: ', dom);
    console.log('Error was: ' + err);
    return Option.none();
  }
};

const doc = (element: Element<HTMLIFrameElement>) => {
  const optDoc = iframeDoc(element);
  return optDoc.getOrThunk(() => Traverse.owner(element));
};

export {
  doc
};