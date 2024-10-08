module.exports = function (grunt) {
  // 配置任务
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // 清理 dist 文件夹
    clean: {
      build: ["dist"],
    },

    // 复制文件到 dist 文件夹
    copy: {
      build: {
        files: [{ expand: true, cwd: "src/", src: ["**"], dest: "dist/" }],
      },
    },

    // 压缩 JS 文件
    uglify: {
      build: {
        files: {
          "dist/js/app.min.js": ["src/js/app.js"],
        },
      },
    },

    // 压缩 CSS 文件
    cssmin: {
      build: {
        files: {
          "dist/css/style.min.css": ["src/css/style.css"],
        },
      },
    },

    // 压缩 HTML 文件
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: {
          "dist/index.html": "src/index.html",
        },
      },
    },
  });

  // 加载任务插件
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");

  // 定义默认任务
  grunt.registerTask("default", [
    "clean",
    "copy",
    "uglify",
    "cssmin",
    "htmlmin",
  ]);
};
