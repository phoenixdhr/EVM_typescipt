
import { ethers } from "ethers";
import { MAX_UINT256 } from "../../constants"
import { InvalidMemoryOffset, InvalidMemoryValue } from "./erros";


export default class Memory {
    private _memory:bigint[]

    constructor() {
        this._memory=[]
    }

    store(offset:bigint, value:bigint){
        if (offset<0 || offset>MAX_UINT256) {
            throw new InvalidMemoryOffset(offset,value)
        }

        if (value<0 || value>MAX_UINT256) {
            throw new InvalidMemoryValue(offset,value)
        }

        this._memory[Number(offset)]=value
    }

    load(offset:bigint){

        const value =this._memory[Number(offset)]

        if (offset<0 || offset>MAX_UINT256) {
            throw new InvalidMemoryOffset(offset,value)
        }

        if (offset>this._memory.length) {
            return BigInt(0)
        }

        return this._memory[Number(offset)]
    }


    print(){
        console.log(`Memory: \t`,
                    this._memory.map(item=>ethers.hexlify(String(item))));

    }
}