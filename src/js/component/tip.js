import Template from "lodash/template";

import Extend from "lodash/extend";

import Config from "../config/tip_config";

import DOM from "./dom";

import Event from "./event";

import Animate from "./animate";

export default (function(){

    const tipHint = [
        '<div class="dui-tip-hint <%= tipClass %>" style="margin-top: <%=marginTop %>px; top: <%=top %>px; min-width: <%=minWidth %>px; max-width: <%=maxWidth %>px;">',
            '<i class="<%= iconClass %>"></i>',
            '<p><%= msg %></p>',
        '</div>'
    ]

    const tipText = [
        '<div class="dui-tip-text" style="opacity: 0;">',
            '<p><%= msg %></p>',
            '<div class="close-box">',
                '<button class="dui-btn-warning-bordered dui-btn-special dui-btn-small">我知道了</button>',
            '</div>',
        '</div>'
    ];

    const tipArrow = [
        '<div style="position: absolute; opacity: 0" class="<%= tipType %> <%= tipClass %>">',
            '<%= msg %>',
        '</div>',
    ];

    class Tip extends Event {

        constructor(option) {

            super();

            let defaultOption = {
                tipContent: "这是一段提示"
            }

            this.option = option;

            this.option = Extend({}, defaultOption, this.option);

            this.init();

        }

        init() {
            this.show();
            this.option.init && this.option.init.apply(this);
        }

        show() {
            if(this.tipDom) {
                this.tipDom.style.display = "block";
            }else {
                this.tipDom = DOM.appendHTML(document.body, this.option.tipContent);
            }
        }

        hide() {
            this.tipDom.style.display = "none";
        }

        destroy() {
            this.$emit("destroy");
            DOM.remove(this.tipDom);
            this.tipDom = null;
        }

    }

    Tip.showHint = function(type, msg, pos = "top", time = 2, callback = function(){}) {

        //先把之前的tip给干掉
        if(DOM.has(".dui-tip-hint").length > 0) {
            DOM.remove(DOM.find(".dui-tip-hint"));
        }

        var initialTop, finalTop;

        let option = {
            tipClass: Config.tipClassMap[type],
            marginTop: Config.hint.marginTop,
            minWidth: Config.hint.minWidth,
            maxWidth: Config.hint.maxWidth,
            iconClass: Config.hint.iconClass[type],
            msg: msg
        };

        finalTop = Config.hint.pos[pos];

        if(String(finalTop).slice(-1) == "%") {
            finalTop = Math.floor(Config.hint.pos.rel.offsetHeight * (finalTop.slice(0, -1)/100));
        }

        initialTop = finalTop - Config.hint.pos.dis;
        option.top = initialTop;

        let compiled = Template(tipHint.join(""));

        let tipContent = compiled(option);

        return new Tip({
            tipContent,
            init() {
                var _this = this;

                this.tipDom.style.display = "block";

                setTimeout(function () {

                    Dui.Animate.startMove(_this.tipDom, { top: finalTop }, function() {

                        setTimeout(function () {

                            Dui.Animate.startMove(_this.tipDom, { top: initialTop }, function() {
                                callback &&  callback.apply(_this);
                                _this.tipDom.style.display = "none";
                                _this.destroy();
                            })

                        }, time * 1000);

                    });
                }, 10);
            }
        })

    }

    Tip.successInfo = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("success", msg, "top", time, callback);
    }

    Tip.middleSuccessInfo = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("success", msg, "middle", time, callback);
    }

    Tip.warning = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("warn", msg, "top", time, callback);
    }

    Tip.middleWarning = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("warn", msg, "middle", time, callback);
    }

    Tip.otherInfo = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("other", msg, "top", time, callback);
    }

    Tip.middleOtherInfo = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("other", msg, "middle", time, callback);
    }

    Tip.info = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("info", msg, "top", time, callback);
    }

    Tip.middleInfo = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("info", msg, "middle", time, callback);
    }

    Tip.error = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("error", msg, "top", time, callback);
    }

    Tip.middleError = function(msg, time = 2, callback = function(){}) {
        Tip.showHint("error", msg, "middle", time, callback);
    }

    //显示更新的消息
    Tip.showUpdateMessage = function(msg) {

        function bindEvent(dom) {
            var elem = DOM.find(dom, "button");
            elem.onclick = function() {
                Dui.Animate.startMove(dom, {opacity: 0}, 400, function() {
                    elem.onclick = null; //事件解绑
                    DOM.remove(dom);
                    let updateMessageDom = DOM.find(".dui-update-message");
                    if(DOM.has(updateMessageDom, ".dui-tip-text").length == 0) {
                        DOM.remove(updateMessageDom);
                    }
                });
            };
        }

        let option = {
            msg: msg
        };

        let compiled = Template(tipText.join("")),
            tipContent = compiled(option);

        if(DOM.has(".dui-update-message").length == 0) {

            tipContent = '<div style="top: '+ Config.updateMessage.top +'" class="dui-update-message">' + tipContent + '</div>';

            new Tip({
                tipContent,
                init() {
                    let tipText =  DOM.find(this.tipDom, ".dui-tip-text");
                    Dui.Animate.startMove(tipText, {opacity: 100}, 400, function() {
                        bindEvent(tipText);
                    });
                }
            })
        }else {

            let updateMessageDom = DOM.find(".dui-update-message");
            let tipText = DOM.prependHTML(updateMessageDom, tipContent);
            Dui.Animate.startMove(tipText, {opacity: 100}, 400, function() {
                bindEvent(tipText);
            });

        }

    }

    Tip._showBasicArrow = function(option) {

        if(!option.pos) {
            console.error("必须传pos字段，来表明箭头的位置");
            return;
        }

        if(!option.alignElem) {
            console.error("必须传alignElem，来决定Tip的显示位置");
            return;
        }

        option.tipClass = Config.tipArrowClassMap[option.pos];

        option.type = option.type || "default";

        option.tipType = option.type == "error" ? "dui-tip-error-arrow" : "dui-tip-arrow";

        let compiled = Template(tipArrow.join("")),
            tipContent = compiled(option);

        console.log(tipContent);

        return new Tip({
            tipContent,
            init() {
                let tipAttr = DOM.getAttr(this.tipDom),
                    alignAttr = DOM.getAttr(option.alignElem),
                    alignPoint = DOM.getPoint(option.alignElem);

                let styleText = "position: absolute";

                switch (option.pos) {
                    case "l":
                        styleText += "; top: " + alignPoint.top + "px";
                        styleText += "; left: " + (alignPoint.left - tipAttr.width - Config.arrowSize - option.spacing) + "px";
                        break;
                    case "r":
                        styleText += "; top: " + alignPoint.top + "px";
                        styleText += "; left: " + (alignPoint.left + alignAttr.width + Config.arrowSize + option.spacing) + "px";
                        break;
                    case "t":
                        styleText += "; top: " + (alignPoint.top - tipAttr.height - Config.arrowSize - option.spacing) + "px";
                        styleText += "; left: " + (alignPoint.left + alignAttr.width/2 - tipAttr.width/2) + "px";
                        break;
                    case "b":
                        styleText += "; top: " + (alignPoint.top + alignAttr.height + Config.arrowSize + option.spacing) + "px";
                        styleText += "; left: " + (alignAttr.left + alignAttr.width/2 - tipAttr.width/2) + "px";
                        break;
                    case "bl":
                        styleText += "; top: " + (alignPoint.top + alignAttr.height + Config.arrowSize + option.spacing) + "px";
                        styleText += "; left: " + alignPoint.left + "px";
                        break;
                    case "br":
                        styleText += "; top: " + (alignPoint.top + alignAttr.height + Config.arrowSize + option.spacing) + "px";
                        styleText += "; left: " + (alignPoint.left + alignAttr.width - tipAttr.width) + "px";
                        break;
                }

                styleText += "; display: none; opacity: 1";

                this.tipDom.style.cssText = styleText;
            }
        })

    }

    Tip.tooltip = function(option) {

        if(!option.el) {
            console.error("必须传入el");
            return;
        }

        if(!option.msg) {
            console.error("必须传msg");
            return;
        }

        let currentTip,
            el = typeof option.el == "string" ? DOM.find(option.el) : option.el;

        currentTip = Dui.Tip._showBasicArrow({
            msg: option.msg,
            pos: option.pos,
            alignElem: el,
            spacing: option.spacing || 5
        }).$on("destroy", function() {
            el.removeEventListener("mouseover", showTip);
            el.removeEventListener("mouseout", hideTip);
        })

        el.addEventListener("mouseover", showTip);
        el.addEventListener("mouseout", hideTip);

        function showTip() {
            currentTip && currentTip.show();
        }

        function hideTip() {
            currentTip && currentTip.hide();
        }

        return currentTip;

    }

    Tip.showFormError = function(option) {

        if(!option.el) {
            console.error("必须传入el");
            return;
        }

        if(!option.msg) {
            console.error("必须传msg");
            return;
        }

        let currentTip,
            el = typeof option.el == "string" ? DOM.find(option.el) : option.el;

        currentTip = Dui.Tip._showBasicArrow({
            type: "error",
            msg: option.msg,
            pos: option.pos,
            alignElem: el,
            spacing: option.spacing || 5
        })

        return currentTip;

    }

    return Tip;

})();