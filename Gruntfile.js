module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['./src/scripts/classes/*.js', './src/scripts/app.js'],
                tasks: ['concat', 'babel']
            },
            sass: {
                files: ['./src/scss/*.scss'],
                tasks: ['sass']
            },
            copy: {
                files: ['./src/scripts/*.js', './src/scripts/classes/*.js', './src/scss/*.scss', './src/index.html'],
                tasks: ['copy']
            }
        },
        concat: {
            dist: {
                src: [
                    './src/scripts/classes/element.js',
                    './src/scripts/classes/select.js',
                    './src/scripts/classes/list.js',
                    './src/scripts/classes/question.js',
                    './src/scripts/classes/instructions.js',
                    './src/scripts/classes/downloadForm.js',
                    './src/scripts/classes/button.js',
                    './src/scripts/app.js'
                ],
                dest: './build/scripts/app.js'
            }
        },
        babel: {
            dist: {
                files: { './build/scripts/app.js': './build/scripts/app.js' }
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: { './build/styles.css': './src/scss/main.scss' }
            }
        },
        copy: {
            build: {
                files: [{
                    src: ['./src/*'],
                    dest: 'build/',
                    filter: 'isFile',
                    expand: true,
                    flatten: true
                }, {
                    src: ['./node_modules/babel-polyfill/dist/polyfill.min.js', './src/scripts/data.js'],
                    dest: 'build/scripts/',
                    expand: true,
                    flatten: true
                }, {
                    src: ['./src/images/*'],
                    dest: 'build/images/',
                    expand: true,
                    flatten: true
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['concat', 'babel', 'sass', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);
};
