'use strict';

var timeGrunt = require('time-grunt'),
    loadTasks = require('load-grunt-tasks');

var jspaths = {
  server: ['app.js', 'test/**/*.js', 'lib/**/*.js', '!node_modules/**/*.js', '!build/**/*.js', '!dist/**/*.js'],
  build: ['Gruntfile.js']
};

module.exports = function (grunt) {

  // time grunt
  timeGrunt(grunt);

  grunt.initConfig({
    clean: {
      build: ['build']
    },
    jshint: {
      options: {
        jshintrc: true
      },
      server: jspaths.server,
      build: jspaths.build
    },
    watch: {
      server: {
        files: jspaths.server,
        tasks: ['server:debug']
      },
      build: {
        files: jspaths.build,
        tasks: ['build:debug']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      unit: {
        src: ['test/specs/**/*.js']
      },
      integration: {
        src: ['test/integration/*.js']
      }
    }
  });

  // load tasks
  loadTasks(grunt);

  grunt.registerTask('build:debug', ['jshint:build']);
  grunt.registerTask('server:debug', ['jshint:server', 'mochaTest:unit', 'mochaTest:integration']);

  grunt.registerTask('debug', ['build:debug', 'server:debug']);

  grunt.registerTask('default', ['debug', 'watch']);
};
