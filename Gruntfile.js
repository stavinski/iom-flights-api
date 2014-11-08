'use strict';

var timeGrunt = require('time-grunt'),
    loadTasks = require('load-grunt-tasks');

var jspaths = ['*.js', '!node_modules', '!build', '!dist'];

module.exports = function (grunt) {

  // time grunt
  timeGrunt(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      files: jspaths
    }
  });

  // load tasks
  loadTasks(grunt);

  grunt.registerTask('default', ['jshint']);
};
