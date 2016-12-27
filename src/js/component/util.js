import Template from "lodash/template";
import Extend from "lodash/extend";

export default {
    extend: Extend,
    renderTemp(str, json) {
        const compiled = Template(str);
        return compiled(json);
    },
    now() {
        return (new Date()).getTime();
    }
}
