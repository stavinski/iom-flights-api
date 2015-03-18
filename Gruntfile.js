'use strict';

var timeGrunt = require('time-grunt'),
    loadTasks = require('load-grunt-tasks');

var jspaths = {
  server: ['app.js', 'globals.js', 'test/**/*.js', 'lib/**/*.js', '!node_modules/**/*.js', '!build/**/*.js', '!dist/**/*.js'],
  support: ['Gruntfile.js']
};

module.exports = function (grunt) {

  // time grunt
  timeGrunt(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build']
    },
    jshint: {
      options: {
        jshintrc: true
      },
      server: jspaths.server,
      support: jspaths.support
    },
    watch: {
      server: {
        files: jspaths.server,
        tasks: ['server:debug']
      },
      support: {
        files: jspaths.support,
        tasks: ['support:debug']
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      debug: {
        src: ['test/specs/**/*.js']
      },
      release: {
        src: ['test/integration/*.js']
      }
    },
    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'CHANGELOG.md']
      }
    },
    changelog: {
      options: {
        editor: 'sublime -w',
        github: pkg.repository.url
      }
    }
  });

  // load tasks
  loadTasks(grunt);

  grunt.registerTask('support:debug', ['jshint:support']);
  grunt.registerTask('server:debug', ['jshint:server', 'mochaTest:debug']);
  grunt.registerTask('server:release', ['mochaTest:release']);

  grunt.registerTask('notes', 'bumps version, updates changelog & commits to CVS', ['bump-only', 'changelog', 'bump-commit']);

  grunt.registerTask('debug', 'runs debug tasks and watches for changes', ['support:debug', 'server:debug']);
  grunt.registerTask('release', 'runs release tasks ready for release', ['debug', 'server:release']);

  grunt.registerTask('default', 'runs debug tasks', ['debug', 'watch']);
};
