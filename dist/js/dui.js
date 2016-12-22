(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dui"] = factory();
	else
		root["Dui"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";

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

	var _animate = __webpack_require__(89);

	var _animate2 = _interopRequireDefault(_animate);

	var _tip = __webpack_require__(90);

	var _tip2 = _interopRequireDefault(_tip);

	var _select = __webpack_require__(94);

	var _select2 = _interopRequireDefault(_select);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    Modal: _modal2.default,
	    Animate: _animate2.default,
	    Tip: _tip2.default,
	    Selectpicker: _select2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(2);

	var _dialog = __webpack_require__(6);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _util = __webpack_require__(8);

	var _util2 = _interopRequireDefault(_util);

	var _modal_config = __webpack_require__(84);

	var _modal_config2 = _interopRequireDefault(_modal_config);

	var _dom = __webpack_require__(85);

	var _dom2 = _interopRequireDefault(_dom);

	var _event = __webpack_require__(86);

	var _event2 = _interopRequireDefault(_event);

	var _drag = __webpack_require__(87);

	var _drag2 = _interopRequireDefault(_drag);

	var _scrollHanlder = __webpack_require__(88);

	var _scrollHanlder2 = _interopRequireDefault(_scrollHanlder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //引入css


	exports.default = function () {

	    //TODO 未来希望是通过webpack loader 来引入html模板
	    var modalTemplate = ['<%if(height != "auto"){  %>', '<div class="dui-dialog <%= className %>" style="width: <%= width %>px; height: <%= height %>px; z-index: <%= zIndex %>">', '<% }else { %>', '<div class="dui-dialog <%= className %>" style="width: <%= width %>px; height: <%= height %>; z-index: <%= zIndex %>">', '<% } %>', '<% if(close) { %>', '<i class="dui-dialog-close J_dialog-close <%=closeClass %>" href="javascript:;"></i>', '<% } %>', '<% if(title != "" && type == "default") { %>', '<div class="dui-dialog-hd">', '<% if(titleIconClass == "") { %>', '<h3 class="dui-dialog-title"><%= title %></h3>', '<% }else { %>', '<h3 class="dui-dialog-title has-icon"><i class="<%= titleIconClass %>"></i><%= title %></h3>', '<% } %>', '</div>', '<% } %>', '<% if(title == "" && type == "default") { %>', '<div style="height: 14px;"></div>', '<% } %>', '<% if(type == "custom") { %>', '<div class="dui-dialog-custom-bd"><%= content %></div>', '<% } %>', '<% if(type == "default") { %>', '<% if(contentHeight != "auto"){ %>', '<div style="height: <%= contentHeight %>px;" class="dui-dialog-bd">', '<% }else { %>', '<div style="height: <%= contentHeight %>; min-height: <%= contentMinHeight %>px; max-height: <%= contentMaxHeight %>px" class="dui-dialog-bd">', '<% } %>', '<%= content %>', '</div>', '<% if(ok || cancel) { %>', '<div class="dui-dialog-ft <%= btnPosClass %>">', '<div class="dui-btn-list-g10">', '<% if(ok) { %>', '<a class="dui-btn-info J_dialog-ok" href="javascript:;"><%= okValue %></a>', '<% } %>', '<% if(cancel) { %>', '<a class="dui-btn J_dialog-cancel" href="javascript:;"><%= cancelValue %></a>', '<% } %>', '</div>', '</div>', '<% }  %>', '<% }  %>', '</div>'];

	    //将style里面的变量赋值给Config
	    _util2.default.extend(_modal_config2.default, _dialog2.default);

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
	                zIndex: 9999,
	                titleIconClass: "",
	                closeClass: _modal_config2.default.closeIconClass,
	                mask: true,
	                close: true,
	                ok: false,
	                cancel: false,
	                btnPos: "right",
	                draggable: false,
	                appendEl: document.body
	            };

	            _this.option = option;

	            _this.option = _util2.default.extend({}, defaultOption, _this.option);

	            _this.init();

	            return _this;
	        }

	        _createClass(Modal, [{
	            key: "init",
	            value: function init() {

	                this.handleOption();

	                this.render();

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

	                this.handleOptionContent();
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
	                    minHeight = _modal_config2.default.minHeight,
	                    maxHeight = _modal_config2.default.maxHeight;

	                var spacing = void 0;

	                if (!this.option.ok && !this.option.cancel) {
	                    spacing = 2 * padding;
	                    ftHeight = 0;
	                } else {
	                    spacing = 3 * padding;
	                }

	                if (this.option.title == "") {
	                    hdHeight = 14;
	                }

	                if (height == "auto") {

	                    this.option.contentHeight = "auto";

	                    var contentMinHeight = minHeight - hdHeight - ftHeight - spacing;

	                    var contentMaxHeight = maxHeight - hdHeight - ftHeight - spacing;

	                    this.option.contentMaxHeight = contentMaxHeight;

	                    this.option.contentMinHeight = contentMinHeight;
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
	                    this.option.cancel = false;
	                } else {
	                    var isBool = typeof cancel === "boolean";
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
	        }, {
	            key: "handleOptionContent",
	            value: function handleOptionContent() {
	                var content = this.option.content;
	                var firstCode = content.charAt(0);
	                if (firstCode == "#") {
	                    var contentDom = _dom2.default.findById(content.slice(1));
	                    if (contentDom != null) {
	                        this.option.content = _dom2.default.getHtml(contentDom);
	                        if (contentDom.tagName.toLowerCase() != "script") {
	                            _dom2.default.remove(contentDom);
	                        }
	                    }
	                }
	            }

	            //显示弹窗

	        }, {
	            key: "render",
	            value: function render() {
	                var len = _dom2.default.has(".dui-dialog-wrap").length;

	                if (len == 0 && this.option.mask) {
	                    var wrap = '<div class="dui-dialog-wrap" style="z-index: ' + this.option.zIndex + '"></div>';
	                    _dom2.default.appendHTML(document.body, wrap);
	                    _scrollHanlder2.default.disableScroll();
	                }

	                var result = _util2.default.renderTemp(modalTemplate.join(""), this.option);

	                if (this.option.mask) {
	                    this.dialogDom = _dom2.default.appendHTML(_dom2.default.find(".dui-dialog-wrap"), result);
	                } else {
	                    if (typeof this.option.appendEl == "string") {
	                        this.option.appendEl = _dom2.default.find(this.option.appendEl);
	                    }
	                    this.dialogDom = _dom2.default.appendHTML(this.option.appendEl, result);
	                }
	            }

	            //隐藏弹窗

	        }, {
	            key: "hide",
	            value: function hide() {
	                this.$emit("destroy");
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
	                    _scrollHanlder2.default.enableScroll();
	                }

	                this.dialogDom = null;
	            }
	        }, {
	            key: "bindDialogClick",
	            value: function bindDialogClick(ev) {
	                //ev.preventDefault();
	                ev.stopPropagation();
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
	            value: function _escFn(ev) {

	                //ESC键
	                if (ev.keyCode == "27") {
	                    this.hide();
	                }
	            }
	        }, {
	            key: "_stopPropagation",
	            value: function _stopPropagation(ev) {
	                ev.stopPropagation();
	            }
	        }, {
	            key: "handleDrag",
	            value: function handleDrag() {

	                if (this.option.draggable) {

	                    var bar = _dom2.default.find(this.dialogDom, ".dui-dialog-hd");

	                    _dom2.default.addClass(bar, "z-draggable");

	                    _drag2.default.startDrag(bar, this.dialogDom, _modal_config2.default.boundary(this.dialogDom, this.option.appendEl), this);
	                }
	            }

	            //绑定按钮事件

	        }, {
	            key: "bindEvent",
	            value: function bindEvent() {

	                var okBtn = this.okBtn = _dom2.default.find(this.dialogDom, ".J_dialog-ok");

	                var cancelBtn = this.cancelBtn = _dom2.default.find(this.dialogDom, ".J_dialog-cancel");

	                var closeBtn = this.closeBtn = _dom2.default.find(this.dialogDom, ".J_dialog-close");

	                var dialogBd = this.dialogBd = _dom2.default.find(this.dialogDom, ".dui-dialog-bd") || _dom2.default.find(this.dialogDom, ".dui-dialog-custom-bd");

	                //在弹窗内的点击阻止冒泡，防止触发document的事件。
	                this.dialogDom.addEventListener("click", this._stopPropagation, false);

	                okBtn && okBtn.addEventListener("click", this.bindOkClick = this._okFn.bind(this), false);

	                cancelBtn && cancelBtn.addEventListener("click", this.bindCancelClick = this._cancelFn.bind(this), false);

	                closeBtn && closeBtn.addEventListener("click", this.bindCloseClick = this._closeFn.bind(this), false);

	                dialogBd && dialogBd.addEventListener("mousewheel", this._stopPropagation, false);

	                dialogBd && dialogBd.addEventListener("touchmove", this._stopPropagation, false);

	                document.addEventListener("keydown", this.bindEscClick = this._escFn.bind(this), false);
	            }
	        }, {
	            key: "unBindEvent",
	            value: function unBindEvent() {

	                var okBtn = this.okBtn,
	                    cancelBtn = this.cancelBtn,
	                    closeBtn = this.closeBtn,
	                    dialogBd = this.dialogBd;

	                okBtn && okBtn.removeEventListener("click", this.bindOkClick, false);

	                cancelBtn && cancelBtn.removeEventListener("click", this.bindCancelClick, false);

	                closeBtn && closeBtn.removeEventListener("click", this.bindCloseClick, false);

	                dialogBd && dialogBd.removeEventListener("mousewheel", this._stopPropagation, false);
	                dialogBd && dialogBd.removeEventListener("touchmove", this._stopPropagation, false);

	                document.removeEventListener("keydown", this.bindEscClick, false);
	            }
	        }]);

	        return Modal;
	    }(_event2.default);

	    Modal.alert = function (text) {
	        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "提示";
	        var close = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


	        return new Modal({
	            title: title,
	            content: text,
	            close: close,
	            height: "auto",
	            okFn: function okFn() {
	                this.hide();
	            }
	        });
	    };

	    Modal.confirm = function (text) {
	        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "提示";
	        var close = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	        var align = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "right";


	        return new Promise(function (resolve) {

	            new Modal({
	                title: title,
	                content: text,
	                close: close,
	                height: "auto",
	                btnPos: align,
	                okFn: function okFn() {
	                    resolve(true);
	                    this.hide();
	                },
	                cancel: true,
	                cancelFn: function cancelFn() {
	                    resolve(false);
	                }
	            });
	        });
	    };

	    return Modal;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"minWidth":"420","minHeight":"170","maxWidth":"920","maxHeight":"580","hdHeight":"45","ftHeight":"30","padding":"16"};

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _template = __webpack_require__(9);

	var _template2 = _interopRequireDefault(_template);

	var _extend = __webpack_require__(82);

	var _extend2 = _interopRequireDefault(_extend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    extend: _extend2.default,
	    renderTemp: function renderTemp(str, json) {
	        var compiled = (0, _template2.default)(str);
	        return compiled(json);
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var assignInDefaults = __webpack_require__(10),
	    assignInWith = __webpack_require__(12),
	    attempt = __webpack_require__(61),
	    baseValues = __webpack_require__(66),
	    escapeStringChar = __webpack_require__(68),
	    isError = __webpack_require__(62),
	    isIterateeCall = __webpack_require__(40),
	    keys = __webpack_require__(69),
	    reInterpolate = __webpack_require__(72),
	    templateSettings = __webpack_require__(73),
	    toString = __webpack_require__(77);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(11);

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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(13),
	    createAssigner = __webpack_require__(31),
	    keysIn = __webpack_require__(44);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(14),
	    baseAssignValue = __webpack_require__(15);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(15),
	    eq = __webpack_require__(11);

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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(16);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(18),
	    getValue = __webpack_require__(30);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isMasked = __webpack_require__(27),
	    isObject = __webpack_require__(26),
	    toSource = __webpack_require__(29);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    isObject = __webpack_require__(26);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

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
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(21),
	    getRawTag = __webpack_require__(24),
	    objectToString = __webpack_require__(25);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(22);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(23);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(21);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(28);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(22);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
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
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(32),
	    isIterateeCall = __webpack_require__(40);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(33),
	    overRest = __webpack_require__(34),
	    setToString = __webpack_require__(36);

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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(35);

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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(37),
	    shortOut = __webpack_require__(39);

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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(38),
	    defineProperty = __webpack_require__(16),
	    identity = __webpack_require__(33);

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
/* 38 */
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
/* 39 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(11),
	    isArrayLike = __webpack_require__(41),
	    isIndex = __webpack_require__(43),
	    isObject = __webpack_require__(26);

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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isLength = __webpack_require__(42);

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
/* 42 */
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
/* 43 */
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(45),
	    baseKeysIn = __webpack_require__(58),
	    isArrayLike = __webpack_require__(41);

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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(46),
	    isArguments = __webpack_require__(47),
	    isArray = __webpack_require__(50),
	    isBuffer = __webpack_require__(51),
	    isIndex = __webpack_require__(43),
	    isTypedArray = __webpack_require__(54);

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
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(48),
	    isObjectLike = __webpack_require__(49);

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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    isObjectLike = __webpack_require__(49);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(22),
	    stubFalse = __webpack_require__(53);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)(module)))

/***/ },
/* 52 */
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
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(55),
	    baseUnary = __webpack_require__(56),
	    nodeUtil = __webpack_require__(57);

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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    isLength = __webpack_require__(42),
	    isObjectLike = __webpack_require__(49);

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

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 56 */
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(23);

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
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(52)(module)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(26),
	    isPrototype = __webpack_require__(59),
	    nativeKeysIn = __webpack_require__(60);

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
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(35),
	    baseRest = __webpack_require__(32),
	    isError = __webpack_require__(62);

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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    isObjectLike = __webpack_require__(49),
	    isPlainObject = __webpack_require__(63);

	/** `Object#toString` result references. */
	var domExcTag = '[object DOMException]',
	    errorTag = '[object Error]';

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
	  var tag = baseGetTag(value);
	  return tag == errorTag || tag == domExcTag ||
	    (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
	}

	module.exports = isError;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    getPrototype = __webpack_require__(64),
	    isObjectLike = __webpack_require__(49);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(65);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 65 */
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(67);

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
/* 67 */
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
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(45),
	    baseKeys = __webpack_require__(70),
	    isArrayLike = __webpack_require__(41);

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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(59),
	    nativeKeys = __webpack_require__(71);

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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(65);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reInterpolate = /<%=([\s\S]+?)%>/g;

	module.exports = reInterpolate;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var escape = __webpack_require__(74),
	    reEscape = __webpack_require__(80),
	    reEvaluate = __webpack_require__(81),
	    reInterpolate = __webpack_require__(72);

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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var escapeHtmlChar = __webpack_require__(75),
	    toString = __webpack_require__(77);

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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var basePropertyOf = __webpack_require__(76);

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
/* 76 */
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(78);

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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(21),
	    arrayMap = __webpack_require__(67),
	    isArray = __webpack_require__(50),
	    isSymbol = __webpack_require__(79);

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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(20),
	    isObjectLike = __webpack_require__(49);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

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
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reEscape = /<%-([\s\S]+?)%>/g;

	module.exports = reEscape;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/** Used to match template delimiters. */
	var reEvaluate = /<%([\s\S]+?)%>/g;

	module.exports = reEvaluate;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(83);


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(13),
	    createAssigner = __webpack_require__(31),
	    keysIn = __webpack_require__(44);

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
/* 84 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    closeIconClass: "iconfont icon-shanchu5",
	    //边界范围
	    boundary: function boundary(elem, parentElem) {

	        var width = elem.offsetWidth;

	        var height = elem.offsetHeight;

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
/* 85 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//dom简单操作

	exports.default = {

	    //简单粗暴地将元素的style整个替换掉
	    addCssText: function addCssText(elem, cssText) {
	        if (Array.isArray(elem)) {
	            elem.forEach(function (item) {
	                item.style.cssText = cssText;
	            });
	        } else {
	            elem.style.cssText = cssText;
	        }
	    },
	    getCss: function getCss(elem, key) {
	        return elem.currentStyle ? elem.currentStyle[key] : document.defaultView.getComputedStyle(elem, false)[key];
	    },
	    addClass: function addClass(elem, className) {
	        elem.classList.add(className);
	    },
	    removeClass: function removeClass(elem, className) {
	        elem.classList.remove(className);
	    },
	    isHide: function isHide(elem) {
	        return this.getCss(elem, "display") == "none";
	    },
	    show: function show(elem) {
	        elem.style.display = "block";
	    },
	    hide: function hide(elem) {
	        elem.style.display = "none";
	    },


	    //获取边界属性
	    getRect: function getRect(dom) {
	        return dom.getBoundingClientRect();
	    },


	    //获取某元素以浏览器左上角为原点的坐标
	    getPoint: function getPoint(dom) {
	        var t = dom.offsetTop;
	        var l = dom.offsetLeft;
	        //判断是否有父容器，如果存在则累加其边距
	        while (dom = dom.offsetParent) {
	            t += dom.offsetTop;
	            l += dom.offsetLeft;
	        }
	        return {
	            top: t,
	            left: l
	        };
	    },
	    getDataAttr: function getDataAttr(dom, prop) {
	        return dom.getAttribute("data-" + prop);
	    },
	    html: function html(dom, text) {
	        dom.innerHTML = text;
	    },
	    getHtml: function getHtml(dom) {
	        return dom.innerHTML;
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
	    findById: function findById(selector) {
	        return document.getElementById(selector);
	    },
	    findAll: function findAll(elem, selector) {

	        if (arguments.length == 1) {
	            elem = document;
	            selector = arguments[0];
	        }

	        return elem.querySelectorAll(selector);
	    },
	    appendHTML: function appendHTML(elem, html) {

	        var divTemp = document.createElement("div");

	        this.html(divTemp, html);

	        var dom = divTemp.childNodes[0];

	        elem.appendChild(dom);

	        return dom;
	    },
	    prependHTML: function prependHTML(elem, html) {

	        var divTemp = document.createElement("div");

	        this.html(divTemp, html);

	        var dom = divTemp.childNodes[0];

	        elem.insertBefore(dom, elem.firstChild);

	        return dom;
	    },
	    beforeHTML: function beforeHTML(elem, html) {
	        var divTemp = document.createElement("div");

	        this.html(divTemp, html);

	        var dom = divTemp.childNodes[0];

	        elem.parentNode.insertBefore(dom, elem);

	        return dom;
	    },
	    remove: function remove(elem) {
	        elem.parentNode && elem.parentNode.removeChild(elem);
	        return elem;
	    }
	};

/***/ },
/* 86 */
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(85);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getCss = _dom2.default.getCss;

	var params = {
	    left: 0,
	    top: 0,
	    currentX: 0,
	    currentY: 0,
	    flag: false
	};

	exports.default = {
	    startDrag: function startDrag(bar, target, boundary, $scope) {

	        if (getCss(target, "left") !== "auto") {
	            params.left = getCss(target, "left");
	        }

	        if (getCss(target, "top") !== "auto") {
	            params.top = getCss(target, "top");
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
	                if (getCss(target, "left") !== "auto") {
	                    params.left = getCss(target, "left");
	                }
	                if (getCss(target, "top") !== "auto") {
	                    params.top = getCss(target, "top");
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(85);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

	function preventDefault(e) {
	    e.preventDefault();
	}

	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	}

	function getScrollWidth() {
	    var dom = document.documentElement;
	    var w1 = dom.clientWidth;
	    _dom2.default.addClass(dom, "dui-dialog-lock-test");
	    var w2 = dom.clientWidth;
	    _dom2.default.removeClass(dom, "dui-dialog-lock-test");
	    return w2 - w1;
	}

	var oldonwheel = void 0,
	    oldontouchmove = void 0,
	    oldonkeydown = void 0,
	    isDisabled = void 0;

	function disableScroll() {

	    var scrollWidth = getScrollWidth();

	    oldonwheel = window.onwheel;
	    window.onwheel = preventDefault; // modern standard

	    oldontouchmove = window.ontouchmove;
	    window.ontouchmove = preventDefault; // mobile

	    oldonkeydown = document.onkeydown;
	    document.onkeydown = preventDefaultForScrollKeys;
	    isDisabled = true;

	    _dom2.default.addCssText([document.body, document.documentElement], "overflow-y: hidden; padding-right: " + scrollWidth + "px");
	}

	function enableScroll() {
	    if (!isDisabled) return;

	    window.onwheel = oldonwheel; // modern standard

	    window.ontouchmove = oldontouchmove; // mobile

	    document.onkeydown = oldonkeydown;
	    isDisabled = false;

	    _dom2.default.addCssText([document.body, document.documentElement], "overflow-y: visible; padding-right: 0;");
	}

	exports.default = {
	    disableScroll: disableScroll,
	    enableScroll: enableScroll
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(85);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getCss = _dom2.default.getCss;

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
	            iCur[attr] = Math.round(getCss(obj, attr) * 100);
	        } else {
	            iCur[attr] = parseInt(getCss(obj, attr));
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

	    function now() {
	        return new Date().getTime();
	    }
	}

	exports.default = {
	    startMove: startMove
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(2);

	__webpack_require__(91);

	var _util = __webpack_require__(8);

	var _util2 = _interopRequireDefault(_util);

	var _tip_config = __webpack_require__(93);

	var _tip_config2 = _interopRequireDefault(_tip_config);

	var _dom = __webpack_require__(85);

	var _dom2 = _interopRequireDefault(_dom);

	var _event = __webpack_require__(86);

	var _event2 = _interopRequireDefault(_event);

	var _animate = __webpack_require__(89);

	var _animate2 = _interopRequireDefault(_animate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //引入css


	exports.default = function () {

	    var tipHint = ['<div class="dui-tip-hint <%= tipClass %>" style="margin-top: <%=marginTop %>px; top: <%=top %>px; min-width: <%=minWidth %>px; max-width: <%=maxWidth %>px;">', '<i class="<%= iconClass %>"></i>', '<p><%= msg %></p>', '</div>'];

	    var tipText = ['<div class="dui-tip-text" style="opacity: 0;">', '<p><%= msg %></p>', '<div class="close-box">', '<button class="dui-btn-warning-bordered dui-btn-special dui-btn-small">我知道了</button>', '</div>', '</div>'];

	    var tipArrow = ['<div style="position: absolute; opacity: 0" class="<%= tipType %> <%= tipClass %>">', '<%= msg %>', '</div>'];

	    var Tip = function (_Event) {
	        _inherits(Tip, _Event);

	        function Tip(option) {
	            _classCallCheck(this, Tip);

	            var _this2 = _possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).call(this));

	            var defaultOption = {
	                tipContent: "这是一段提示"
	            };

	            _this2.option = option;

	            _this2.option = _util2.default.extend({}, defaultOption, _this2.option);

	            _this2.init();

	            return _this2;
	        }

	        _createClass(Tip, [{
	            key: "init",
	            value: function init() {
	                this.render();
	                this.option.init && this.option.init.apply(this);
	            }
	        }, {
	            key: "render",
	            value: function render() {
	                this.tipDom = _dom2.default.appendHTML(document.body, this.option.tipContent);
	            }
	        }, {
	            key: "show",
	            value: function show() {
	                _dom2.default.show(this.tipDom);
	            }
	        }, {
	            key: "hide",
	            value: function hide() {
	                _dom2.default.hide(this.tipDom);
	            }

	            /**
	             * 销毁
	             * @param fn 可选参数，函数中可以对事件解绑
	             */

	        }, {
	            key: "destroy",
	            value: function destroy(fn) {
	                this.$emit("destroy");
	                fn && fn();
	                _dom2.default.remove(this.tipDom);
	                this.tipDom = null;
	            }
	        }]);

	        return Tip;
	    }(_event2.default);

	    Tip.showHint = function (type, msg) {
	        var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "top";
	        var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
	        var callback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};


	        //先把之前的tip给干掉
	        if (_dom2.default.has(".dui-tip-hint").length > 0) {
	            _dom2.default.remove(_dom2.default.find(".dui-tip-hint"));
	        }

	        var initialTop, finalTop;

	        var option = {
	            tipClass: _tip_config2.default.tipClassMap[type],
	            marginTop: _tip_config2.default.hint.marginTop,
	            minWidth: _tip_config2.default.hint.minWidth,
	            maxWidth: _tip_config2.default.hint.maxWidth,
	            iconClass: _tip_config2.default.hint.iconClass[type],
	            msg: msg
	        };

	        finalTop = _tip_config2.default.hint.pos[pos];

	        if (String(finalTop).slice(-1) == "%") {
	            finalTop = Math.floor(_tip_config2.default.hint.pos.rel.offsetHeight * (finalTop.slice(0, -1) / 100));
	        }

	        initialTop = finalTop - _tip_config2.default.hint.pos.dis;
	        option.top = initialTop;

	        var tipContent = _util2.default.renderTemp(tipHint.join(""), option);

	        return new Tip({
	            tipContent: tipContent,
	            init: function init() {
	                var _this = this;

	                _dom2.default.show(this.tipDom);

	                setTimeout(function () {

	                    Dui.Animate.startMove(_this.tipDom, { top: finalTop }, function () {

	                        setTimeout(function () {

	                            Dui.Animate.startMove(_this.tipDom, { top: initialTop }, function () {
	                                callback && callback.apply(_this);
	                                _dom2.default.hide(_this.tipDom);
	                                _this.destroy();
	                            });
	                        }, time * 1000);
	                    });
	                }, 10);
	            }
	        });
	    };

	    Tip.successInfo = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("success", msg, "top", time, callback);
	    };

	    Tip.middleSuccessInfo = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("success", msg, "middle", time, callback);
	    };

	    Tip.warning = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("warn", msg, "top", time, callback);
	    };

	    Tip.middleWarning = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("warn", msg, "middle", time, callback);
	    };

	    Tip.otherInfo = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("other", msg, "top", time, callback);
	    };

	    Tip.middleOtherInfo = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("other", msg, "middle", time, callback);
	    };

	    Tip.info = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("info", msg, "top", time, callback);
	    };

	    Tip.middleInfo = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("info", msg, "middle", time, callback);
	    };

	    Tip.error = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("error", msg, "top", time, callback);
	    };

	    Tip.middleError = function (msg) {
	        var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	        Tip.showHint("error", msg, "middle", time, callback);
	    };

	    //显示更新的消息
	    Tip.showUpdateMessage = function (msg) {

	        function bindEvent(dom) {
	            var elem = _dom2.default.find(dom, "button");
	            elem.onclick = function () {
	                Dui.Animate.startMove(dom, { opacity: 0 }, 400, function () {
	                    elem.onclick = null; //事件解绑
	                    _dom2.default.remove(dom);
	                    var updateMessageDom = _dom2.default.find(".dui-update-message");
	                    if (_dom2.default.has(updateMessageDom, ".dui-tip-text").length == 0) {
	                        _dom2.default.remove(updateMessageDom);
	                    }
	                });
	            };
	        }

	        var option = {
	            msg: msg
	        };

	        var tipContent = _util2.default.renderTemp(tipText.join(""), option);

	        if (_dom2.default.has(".dui-update-message").length == 0) {

	            tipContent = '<div style="top: ' + _tip_config2.default.updateMessage.top + '" class="dui-update-message">' + tipContent + '</div>';

	            new Tip({
	                tipContent: tipContent,
	                init: function init() {
	                    var tipText = _dom2.default.find(this.tipDom, ".dui-tip-text");
	                    Dui.Animate.startMove(tipText, { opacity: 100 }, 400, function () {
	                        bindEvent(tipText);
	                    });
	                }
	            });
	        } else {
	            (function () {

	                var updateMessageDom = _dom2.default.find(".dui-update-message");
	                var tipText = _dom2.default.prependHTML(updateMessageDom, tipContent);
	                Dui.Animate.startMove(tipText, { opacity: 100 }, 400, function () {
	                    bindEvent(tipText);
	                });
	            })();
	        }
	    };
	    /**
	     * 创建有箭头的tip对象
	     * @param option
	     * @param option.msg
	     * @param option.pos
	     * @param option.alignElem
	     * @param option.type
	     * @private
	     */
	    Tip._showBasicArrow = function (option) {

	        if (!option.pos) {
	            console.error("必须传pos字段，来表明箭头的位置");
	            return;
	        }

	        if (!option.alignElem) {
	            console.error("必须传alignElem，来决定Tip的显示位置");
	            return;
	        }

	        option.tipClass = _tip_config2.default.tipArrowClassMap[option.pos];

	        option.type = option.type || "default";

	        option.tipType = option.type == "error" ? "dui-tip-error-arrow" : "dui-tip-arrow";

	        var tipContent = _util2.default.renderTemp(tipArrow.join(""), option);

	        return new Tip({
	            tipContent: tipContent,
	            init: function init() {
	                var tipRect = _dom2.default.getRect(this.tipDom),
	                    alignRect = _dom2.default.getRect(option.alignElem),
	                    alignPoint = _dom2.default.getPoint(option.alignElem);

	                var styleText = "position: absolute";

	                switch (option.pos) {
	                    case "l":
	                        styleText += "; top: " + alignPoint.top + "px";
	                        styleText += "; left: " + (alignPoint.left - tipRect.width - _tip_config2.default.arrowSize - option.spacing) + "px";
	                        break;
	                    case "r":
	                        styleText += "; top: " + alignPoint.top + "px";
	                        styleText += "; left: " + (alignPoint.left + alignRect.width + _tip_config2.default.arrowSize + option.spacing) + "px";
	                        break;
	                    case "t":
	                        styleText += "; top: " + (alignPoint.top - tipRect.height - _tip_config2.default.arrowSize - option.spacing) + "px";
	                        styleText += "; left: " + (alignPoint.left + alignRect.width / 2 - tipRect.width / 2) + "px";
	                        break;
	                    case "b":
	                        styleText += "; top: " + (alignPoint.top + alignRect.height + _tip_config2.default.arrowSize + option.spacing) + "px";
	                        styleText += "; left: " + (alignRect.left + alignRect.width / 2 - tipRect.width / 2) + "px";
	                        break;
	                    case "bl":
	                        styleText += "; top: " + (alignPoint.top + alignRect.height + _tip_config2.default.arrowSize + option.spacing) + "px";
	                        styleText += "; left: " + alignPoint.left + "px";
	                        break;
	                    case "br":
	                        styleText += "; top: " + (alignPoint.top + alignRect.height + _tip_config2.default.arrowSize + option.spacing) + "px";
	                        styleText += "; left: " + (alignPoint.left + alignRect.width - tipRect.width) + "px";
	                        break;
	                }

	                styleText += "; display: none; opacity: 1";

	                this.tipDom.style.cssText = styleText;
	            }
	        });
	    };

	    /**
	     * 简单的tip提示，即鼠标移入时，根据传入的位置显示信息
	     * @param option
	     * @param option.el
	     * @param option.msg
	     * @param option.pos
	     * @param option.spacing
	     * @returns {*}
	     */
	    Tip.tooltip = function (option) {

	        if (!option.el) {
	            console.error("必须传入el");
	            return;
	        }

	        if (!option.msg) {
	            console.error("必须传msg");
	            return;
	        }

	        var currentTip = void 0,
	            el = typeof option.el == "string" ? _dom2.default.find(option.el) : option.el;

	        currentTip = Dui.Tip._showBasicArrow({
	            msg: option.msg,
	            pos: option.pos,
	            alignElem: el,
	            spacing: option.spacing || 5
	        }).$on("destroy", function () {
	            el.removeEventListener("mouseover", showTip);
	            el.removeEventListener("mouseout", hideTip);
	        });

	        el.addEventListener("mouseover", showTip);
	        el.addEventListener("mouseout", hideTip);

	        function showTip() {
	            currentTip && currentTip.show();
	        }

	        function hideTip() {
	            currentTip && currentTip.hide();
	        }

	        return currentTip;
	    };

	    /**
	     * 复杂的tip提示，如提示内容有一些操作
	     * @param option
	     * @param option.el
	     * @param option.pos
	     * @param option.msg
	     * @param option.spacing
	     * @param option.trigger
	     * @returns {*}
	     */
	    Tip.poptip = function (option) {
	        if (!option.el) {
	            console.error("必须传入el");
	            return;
	        }

	        if (!option.msg) {
	            console.error("必须传msg");
	            return;
	        }

	        var _this = this;

	        var currentTip = void 0,
	            el = typeof option.el == "string" ? _dom2.default.find(option.el) : option.el,
	            trigger = option.trigger ? option.trigger : "hover";

	        currentTip = Dui.Tip._showBasicArrow({
	            msg: option.msg,
	            pos: option.pos,
	            alignElem: el,
	            spacing: option.spacing || 5
	        }).$on("destroy", function () {
	            switch (trigger) {
	                case "hover":
	                    el.removeEventListener("mouseover", showTip);
	                    el.removeEventListener("mouseout", hideTip);
	                    this.tipDom.removeEventListener("mouseenter", enterTip);
	                    this.tipDom.removeEventListener("mouseleave", leaveTip);
	                    break;
	                case "click":
	                    el.removeEventListener("click", showTip);
	                    break;
	            }
	        });

	        switch (trigger) {
	            case "hover":
	                el.addEventListener("mouseover", showTip);
	                el.addEventListener("mouseout", hideTip);
	                //关于低版本webkit不支持mouseenter和mouseleave的做法：https://www.web-tinker.com/article/20073.html
	                currentTip.tipDom.addEventListener("mouseenter", enterTip);
	                currentTip.tipDom.addEventListener("mouseleave", leaveTip);
	                break;
	            case "click":
	                el.addEventListener("click", showTip);
	                break;
	        }

	        function showTip() {
	            currentTip && currentTip.show();
	        }

	        function hideTip() {
	            _this.timer = setTimeout(function () {
	                currentTip && currentTip.hide();
	            }, 300);
	        }

	        function enterTip() {
	            clearTimeout(_this.timer);
	        }

	        function leaveTip() {
	            currentTip && currentTip.hide();
	        }

	        return currentTip;
	    };

	    Tip.showFormError = function (option) {

	        if (!option.el) {
	            console.error("必须传入el");
	            return;
	        }

	        if (!option.msg) {
	            console.error("必须传msg");
	            return;
	        }

	        var currentTip = void 0,
	            el = typeof option.el == "string" ? _dom2.default.find(option.el) : option.el;

	        currentTip = Dui.Tip._showBasicArrow({
	            type: "error",
	            msg: option.msg,
	            pos: option.pos,
	            alignElem: el,
	            spacing: option.spacing || 0
	        });

	        return currentTip;
	    };

	    return Tip;
	}();

/***/ },
/* 91 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 92 */,
/* 93 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    hint: {
	        marginTop: 8,
	        minWidth: 250,
	        maxWidth: 362,
	        iconClass: {
	            warn: "iconfont icon-tanhao",
	            info: "iconfont icon-jingshi",
	            error: "iconfont icon-cuowu-20160921",
	            success: "iconfont icon-zhengque1",
	            other: "iconfont icon-tanhao"
	        },
	        pos: {
	            rel: document.documentElement,
	            top: "0",
	            middle: "35%",
	            dis: 50
	        }
	    },
	    tipClassMap: {
	        success: "dui-tip-success",
	        info: "dui-tip-info",
	        warn: "dui-tip-warning",
	        error: "dui-tip-error",
	        other: "dui-tip"
	    },
	    updateMessage: {
	        top: "2%"
	    },
	    arrowSize: 5,
	    tipArrowClassMap: {
	        l: "dui-tip-right-arrow",
	        r: "dui-tip-left-arrow",
	        t: "dui-tip-bottom-arrow",
	        b: "dui-tip-top-arrow",
	        bl: "dui-tip-top-left-arrow",
	        br: "dui-tip-top-right-arrow"
	    }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(95);

	var _util = __webpack_require__(8);

	var _util2 = _interopRequireDefault(_util);

	var _event = __webpack_require__(86);

	var _event2 = _interopRequireDefault(_event);

	var _dom = __webpack_require__(85);

	var _dom2 = _interopRequireDefault(_dom);

	var _select_confg = __webpack_require__(97);

	var _select_confg2 = _interopRequireDefault(_select_confg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //引入css


	exports.default = function () {

	    var selectTemplate = ['<div class="dui-select <%= className %>">', '<div tabindex="1" class="dropdown_hd" title="<%= text %>">', '<i class="<%= arrowIconClass %>"></i>', '<span><%= text %></span>', '</div>', '<div class="dropdown_bd">', '<div class="dropdown_menu">', '<ul>', '<% for(var i = 0, len = selectOptions.length; i < len; i ++) { %>', '<li class="item <% if(value == selectOptions[i].value){ %>current<% } %>" data-value="<%= selectOptions[i].value %>" data-text="<%= selectOptions[i].text %>"><%= selectOptions[i].text %></li>', '<% } %>', '</ul>', '</div>', '</div>', '<div>'];

	    var selectLiTemplate = ['<% for(var i = 0, len = selectOptions.length; i < len; i ++) { %>', '<li class="item <% if(value == selectOptions[i].value){ %>current<% } %>" data-value="<%= selectOptions[i].value %>" data-text="<%= selectOptions[i].text %>"><%= selectOptions[i].text %></li>', '<% } %>'];

	    var Selectpicker = function (_Event) {
	        _inherits(Selectpicker, _Event);

	        function Selectpicker(option) {
	            _classCallCheck(this, Selectpicker);

	            var _this2 = _possibleConstructorReturn(this, (Selectpicker.__proto__ || Object.getPrototypeOf(Selectpicker)).call(this));

	            var defaultOption = {
	                className: "",
	                arrowIconClass: _select_confg2.default.arrowIconClass
	            };

	            _this2.option = _util2.default.extend({}, defaultOption, option);

	            _this2.init();

	            return _this2;
	        }

	        _createClass(Selectpicker, [{
	            key: "init",
	            value: function init() {

	                this.data = {
	                    currentIndex: 0,
	                    options: [],
	                    dropDown_hd: null,
	                    dropDown_bd: null,
	                    oUl: null,
	                    otitle: null
	                };

	                this.events = {};

	                this.handleOption();

	                this.render();
	            }
	        }, {
	            key: "handleOption",
	            value: function handleOption() {
	                this.el = typeof this.option.el == "string" ? _dom2.default.find(this.option.el) : this.option.el;
	                var options = Array.from(_dom2.default.findAll(this.el, "option"));
	                this.data.options = options;
	                this._handleOptionTitle(options);
	                this._handleOptionSelectOptions(options);
	            }
	        }, {
	            key: "_handleOptionTitle",
	            value: function _handleOptionTitle(options) {
	                var selectItem = this._getSelectItem(options);
	                this.option.text = selectItem.text;
	                this.option.value = selectItem.value;
	            }
	        }, {
	            key: "_handleOptionSelectOptions",
	            value: function _handleOptionSelectOptions(options) {
	                var selectOptions = this._getSelectOption(options);
	                this.option.selectOptions = selectOptions;
	            }
	        }, {
	            key: "_getSelectItem",
	            value: function _getSelectItem(options) {
	                var _this = this;
	                options.forEach(function (option) {
	                    if (option.selected) {
	                        _this.value = option.value;
	                        _this.text = option.text;
	                    }
	                });
	                return {
	                    value: _this.value,
	                    text: _this.text
	                };
	            }
	        }, {
	            key: "_getSelectOption",
	            value: function _getSelectOption(options) {
	                var result = [];
	                options.forEach(function (option) {
	                    result.push({
	                        value: option.value,
	                        text: option.text
	                    });
	                });
	                return result;
	            }
	        }, {
	            key: "render",
	            value: function render() {

	                var selectContent = _util2.default.renderTemp(selectTemplate.join(""), this.option);

	                this.selectDom = _dom2.default.beforeHTML(this.el, selectContent);

	                _dom2.default.hide(this.el);

	                this.bind();
	            }
	        }, {
	            key: "_titleClick",
	            value: function _titleClick() {

	                var dropDown_bd = this.data.dropDown_bd;

	                if (_dom2.default.isHide(dropDown_bd)) {
	                    _dom2.default.show(dropDown_bd);
	                } else {
	                    _dom2.default.hide(dropDown_bd);
	                }

	                this.data.currentIndex = 0;

	                var liList = [].concat(_toConsumableArray(_dom2.default.findAll(dropDown_bd, ".item")));

	                liList.forEach(function (item) {
	                    _dom2.default.removeClass(item, "selected");
	                });
	            }
	        }, {
	            key: "_menuClick",
	            value: function _menuClick(ev) {

	                var oli = ev.target;

	                while (oli && oli.tagName.toUpperCase() != "LI") {
	                    oli = oli.parentNode;
	                }

	                this._changeTitle(oli);
	            }
	        }, {
	            key: "_menuKeyDown",
	            value: function _menuKeyDown(ev) {

	                var dropDown_bd = this.data.dropDown_bd,
	                    oUl = this.data.oUl,
	                    otitle = this.data.otitle;

	                if (_dom2.default.isHide(dropDown_bd)) {
	                    return;
	                }

	                var liList = [].concat(_toConsumableArray(_dom2.default.findAll(oUl, "li"))),
	                    len = liList.length;

	                liList.forEach(function (item) {
	                    _dom2.default.removeClass(item, "selected");
	                });

	                switch (ev.keyCode) {
	                    //向下
	                    case 40:

	                        if (this.data.currentIndex == len) {
	                            this.data.currentIndex = 0;
	                        }

	                        var index = this.data.currentIndex++;
	                        _dom2.default.addClass(liList[index], "selected");
	                        break;
	                    //向上
	                    case 38:
	                        if (this.data.currentIndex == 1) {
	                            this.data.currentIndex = len + 1;
	                        }

	                        var index = --this.data.currentIndex;

	                        _dom2.default.addClass(liList[index - 1], "selected");
	                        break;
	                    //回车
	                    case 13:
	                        this._changeTitle(liList[this.data.currentIndex - 1], dropDown_bd, oUl, otitle);
	                        break;

	                }
	            }
	        }, {
	            key: "_changeTitle",
	            value: function _changeTitle(oli) {

	                var dropDown_bd = this.data.dropDown_bd,
	                    oUl = this.data.oUl,
	                    otitle = this.data.otitle;

	                this.value = _dom2.default.getDataAttr(oli, 'value');

	                this.text = _dom2.default.getDataAttr(oli, "text");

	                this.el.value = this.value;

	                _dom2.default.html(otitle, this.text);

	                var liList = [].concat(_toConsumableArray(_dom2.default.findAll(oUl, "li")));

	                liList.forEach(function (item) {
	                    _dom2.default.removeClass(item, "current");
	                });

	                _dom2.default.addClass(oli, "current");

	                _dom2.default.hide(dropDown_bd);
	            }
	        }, {
	            key: "bind",
	            value: function bind() {

	                var _this = this;

	                var dropDown_hd = this.data.dropDown_hd = _dom2.default.find(this.selectDom, ".dropdown_hd");
	                var oUl = this.data.oUl = _dom2.default.find(this.selectDom, ".dropdown_menu ul");
	                var dropDown_bd = this.data.dropDown_bd = _dom2.default.find(this.selectDom, ".dropdown_bd");

	                this.data.otitle = _dom2.default.find(this.selectDom, ".dropdown_hd span");

	                dropDown_hd.addEventListener("click", this.events.proxyTitleClick = function (event) {
	                    _this._titleClick();
	                    event.stopPropagation();
	                }.bind(this));

	                dropDown_hd.addEventListener("keydown", this.events.proxyMenuKeyDown = function (event) {
	                    _this._menuKeyDown(event);
	                }.bind(this));

	                oUl.addEventListener("click", this.events.proxyMenuClick = function (event) {
	                    _this._menuClick(event);
	                }.bind(this));

	                document.addEventListener("click", this.events.proxyHideMenu = function () {
	                    _dom2.default.hide(dropDown_bd);
	                });
	            }
	        }, {
	            key: "unbind",
	            value: function unbind() {

	                this.data.dropDown_hd.removeEventListener("click", this.events.proxyTitleClick);
	                this.data.dropDown_hd.removeEventListener("keydown", this.events.proxyMenuKeyDown);
	                this.data.oUl.removeEventListener("click", this.events.proxyMenuClick);
	                document.removeEventListener("click", this.events.proxyHideMenu);
	            }
	        }, {
	            key: "update",
	            value: function update() {

	                this.data.options = [].concat(_toConsumableArray(_dom2.default.findAll(this.el, "option")));

	                var selectOptions = this._getSelectOption(this.data.options);

	                var value = this._getSelectItem(this.data.options).value;

	                var option = { selectOptions: selectOptions, value: value };

	                var content = _util2.default.renderTemp(selectLiTemplate.join(""), option);

	                _dom2.default.html(_dom2.default.find(this.selectDom, ".dropdown_bd ul"), content);
	            }
	        }, {
	            key: "disable",
	            value: function disable() {}
	        }, {
	            key: "destroy",
	            value: function destroy() {}
	        }]);

	        return Selectpicker;
	    }(_event2.default);

	    return Selectpicker;
	}();

/***/ },
/* 95 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 96 */,
/* 97 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    arrowIconClass: "iconfont icon-appxiugaiicon20"
	};

/***/ }
/******/ ])
});
;