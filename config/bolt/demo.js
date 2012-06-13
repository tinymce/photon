configure({
  configs: [
    '../../lib/config/exhibition.js',
    './prod.js'
  ],
  sources: [
    source('amd', 'ephox.photon.demo', '../../src/demo/js', mapper.hierarchical)
  ]
});

