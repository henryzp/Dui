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
            this.tipDom = DOM.appendHTML(document.body, this.option.tipContent);
        }

        hide() {

        }

        destroy() {
            DOM.remove(this.tipDom);
        }

    }

    Tip.showHint = function(type, msg, pos, time, callback) {

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

        new Tip({
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

    return Tip;

})();