// 引入css
import "../../css/component/_btn.scss";
import style from "../../css/component/_dialog.scss";

import Util from "./util";
import Config from "../config/modal_config";
import DOM from "./dom";
import Event from "./event";
import Drag from "./drag";

import ScrollHanlder from "./scrollHanlder";

import ModalTemplate from "../template/modal.html";

export default (function () {
    // 将style里面的变量赋值给Config
    Util.extend(Config, style);

    class Modal extends Event {

        constructor(option) {
            super();

            const defaultOption = {
                type: "default",
                title: "提示",
                content: "内容",
                height: "auto",
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
                appendEl: document.body
            };

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

        // 处理参数
        handleOption() {
            this.handleOptionWidth();

            this.handleOptionHeight();

            this.handleOptionButton();

            // 初始化content的高度，它会取决于有没有下面的按钮
            this.handleOptionContentHeight();

            this.handleOptionContent();
        }

        // 处理弹窗宽度
        handleOptionWidth() {
            let width = this.option.width;

            if (!width) {
                width = Config.minWidth;
            } else {
                width = parseInt(width, 10);
            }

            if (Config.minWidth - width >= 0) {
                width = Config.minWidth;
            }

            if (Config.maxWidth - width < 0) {
                width = Config.maxWidth;
            }

            this.option.width = width;
        }

        // 处理弹窗高度
        handleOptionHeight() {
            let height = this.option.height;

            // 处理特殊的auto情况
            if (height === "auto") {
                return;
            }

            if (!height) {
                height = Config.minHeight;
            } else {
                height = parseInt(height, 10);
            }

            if (Config.minHeight - height >= 0) {
                height = Config.minHeight;
            }

            if (Config.maxHeight - height < 0) {
                height = Config.maxHeight;
            }

            this.option.height = height;
        }

        // 处理内容高度
        handleOptionContentHeight() {
            const height = this.option.height,
                padding = Config.padding,
                minHeight = Config.minHeight,
                maxHeight = Config.maxHeight;

            let spacing,
                hdHeight = Config.hdHeight,
                ftHeight = Config.ftHeight;

            if (!this.option.ok && !this.option.cancel) {
                spacing = 2 * padding;
                ftHeight = 0;
            } else {
                spacing = 3 * padding;
            }

            if (this.option.title === "") {
                hdHeight = 14;
            }

            if (height === "auto") {
                this.option.contentHeight = "auto";

                const contentMinHeight = minHeight - hdHeight - ftHeight - spacing,
                    contentMaxHeight = maxHeight - hdHeight - ftHeight - spacing;

                this.option.contentMaxHeight = contentMaxHeight;

                this.option.contentMinHeight = contentMinHeight;
            } else {
                const contentHeight = height - hdHeight - ftHeight - spacing;

                this.option.contentHeight = contentHeight;
            }
        }

        // 处理底部按钮
        handleOptionButton() {
            const ok = this.option.ok,
                cancel = this.option.cancel;

            let isBool;

            if (ok == null) {
                this.option.ok = false;
            } else {
                isBool = typeof ok === "boolean";
                this.option.ok = !!ok;
                this.option.okValue = isBool ? this.option.okValue : ok;
            }

            if (cancel == null) {
                this.option.cancel = false;
            } else {
                isBool = typeof cancel === "boolean";
                this.option.cancel = !!cancel;
                this.option.cancelValue = isBool ? this.option.cancelValue : cancel;
            }

            if (this.option.okFn) {
                this.option.ok = true;
            }

            if (this.option.cancelFn) {
                this.option.cancel = true;
            }

            this.option.btnPosClass = `dui-dialog-ft-${this.option.btnPos}`;
        }

        handleOptionContent() {
            const content = this.option.content,
                firstCode = content.charAt(0);
            if (firstCode === "#") {
                const contentDom = DOM.findById(content.slice(1));
                if (contentDom != null) {
                    this.option.content = DOM.getHtml(contentDom);
                    if (contentDom.tagName.toLowerCase() !== "script") {
                        DOM.remove(contentDom);
                    }
                }
            }
        }

        // 显示弹窗
        render() {
            const len = DOM.has(".dui-dialog-wrap").length,
                result = Util.renderTemp(ModalTemplate, this.option);

            if (len === 0 && this.option.mask) {
                const wrap = `<div class="dui-dialog-wrap" style="z-index: ${this.option.zIndex}"></div>`;
                DOM.appendHTML(document.body, wrap);
                ScrollHanlder.disableScroll();
            }

            if (this.option.mask) {
                this.dialogDom = DOM.appendHTML(DOM.find(".dui-dialog-wrap"), result);
            } else {
                if (typeof this.option.appendEl === "string") {
                    this.option.appendEl = DOM.find(this.option.appendEl);
                }
                this.dialogDom = DOM.appendHTML(this.option.appendEl, result);
            }
        }

        // 隐藏弹窗
        hide() {
            this.destroy();
        }

        // 销毁弹窗
        destroy() {
            this.unBindEvent();

            let len;

            if (this.option.mask) {
                len = DOM.has(DOM.find(".dui-dialog-wrap"), ".dui-dialog").length;
            } else {
                len = DOM.has(".dui-dialog").length;
            }

            DOM.remove(this.dialogDom);

            if (len === 1 && this.option.mask) {
                DOM.remove(DOM.find(".dui-dialog-wrap"));
                ScrollHanlder.enableScroll();
            }

            this.dialogDom = null;
        }

        // 确定事件处理
        _okFn() {
            this.$emit("ok");
            // TODO 判断是否是函数
            this.option.okFn && this.option.okFn.apply(this);
        }

        // 取消事件处理
        _cancelFn(ev) {
            this.$emit("cancel");
            // TODO 判断是否是函数
            this.option.cancelFn && this.option.cancelFn.apply(this);
            this.$emit("destroy");
            ev.stopPropagation();
            this.hide();
        }

        // 关闭事件处理
        _closeFn(ev) {
            this.$emit("close");
            this.$emit("destroy");
            ev.stopPropagation();
            this.hide();
        }

        // 按ESC让弹窗消失
        _escFn(ev) {
            // ESC键
            if (ev.keyCode === 27) {
                this.$emit("esc");
                this.$emit("destroy");
                ev.stopPropagation();
                this.hide();
            }
        }

        static stopPropagation(ev) {
            ev.stopPropagation();
        }

        handleDrag() {
            if (this.option.draggable) {
                const bar = DOM.find(this.dialogDom, ".dui-dialog-hd");
                DOM.addClass(bar, "z-draggable")
                Drag.startDrag(bar,
                    this.dialogDom,
                    Config.boundary(this.dialogDom, this.option.appendEl),
                    this);
            }
        }

        // 绑定按钮事件
        bindEvent() {
            const okBtn = this.okBtn = DOM.find(this.dialogDom, ".J_dialog-ok"),
                cancelBtn = this.cancelBtn = DOM.find(this.dialogDom, ".J_dialog-cancel"),
                closeBtn = this.closeBtn = DOM.find(this.dialogDom, ".J_dialog-close"),
                dialogBd = this.dialogBd = DOM.find(this.dialogDom, ".dui-dialog-bd") || DOM.find(this.dialogDom, ".dui-dialog-custom-bd");

            // 在弹窗内的点击阻止冒泡，防止触发document的事件。
            // this.dialogDom.addEventListener("click", this._stopPropagation, false);

            okBtn && okBtn.addEventListener("click", this.bindOkClick = this._okFn.bind(this), false);

            cancelBtn && cancelBtn.addEventListener("click", this.bindCancelClick = this._cancelFn.bind(this), false);

            closeBtn && closeBtn.addEventListener("click", this.bindCloseClick = this._closeFn.bind(this), false);

            dialogBd && dialogBd.addEventListener("mousewheel", Modal.stopPropagation, false)

            dialogBd && dialogBd.addEventListener("touchmove", Modal.stopPropagation, false);

            document.addEventListener("keydown", this.bindEscClick = this._escFn.bind(this), false);
        }

        unBindEvent() {
            const okBtn = this.okBtn,
                cancelBtn = this.cancelBtn,
                closeBtn = this.closeBtn,
                dialogBd = this.dialogBd;

            okBtn && okBtn.removeEventListener("click", this.bindOkClick, false);

            cancelBtn && cancelBtn.removeEventListener("click", this.bindCancelClick, false);

            closeBtn && closeBtn.removeEventListener("click", this.bindCloseClick, false);

            dialogBd && dialogBd.removeEventListener("mousewheel", Modal.stopPropagation, false);
            dialogBd && dialogBd.removeEventListener("touchmove", Modal.stopPropagation, false);

            document.removeEventListener("keydown", this.bindEscClick, false);
        }
    }

    Modal.alert = function (text, title = "提示", close = true) {
        return new Modal({
            title,
            content: text,
            close,
            height: "auto",
            okFn() {
                this.hide();
            }
        })
    }

    Modal.confirm = function (text, title = "提示", close = true, align = "right") {
        return new Promise((resolve) => {
            new Modal({
                title,
                content: text,
                close,
                height: "auto",
                btnPos: align,
                okFn() {
                    resolve(true);
                    this.hide();
                },
                cancelFn() {
                    resolve(false);
                }
            })
        })
    }

    return Modal;
})();

