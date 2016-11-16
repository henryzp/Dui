import Template from "lodash/template";

import Extend from "lodash/extend";

import Event from "./event";

import DOM from "./dom";

import Config from "../config/select_confg";

export default (function(){

    const selectTemplate = [
        '<div class="dui-select <%= className %>">',
            '<div class="dropdown_hd" title="<%= title %>">',
                '<i class="<%= arrowIconClass %>"></i>',
                '<span><%= title %></span>',
            '</div>',
            '<div class="dropdown_bd">',
                '<div class="dropdown_menu">',
                    '<ul>',
                        '<% for(var i = 0, len = selectOptions.length; i < len; i ++) { %>',
                            '<li class="item <% if(currentValue == selectOptions[i].value){ %>current<% } %>" data-value="<%= selectOptions[i].value %>" data-text="<%= selectOptions[i].text %>"><%= selectOptions[i].text %></li>',
                        '<% } %>',
                    '</ul>',
                '</div>',
            '</div>',
        '<div>'
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

            this.el = typeof this.option.el == "string" ? DOM.find(this.option.el) : this.option.el;

            this.render();

        }

        getSelectItem(options) {
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

        getSelectOption(options) {
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

            let options = Array.from(DOM.findAll(this.el, "option"));

            let selectItem = this.getSelectItem(options);

            let selectOptions = this.getSelectOption(options);

            this.option.title = selectItem.text;

            this.option.currentValue = selectItem.value;

            this.option.selectOptions = selectOptions;

            let compiled = Template(selectTemplate.join(""));

            let selectContent = compiled(this.option);

            this.selectDom = DOM.beforeHTML(this.el, selectContent);

            DOM.hide(this.el);

            this.bind();

        }

        bind() {

            let _this = this;

            let dropDown_hd = DOM.find(this.selectDom, ".dropdown_hd"),
                dropdown_bd = DOM.find(this.selectDom, ".dropdown_bd"),
                oUl = DOM.find(this.selectDom, ".dropdown_menu ul"),
                otitle = DOM.find(this.selectDom, ".dropdown_hd span");

            let _titleClick = function() {
                if(DOM.isHide(dropdown_bd)){
                    DOM.show(dropdown_bd);
                }
            }

            let _menuClick = function(ev) {
                var oli = ev.target;
                //实现事件委托
                while(oli && oli.tagName.toUpperCase() != "LI"){
                    oli = oli.parentNode;
                }

                _this.value = DOM.getDataAttr(oli, 'value');

                _this.text = DOM.getDataAttr(oli, "text");

                _this.el.value =  _this.value;

                DOM.html(otitle, _this.text);

                let liList = Array.from(DOM.findAll(oUl, "li"));

                liList.forEach(function(item) {
                   DOM.removeClass(item, "current");
                });

                DOM.addClass(oli, "current");

                DOM.hide(dropdown_bd);

            }

            dropDown_hd.addEventListener("click", _titleClick);

            oUl.addEventListener("click", _menuClick);

        }

        update() {

        }

        disable() {

        }

        destroy() {

        }

    }

    return Selectpicker;

})();