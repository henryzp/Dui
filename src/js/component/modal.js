//引入css
import "../../css/component/_btn.scss";
import "../../css/component/_dialog.scss";


import Util from "./util";
import Config from "../config/modal_config";
import DOM from "./dom";
import Event from "./event";
import Drag from "./drag";

import ScrollHanlder from "./scrollHanlder";

export default (function(){

    //TODO 未来希望是通过webpack loader 来引入html模板
    const modalTemplate = [
        '<%if(height != "auto"){  %>',
        '<div class="dui-dialog <%= className %>" style="width: <%= width %>px; height: <%= height %>px; z-index: <%= zIndex %>">',
        '<% }else { %>',
        '<div class="dui-dialog <%= className %>" style="width: <%= width %>px; height: <%= height %>; z-index: <%= zIndex %>">',
        '<% } %>',
            '<% if(close) { %>',
                '<i class="dui-dialog-close J_dialog-close <%=closeClass %>" href="javascript:;"></i>',
            '<% } %>',
            '<% if(title != "" && type == "default") { %>',
                '<div class="dui-dialog-hd">',
                    '<% if(titleIconClass == "") { %>',
                    '<h3 class="dui-dialog-title"><%= title %></h3>',
                    '<% }else { %>',
                    '<h3 class="dui-dialog-title has-icon"><i class="<%= titleIconClass %>"></i><%= title %></h3>',
                    '<% } %>',
                '</div>',
            '<% } %>',
            '<% if(title == "" && type == "default") { %>',
                '<div style="height: 14px;"></div>',
            '<% } %>',
            '<% if(type == "custom") { %>',
                '<div class="dui-dialog-custom-bd"><%= content %></div>',
            '<% } %>',
            '<% if(type == "default") { %>',
                '<% if(contentHeight != "auto"){ %>',
                '<div style="height: <%= contentHeight %>px;" class="dui-dialog-bd">',
                '<% }else { %>',
                '<div style="height: <%= contentHeight %>; min-height: <%= contentMinHeight %>px; max-height: <%= contentMaxHeight %>px" class="dui-dialog-bd">',
                '<% } %>',
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

    class Modal extends Event {

        constructor(option) {

            super();

            let defaultOption = {
                type: "default",
                title: "提示",
                content: "内容",
                okValue: "确定",
                cancelValue: "取消",
                className: "",
                zIndex: 9999,
                titleIconClass: "",
                closeClass: Config.closeIconClass,
                mask: true,
                close: true,
                ok: false,
                cancel: false,
                btnPos: "right",
                draggable: false,
                appendEl: document.body,
            }

            this.option = option;

            this.option = Util.extend({}, defaultOption, this.option);

            this.init();

        }

        init() {

            this.handleOption();

            this.render();

            this.bindEvent();

            this.handleDrag();

            this.option.init && this.option.init.apply(this);

        }

        //处理参数
        handleOption() {

            this.handleOptionWidth();

            this.handleOptionHeight();

            this.handleOptionButton();

            //初始化content的高度，它会取决于有没有下面的按钮
            this.handleOptionContentHeight();

            this.handleOptionContent();

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

            //处理特殊的auto情况
            if(height == "auto") {
                return;
            }

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
                padding = Config.padding,
                minHeight = Config.minHeight,
                maxHeight = Config.maxHeight;

            let spacing;

            if(!this.option.ok && !this.option.cancel) {
                spacing = 2 * padding;
                ftHeight = 0;
            }else{
                spacing = 3 * padding;
            }

            if(this.option.title == "") {
                hdHeight = 14;
            }

            if(height == "auto") {

                this.option.contentHeight = "auto";

                let contentMinHeight = minHeight - hdHeight - ftHeight - spacing;

                let contentMaxHeight = maxHeight - hdHeight - ftHeight - spacing;

                this.option.contentMaxHeight = contentMaxHeight;

                this.option.contentMinHeight = contentMinHeight;

            }else {

                let contentHeight = height - hdHeight - ftHeight - spacing;

                this.option.contentHeight = contentHeight;

            }

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

        handleOptionContent() {
            let content = this.option.content;
            let firstCode = content.charAt(0);
            if (firstCode == "#") {
                let contentDom = DOM.findById(content.slice(1));
                if(contentDom != null) {
                    this.option.content = DOM.getHtml(contentDom);
                    if (contentDom.tagName.toLowerCase() != "script") {
                        DOM.remove(contentDom);
                    }
                }
            }
        }

        //显示弹窗
        render() {
            let len = DOM.has(".dui-dialog-wrap").length;

            if(len == 0 && this.option.mask) {
                let wrap = '<div class="dui-dialog-wrap" style="z-index: '+ this.option.zIndex +'"></div>';
                DOM.appendHTML(document.body, wrap);
                ScrollHanlder.disableScroll();
            }

            let result = Util.renderTemp(modalTemplate.join(""), this.option);

            if(this.option.mask){
                this.dialogDom = DOM.appendHTML(DOM.find(".dui-dialog-wrap"), result);
            }else {
                if(typeof this.option.appendEl == "string") {
                    this.option.appendEl = DOM.find(this.option.appendEl);
                }
                this.dialogDom = DOM.appendHTML(this.option.appendEl, result);
            }

        }

        //隐藏弹窗
        hide() {
            this.$emit("destroy");
            this.destroy();
        }

        //销毁弹窗
        destroy() {

            this.unBindEvent();

            var len;

            if(this.option.mask) {
               len = DOM.has(DOM.find(".dui-dialog-wrap"), ".dui-dialog").length;
            }else {
                len = DOM.has(".dui-dialog").length;
            }

            DOM.remove(this.dialogDom);

            if(len == 1 && this.option.mask){
                DOM.remove(DOM.find(".dui-dialog-wrap"));
                ScrollHanlder.enableScroll();
            }

            this.dialogDom = null;

        }

        //确定事件处理
        _okFn(ev) {

            this.$emit("ok");

            //TODO 判断是否是函数
            this.option.okFn && this.option.okFn.apply(this);

            ev.preventDefault();
            ev.stopPropagation();

        }

        //取消事件处理
        _cancelFn(ev) {

            this.$emit("cancel");

            //TODO 判断是否是函数
            this.option.cancelFn && this.option.cancelFn.apply(this);

            this.hide();

            ev.preventDefault();
            ev.stopPropagation();

        }

        //关闭事件处理
        _closeFn(ev) {

            this.$emit("close");

            this.hide();

            ev.preventDefault();
            ev.stopPropagation();

        }

        //按ESC让弹窗消失
        _escFn(ev) {

            //ESC键
            if(event.keyCode == "27") {
                this.hide();
            }

            ev.preventDefault();
            ev.stopPropagation();

        }

        _stopPropagation(ev) {
            ev.stopPropagation();
        }

        handleDrag() {

            if(this.option.draggable) {

                let bar = DOM.find(this.dialogDom, ".dui-dialog-hd");

                DOM.addClass(bar, "z-draggable")

                Drag.startDrag(bar, this.dialogDom, Config.boundary(this.dialogDom, this.option.appendEl), this);
            }

        }

        //绑定按钮事件
        bindEvent() {

            let okBtn = this.okBtn = DOM.find(this.dialogDom, ".J_dialog-ok");

            let cancelBtn = this.cancelBtn = DOM.find(this.dialogDom, ".J_dialog-cancel");

            let closeBtn =  this.closeBtn = DOM.find(this.dialogDom, ".J_dialog-close");

            let dialogBd = this.dialogBd = DOM.find(this.dialogDom, ".dui-dialog-bd") || DOM.find(this.dialogDom, ".dui-dialog-custom-bd");

            okBtn && okBtn.addEventListener("click", this.bindOkClick=this._okFn.bind(this), false);

            cancelBtn && cancelBtn.addEventListener("click", this.bindCancelClick = this._cancelFn.bind(this), false);

            closeBtn && closeBtn.addEventListener("click", this.bindCloseClick = this._closeFn.bind(this), false);

            dialogBd && dialogBd.addEventListener("mousewheel", this._stopPropagation, false)

            dialogBd && dialogBd.addEventListener("touchmove", this._stopPropagation, false);

            document.addEventListener("keydown", this.bindEscClick = this._escFn.bind(this), false);

        }

        unBindEvent() {

            let okBtn = this.okBtn,
                cancelBtn = this.cancelBtn,
                closeBtn =  this.closeBtn,
                dialogBd = this.dialogBd;

            okBtn && okBtn.removeEventListener("click", this.bindOkClick, false);

            cancelBtn && cancelBtn.removeEventListener("click", this.bindCancelClick, false);

            closeBtn && closeBtn.removeEventListener("click", this.bindCloseClick, false);

            dialogBd && dialogBd.removeEventListener("mousewheel", this._stopPropagation, false);
            dialogBd && dialogBd.removeEventListener("touchmove", this._stopPropagation, false);

            document.removeEventListener("keydown", this.bindEscClick, false);

        }

    }

    Modal.alert = function(text, title = "提示", close = true){

       return new Modal({
            title: title,
            content: text,
            close: close,
            height: "auto",
            okFn: function() {
                this.hide();
            }
       })

    }

    Modal.confirm = function(text, title = "提示", close = true, align = "right") {

        return new Promise(function(resolve) {

            new Modal({
                title: title,
                content: text,
                close: close,
                height: "auto",
                btnPos: align,
                okFn: function() {
                    resolve(true);
                    this.hide();
                },
                cancel: true,
                cancelFn: function() {
                    resolve(false);
                }
            })

        })

    }

    return Modal;

})();