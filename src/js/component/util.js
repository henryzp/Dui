import Template from "lodash/template";
import Extend from "lodash/extend";

export default {
    extend: Extend,
    renderTemp(str, json) {
        let compiled = Template(str);
        return compiled(json);
    }
}