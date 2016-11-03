import {getCss} from "./dom";

let params = {
    left: 0,
    top: 0,
    currentX: 0,
    currentY: 0,
    flag: false
}


export default {

    startDrag(bar, target, boundary, $scope) {

        if(getCss(target, "left") !== "auto"){
            params.left = getCss(target, "left");
        }

        if(getCss(target, "top") !== "auto"){
            params.top = getCss(target, "top");
        }

        bar.onmousedown = function(event){
            //触发dragStart事件
            $scope && $scope.$emit("dragStart");
            params.flag = true;
            if(!event){
                event = window.event;
                bar.onselectstart = function(){
                    return false;
                }
            }
            var e = event;
            params.currentX = e.clientX;
            params.currentY = e.clientY;

            document.onmouseup = function(){
                params.flag = false;
                if(getCss(target, "left") !== "auto"){
                    params.left = getCss(target, "left");
                }
                if(getCss(target, "top") !== "auto"){
                    params.top = getCss(target, "top");
                }
                //触发dragEnd事件
                $scope && $scope.$emit("dragEnd");

                document.onmousemove = null;
                document.onmouseup = null;
            };


            document.onmousemove = function(event){
                var e = event ? event: window.event;
                if(params.flag){
                    let nowX = e.clientX, nowY = e.clientY;
                    let disX = nowX - params.currentX,
                        disY = nowY - params.currentY;

                    let left = parseInt(params.left) + disX,
                        top = parseInt(params.top) + disY;

                    if(boundary) {
                        left = boundary.getLeft(left);
                        top = boundary.getTop(top);
                    }

                    target.style.left = left + "px";
                    target.style.top = top + "px";
                }
            }

        };

    }

}