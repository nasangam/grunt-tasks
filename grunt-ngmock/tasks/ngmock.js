/*
 * grunt-ngmock
 *  *
 * Copyright (c) 2015 "KingCobra" Nagaraju Sangam
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerMultiTask('ngmock', 'Concatenate ngMocks files.', function() {
    var args = this.args,
        e2eMockSrc = grunt.file.read("node_modules/grunt-ngmock/ngfiles/e2e-mock.js");
      
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if(filepath.indexOf('.json')>0 && grunt.file.exists(filepath)){
            return true;
        } else if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return false;
        }
      }).map(function(filepath, i) {
        if (grunt.file.isDir(filepath)) {
          return;
        }
        var fileName = filepath.split('/').pop().split(".").join("_").replace("_json",''),
            src = grunt.file.read(filepath);
    
        return "mocks['"+fileName+"'] = "+ src +"; \n" ;
      }).join('');
      
      var header = "(function(){ \n"+
                   "angular.module('E2EMocks').service('E2EMocksService', function(){  \n var mocks = {}; \n",
          footer = "\n return mocks; \n }) })();"
        
      src =header+src+footer;
      grunt.file.write(f.dest,  e2eMockSrc+"\n"+src);
      grunt.log.writeln('File ' + f.dest + ' created.');
    });
  });

};
