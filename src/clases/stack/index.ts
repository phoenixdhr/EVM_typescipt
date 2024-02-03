import { MAX_UINT256 } from "../../constants";
import { IndexOutOfBonds, InvalidStackValue, StackOverflow, StackUnderflow } from "./erros";
import { hexlify } from "@ethersproject/bytes";

export  default class Stack {

    private readonly _maxDetph : number;
    public _stack : bigint[]

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

        const value = this._stack.pop()

        if (value===undefined)  throw new StackUnderflow(value)

        return value
    }

    print(){
        console.log(`Stack: \t`,
                    this._stack.map(item=>hexlify(item)));
    }

    duplicate(index:number):void    {

        const value = this._stack[this.toStackIndex(index)]

        if (value ==undefined) throw new IndexOutOfBonds()

        this._stack.push(value)
    }

    // el indice 1 es el tope de la pila (this._stack.length-1)
    // el indice 2 es el segundo elemento por debajo del tope de la pila (this._stack.length-2)
    toStackIndex(index:number){
        const newIndex = this._stack.length-index
        return newIndex
    }


    swap(indexA:number, indexB:number){
        const value_A = this.getAtIndex(indexA)
        const value_B = this.getAtIndex(indexB)

        this.setAtIndex(indexA,value_B)
        this.setAtIndex(indexB,value_A)

    }

    setAtIndex(index: number, value:bigint){
        const adjustIndex = this.toStackIndex(index)
        this._stack[adjustIndex]=value
    }

    getAtIndex(index: number):bigint{
        const adjustIndex = this.toStackIndex(index)
        const value = this._stack[adjustIndex]

        if (value==undefined )throw new IndexOutOfBonds()
        return value
    }


}