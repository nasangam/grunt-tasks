# grunt-ngmock v1.0.1 
> Concatenates mocked data spanned across multiple json files and generates an angular service.

## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ngmock --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ngmock');
```


## ng-mock task
Task targets, files specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage Examples

#### concatenates angular mocked json files and generate an angular service;

```js
// Project configuration.
grunt.initConfig({
    json: {
        src: [
           "app/E2EMocks/mock-data/**/*.json"
        ],
        dest: 'dist/data-mocks.js'
    }
  },
});
```
Assume your project has multiple mocked data/json files, one for each API.
app/E2EMocks/mock-data/profiles.json
app/E2EMocks/mock-data/assets.json

Then, it generates an angular service as below.
```js
(function(){ 
  'use strict';
 angular.module('E2EMocks').service('E2EMocksService', function(){  
	var mocks = {}; 
	mocks['profiles_json'] =[...]; 
	mocks['assets_json'] =[...];
	return mocks; 
 }) })();
```

## Release History

 * 2015-08-2015 first release
---

Task submitted by [Nagaraju Sangam](nagaraju_sangam@yahoo.co.in);