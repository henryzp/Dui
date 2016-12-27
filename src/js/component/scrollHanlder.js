import DOM from "./dom";

const keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        // return false;
    }
    // no return statement
}

function getScrollWidth() {
    let w1,
        w2;
    const dom = document.documentElement;
    w1 = dom.clientWidth;
    DOM.addClass(dom, "dui-dialog-lock-test");
    w2 = dom.clientWidth;
    DOM.removeClass(dom, "dui-dialog-lock-test");
    return w2 - w1;
}

let oldonwheel,
    oldontouchmove,
    oldonkeydown,
    isDisabled;

function disableScroll() {
    const scrollWidth = getScrollWidth();

    oldonwheel = window.onwheel;
    window.onwheel = preventDefault; // modern standard

    oldontouchmove = window.ontouchmove;
    window.ontouchmove = preventDefault; // mobile

    oldonkeydown = document.onkeydown;
    document.onkeydown = preventDefaultForScrollKeys;
    isDisabled = true;

    DOM.addCssText([document.body, document.documentElement], `overflow-y: hidden; padding-right: ${scrollWidth}px`);
}

function enableScroll() {
    if (!isDisabled) return;

    window.onwheel = oldonwheel; // modern standard

    window.ontouchmove = oldontouchmove; // mobile

    document.onkeydown = oldonkeydown;
    isDisabled = false;

    DOM.addCssText([document.body, document.documentElement], "overflow-y: visible; padding-right: 0;");
}

export default {
    disableScroll,
    enableScroll
}
