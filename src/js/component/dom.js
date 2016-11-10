//dom简单操作

export default {

    getCss(elem, key) {
        return elem.currentStyle? elem.currentStyle[key] : document.defaultView.getComputedStyle(elem,false)[key];
    },

    addClass(elem, className) {
        elem.classList.add(className);
    },

    getAttr(dom) {
        return dom.getBoundingClientRect();
    },

    has(elem, selector) {

        if(arguments.length == 1) {
            elem = document;
            selector = arguments[0];
        }

        let domArr = elem.querySelectorAll(selector);

        return {
            length: domArr.length
        }

    },

    find(elem, selector) {

        if(arguments.length == 1) {
            elem = document;
            selector = arguments[0];
        }

        return elem.querySelector(selector);

    },

    appendHTML(elem, html) {

        var divTemp = document.createElement("div");

        divTemp.innerHTML = html;

        var dom = divTemp.childNodes[0];

        elem.appendChild(dom);

        return dom;
    },

    prependHTML(elem, html) {

        var divTemp = document.createElement("div");

        divTemp.innerHTML = html;

        var dom = divTemp.childNodes[0];

        elem.insertBefore(dom, elem.firstChild);

        return dom;

    },

    remove(elem) {
        elem.parentNode && elem.parentNode.removeChild(elem);
        return elem;
    }

}