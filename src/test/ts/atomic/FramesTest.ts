import { UnitTest, assert } from '@ephox/bedrock-client';
import { Optional } from '@ephox/katamari';

import * as Frames from 'ephox/photon/Frames';
import { Navigation } from 'ephox/photon/Navigation';

UnitTest.test('FramesTest', () => {
  /* This is a really weak test case. The idea is to separate the actual navigation logic out from the
  concept.
  */

  const nav: Navigation<string, string> = {
    view: (o: string) => {
      return o.length > 2 ? Optional.some('v_' + o.substring(2, o.length - 1)) : Optional.none();
    },

    owner: (v: string) => {
      return v.length > 0 ? 'o_' + v.substring(2) : '';
    }
  };

  const check = (expected: string[], input: string) => {
    const actual = Frames.pathTo(input, nav);
    assert.eq(expected, actual.getOrDie());
  };

  check([ 'v_de', 'v_d', 'v_' ], 'v_def');
  check([ ], 'v_');

  // v_def
  // o_de
  // v_d
  // o_
});

