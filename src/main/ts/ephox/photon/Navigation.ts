import { Document, document, Element as DomElement, Node } from '@ephox/dom-globals';
import { Option } from '@ephox/katamari';
import { Element, Traverse } from '@ephox/sugar';

export interface Navigation<E, D> {
  view: (doc: D) => Option<E>;
  owner: (element: E) => D;
}

const view = (doc: Element<Document>) => {
  // Only walk up to the document this script is defined in.
  // This prevents walking up to the parent window when the editor is in an iframe.
  const element = doc.dom() === document ?
                  Option.none<DomElement>()
                : Option.from(doc.dom().defaultView.frameElement);
  return element.map(Element.fromDom);
};

const owner = (element: Element<Node>): Element<Document> => {
  return Traverse.owner(element);
};

export {
  view,
  owner
};