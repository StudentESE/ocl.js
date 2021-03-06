import {Expression} from "../expression";

export class FirstOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if(source instanceof Array) {
            return source[0];
        }
    }
}
