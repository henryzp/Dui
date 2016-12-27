import DOM from "./dom";

const getCss = DOM.getCss,
    params = {
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false
    }

export default {
    startDrag(bar, target, boundary, $scope) {
        if (getCss(target, "left") !== "auto") {
            params.left = getCss(target, "left");
        }

        if (getCss(target, "top") !== "auto") {
            params.top = getCss(target, "top");
        }

        bar.onmousedown = function (event) {
            // 触发dragStart事件
            $scope && $scope.$emit("dragStart");
            params.flag = true;
            if (!event) {
                event = window.event;
                bar.onselectstart = function () {
                    return false;
                }
            }
            params.currentX = event.clientX;
            params.currentY = event.clientY;

            document.onmouseup = function () {
                params.flag = false;
                if (getCss(target, "left") !== "auto") {
                    params.left = getCss(target, "left");
                }
                if (getCss(target, "top") !== "auto") {
                    params.top = getCss(target, "top");
                }
                // 触发dragEnd事件
                $scope && $scope.$emit("dragEnd");

                document.onmousemove = null;
                document.onmouseup = null;
            };

            document.onmousemove = function (ev) {
                if (params.flag) {
                    const nowX = ev.clientX,
                        nowY = ev.clientY,
                        disX = nowX - params.currentX,
                        disY = nowY - params.currentY;

                    let left = parseInt(params.left, 10) + disX,
                        top = parseInt(params.top, 10) + disY;

                    if (boundary) {
                        left = boundary.getLeft(left);
                        top = boundary.getTop(top);
                    }

                    target.style.left = `${left}px`;
                    target.style.top = `${top}px`;
                }
            }
        };
    }
}
