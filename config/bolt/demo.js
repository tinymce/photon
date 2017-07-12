configure({
  configs: [
    './prod.js'
  ],
  sources: [
    source('amd', 'ephox.photon.demo', '../../src/demo/js', mapper.hierarchical)
  ]
});

