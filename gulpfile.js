var gulp = require('gulp');
var gutil = require("gulp-util");
var shell = require('gulp-shell')
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var runSequence = require('run-sequence');
var path = require("path");
var preprocess = require('gulp-preprocess');
var packageJson = require('./package.json');
var clean = require('gulp-clean');
var myip = require('quick-local-ip');

const WEBPACK_NETWORK_IP = myip.getLocalIP4();
const WEBPACK_SERVER_HOST = 'http://' + WEBPACK_NETWORK_IP;
const WEBPACK_SERVER_PORT = 3000;
const STATIC_PATH = 'static';
const BUNDLE_FILE = 'bundle.js';
const APP_NAME = packageJson.name;
const APP_ID = packageJson.id;
const APP_VERSION = packageJson.version;

var webpackOptionsLoader = {
    test: /.jsx?$/,
    include: path.join(__dirname, 'src'),
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        presets: ['react', 'es2015', 'stage-0']
    }
};

var webpackOptions = {
    module: {
        loaders: [
            webpackOptionsLoader,
            {
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "sass-loader",
					options: {
						includePaths: [ __dirname, './node_modules/bootstrap-sass/assets/stylesheets/', __dirname, './node_modules/compass-mixins/lib/']
					}
				}]
        	},
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ]
    },
    entry: [
        './src/app.jsx'
    ],
    output: {
        path: path.join(__dirname, './release/www/' + STATIC_PATH + '/'),
        filename: BUNDLE_FILE
    },
    stats: {
        colors: true,
        reasons: true
    },
    devtool: 'source-map'
};

/**
 * remove release directory, which allow to install new cordova project
 */
gulp.task('clear-release', function () {
    return gulp.src('release', {read: false})
        .pipe(clean());
});

/**
 * copy non bundled files from src to dist directory
 */
gulp.task('copy-layout', function() {
    return gulp.src(['./src/index.html'])
        .pipe(preprocess({
            context: {
                BUNDLE_PATH: './' + STATIC_PATH + '/' + BUNDLE_FILE,
                APP_NAME: APP_NAME
            }
        }))
        .pipe(gulp.dest('./release/www'))
});

/**
 * copy non bundled files from src to dist directory with path to hot loader server
 */
gulp.task('copy-layout-hot', function() {
    return gulp.src(['./src/index.html'])
        .pipe(preprocess({
            context: {
                BUNDLE_PATH: WEBPACK_SERVER_HOST + ':' + WEBPACK_SERVER_PORT +'/' + STATIC_PATH + '/' + BUNDLE_FILE,
                APP_NAME: APP_NAME
            }
        }))
        .pipe(gulp.dest('./release/www'))
});

/**
 * Compile react jsx ES6 & ES7 to ES5 js
 */
gulp.task('compile-react', function(done) {
    webpack(webpackOptions, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        done();
    });
});

/**
 * Compile react jsx ES6 & ES7 to ES5 js and run webpack hot loader server
 */
gulp.task('compile-react-hot', function(done) {
    webpackOptions.entry = [
        'webpack-dev-server/client?' + WEBPACK_SERVER_HOST + ':' + WEBPACK_SERVER_PORT,
        'webpack/hot/only-dev-server'
    ].concat(webpackOptions.entry);
    webpackOptions.plugins = [
        new webpack.HotModuleReplacementPlugin({})
    ];
    webpackOptionsLoader.loaders.unshift('react-hot');
    webpackOptions.output.publicPath = WEBPACK_SERVER_HOST + ':' + WEBPACK_SERVER_PORT + '/' + STATIC_PATH + '/';

    new WebpackDevServer(webpack(webpackOptions), {
        hot: true,
        publicPath: '/' + STATIC_PATH + '/'
    }).listen(WEBPACK_SERVER_PORT, WEBPACK_NETWORK_IP, function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        done();
        console.log('webpack dev server listening at ' + WEBPACK_SERVER_HOST + ':' + WEBPACK_SERVER_PORT);
    });
});

/**
 * Create defauld cordova project in release directory.
 * It could be run once
 */
gulp.task('create-cordova', ['clear-release'], shell.task('cordova create release ' + APP_ID + ' ' + APP_NAME));

/**
 * Add ios platform to created cordova project
 * It could be run once
 */
gulp.task('platform-ios', shell.task('cd release && cordova platform add ios'));

/**
 * Add android platform to created cordova project
 * It could be run once
 */
gulp.task('platform-android', shell.task('cd release && cordova platform add android'));

/**
 * Add browser platform to created cordova project
 * It could be run once
 */
gulp.task('platform-browser', shell.task('cd release && cordova platform add browser'));

/**
 * Clear previous html code from release/www
 */
gulp.task('clear-cordova-www', function () {
    return gulp.src('release/www', {read: false})
        .pipe(clean());
});

/**
 * Build mobile apps for all installed platforms
 * Run after any changes
 */
gulp.task('build-cordova', shell.task('cd release && cordova build'));

/**
 * Build mobile apps for ios platform
 * Run after any changes instead `build-cordova`
 */
gulp.task('build-ios', shell.task('cd release && cordova build ios'));

/**
 * Build mobile apps for android platform
 * Run after any changes instead `build-cordova`
 */
gulp.task('build-android', shell.task('cd release && cordova build android'));

/**
 * Build mobile apps for browser platform
 * Run after any changes instead `build-cordova`
 */
gulp.task('build-browser', shell.task('cd release && cordova build browser'));

/**
 * Run ios emulation - this also build app
 */
gulp.task('emulate-ios', shell.task('cd release && cordova emulate ios'));

/**
 * Run android emulation - this also build app
 */
gulp.task('emulate-android', shell.task('cd release && cordova emulate android'));

/**
 * Run app in browser - this also build app
 */
gulp.task('run-browser', shell.task('cd release && cordova run browser'));

/**
 * Install APK on device
 */
gulp.task('install-apk', shell.task('adb install -r release/platforms/android/build/outputs/apk/android-debug.apk'));

/**
 * Higher level task, should be run once for create cordova project (it could be run more times but it is time consuming)
 */
gulp.task('init-cordova', function(done) {
    runSequence('create-cordova', 'platform-ios', 'platform-android', 'platform-browser', done);
});

/**
 * Fill cordova project with proper html, js, css
 */
gulp.task('prepare-build', function(done) {
    runSequence('clear-cordova-www', 'copy-layout', 'compile-react', done);
});

/**
 * Emulate ios app with hot loader
 */
gulp.task('prebuild-ios-hot', function(done) {
    runSequence('clear-cordova-www', 'copy-layout-hot', 'compile-react-hot', 'emulate-ios', done);
});

/**
 * Emulate android app with hot loader
 */
gulp.task('prebuild-android-hot', function(done) {
    runSequence('clear-cordova-www', 'copy-layout-hot', 'compile-react-hot', 'emulate-android', done);
});

/**
 * Emulate browser app with hot loader
 */
gulp.task('prebuild-browser-hot', function(done) {
    runSequence('clear-cordova-www', 'copy-layout-hot', 'compile-react-hot', 'run-browser', done);
});

/**
 * Build and install APK on device 
 */
gulp.task('android', function(done) {
    runSequence('prepare-build', 'build-android', 'install-apk', done);
});

/**
 * Build ios package
 */
gulp.task('ios', function(done) {
    runSequence('prepare-build', 'build-ios', done);
});
