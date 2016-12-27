export default class Event {

    constructor() {
        // do something
    }

    $on(event, fn) {
        let i;
        if (typeof event === "object") {
            for (i in event) {
                if ({}.hasOwnProperty.call(event, i)) {
                    this.$on(i, event[i]);
                }
            }
        } else {
            // @patch: for list
            const context = this,
                handles = context._handles || (context._handles = {}),
                calls = handles[event] || (handles[event] = []);
            calls.push(fn);
        }
        return this;
    }

    $off(event, fn) {
        const context = this,
            handles = context._handles;

        let calls;

        if (!context._handles) return context;
        if (!event) this._handles = {};

        if (calls = handles[event]) {
            if (!fn) {
                handles[event] = [];
                return context;
            }
            for (let i = 0, len = calls.length; i < len; i++) {
                if (fn === calls[i]) {
                    calls.splice(i, 1);
                    return context;
                }
            }
        }
        return context;
    }

    // bubble event
    $emit(event, ...args) {
        // @patch: for list
        const context = this,
            handles = context._handles,
            type = event;

        let calls,
            len,
            i,
            j;

        if (!event) return;

        if (!handles) return context;
        if (calls = handles[type.slice(1)]) {
            for (j = 0, len = calls.length; j < len; j++) {
                calls[j].apply(context, args)
            }
        }
        if (!(calls = handles[type])) return;
        for (i = 0, len = calls.length; i < len; i++) {
            calls[i].apply(context, args)
        }
        // if(calls.length) context.$update();
        return context;
    }

}
