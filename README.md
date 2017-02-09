# Corebox android app

## Installation:

1 Clone this repository to new empty dir:

    git clone git@github.com:playahater/corebox.git

2 Install cordova

    npm install cordova -g

3 update npm modules

    npm install

## React Hot loader:

WebpackDevServer is using network ip, therefore you can use it from any device in current network.

## Commands:

First time there is need to build cordova init app. It could be run only one, before any other commands:

    gulp init-cordova

Compile/transpile/transform all source files and copy them to cordova app

    gulp prepare-build

Build cordova app. Should be run only if cordova app is initialized

    gulp build-ios

    gulp build-android

    gulp build-browser

Build and emulate cordova app. Should be run only if cordova app is initialized

    gulp emulate-ios

    gulp emulate-android

## Use case:

If you just install this boilerplate, and made some chanages in src/ and want to run ios emulation:

    gulp init-cordova && gulp prepare-build && gulp emulate-ios

If you initialized cordova previously and you want to crate android app:

    gulp prepare-build && gulp emulate-android

## Hot loader emulation

It allows to make changes in react app and make it instantly available in ios/android emulator (cordova need to be initialized)

    gulp prebuild-ios-hot

    gulp prebuild-android-hot

    gulp prebuild-browser-hot

## Ripple emulation with hot loader

*A browser based html5 mobile application development and testing tool*

Cordova need to be initialized. To run this emulator:

    gulp prebuild-ripple-hot

## Structure:

  * src                - directory with all sources
  * release            - directory with creaded electron app (created automatically)
  * package.json       - standard npm package. But name and version will be copied to electron npm. THere is also field `electronVersion`
  * src/index.jsx      - root react file
  * src/index.html     - app layuot
  * src/components     - place here all components
  * src/reducers       - place here all redux reducers
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
