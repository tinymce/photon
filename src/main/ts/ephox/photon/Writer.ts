import { SugarBody, SugarElement } from '@ephox/sugar';

import * as Reader from './Reader';

const write = (element: SugarElement<HTMLIFrameElement>, content: string) => {
  if (!SugarBody.inBody(element)) throw 'Internal error: attempted to write to an iframe that is not in the DOM';

  const doc = Reader.doc(element);
  const dom = doc.dom;
  dom.open('text/html', 'replace'); // Dont create new history https://bugzilla.mozilla.org/show_bug.cgi?id=1368869
  dom.writeln(content);
  dom.close();
};

export {
  write
};