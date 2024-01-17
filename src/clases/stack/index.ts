import { ethers } from "ethers";
import { MAX_UINT256 } from "../../constants";
import { IndexOutOfBonds, InvalidStackValue, StackOverflow, StackUnderflow } from "./erros";

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
                    this._stack.map(item=>`0x${item.toString(16)}`));
                    // this._stack.map(item=>ethers.hexlify(String(item))));

    }

    duplicate(index:number):void    {

        const value = this._stack[this.toStackIndex(index)]

        if (value ==undefined) throw new IndexOutOfBonds()

        this._stack.push(value)
    }

    toStackIndex(index:number){
        const newIndex = this._stack.length-1
        return newIndex
    }


    swap(indexA:number, indexB:number){
        const value_A = this._stack[this.toStackIndex(indexA)]
        const value_B = this._stack[this.toStackIndex(indexB)]

        if (value_A==undefined) throw new IndexOutOfBonds()
        if (value_B==undefined) throw new IndexOutOfBonds()

        this._stack[this.toStackIndex(indexA)]=value_B
        this._stack[this.toStackIndex(indexB)]=value_A


    }

}