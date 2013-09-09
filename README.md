# grunt-sundown

> a grunt wrapper for [robotskirt](https://github.com/benmills/robotskirt)([Sundown](https://github.com/vmg/sundown)) - a C implementation of [Markdown](http://daringfireball.net/projects/markdown/)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sundown --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sundown');
```

## The "sundown" task

### Overview
In your project's Gruntfile, add a section named `sundown` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sundown: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
})
```

### Options

```javascript
options: {
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
    escape: false
  },
  separator: '\n\n'
}
```

### Extensions Information

extensions - a hash containing the Markdown extensions which the parser
will identify. The following extensions are accepted:

* `no_intra_emphasis`: do not parse emphasis inside of words.
Strings such as `foo_bar_baz` will not generate `<em>` tags.

* `tables`: parse tables, PHP-Markdown style.

* `fenced_code_blocks`: parse fenced code blocks, PHP-Markdown
style. Blocks delimited with 3 or more `~` or backticks will be considered
as code, without the need to be indented. An optional language name may
be added at the end of the opening fence for the code block.

* `autolink`: parse links even when they are not enclosed in `<>`
characters. Autolinks for the http, https and ftp protocols will be
automatically detected. Email addresses are also handled, and http
links without protocol, but starting with `www`.

* `disable_indented_code_blocks`: do not parse usual markdown
code blocks. Markdown converts text with four spaces at
the front of each line to code blocks. This options
prevents it from doing so. Recommended to use
with `fenced_code_blocks: true`.

* `strikethrough`: parse strikethrough, PHP-Markdown style
Two `~` characters mark the start of a strikethrough,
e.g. `this is ~~good~~ bad`.

* `lax_spacing`: HTML blocks do not require to be surrounded by an
empty line as in the Markdown standard.

* `space_after_headers`: A space is always required between the hash
at the beginning of a header and its name, e.g. `#this is my header`
would not be a valid header.

* `superscript`: parse superscripts after the `^` character; contiguous superscripts
are nested together, and complex values can be enclosed in parenthesis, e.g.
`this is the 2^(nd) time`.

* `underline`: parse underscored emphasis as underlines.
`This is _underlined_ but this is still *italic*`.

* `highlight`: parse highlights.
`This is ==highlighted==`. It looks like this: `<mark>highlighted</mark>`

* `quote`: parse quotes.
`This is a "quote"`. It looks like this: `<q>quote</q>`

* `footnotes`: parse footnotes, PHP-Markdown style. A footnote works very much
like a reference-style link: it consists of a  marker next to the text (e.g.
`This is a sentence.[^1]`) and a footnote definition on its own line anywhere
within the document (e.g. `[^1]: This is a footnote.`).

### HTML Flags Information

The following HTML flags are available:

* `skip_html`: do not allow any user-inputted HTML in the output.

* `skip_images`: do not generate any `<img>` tags.

* `skip_links`: do not generate any `<a>` tags.

* `skip_styles`: do not generate any `<style>` tags.

* `safelink`: only generate links for protocols which are considered
safe.

* `toc`: add HTML anchors to each header in the output HTML,
to allow linking to each section.

* `hard_wrap`: insert HTML `<br>` tags inside on paragraphs where the origin
Markdown document had newlines (by default, Markdown ignores these newlines).

* `use_xhtml`: output XHTML-conformant tags. This option is always enabled in the
`Render::XHTML` renderer.

### More Information

You can try your luck on the [Sundown](https://github.com/vmg/sundown) homepage. Or check out some of the [other wrappers](https://github.com/vmg/sundown#bindings).

### Usage Examples

#### Default Usage

```js
grunt.initConfig({
  sundown: {
    options: {
      extensions: {
        fenced_code: true
      },
      render_flags: {
        skip_html: true
      }
    },
    files: {
      'output.html': ['input1.md', 'input2.md'],
    }
  }
});
```