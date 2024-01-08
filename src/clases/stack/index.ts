import { MAX_UINT256 } from "../../constants";
import { InvalidStackValue, StackOverflow, StackUnderflow } from "./erros";

export  default class Stack {

    private readonly _maxDetph : number;
    private _stack : bigint[]

    constructor(maxDetph = 1024) {
        this._maxDetph=maxDetph
        this._stack=[]
    }



    push(value:bigint){

        if (value<0 || value>MAX_UINT256) {
            throw new InvalidStackValue(value)
        }

        if (this._stack.length>=this._maxDetph) {
            throw new StackOverflow(value)
        }

        this._stack.push(value)

    }

    pop(){

        const value = this._stack[this._stack.length]

        if (value===undefined) {
            throw new StackUnderflow(value)
        }

        this._stack.pop()
        return value
    }

}