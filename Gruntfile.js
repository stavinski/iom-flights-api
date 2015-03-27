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
    mochacli: {
      options: {
        reporter: 'spec',
        harmony: true
      },
      debug: {
        src: ['test/specs/**/*.js']
      },
      release: {
        options: {
          timeout: 3000,
          slow: 3000
        },
        src: ['test/integration/*.js']
      }
    },
    bump: {
      options: {
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'CHANGELOG.md'],
        pushTo: 'origin'
      }
    },
    changelog: {
      options: {
        repository: '<%= pkg.repository.url %>'
      }
    }
  });

  // load tasks
  loadTasks(grunt);

  grunt.registerTask('support:debug', ['jshint:support']);
  grunt.registerTask('server:debug', ['jshint:server', 'mochacli:debug']);
  grunt.registerTask('server:release', ['mochacli:release']);

  grunt.registerTask('notes:minor', ['bump-only:minor', 'changelog', 'bump-commit']);
  grunt.registerTask('notes:major', ['bump-only:major', 'changelog', 'bump-commit']);
  grunt.registerTask('notes', ['bump-only', 'changelog', 'bump-commit']);

  grunt.registerTask('debug', ['support:debug', 'server:debug']);
  grunt.registerTask('release', ['debug', 'server:release']);
  grunt.registerTask('ci', ['release']);

  grunt.registerTask('heroku:production', ['debug']);

  grunt.registerTask('default', ['debug', 'watch']);
};
