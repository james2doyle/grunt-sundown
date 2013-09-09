/*
 * grunt-sundown
 * https://github.com/james2doyle/grunt-sundown
 *
 * Copyright (c) 2013 James Doyle (@james2doyle)
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  var rs = require('robotskirt');

  grunt.registerMultiTask('sundown', 'a grunt wrapper for robotskirt(Sundown) - a C implementation of Markdown', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      extensions: {
        autolink: false,
        fenced_code: false,
        lax_html_blocks: false,
        no_intra_emphasis: false,
        space_headers: false,
        strikethrough: false,
        tables: false
      },
      render_flags: {
        skip_html: false,
        skip_style: false,
        skip_images: false,
        skip_links: false,
        expand_tabs: false,
        safelink: false,
        toc: false,
        hard_wrap: false,
        use_xhtml: false,
        escape: false,
        smartypants: false
      },
      separator: '\n\n'
    });
    // lets make an array of extensions to use
    var extensions = [], render_flags = [];
    for (var ext in options.extensions) {
      if (options.extensions[ext]) {
        // extensions get passed as uppercase flags starting with EXT_
        extensions.push(rs['EXT_'+ext.toUpperCase()]);
      }
    }
    // now handle the render flags
    for (var flag in options.render_flags) {
      if (options.render_flags[flag]) {
        // render_flags get passed with HTML_
        render_flags.push(rs['HTML_'+flag.toUpperCase()]);
      }
    }
    // pass the extensions to the markdown parser
    var parser = rs.Markdown.std(extensions, render_flags);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(options.separator);

      // Write the destination file.
      grunt.file.write(f.dest, parser.render(src));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};