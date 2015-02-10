module.exports = {

  build_dir: 'build',
  compile_dir: 'bin',
  server: 'server/server.js',

  app_files: {
    // source, but NO specs
    js: [ 'src/**/*.js', '!src/**/*.spec.js' ],
    js_compile: ['gulp/module.prefix', 'build/app/**/*.js', 'build/common/**/*.js', 'gulp/module.suffix'],
    vendor: ['vendor/**/*.js'],
    jsunit: [ 'src/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.tpl.html', 'src/common/**/*.tpl.html' ],
    tpl_src: ["./build/app/**/*.js", "./build/common/**/*.js", "./build/assets/css/**/*.css"],
    // the index.html
    html: [ 'src/index.html' ],
    less: 'src/less/main.less',
    styles: [ 'src/less/**/*.less'],
    ngmin_js: [ './bin/**/*.js' ]
  },

  test_files: {
    js: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
    ]
  },

  vendor_files: {
    // the vendor/ needs to be prefixed by the task
    js: [
      'angular-ui-router.min.js'
    ],
    css: [],
    assets: []
  }
};