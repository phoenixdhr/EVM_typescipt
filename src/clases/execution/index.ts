import Memory from "../memory";
import Stack from "../stack";
import {ethers} from "ethers";
import { InvalidBytecode } from "./erros";


export class ExecutionContext {

    private _stack: Stack;
    private _memory: Memory;
    private readonly _code: Uint8Array;
    private _pc:number;
    private _stopped: boolean;

    constructor(code: string) {

        if (!ethers.isHexString(code) || code.length%2 !== 0) {

            throw new InvalidBytecode()
        }

        this._stack = new Stack();
        this._memory = new Memory();
        this._pc = 0
        this._code = ethers.getBytes(code) // arrayify
        this._stopped = false
    }


    stop(){
        this._stopped=true
    }


    run(){
        const bytes = this._code.length/2

        while (!this._stopped) {
            if (this._pc>bytes) {
                break
            }
            const opcode = this.readByteFromCode()
            console.log(opcode);



        }
    }

    readByteFromCode(bytes=1):bigint{
        const hexvalues= this._code.slice(this._pc,this._pc+bytes)
        const values = BigInt(ethers.hexlify(hexvalues))
        this._pc+=bytes
        return values
    }


}