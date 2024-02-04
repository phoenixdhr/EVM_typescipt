
import { hexlify } from "@ethersproject/bytes";
import { MAX_UINT256 } from "../../constants"
import { InvalidMemoryOffset, InvalidMemoryValue } from "./erros";


export default class Memory {
    public _memory:bigint[]

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

        return value
    }


    print(){
        console.log(`Memory: \t`, this._memory.map(item=>hexlify(Number(item))));
    }



    memorycost (len:bigint):bigint{

        const memory_byte_size:bigint = len*32n
        const memory_size_word:bigint = (memory_byte_size +31n) /32n
        const memory_cost:bigint = (memory_size_word**2n) /512n +(3n*memory_size_word)

        return memory_cost
    }

    memory_expansion_cost (offset:bigint):bigint{
        // memory_expansion_cost = new_memory_cost - last_memory_cost
        const len_memory = BigInt(this._memory.length)
        const new_memory_cost:bigint = this.memorycost(offset +1n)
        const last_memory_cost:bigint = this.memorycost(len_memory)
        const memory_expansion_cost = new_memory_cost - last_memory_cost

        return memory_expansion_cost<0?BigInt(0):memory_expansion_cost
    }



}