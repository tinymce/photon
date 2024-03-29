import { SugarBody, SugarElement } from '@ephox/sugar';

import * as Reader from './Reader';

const write = (element: SugarElement<HTMLIFrameElement>, content: string): void => {
  if (!SugarBody.inBody(element)) {
    throw new Error('Internal error: attempted to write to an iframe that is not in the DOM');
  }

  const doc = Reader.doc(element);
  const dom = doc.dom;
  dom.open('text/html', 'replace'); // Dont create new history https://bugzilla.mozilla.org/show_bug.cgi?id=1368869
  dom.write(content);
  dom.close();
};

export {
  write
};
