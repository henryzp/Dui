//引入css
import "../../css/component/_select.scss";

import Template from "lodash/template";
import Extend from "lodash/extend";
import Event from "./event";
import DOM from "./dom";
import Config from "../config/select_confg";

export default (function(){

    const selectTemplate = [
        '<div class="dui-select <%= className %>">',
            '<div tabindex="1" class="dropdown_hd" title="<%= text %>">',
                '<i class="<%= arrowIconClass %>"></i>',
                '<span><%= text %></span>',
            '</div>',
            '<div class="dropdown_bd">',
                '<div class="dropdown_menu">',
                    '<ul>',
                        '<% for(var i = 0, len = selectOptions.length; i < len; i ++) { %>',
                            '<li class="item <% if(value == selectOptions[i].value){ %>current<% } %>" data-value="<%= selectOptions[i].value %>" data-text="<%= selectOptions[i].text %>"><%= selectOptions[i].text %></li>',
                        '<% } %>',
                    '</ul>',
                '</div>',
            '</div>',
        '<div>'
    ];

    const selectLiTemplate = [
        '<% for(var i = 0, len = selectOptions.length; i < len; i ++) { %>',
            '<li class="item <% if(value == selectOptions[i].value){ %>current<% } %>" data-value="<%= selectOptions[i].value %>" data-text="<%= selectOptions[i].text %>"><%= selectOptions[i].text %></li>',
        '<% } %>',
    ];

    class Selectpicker extends Event {

        constructor(option) {

            super();

            let defaultOption = {
                className: "",
                arrowIconClass: Config.arrowIconClass
            }

            this.option = Extend({}, defaultOption, option);

            this.init();

        }

        init() {

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

        handleOption() {
            this.el = typeof this.option.el == "string" ? DOM.find(this.option.el) : this.option.el;
            let options = Array.from(DOM.findAll(this.el, "option"));
            this.data.options = options;
            this._handleOptionTitle(options);
            this._handleOptionSelectOptions(options);
        }

        _handleOptionTitle(options) {
            let selectItem = this._getSelectItem(options);
            this.option.text = selectItem.text;
            this.option.value = selectItem.value;
        }

        _handleOptionSelectOptions(options) {
            let selectOptions = this._getSelectOption(options);
            this.option.selectOptions = selectOptions;
        }

        _getSelectItem(options) {
            let _this = this;
            options.forEach(function(option) {
                if(option.selected) {
                    _this.value = option.value;
                    _this.text = option.text;
                }
            })
            return {
                value: _this.value,
                text: _this.text
            };
        }

        _getSelectOption(options) {
            let result = [];
            options.forEach(function(option) {
                result.push({
                    value: option.value,
                    text: option.text
                })
            });
            return result;
        }

        render() {

            let compiled = Template(selectTemplate.join(""));

            let selectContent = compiled(this.option);

            this.selectDom = DOM.beforeHTML(this.el, selectContent);

            DOM.hide(this.el);

            this.bind();

        }

        _titleClick() {

            let dropDown_bd = this.data.dropDown_bd;

            if(DOM.isHide(dropDown_bd)){
                DOM.show(dropDown_bd);
            }else {
                DOM.hide(dropDown_bd);
            }

            this.data.currentIndex = 0;

            let liList = [...DOM.findAll(dropDown_bd, ".item")];

            liList.forEach(function(item) {
                DOM.removeClass(item, "selected");
            })

        }

        _menuClick(ev) {

            let oli = ev.target;

            while(oli && oli.tagName.toUpperCase() != "LI"){
                oli = oli.parentNode;
            }

            this._changeTitle(oli);

        }

        _menuKeyDown(ev) {

            let dropDown_bd = this.data.dropDown_bd,
                oUl = this.data.oUl,
                otitle = this.data.otitle;

            if(DOM.isHide(dropDown_bd)){
                return;
            }

            let liList = [...DOM.findAll(oUl, "li")],
                len  = liList.length;

            liList.forEach(function(item){
                DOM.removeClass(item, "selected");
            })

            switch (ev.keyCode) {
                //向下
                case 40:

                    if(this.data.currentIndex == len) {
                        this.data.currentIndex = 0;
                    }

                    var index = this.data.currentIndex++;
                    DOM.addClass(liList[index], "selected");
                    break;
                //向上
                case 38:
                    if(this.data.currentIndex == 1) {
                        this.data.currentIndex = len + 1;
                    }

                    var index = -- this.data.currentIndex;

                    DOM.addClass(liList[index - 1], "selected");
                    break;
                //回车
                case 13:
                    this._changeTitle(liList[this.data.currentIndex - 1], dropDown_bd, oUl, otitle);
                    break;

            }
        }

        _changeTitle(oli) {

            let dropDown_bd = this.data.dropDown_bd,
                oUl = this.data.oUl,
                otitle = this.data.otitle;

            this.value = DOM.getDataAttr(oli, 'value');

            this.text = DOM.getDataAttr(oli, "text");

            this.el.value =  this.value;

            DOM.html(otitle, this.text);

            let liList = [...DOM.findAll(oUl, "li")];

            liList.forEach(function(item) {
                DOM.removeClass(item, "current");
            });

            DOM.addClass(oli, "current");

            DOM.hide(dropDown_bd);
        }

        bind() {

            let _this = this;

            var dropDown_hd = this.data.dropDown_hd = DOM.find(this.selectDom, ".dropdown_hd");
            var oUl = this.data.oUl = DOM.find(this.selectDom, ".dropdown_menu ul");
            var dropDown_bd = this.data.dropDown_bd = DOM.find(this.selectDom, ".dropdown_bd");

            this.data.otitle = DOM.find(this.selectDom, ".dropdown_hd span");

            dropDown_hd.addEventListener("click", this.events.proxyTitleClick = function(event){
                _this._titleClick();
                event.stopPropagation();
            }.bind(this));

            dropDown_hd.addEventListener("keydown", this.events.proxyMenuKeyDown = function(event) {
                _this._menuKeyDown(event);
            }.bind(this));

            oUl.addEventListener("click", this.events.proxyMenuClick = function(event){
                _this._menuClick(event);
            }.bind(this));

            document.addEventListener("click", this.events.proxyHideMenu = function() {
                DOM.hide(dropDown_bd);
            })

        }

        unbind() {

            this.data.dropDown_hd.removeEventListener("click", this.events.proxyTitleClick);
            this.data.dropDown_hd.removeEventListener("keydown", this.events.proxyMenuKeyDown);
            this.data.oUl.removeEventListener("click", this.events.proxyMenuClick);
            document.removeEventListener("click", this.events.proxyHideMenu);

        }

        update() {

            this.data.options = [...DOM.findAll(this.el, "option")];

            let selectOptions = this._getSelectOption(this.data.options);

            let value = this._getSelectItem(this.data.options).value;

            let option = {selectOptions, value};

            let compiled = Template(selectLiTemplate.join(""));

            let content = compiled(option);

            DOM.html(DOM.find(this.selectDom, ".dropdown_bd ul"), content);

        }

        disable() {

        }

        destroy() {

        }

    }

    return Selectpicker;

})();