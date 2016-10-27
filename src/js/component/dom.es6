//dom简单操作

export default {

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
        var divTemp = document.createElement("div"), nodes = null
        // 文档片段，一次性append，提高性能
            , fragment = document.createDocumentFragment();
        divTemp.innerHTML = html;
        nodes = divTemp.childNodes;
        for (var i=0, length=nodes.length; i<length; i+=1) {
            fragment.appendChild(nodes[i].cloneNode(true));
        }
        elem.appendChild(fragment);
        return elem.childNodes[0];
    },

    remove(elem) {
        elem.parentNode.removeChild(elem);
        return elem;
    }

}