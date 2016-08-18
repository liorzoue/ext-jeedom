grunt.initConfig({
    concat: {
        all: {
            options: {
                separator: "\n\n"
            },
            src: "chrome-ext/js/**",
            dest: pathsToProject[app] + "chrome-ext/js.min.js"
        }
    }
});