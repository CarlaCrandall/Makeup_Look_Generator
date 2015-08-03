module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
	 
	grunt.initConfig({
		watch: {
			scripts: {
				files: ['./scripts/es6.js'],
				tasks: ['babel'],
				options: {
					interrupt: true
				},
			},
			sass: {
				files: ['./scss/*.scss'],
				tasks: ['sass'],
				options: {
					interrupt: true
				}
			}
		},
	    babel: {
	        dist: {
	            files: {
	                './scripts/script.js': './scripts/es6.js'
	            }
	        }
	    },
	    sass: {                              
	        dist: {                            
				options: {     
					sourcemap: 'none',                  
					style: 'expanded'
				},
				files: {                         
					'./styles.css': './scss/main.scss'
				}
	        }
	      }
	});

	 
	grunt.registerTask('default', ['babel']);
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
};