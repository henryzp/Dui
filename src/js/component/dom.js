// dom简单操作
export default {
    // 简单粗暴地将元素的style整个替换掉
    addCssText(elem, cssText) {
        if (Array.isArray(elem)) {
            elem.forEach((item) => {
                item.style.cssText = cssText;
            });
        } else {
            elem.style.cssText = cssText;
        }
    },

    getCss(elem, key) {
        return elem.currentStyle ?
            elem.currentStyle[key] :
            document.defaultView.getComputedStyle(elem, false)[key];
    },

    addClass(elem, className) {
        elem.classList.add(className);
    },

    removeClass(elem, className) {
        elem.classList.remove(className);
    },

    isHide(elem) {
        return this.getCss(elem, "display") === "none";
    },

    show(elem) {
        elem.style.display = "block";
    },

    hide(elem) {
        elem.style.display = "none";
    },

    // 获取边界属性
    getRect(dom) {
        return dom.getBoundingClientRect();
    },

    // 获取某元素以浏览器左上角为原点的坐标
    getPoint(dom) {
        let top = dom.offsetTop,
            left = dom.offsetLeft;
        // 判断是否有父容器，如果存在则累加其边距
        while (dom = dom.offsetParent) {
            top += dom.offsetTop;
            left += dom.offsetLeft;
        }
        return {
            top,
            left
        }
    },

    getDataAttr(dom, prop) {
        return dom.getAttribute(`data-${prop}`);
    },

    html(dom, text) {
        dom.innerHTML = text;
    },

    getHtml(dom) {
        return dom.innerHTML;
    },

    has(...args) {
        let elem,
            selector;
        if (args.length === 1) {
            elem = document;
            selector = args[0];
        } else {
            elem = args[0];
            selector = args[1];
        }

        const domArr = elem.querySelectorAll(selector);

        return {
            length: domArr.length
        }
    },

    find(...args) {
        let elem,
            selector;
        if (args.length === 1) {
            elem = document;
            selector = args[0];
        } else {
            elem = args[0];
            selector = args[1];
        }
        return elem.querySelector(selector);
    },

    findById(selector) {
        return document.getElementById(selector);
    },

    findAll(...args) {
        let elem,
            selector;
        if (args.length === 1) {
            elem = document;
            selector = args[0];
        } else {
            elem = args[0];
            selector = args[1];
        }
        return elem.querySelectorAll(selector);
    },

    appendHTML(elem, html) {
        const divTemp = document.createElement("div");
        let dom = null;
        this.html(divTemp, html);
        dom = divTemp.childNodes[0];
        elem.appendChild(dom);
        return dom;
    },

    prependHTML(elem, html) {
        const divTemp = document.createElement("div");
        let dom = null;
        this.html(divTemp, html);
        dom = divTemp.childNodes[0];
        elem.insertBefore(dom, elem.firstChild);
        return dom;
    },

    beforeHTML(elem, html) {
        const divTemp = document.createElement("div");
        let dom = null;
        this.html(divTemp, html);
        dom = divTemp.childNodes[0];
        elem.parentNode.insertBefore(dom, elem);
        return dom;
    },

    remove(elem) {
        elem.parentNode && elem.parentNode.removeChild(elem);
        return elem;
    }
}
