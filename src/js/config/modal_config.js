export default {
    minWidth: 420,
    minHeight: 170,
    maxWidth: 920,
    maxHeight: 580,
    hdHeight: 45, //44 + 1 (下边框)
    ftHeight: 30,
    padding: 16,
    closeIconClass: "iconfont icon-shanchu5",
    //边界范围
    boundary: function(elem, parentElem) {

        let width = elem.offsetWidth,
            height = elem.offsetHeight;

        return {
            getLeft: function(left) {

                let containerWidth = document.documentElement.clientWidth;

                if(left < width/2) {
                    return width/2;
                }

                if(left > containerWidth - width/2) {
                    return containerWidth - width/2;
                }

                return left;
            },
            getTop: function(top) {

                let containerHeight = document.documentElement.clientHeight;

                if(top < height/2) {
                    return height/2;
                }

                if(top > containerHeight - height/2) {
                    return containerHeight - height/2;
                }

                return top;

            }
        }
    }
}