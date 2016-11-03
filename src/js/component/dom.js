//dom简单操作

export default {

    getCss(elem, key) {
        return elem.currentStyle? elem.currentStyle[key] : document.defaultView.getComputedStyle(elem,false)[key];
    },

    addClass(elem, className) {
        elem.classList.add(className);
    },

    has(selector) {

        let domArr = document.querySelectorAll(selector);

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

    remove(elem) {

        elem.parentNode.removeChild(elem);
        return elem;
    }

}