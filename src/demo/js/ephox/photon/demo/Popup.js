define(
  'ephox.photon.demo.Popup',

  [
    'ephox.sugar.api.properties.Css',
    'ephox.sugar.api.node.Element'
  ],

  function (Css, Element) {

    return function (position) {
      var popup = Element.fromTag('div');
      Css.setAll(popup, {
        position: 'absolute',
        left: position.left() + 'px',
        top: position.top() + 'px',
        width: '100px',
        height: '50px',
        'background-color': 'black'
      });
      return popup;
    };
  }
);
