import _ from "lodash";

import Config from "../config/modal_config";

import DOM from "./dom.es6";

export default (function(){

    //TODO 未来希望是通过webpack loader 来引入html模板
    const modalTemplate = [
        '<div class="dui-dialog <%= className %>" style="width: <%= width %>px; height: <%= height %>px">',
            '<% if(close) { %>',
                '<a class="dui-dialog-close J_dialog-close" href="javascript:;">关闭</a>',
            '<% } %>',
            '<% if(title != "" && type == "default") { %>',
                '<div class="dui-dialog-hd">',
                    '<h3 class="dui-dialog-title"><%= title %></h3>',
                '</div>',
            '<% } %>',
            '<% if(type == "custom") { %>',
                '<div class="dui-dialog-custom-bd"><%= content %></div>',
            '<% } %>',
            '<% if(type == "default") { %>',
                '<div style="height: <%= contentHeight %>px;" class="dui-dialog-bd">',
                    '<%= content %>',
                '</div>',
                '<% if(ok || cancel) { %>',
                '<div class="dui-dialog-ft <%= btnPosClass %>">',
                    '<div class="dui-btn-list-g10">',
                        '<% if(ok) { %>',
                        '<a class="dui-btn-info J_dialog-ok" href="javascript:;"><%= okValue %></a>',
                        '<% } %>',
                        '<% if(cancel) { %>',
                        '<a class="dui-btn J_dialog-cancel" href="javascript:;"><%= cancelValue %></a>',
                        '<% } %>',
                    '</div>',
                '</div>',
                '<% }  %>',
            '<% }  %>',
        '</div>'
    ]

    class Modal {

        constructor(option) {

            let defaultOption = {
                type: "default",
                title: "提示",
                content: "内容",
                okValue: "确定",
                cancelValue: "取消",
                className: "",
                close: true,
                ok: false,
                cancel: false,
                btnPos: "right"
            }

            this.option = option;

            this.option = _.extend({}, defaultOption, this.option);

            this.init();

        }

        init() {

            this.handleOption();

            this.show();

            this.bindEvent();

            this.option.init && this.option.init.apply(this);

        }

        //处理参数
        handleOption() {

            this.handleOptionWidth();

            this.handleOptionHeight();

            this.handleOptionButton();

            //初始化content的高度，它会取决于有没有下面的按钮
            this.handleOptionContentHeight();

        }

        //处理弹窗宽度
        handleOptionWidth() {

            let width = this.option.width;

            if(!width) {
                width = Config.minWidth;
            }else {
                width = parseInt(width);
            }

            if(Config.minWidth - width >= 0) {
                width = Config.minWidth;
            }

            if(Config.maxWidth - width < 0) {
                width = Config.maxWidth;
            }

            this.option.width = width;

        }

        //处理弹窗高度
        handleOptionHeight() {

            let height = this.option.height;

            if(!height) {
                height = Config.minHeight;
            }else {
                height = parseInt(height);
            }

            if(Config.minHeight - height >= 0) {
                height = Config.minHeight;
            }

            if(Config.maxHeight - height < 0) {
                height = Config.maxHeight;
            }

            this.option.height = height;

        }

        //处理内容高度
        handleOptionContentHeight() {

            let height = this.option.height,
                hdHeight = Config.hdHeight,
                ftHeight = Config.ftHeight,
                padding = Config.padding;

            let spacing;

            if(!this.option.ok && !this.option.cancel) {
                spacing = 2 * padding;
                ftHeight = 0;
            }else{
                spacing = 3 * padding;
            }

            if(this.option.title == "") {
                hdHeight = 0;
            }

            let contentHeight = height - hdHeight - ftHeight - spacing;

            this.option.contentHeight = contentHeight;

        }

        //处理底部按钮
        handleOptionButton() {

            var ok = this.option.ok,
                cancel = this.option.cancel;

            if(ok == null) {
                this.option.ok = false;
            }else{
                var isBool = typeof ok === "boolean";
                this.option.ok = !!ok ? true : false;
                this.option.okValue = isBool ? this.option.okValue : ok;
            }

            if(cancel == null) {
                this.option.ok = false;
            }else {
                var isBool = typeof ok === "boolean";
                this.option.cancel = !!cancel ? true : false;
                this.option.cancelValue = isBool ? this.option.cancelValue : cancel;
            }

            if(this.option.okFn) {
                this.option.ok = true;
            }

            if(this.option.cancelFn) {
                this.option.cancel = true;
            }

            this.option.btnPosClass = "dui-dialog-ft-" + this.option.btnPos;

        }

        //显示弹窗
        show() {

            let len = DOM.has(".dui-dialog-wrap").length;

            if(len == 0) {

                let wrap = '<div class="dui-dialog-wrap"></div>';

                DOM.appendHTML(document.body, wrap);

            }

            let compiled = _.template(modalTemplate.join(""));

            let result = compiled(this.option);

            console.log(result);

            this.dialogDom = DOM.appendHTML(DOM.find(".dui-dialog-wrap"), result);

        }

        //隐藏弹窗（remove掉）
        hide() {

            var len = DOM.has(".dui-dialog").length;

            DOM.remove(this.dialogDom);

            if(len == 1){
                DOM.remove(DOM.find(".dui-dialog-wrap"));
            }

        }

        //绑定按钮事件
        bindEvent() {

            let _this = this;

            let okBtn = DOM.find(this.dialogDom, ".J_dialog-ok");

            let cancelBtn = DOM.find(this.dialogDom, ".J_dialog-cancel");

            let closeBtn = DOM.find(this.dialogDom, ".J_dialog-close");

            okBtn && okBtn.addEventListener("click", function() {

                 //TODO 判断是否是函数
                 _this.option.okFn && _this.option.okFn.apply(_this);

            }, false);

            cancelBtn && cancelBtn.addEventListener("click", function() {

                //TODO 判断是否是函数
                _this.option.cancelFn && _this.option.cancelFn.apply(_this);

                _this.hide();

            }, false);

            closeBtn && closeBtn.addEventListener("click", function() {

                _this.hide();

            }, false);

        }

    }

    Modal.alert = function(text){

       return new Modal({
            content: text,
            okFn: function() {
                this.hide();
            }
       })

    }

    Modal.confirm = function(text) {

        return new Promise(function(resolve) {

            new Modal({
                content: text,
                okFn: function() {
                    resolve();
                    this.hide();
                },
                cancel: true
            })

        })

    }

    return Modal;

})();