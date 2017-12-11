import { Option } from '@ephox/katamari';
import Frames from 'ephox/photon/Frames';
import { UnitTest, assert } from '@ephox/refute';

UnitTest.test('FramesTest', function() {
  /* This is a really weak test case. The idea is to separate the actual navigation logic out from the 
  concept.
  */

  var nav = {
    view: function (o) {
      if (o.length > 2) return Option.some('v_' + o.substring(2, o.length - 1));
      else return Option.none();
    },

    owner: function (v) {
      if (v.length > 0) return 'o_' + v.substring(2);
    }
  };

  var check = function (expected, input) {
    var actual = Frames.pathTo(input, nav);
    assert.eq(expected, actual.getOrDie());
  };

  check([ 'v_de', 'v_d', 'v_' ], 'v_def');
  check([ ], 'v_');

  // v_def
  // o_de
  // v_d
  // o_
});

