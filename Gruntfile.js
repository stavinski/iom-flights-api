'use strict';

var timeGrunt = require('time-grunt'),
    loadTasks = require('load-grunt-tasks');

module.exports = function (grunt) {

  // time grunt
  timeGrunt(grunt);

  grunt.initConfig({

  });

  // load tasks
  loadTasks(grunt);

  grunt.registerTask('default', []);
};
