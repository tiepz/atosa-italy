module.exports = function(grunt) {
  // Load All Grunt tasks
  require('jit-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      clear: {
        files: [{
          src: [
            '.sass-cache',
            'assets/css/*.min.css',
            'assets/css/*.css.map',
            'assets/js/*.min.js'
          ]
        }]
      }
    },
    imagemin: {
            options: {
                progressive: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '/assets/img',
                    src: '**/*.{jpg,jpeg,png,gif}',
                    dest: '/assets/img'
                }]
            }
        },
    sass: {
            server: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: '**/*.{scss,sass}',
                    dest: 'assets/css',
                    ext: '.css'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: '**/*.{scss,sass}',
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        },
    uglify: {
      options: {
        preserveComments: false
      },
      dist: {
        src: 'assets/js/*.js',
        dest: 'assets/js/functions.min.js'
      }
    },
    watch: {
      sass: {
        files: ['assets/css/**/*.{scss,sass}'],
        tasks: ['sass:server']
      }
    },
    postcss: {
      options: {
        map: false,

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 3 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'assets/css/*.css',
        dest: 'assets/css/main.min.css'
      }
    },
    svgmin: {
      dist: {
          files: [{
              expand: true,
              cwd: 'assets/img',
              src: '**/*.svg',
              dest: 'assets/img'
          }]
      }
    }
  });

  // Default task(s).
  grunt.registerTask('serve', ['sass:server', 'watch']);

  grunt.registerTask('build', [
    'sass:dist',
    'imagemin:dist',
    'uglify:dist',
    'postcss:dist',
    'svgmin:dist'
  ]);

  grunt.registerTask('clear', ['clean:clear']);

  grunt.registerTask('default', ['serve']);

};
