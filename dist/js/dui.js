/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _modal = __webpack_require__(1);

	var _modal2 = _interopRequireDefault(_modal);

	var _animate = __webpack_require__(76);

	var _animate2 = _interopRequireDefault(_animate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window["Dui"] = module.exports = {
	    Modal: _modal2.default,
	    Animate: _animate2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _template = __webpack_require__(2);

	var _template2 = _interopRequireDefault(_template);

	var _extend = __webpack_require__(70);

	var _extend2 = _interopRequireDefault(_extend);

	var _modal_config = __webpack_require__(72);

	var _modal_config2 = _interopRequireDefault(_modal_config);

	var _dom = __webpack_require__(73);

	var _dom2 = _interopRequireDefault(_dom);

	var _event = __webpack_require__(74);

	var _event2 = _interopRequireDefault(_event);

	var _drag = __webpack_require__(75);

	var _drag2 = _interopRequireDefault(_drag);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	exports.default = function () {

	    //TODO 未来希望是通过webpack loader 来引入html模板
	    var modalTemplate = ['<div class="dui-dialog <%= className %>" style="width: <%= width %>px; height: <%= height %>px">', '<% if(close) { %>', '<i class="dui-dialog-close J_dialog-close <%=closeClass %>" href="javascript:;"></i>', '<% } %>', '<% if(title != "" && type == "default") { %>', '<div class="dui-dialog-hd">', '<h3 class="dui-dialog-title"><%= title %></h3>', '</div>', '<% } %>', '<% if(type == "custom") { %>', '<div class="dui-dialog-custom-bd"><%= content %></div>', '<% } %>', '<% if(type == "default") { %>', '<% if(contentHeight != "auto"){ %>', '<div style="height: <%= contentHeight %>px;" class="dui-dialog-bd">', '<% }else { %>', '<div style="height: <%= contentHeight %>;max-height: <%= contentMaxHeight %>px" class="dui-dialog-bd">', '<% } %>', '<%= content %>', '</div>', '<% if(ok || cancel) { %>', '<div class="dui-dialog-ft <%= btnPosClass %>">', '<div class="dui-btn-list-g10">', '<% if(ok) { %>', '<a class="dui-btn-info J_dialog-ok" href="javascript:;"><%= okValue %></a>', '<% } %>', '<% if(cancel) { %>', '<a class="dui-btn J_dialog-cancel" href="javascript:;"><%= cancelValue %></a>', '<% } %>', '</div>', '</div>', '<% }  %>', '<% }  %>', '</div>'];

	    var Modal = function (_Event) {
	        _inherits(Modal, _Event);

	        function Modal(option) {
	            _classCallCheck(this, Modal);

	            var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

	            var defaultOption = {
	                type: "default",
	                title: "提示",
	                content: "内容",
	                okValue: "确定",
	                cancelValue: "取消",
	                className: "",
	                closeClass: _modal_config2.default.closeIconClass,
	                mask: true,
	                close: true,
	                ok: false,
	                cancel: false,
	                btnPos: "right",
	                draggable: false
	            };

	            _this.option = option;

	            _this.option = (0, _extend2.default)({}, defaultOption, _this.option);

	            _this.init();

	            return _this;
	        }

	        _createClass(Modal, [{
	            key: "init",
	            value: function init() {

	                this.handleOption();

	                this.show();

	                this.bindEvent();

	                this.handleDrag();

	                this.option.init && this.option.init.apply(this);
	            }

	            //处理参数

	        }, {
	            key: "handleOption",
	            value: function handleOption() {

	                this.handleOptionWidth();

	                this.handleOptionHeight();

	                this.handleOptionButton();

	                //初始化content的高度，它会取决于有没有下面的按钮
	                this.handleOptionContentHeight();
	            }

	            //处理弹窗宽度

	        }, {
	            key: "handleOptionWidth",
	            value: function handleOptionWidth() {

	                var width = this.option.width;

	                if (!width) {
	                    width = _modal_config2.default.minWidth;
	                } else {
	                    width = parseInt(width);
	                }

	                if (_modal_config2.default.minWidth - width >= 0) {
	                    width = _modal_config2.default.minWidth;
	                }

	                if (_modal_config2.default.maxWidth - width < 0) {
	                    width = _modal_config2.default.maxWidth;
	                }

	                this.option.width = width;
	            }

	            //处理弹窗高度

	        }, {
	            key: "handleOptionHeight",
	            value: function handleOptionHeight() {

	                var height = this.option.height;

	                //处理特殊的auto情况
	                if (height == "auto") {
	                    return;
	                }

	                if (!height) {
	                    height = _modal_config2.default.minHeight;
	                } else {
	                    height = parseInt(height);
	                }

	                if (_modal_config2.default.minHeight - height >= 0) {
	                    height = _modal_config2.default.minHeight;
	                }

	                if (_modal_config2.default.maxHeight - height < 0) {
	                    height = _modal_config2.default.maxHeight;
	                }

	                this.option.height = height;
	            }

	            //处理内容高度

	        }, {
	            key: "handleOptionContentHeight",
	            value: function handleOptionContentHeight() {

	                var height = this.option.height,
	                    hdHeight = _modal_config2.default.hdHeight,
	                    ftHeight = _modal_config2.default.ftHeight,
	                    padding = _modal_config2.default.padding,
	                    maxHeight = _modal_config2.default.maxHeight;

	                var spacing = void 0;

	                if (!this.option.ok && !this.option.cancel) {
	                    spacing = 2 * padding;
	                    ftHeight = 0;
	                } else {
	                    spacing = 3 * padding;
	                }

	                if (this.option.title == "") {
	                    hdHeight = 0;
	                }

	                if (height == "auto") {

	                    this.option.contentHeight = "auto";

	                    var contentMaxHeight = maxHeight - hdHeight - ftHeight - spacing;

	                    this.option.contentMaxHeight = contentMaxHeight;
	                } else {

	                    var contentHeight = height - hdHeight - ftHeight - spacing;

	                    this.option.contentHeight = contentHeight;
	                }
	            }

	            //处理底部按钮

	        }, {
	            key: "handleOptionButton",
	            value: function handleOptionButton() {

	                var ok = this.option.ok,
	                    cancel = this.option.cancel;

	                if (ok == null) {
	                    this.option.ok = false;
	                } else {
	                    var isBool = typeof ok === "boolean";
	                    this.option.ok = !!ok ? true : false;
	                    this.option.okValue = isBool ? this.option.okValue : ok;
	                }

	                if (cancel == null) {
	                    this.option.ok = false;
	                } else {
	                    var isBool = typeof ok === "boolean";
	                    this.option.cancel = !!cancel ? true : false;
	                    this.option.cancelValue = isBool ? this.option.cancelValue : cancel;
	                }

	                if (this.option.okFn) {
	                    this.option.ok = true;
	                }

	                if (this.option.cancelFn) {
	                    this.option.cancel = true;
	                }

	                this.option.btnPosClass = "dui-dialog-ft-" + this.option.btnPos;
	            }

	            //显示弹窗

	        }, {
	            key: "show",
	            value: function show() {
	                var len = _dom2.default.has(".dui-dialog-wrap").length;

	                if (len == 0 && this.option.mask) {

	                    var wrap = '<div class="dui-dialog-wrap"></div>';

	                    _dom2.default.appendHTML(document.body, wrap);
	                }

	                var compiled = (0, _template2.default)(modalTemplate.join(""));

	                var result = compiled(this.option);

	                if (this.option.mask) {
	                    this.dialogDom = _dom2.default.appendHTML(_dom2.default.find(".dui-dialog-wrap"), result);
	                } else {
	                    this.dialogDom = _dom2.default.appendHTML(document.body, result);
	                }
	            }

	            //隐藏弹窗

	        }, {
	            key: "hide",
	            value: function hide() {
	                this.destroy();
	            }

	            //销毁弹窗

	        }, {
	            key: "destroy",
	            value: function destroy() {

	                this.unBindEvent();

	                var len;

	                if (this.option.mask) {
	                    len = _dom2.default.has(_dom2.default.find(".dui-dialog-wrap"), ".dui-dialog").length;
	                } else {
	                    len = _dom2.default.has(".dui-dialog").length;
	                }

	                _dom2.default.remove(this.dialogDom);

	                if (len == 1 && this.option.mask) {
	                    _dom2.default.remove(_dom2.default.find(".dui-dialog-wrap"));
	                }

	                this.dialogDom = null;
	            }

	            //确定事件处理

	        }, {
	            key: "_okFn",
	            value: function _okFn() {

	                this.$emit("ok");

	                //TODO 判断是否是函数
	                this.option.okFn && this.option.okFn.apply(this);
	            }

	            //取消事件处理

	        }, {
	            key: "_cancelFn",
	            value: function _cancelFn() {

	                this.$emit("cancel");

	                //TODO 判断是否是函数
	                this.option.cancelFn && this.option.cancelFn.apply(this);

	                this.hide();
	            }

	            //关闭事件处理

	        }, {
	            key: "_closeFn",
	            value: function _closeFn() {

	                this.$emit("close");

	                this.hide();
	            }

	            //按ESC让弹窗消失

	        }, {
	            key: "_escFn",
	            value: function _escFn(event) {

	                event = event || window.event;

	                //ESC键
	                if (event.keyCode == "27") {
	                    this.hide();
	                }
	            }
	        }, {
	            key: "handleDrag",
	            value: function handleDrag() {

	                if (this.option.draggable) {

	                    var bar = _dom2.default.find(this.dialogDom, ".dui-dialog-hd");

	                    _dom2.default.addClass(bar, "z-draggable");

	                    _drag2.default.startDrag(bar, this.dialogDom, _modal_config2.default.boundary(this.dialogDom), this);
	                }
	            }

	            //绑定按钮事件

	        }, {
	            key: "bindEvent",
	            value: function bindEvent() {

	                var okBtn = this.okBtn = _dom2.default.find(this.dialogDom, ".J_dialog-ok");

	                var cancelBtn = this.cancelBtn = _dom2.default.find(this.dialogDom, ".J_dialog-cancel");

	                var closeBtn = this.closeBtn = _dom2.default.find(this.dialogDom, ".J_dialog-close");

	                okBtn && okBtn.addEventListener("click", this.bindOkClick = this._okFn.bind(this), false);

	                cancelBtn && cancelBtn.addEventListener("click", this.bindCancelClick = this._cancelFn.bind(this), false);

	                closeBtn && closeBtn.addEventListener("click", this.bindCloseClick = this._closeFn.bind(this), false);

	                document.addEventListener("keydown", this.bindEscClick = this._escFn.bind(this), false);
	            }
	        }, {
	            key: "unBindEvent",
	            value: function unBindEvent() {

	                var okBtn = this.okBtn,
	                    cancelBtn = this.cancelBtn,
	                    closeBtn = this.closeBtn;

	                okBtn && okBtn.removeEventListener("click", this.bindOkClick, false);

	                cancelBtn && cancelBtn.removeEventListener("click", this.bindCancelClick, false);

	                closeBtn && closeBtn.removeEventListener("click", this.bindCloseClick, false);

	                document.removeEventListener("keydown", this.bindEscClick, false);
	            }
	        }]);

	        return Modal;
	    }(_event2.default);

	    Modal.alert = function (text) {

	        return new Modal({
	            content: text,
	            okFn: function okFn() {
	                this.hide();
	            }
	        });
	    };

	    Modal.confirm = function (text) {

	        return new Promise(function (resolve) {

	            new Modal({
	                content: text,
	                okFn: function okFn() {
	                    resolve();
	                    this.hide();
	                },
	                cancel: true
	            });
	        });
	    };

	    return Modal;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var assignInDefaults = __webpack_require__(3),
	    assignInWith = __webpack_require__(5),
	    attempt = __webpack_require__(50),
	    baseValues = __webpack_require__(52),
	    escapeStringChar = __webpack_require__(54),
	    isError = __webpack_require__(51),
	    isIterateeCall = __webpack_require__(29),
	    keys = __webpack_require__(55),
	    reInterpolate = __webpack_require__(59),
	    templateSettings = __webpack_require__(60),
	    toString = __webpack_require__(64);

	/** Used to match empty string literals in compiled template source. */
	var reEmptyStringLeading = /\b__p \+= '';/g,
	    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	/**
	 * Used to match
	 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
	 */
	var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	/** Used to ensure capturing order of template delimiters. */
	var reNoMatch = /($^)/;

	/** Used to match unescaped characters in compiled string literals. */
	var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

	/**
	 * Creates a compiled template function that can interpolate data properties
	 * in "interpolate" delimiters, HTML-escape interpolated data properties in
	 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	 * properties may be accessed as free variables in the template. If a setting
	 * object is given, it takes precedence over `_.templateSettings` values.
	 *
	 * **Note:** In the development build `_.template` utilizes
	 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	 * for easier debugging.
	 *
	 * For more information on precompiling templates see
	 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	 *
	 * For more information on Chrome extension sandboxes see
	 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The template string.
	 * @param {Object} [options={}] The options object.
	 * @param {RegExp} [options.escape=_.templateSettings.escape]
	 *  The HTML "escape" delimiter.
	 * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
	 *  The "evaluate" delimiter.
	 * @param {Object} [options.imports=_.templateSettings.imports]
	 *  An object to import into the template as free variables.
	 * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
	 *  The "interpolate" delimiter.
	 * @param {string} [options.sourceURL='templateSources[n]']
	 *  The sourceURL of the compiled template.
	 * @param {string} [options.variable='obj']
	 *  The data object variable name.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Function} Returns the compiled template function.
	 * @example
	 *
	 * // Use the "interpolate" delimiter to create a compiled template.
	 * var compiled = _.template('hello <%= user %>!');
	 * compiled({ 'user': 'fred' });
	 * // => 'hello fred!'
	 *
	 * // Use the HTML "escape" delimiter to escape data property values.
	 * var compiled = _.template('<b><%- value %></b>');
	 * compiled({ 'value': '<script>' });
	 * // => '<b>&lt;script&gt;</b>'
	 *
	 * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
	 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	 * compiled({ 'users': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // Use the internal `print` function in "evaluate" delimiters.
	 * var compiled = _.template('<% print("hello " + user); %>!');
	 * compiled({ 'user': 'barney' });
	 * // => 'hello barney!'
	 *
	 * // Use the ES template literal delimiter as an "interpolate" delimiter.
	 * // Disable support by replacing the "interpolate" delimiter.
	 * var compiled = _.template('hello ${ user }!');
	 * compiled({ 'user': 'pebbles' });
	 * // => 'hello pebbles!'
	 *
	 * // Use backslashes to treat delimiters as plain text.
	 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	 * compiled({ 'value': 'ignored' });
	 * // => '<%- value %>'
	 *
	 * // Use the `imports` option to import `jQuery` as `jq`.
	 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	 * compiled({ 'users': ['fred', 'barney'] });
	 * // => '<li>fred</li><li>barney</li>'
	 *
	 * // Use the `sourceURL` option to specify a custom sourceURL for the template.
	 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	 * compiled(data);
	 * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
	 *
	 * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
	 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	 * compiled.source;
	 * // => function(data) {
	 * //   var __t, __p = '';
	 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	 * //   return __p;
	 * // }
	 *
	 * // Use custom template delimiters.
	 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	 * var compiled = _.template('hello {{ user }}!');
	 * compiled({ 'user': 'mustache' });
	 * // => 'hello mustache!'
	 *
	 * // Use the `source` property to inline compiled templates for meaningful
	 * // line numbers in error messages and stack traces.
	 * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
	 *   var JST = {\
	 *     "main": ' + _.template(mainText).source + '\
	 *   };\
	 * ');
	 */
	function template(string, options, guard) {
	  // Based on John Resig's `tmpl` implementation
	  // (http://ejohn.org/blog/javascript-micro-templating/)
	  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	  var settings = templateSettings.imports._.templateSettings || templateSettings;

	  if (guard && isIterateeCall(string, options, guard)) {
	    options = undefined;
	  }
	  string = toString(string);
	  options = assignInWith({}, options, settings, assignInDefaults);

	  var imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
	      importsKeys = keys(imports),
	      importsValues = baseValues(imports, importsKeys);

	  var isEscaping,
	      isEvaluating,
	      index = 0,
	      interpolate = options.interpolate || reNoMatch,
	      source = "__p += '";

	  // Compile the regexp to match each delimiter.
	  var reDelimiters = RegExp(
	    (options.escape || reNoMatch).source + '|' +
	    interpolate.source + '|' +
	    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	    (options.evaluate || reNoMatch).source + '|$'
	  , 'g');

	  // Use a sourceURL for easier debugging.
	  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

	  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	    interpolateValue || (interpolateValue = esTemplateValue);

	    // Escape characters that can't be included in string literals.
	    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	    // Replace delimiters with snippets.
	    if (escapeValue) {
	      isEscaping = true;
	      source += "' +\n__e(" + escapeValue + ") +\n'";
	    }
	    if (evaluateValue) {
	      isEvaluating = true;
	      source += "';\n" + evaluateValue + ";\n__p += '";
	    }
	    if (interpolateValue) {
	      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	    }
	    index = offset + match.length;

	    // The JS engine embedded in Adobe products needs `match` returned in
	    // order to produce the correct `offset` value.
	    return match;
	  });

	  source += "';\n";

	  // If `variable` is not specified wrap a with-statement around the generated
	  // code to add the data object to the top of the scope chain.
	  var variable = options.variable;
	  if (!variable) {
	    source = 'with (obj) {\n' + source + '\n}\n';
	  }
	  // Cleanup code by stripping empty strings.
	  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	    .replace(reEmptyStringMiddle, '$1')
	    .replace(reEmptyStringTrailing, '$1;');

	  // Frame code as the function body.
	  source = 'function(' + (variable || 'obj') + ') {\n' +
	    (variable
	      ? ''
	      : 'obj || (obj = {});\n'
	    ) +
	    "var __t, __p = ''" +
	    (isEscaping
	       ? ', __e = _.escape'
	       : ''
	    ) +
	    (isEvaluating
	      ? ', __j = Array.prototype.join;\n' +
	        "function print() { __p += __j.call(arguments, '') }\n"
	      : ';\n'
	    ) +
	    source +
	    'return __p\n}';

	  var result = attempt(function() {
	    return Function(importsKeys, sourceURL + 'return ' + source)
	      .apply(undefined, importsValues);
	  });

	  // Provide the compiled function's source by its `toString` method or
	  // the `source` property as a convenience for inlining compiled templates.
	  result.source = source;
	  if (isError(result)) {
	    throw result;
	  }
	  return result;
	}

	module.exports = template;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(4);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}

	module.exports = assignInDefaults;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(6),
	    createAssigner = __webpack_require__(20),
	    keysIn = __webpack_require__(33);

	/**
	 * This method is like `_.assignIn` except that it accepts `customizer`
	 * which is invoked to produce the assigned values. If `customizer` returns
	 * `undefined`, assignment is handled by the method instead. The `customizer`
	 * is invoked with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @see _.assignWith
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObject(source, keysIn(source), object, customizer);
	});

	module.exports = assignInWith;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(7),
	    baseAssignValue = __webpack_require__(8);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(8),
	    eq = __webpack_require__(4);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(9);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(10);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(11),
	    getValue = __webpack_require__(19);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isMasked = __webpack_require__(14),
	    isObject = __webpack_require__(13),
	    toSource = __webpack_require__(18);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(15);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(17);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(21),
	    isIterateeCall = __webpack_require__(29);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(22),
	    overRest = __webpack_require__(23),
	    setToString = __webpack_require__(25);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(24);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(26),
	    shortOut = __webpack_require__(28);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(27),
	    defineProperty = __webpack_require__(9),
	    identity = __webpack_require__(22);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 500,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(4),
	    isArrayLike = __webpack_require__(30),
	    isIndex = __webpack_require__(32),
	    isObject = __webpack_require__(13);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isLength = __webpack_require__(31);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 31 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(34),
	    baseKeysIn = __webpack_require__(47),
	    isArrayLike = __webpack_require__(30);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(35),
	    isArguments = __webpack_require__(36),
	    isArray = __webpack_require__(39),
	    isBuffer = __webpack_require__(40),
	    isIndex = __webpack_require__(32),
	    isTypedArray = __webpack_require__(43);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(37),
	    isObjectLike = __webpack_require__(38);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(38);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && objectToString.call(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(16),
	    stubFalse = __webpack_require__(42);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)(module)))

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(44),
	    baseUnary = __webpack_require__(45),
	    nodeUtil = __webpack_require__(46);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(31),
	    isObjectLike = __webpack_require__(38);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(17);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)(module)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13),
	    isPrototype = __webpack_require__(48),
	    nativeKeysIn = __webpack_require__(49);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 49 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(24),
	    baseRest = __webpack_require__(21),
	    isError = __webpack_require__(51);

	/**
	 * Attempts to invoke `func`, returning either the result or the caught error
	 * object. Any additional arguments are provided to `func` when it's invoked.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Util
	 * @param {Function} func The function to attempt.
	 * @param {...*} [args] The arguments to invoke `func` with.
	 * @returns {*} Returns the `func` result or error object.
	 * @example
	 *
	 * // Avoid throwing errors for invalid selectors.
	 * var elements = _.attempt(function(selector) {
	 *   return document.querySelectorAll(selector);
	 * }, '>_>');
	 *
	 * if (_.isError(elements)) {
	 *   elements = [];
	 * }
	 */
	var attempt = baseRest(function(func, args) {
	  try {
	    return apply(func, undefined, args);
	  } catch (e) {
	    return isError(e) ? e : new Error(e);
	  }
	});

	module.exports = attempt;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(38);

	/** `Object#toString` result references. */
	var errorTag = '[object Error]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	 * `SyntaxError`, `TypeError`, or `URIError` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	 * @example
	 *
	 * _.isError(new Error);
	 * // => true
	 *
	 * _.isError(Error);
	 * // => false
	 */
	function isError(value) {
	  if (!isObjectLike(value)) {
	    return false;
	  }
	  return (objectToString.call(value) == errorTag) ||
	    (typeof value.message == 'string' && typeof value.name == 'string');
	}

	module.exports = isError;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(53);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 54 */
/***/ function(module, exports) {

	/** Used to escape characters for inclusion in compiled string literals. */
	var stringEscapes = {
	  '\\': '\\',
	  "'": "'",
	  '\n': 'n',
	  '\r': 'r',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	/**
	 * Used by `_.template` to escape characters for inclusion in compiled string literals.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	function escapeStringChar(chr) {
	  return '\\' + stringEscapes[chr];
	}

	module.exports = escapeStringChar;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(34),
	    baseKeys = __webpack_require__(56),
	    isArrayLike = __webpack_require__(30);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(48),
	    nativeKeys = __webpack_require__(57);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(58);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reInterpolate = /<%=([\s\S]+?)%>/g;

	module.exports = reInterpolate;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var escape = __webpack_require__(61),
	    reEscape = __webpack_require__(68),
	    reEvaluate = __webpack_require__(69),
	    reInterpolate = __webpack_require__(59);

	/**
	 * By default, the template delimiters used by lodash are like those in
	 * embedded Ruby (ERB). Change the following template settings to use
	 * alternative delimiters.
	 *
	 * @static
	 * @memberOf _
	 * @type {Object}
	 */
	var templateSettings = {

	  /**
	   * Used to detect `data` property values to be HTML-escaped.
	   *
	   * @memberOf _.templateSettings
	   * @type {RegExp}
	   */
	  'escape': reEscape,

	  /**
	   * Used to detect code to be evaluated.
	   *
	   * @memberOf _.templateSettings
	   * @type {RegExp}
	   */
	  'evaluate': reEvaluate,

	  /**
	   * Used to detect `data` property values to inject.
	   *
	   * @memberOf _.templateSettings
	   * @type {RegExp}
	   */
	  'interpolate': reInterpolate,

	  /**
	   * Used to reference the data object in the template text.
	   *
	   * @memberOf _.templateSettings
	   * @type {string}
	   */
	  'variable': '',

	  /**
	   * Used to import variables into the compiled template.
	   *
	   * @memberOf _.templateSettings
	   * @type {Object}
	   */
	  'imports': {

	    /**
	     * A reference to the `lodash` function.
	     *
	     * @memberOf _.templateSettings.imports
	     * @type {Function}
	     */
	    '_': { 'escape': escape }
	  }
	};

	module.exports = templateSettings;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var escapeHtmlChar = __webpack_require__(62),
	    toString = __webpack_require__(64);

	/** Used to match HTML entities and HTML characters. */
	var reUnescapedHtml = /[&<>"']/g,
	    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	/**
	 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
	 * corresponding HTML entities.
	 *
	 * **Note:** No other characters are escaped. To escape additional
	 * characters use a third-party library like [_he_](https://mths.be/he).
	 *
	 * Though the ">" character is escaped for symmetry, characters like
	 * ">" and "/" don't need escaping in HTML and have no special meaning
	 * unless they're part of a tag or unquoted attribute value. See
	 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	 * (under "semi-related fun fact") for more details.
	 *
	 * When working with HTML you should always
	 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
	 * XSS vectors.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escape('fred, barney, & pebbles');
	 * // => 'fred, barney, &amp; pebbles'
	 */
	function escape(string) {
	  string = toString(string);
	  return (string && reHasUnescapedHtml.test(string))
	    ? string.replace(reUnescapedHtml, escapeHtmlChar)
	    : string;
	}

	module.exports = escape;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(63);

	/** Used to map characters to HTML entities. */
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;'
	};

	/**
	 * Used by `_.escape` to convert characters to HTML entities.
	 *
	 * @private
	 * @param {string} chr The matched character to escape.
	 * @returns {string} Returns the escaped character.
	 */
	var escapeHtmlChar = basePropertyOf(htmlEscapes);

	module.exports = escapeHtmlChar;


/***/ },
/* 63 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.propertyOf` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyOf(object) {
	  return function(key) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = basePropertyOf;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(65);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(66),
	    arrayMap = __webpack_require__(53),
	    isArray = __webpack_require__(39),
	    isSymbol = __webpack_require__(67);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(16);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(38);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reEscape = /<%-([\s\S]+?)%>/g;

	module.exports = reEscape;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reEvaluate = /<%([\s\S]+?)%>/g;

	module.exports = reEvaluate;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(71);


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(6),
	    createAssigner = __webpack_require__(20),
	    keysIn = __webpack_require__(33);

	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assign
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  copyObject(source, keysIn(source), object);
	});

	module.exports = assignIn;


/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    minWidth: 420,
	    minHeight: 170,
	    maxWidth: 920,
	    maxHeight: 580,
	    hdHeight: 45, //44 + 1 (下边框)
	    ftHeight: 30,
	    padding: 16,
	    closeIconClass: "iconfont icon-shanchu5",
	    boundary: function boundary(elem) {

	        var width = elem.offsetWidth,
	            height = elem.offsetHeight;

	        return {
	            getLeft: function getLeft(left) {

	                var containerWidth = document.documentElement.clientWidth;

	                if (left < width / 2) {
	                    return width / 2;
	                }

	                if (left > containerWidth - width / 2) {
	                    return containerWidth - width / 2;
	                }

	                return left;
	            },
	            getTop: function getTop(top) {

	                var containerHeight = document.documentElement.clientHeight;

	                if (top < height / 2) {
	                    return height / 2;
	                }

	                if (top > containerHeight - height / 2) {
	                    return containerHeight - height / 2;
	                }

	                return top;
	            }
	        };
	    }
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//dom简单操作

	exports.default = {
	    getCss: function getCss(elem, key) {
	        return elem.currentStyle ? elem.currentStyle[key] : document.defaultView.getComputedStyle(elem, false)[key];
	    },
	    addClass: function addClass(elem, className) {
	        elem.classList.add(className);
	    },
	    has: function has(elem, selector) {

	        if (arguments.length == 1) {
	            elem = document;
	            selector = arguments[0];
	        }

	        var domArr = elem.querySelectorAll(selector);

	        return {
	            length: domArr.length
	        };
	    },
	    find: function find(elem, selector) {

	        if (arguments.length == 1) {
	            elem = document;
	            selector = arguments[0];
	        }

	        return elem.querySelector(selector);
	    },
	    appendHTML: function appendHTML(elem, html) {

	        var divTemp = document.createElement("div");

	        divTemp.innerHTML = html;

	        var dom = divTemp.childNodes[0];

	        elem.appendChild(dom);

	        return dom;
	    },
	    remove: function remove(elem) {

	        elem.parentNode.removeChild(elem);
	        return elem;
	    }
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var slice = [].slice;

	var Event = function () {
	    function Event() {
	        _classCallCheck(this, Event);
	    }

	    _createClass(Event, [{
	        key: "$on",
	        value: function $on(event, fn) {
	            if ((typeof event === "undefined" ? "undefined" : _typeof(event)) === "object") {
	                for (var i in event) {
	                    this.$on(i, event[i]);
	                }
	            } else {
	                // @patch: for list
	                var context = this;
	                var handles = context._handles || (context._handles = {}),
	                    calls = handles[event] || (handles[event] = []);
	                calls.push(fn);
	            }
	            return this;
	        }
	    }, {
	        key: "$off",
	        value: function $off(event, fn) {
	            var context = this;
	            if (!context._handles) return;
	            if (!event) this._handles = {};
	            var handles = context._handles,
	                calls;

	            if (calls = handles[event]) {
	                if (!fn) {
	                    handles[event] = [];
	                    return context;
	                }
	                for (var i = 0, len = calls.length; i < len; i++) {
	                    if (fn === calls[i]) {
	                        calls.splice(i, 1);
	                        return context;
	                    }
	                }
	            }
	            return context;
	        }

	        // bubble event

	    }, {
	        key: "$emit",
	        value: function $emit(event) {
	            // @patch: for list
	            var context = this;
	            var handles = context._handles,
	                calls,
	                args,
	                type;
	            if (!event) return;
	            var args = slice.call(arguments, 1);
	            var type = event;

	            if (!handles) return context;
	            if (calls = handles[type.slice(1)]) {
	                for (var j = 0, len = calls.length; j < len; j++) {
	                    calls[j].apply(context, args);
	                }
	            }
	            if (!(calls = handles[type])) return context;
	            for (var i = 0, len = calls.length; i < len; i++) {
	                calls[i].apply(context, args);
	            }
	            // if(calls.length) context.$update();
	            return context;
	        }
	    }]);

	    return Event;
	}();

	exports.default = Event;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(73);

	var params = {
	    left: 0,
	    top: 0,
	    currentX: 0,
	    currentY: 0,
	    flag: false
	};

	exports.default = {
	    startDrag: function startDrag(bar, target, boundary, $scope) {

	        if ((0, _dom.getCss)(target, "left") !== "auto") {
	            params.left = (0, _dom.getCss)(target, "left");
	        }

	        if ((0, _dom.getCss)(target, "top") !== "auto") {
	            params.top = (0, _dom.getCss)(target, "top");
	        }

	        bar.onmousedown = function (event) {
	            //触发dragStart事件
	            $scope && $scope.$emit("dragStart");
	            params.flag = true;
	            if (!event) {
	                event = window.event;
	                bar.onselectstart = function () {
	                    return false;
	                };
	            }
	            var e = event;
	            params.currentX = e.clientX;
	            params.currentY = e.clientY;

	            document.onmouseup = function () {
	                params.flag = false;
	                if ((0, _dom.getCss)(target, "left") !== "auto") {
	                    params.left = (0, _dom.getCss)(target, "left");
	                }
	                if ((0, _dom.getCss)(target, "top") !== "auto") {
	                    params.top = (0, _dom.getCss)(target, "top");
	                }
	                //触发dragEnd事件
	                $scope && $scope.$emit("dragEnd");

	                document.onmousemove = null;
	                document.onmouseup = null;
	            };

	            document.onmousemove = function (event) {
	                var e = event ? event : window.event;
	                if (params.flag) {
	                    var nowX = e.clientX,
	                        nowY = e.clientY;
	                    var disX = nowX - params.currentX,
	                        disY = nowY - params.currentY;

	                    var left = parseInt(params.left) + disX,
	                        top = parseInt(params.top) + disY;

	                    if (boundary) {
	                        left = boundary.getLeft(left);
	                        top = boundary.getTop(top);
	                    }

	                    target.style.left = left + "px";
	                    target.style.top = top + "px";
	                }
	            };
	        };
	    }
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Tween = {
	    linear: function linear(t, b, c, d) {
	        //匀速
	        return c * t / d + b;
	    },
	    easeIn: function easeIn(t, b, c, d) {
	        //加速曲线
	        return c * (t /= d) * t + b;
	    },
	    easeOut: function easeOut(t, b, c, d) {
	        //减速曲线
	        return -c * (t /= d) * (t - 2) + b;
	    },
	    easeBoth: function easeBoth(t, b, c, d) {
	        //加速减速曲线
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t + b;
	        }
	        return -c / 2 * (--t * (t - 2) - 1) + b;
	    },
	    easeInStrong: function easeInStrong(t, b, c, d) {
	        //加加速曲线
	        return c * (t /= d) * t * t * t + b;
	    },
	    easeOutStrong: function easeOutStrong(t, b, c, d) {
	        //减减速曲线
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    },
	    easeBothStrong: function easeBothStrong(t, b, c, d) {
	        //加加速减减速曲线
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t + b;
	        }
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    },
	    elasticIn: function elasticIn(t, b, c, d, a, p) {
	        //正弦衰减曲线（弹动渐入）
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) == 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * 0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    },
	    elasticOut: function elasticOut(t, b, c, d, a, p) {
	        //正弦增强曲线（弹动渐出）
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) == 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * 0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	    },
	    elasticBoth: function elasticBoth(t, b, c, d, a, p) {
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d / 2) == 2) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * (0.3 * 1.5);
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        if (t < 1) {
	            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        }
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	    },
	    backIn: function backIn(t, b, c, d, s) {
	        //回退加速（回退渐入）
	        if (typeof s == 'undefined') {
	            s = 1.70158;
	        }
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    },
	    backOut: function backOut(t, b, c, d, s) {
	        if (typeof s == 'undefined') {
	            s = 3.70158; //回缩的距离
	        }
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    },
	    backBoth: function backBoth(t, b, c, d, s) {
	        if (typeof s == 'undefined') {
	            s = 1.70158;
	        }
	        if ((t /= d / 2) < 1) {
	            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	        }
	        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    },
	    bounceIn: function bounceIn(t, b, c, d) {
	        //弹球减振（弹球渐出）
	        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	    },
	    bounceOut: function bounceOut(t, b, c, d) {
	        if ((t /= d) < 1 / 2.75) {
	            return c * (7.5625 * t * t) + b;
	        } else if (t < 2 / 2.75) {
	            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	        } else if (t < 2.5 / 2.75) {
	            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	        }
	        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	    },
	    bounceBoth: function bounceBoth(t, b, c, d) {
	        if (t < d / 2) {
	            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
	        }
	        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	    }
	};

	//动画函数
	function startMove(obj, json, times, fx, fn) {

	    if (typeof times == 'undefined') {
	        times = 400;
	        fx = 'linear';
	    }

	    if (typeof times == 'string') {
	        if (typeof fx == 'function') {
	            fn = fx;
	        }
	        fx = times;
	        times = 400;
	    } else if (typeof times == 'function') {
	        fn = times;
	        times = 400;
	        fx = 'linear';
	    } else if (typeof times == 'number') {
	        if (typeof fx == 'function') {
	            fn = fx;
	            fx = 'linear';
	        } else if (typeof fx == 'undefined') {
	            fx = 'linear';
	        }
	    }

	    var iCur = {};

	    for (var attr in json) {
	        iCur[attr] = 0;

	        if (attr == 'opacity') {
	            iCur[attr] = Math.round(getStyle(obj, attr) * 100);
	        } else {
	            iCur[attr] = parseInt(getStyle(obj, attr));
	        }
	    }

	    var startTime = now();

	    clearInterval(obj.timer);

	    obj.timer = setInterval(function () {

	        var changeTime = now();

	        var t = times - Math.max(0, startTime - changeTime + times); //0到2000

	        for (var attr in json) {

	            var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);

	            if (attr == 'opacity') {
	                obj.style.opacity = value / 100;
	                obj.style.filter = 'alpha(opacity=' + value + ')';
	            } else {
	                obj.style[attr] = value + 'px';
	            }
	        }

	        if (t == times) {
	            clearInterval(obj.timer);
	            if (fn) {
	                fn.call(obj);
	            }
	        }
	    }, 13);

	    function getStyle(obj, attr) {
	        if (obj.currentStyle) {
	            return obj.currentStyle[attr];
	        } else {
	            return getComputedStyle(obj, false)[attr];
	        }
	    }

	    function now() {
	        return new Date().getTime();
	    }
	}

	exports.default = {
	    startMove: startMove
	};

/***/ }
/******/ ]);