module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            express: {
                files: ['js/*.js', 'css/*.css', '!js/*.min.js', '!css/*.min.css'],
                tasks: ['build', 'express:dev'],
                options: {
                    spawn: false
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            lint: {
                src: ['js/*.js', '!js/*.min.js',  'Gruntfile.js']
            }
        },
        jscs: {
            src: ['js/*.js', '!js/*.min.js', '!./Gruntfile.js']
        },
        uglify: {
            options: {
                drop_console: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'js',
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'css',
                    ext: '.min.css'
                }]
            }
        },
        express: {
            options: {
                // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            },
            prod: {
                options: {
                    script: 'app.js',
                    node_env: 'production'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-express-server');

    // Register new tasks
    grunt.registerTask('build', ['jshint', 'jscs', 'uglify', 'cssmin']);
    grunt.registerTask('start', ['build', 'express:dev', 'watch']);
};
