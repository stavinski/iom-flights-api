'use strict';

var timeGrunt = require('time-grunt'),
    loadTasks = require('load-grunt-tasks');

var jspaths = {
  server: ['app.js', 'globals.js', 'test/**/*.js', 'lib/**/*.js', '!node_modules/**/*.js', '!build/**/*.js', '!dist/**/*.js'],
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
        tasks: ['server:dev']
      },
      build: {
        files: jspaths.build,
        tasks: ['build:dev']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      unit: {
        src: ['test/specs/**/*.js']
      },
      release: {
        src: ['test/integration/*.js']
      }
    }
  });

  // load tasks
  loadTasks(grunt);

  grunt.registerTask('build:dev', ['jshint:build']);
  grunt.registerTask('server:dev', ['jshint:server', 'mochaTest:unit']);
  grunt.registerTask('server:release', ['mochaTest:release']);

  grunt.registerTask('dev', ['build:dev', 'server:dev']);
  grunt.registerTask('release', ['dev', 'server:release']);

  grunt.registerTask('default', ['dev', 'watch']);
};
