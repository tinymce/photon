define(
  'ephox.photon.demo.PhotonDemo',

  [
    'ephox.wrap.JQuery'
  ],

  function ($) {
    return function () {
      var container = $('<div/>');

      var frame = function () {
        return $('<iframe/>').css({
          src: '#s' + Math.random()
        });
      };

      var f1 = frame().css({
        width: '800px',
        height: '450px'
      });




      f1.load(function () {
        var c1 = f1.contents().find('body');
        console.log('c1: ', c1);
        var bb = $('<button>Blah</button>', c1[0]);
        console.log('bb: ', bb);
        c1.append(bb);

        var f2 = frame();
        f2.load(function () {
          var c2 = f2.contents().find('body');
          console.log('c2: ', c2);
          var bbb = $('<button>Mo</button>', c2[0]);
          console.log('bbb: ', bbb);
          c2.append(bbb);


          var f3 = frame();
          f3.load(function () {
            var c3 = f3.contents().find('body');
            console.log('c3: ', c3);
            var bbb = $('<button>Mo</button>', c3[0]);
            console.log('bbb: ', bbb);
            c3.append(bbb);
          });

          c2.append(f3);
        });

        c1.append(f2);
      });

      container.append(f1);

      container.css({
        height: 400
      });

      $('#ephox-ui').append(container);
    };
  }
);
