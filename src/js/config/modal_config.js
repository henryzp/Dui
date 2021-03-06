export default {
    closeIconClass: "iconfont icon-shanchu5",
    // 边界范围, parentElem未来考虑
    boundary(elem) {
        const width = elem.offsetWidth,
            height = elem.offsetHeight;

        return {

            getLeft(left) {
                const containerWidth = document.documentElement.clientWidth;

                if (left < width / 2) {
                    return width / 2;
                }

                if (left > (containerWidth - width / 2)) {
                    return containerWidth - width / 2;
                }

                return left;
            },

            getTop(top) {
                const containerHeight = document.documentElement.clientHeight;

                if (top < height / 2) {
                    return height / 2;
                }

                if (top > (containerHeight - height / 2)) {
                    return containerHeight - height / 2;
                }

                return top;
            }

        }
    }
}
