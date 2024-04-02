module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // $ npm i --save-dev grunt-contrib-less
        less: {

            // ambiente de DESENVOLVIMENTO *meu ambiente local
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },

            // ambiente de PRODUCAO *ambiente da internet disponível para o usuário
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        // $ npm i --save-dev grunt-contrib-watch
        watch: {
            less: {
                // vai observar os seguintes arquivos: less, html
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        
        // $ npm i --save-dev grunt-replace
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/'
                }
                ]
            },
            // copia do bloco de replace alterando: dev => dist; src=> prebuild; dev/ => dist/
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                {
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }
                ]
            }
        },
        // produção
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                // criar pasta temporária e pegar os arquivos da pasta temporária, substituir os arquivos e mandar para a pasta final
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        // $ npm i --save-dev grunt-contrib-clean | $ git-contrib-uglify | $ npm run grunt build
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })





    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // tarefa 'default' => trocar array para 'watch'!
    grunt.registerTask('default', ['watch']);
    // build: publicar a aplicação no ambiente de produção
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);

   }


