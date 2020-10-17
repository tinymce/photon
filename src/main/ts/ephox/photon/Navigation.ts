import { Optional } from '@ephox/katamari';
import { SugarElement, Traverse } from '@ephox/sugar';

export interface Navigation<E, D> {
  readonly view: (doc: D) => Optional<E>;
  readonly owner: (element: E) => D;
}

const view = (doc: SugarElement<Document>) => {
  // Only walk up to the document this script is defined in.
  // This prevents walking up to the parent window when the editor is in an iframe.
  const element = doc.dom === document ?
                  Optional.none<Element>() :
                  Optional.from(doc.dom.defaultView?.frameElement);
  return element.map(SugarElement.fromDom);
};

const owner = (element: SugarElement<Node>): SugarElement<Document> => {
  return Traverse.owner(element);
};

export {
  view,
  owner
};