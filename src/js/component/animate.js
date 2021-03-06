import DOM from "./dom";
import Util from "./util";

const getCss = DOM.getCss,
    Tween = {
        linear(t, b, c, d) {  // 匀速
            return c * t / d + b;
        },
        easeIn(t, b, c, d) {  // 加速曲线
            return c * (t /= d) * t + b;
        },
        easeOut(t, b, c, d) {  // 减速曲线
            return -c * (t /= d) * (t - 2) + b;
        },
        easeBoth(t, b, c, d) {  // 加速减速曲线
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        easeInStrong(t, b, c, d) {  // 加加速曲线
            return c * (t /= d) * t * t * t + b;
        },
        easeOutStrong(t, b, c, d) {  // 减减速曲线
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeBothStrong(t, b, c, d) {  // 加加速减减速曲线
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        elasticIn(t, b, c, d, a, p) {  // 正弦衰减曲线（弹动渐入）
            let s;
            if (t === 0) {
                return b;
            }
            if ((t /= d) === 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a *
                Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p))
                + b;
        },
        elasticOut(t, b, c, d, a, p) {    // 正弦增强曲线（弹动渐出）
            let s;
            if (t === 0) {
                return b;
            }
            if ((t /= d) === 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        elasticBoth(t, b, c, d, a, p) {
            let s;
            if (t === 0) {
                return b;
            }
            if ((t /= d / 2) === 2) {
                return b + c;
            }
            if (!p) {
                p = d * (0.3 * 1.5);
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            }
            return a * Math.pow(2, -10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        },
        backIn(t, b, c, d, s) {     // 回退加速（回退渐入）
            if (typeof s === 'undefined') {
                s = 1.70158;
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        backOut(t, b, c, d, s) {
            if (typeof s === 'undefined') {
                s = 3.70158;  // 回缩的距离
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        backBoth(t, b, c, d, s) {
            if (typeof s === 'undefined') {
                s = 1.70158;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },
        bounceIn(t, b, c, d) {    // 弹球减振（弹球渐出）
            return c - this.bounceOut(d - t, 0, c, d) + b;
        },
        bounceOut(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            }
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        },
        bounceBoth(t, b, c, d) {
            if (t < d / 2) {
                return this.bounceIn(t * 2, 0, c, d) * 0.5 + b;
            }
            return this.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    };

// 动画函数
function startMove(obj, json, times, fx, fn) {
    if (typeof times === "undefined") {
        times = 400;
        fx = 'linear';
    }

    if (typeof times === "string") {
        if (typeof fx === "function") {
            fn = fx;
        }
        fx = times;
        times = 400;
    } else if (typeof times === "function") {
        fn = times;
        times = 400;
        fx = "linear";
    } else if (typeof times === "number") {
        if (typeof fx === "function") {
            fn = fx;
            fx = 'linear';
        } else if (typeof fx === "undefined") {
            fx = "linear";
        }
    }

    const iCur = {},
        startTime = Util.now();

    let attr;

    for (attr in json) {
        if ({}.hasOwnProperty.call(json, attr)) {
            iCur[attr] = 0;
            if (attr === "opacity") {
                iCur[attr] = Math.round(getCss(obj, attr) * 100);
            } else {
                iCur[attr] = parseInt(getCss(obj, attr), 10);
            }
        }
    }

    clearInterval(obj.timer);

    obj.timer = setInterval(() => {
        const changeTime = Util.now(),
            t = times - Math.max(0, (startTime - changeTime) + times); // 0到2000

        let value;

        for (attr in json) {
            if ({}.hasOwnProperty.call(json, attr)) {
                value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);
                if (attr === "opacity") {
                    obj.style.opacity = value / 100;
                    obj.style.filter = `alpha(opacity=${value})`;
                } else {
                    obj.style[attr] = `${value}px`;
                }
            }
        }

        if (t === times) {
            clearInterval(obj.timer);
            fn && fn.call(obj);
        }
    }, 13);
}

export default {
    startMove
};
