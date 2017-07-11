define(
  'ephox.photon.demo.Popup',

  [
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.properties.Css'
  ],

  function (Element, Css) {

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
