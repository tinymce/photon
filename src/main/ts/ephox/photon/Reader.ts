import { Optional, Optionals } from '@ephox/katamari';
import { SugarElement, Traverse } from '@ephox/sugar';

const iframeDoc = (element: SugarElement<HTMLIFrameElement>): Optional<SugarElement<Document>> => {
  const dom = element.dom;
  try {
    const idoc = dom.contentWindow ? dom.contentWindow.document : dom.contentDocument;
    return Optionals.mapFrom(idoc, SugarElement.fromDom);
  } catch (err) {
    // ASSUMPTION: Permission errors result in an unusable iframe.
    console.log('Error reading iframe: ', dom);
    console.log('Error was: ' + err);
    return Optional.none();
  }
};

const doc = (element: SugarElement<HTMLIFrameElement>) => {
  const optDoc = iframeDoc(element);
  return optDoc.getOrThunk(() => Traverse.owner(element));
};

export {
  doc
};