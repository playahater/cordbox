# Cordbox android/ios sandbox

## Installation:

cordova:

    npm install cordova -g

dependencies:

    npm install

## React Hot loader:

WebpackDevServer is using network ip, therefore you can use it from any device in current network.

## Commands:

First time there is need to build cordova init app. It could be run only one, before any other commands:

    gulp init-cordova

Compile/transpile/transform all source files and copy them to cordova app; resource directory.

    gulp prepare-build

Build and emulate cordova app.

    gulp emulate-ios

    gulp emulate-android

## Hot loader emulation

Make available in ios/android emulator

    gulp prebuild-ios-hot

    gulp prebuild-android-hot

    gulp prebuild-browser-hot

## Ripple emulation with hot loader

*A browser based html5 mobile application development and testing tool*

Run ripple emulator:

    gulp prebuild-ripple-hot

## Structure:

  * src                - root source directory
  * release            - build directory (created automatically)
  * package.json       - standard npm package
  * src/index.jsx      - root react file
  * src/index.html     - app layout
  * src/components     - components
  * src/reducers       - redux reducers
  * src/sass           - sass style files

## Technology:

  * cordova
  * react
  * react-router
  * jsx
  * redux
  * hot-loader
  * webpack
  * ES6 & ES7
  * gulp
  * bootstrap 3
  * sass
  * compass

## Licence:

GPL
