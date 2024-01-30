import Memory from "../memory";
import Stack from "../stack";
import { InvalidBytecode, InvalidProgramCountexIndex, UnknowOpcode } from "./erros";
import Instruction from "../instruction";
import Opcodes from "../../opcodes";
import {Trie} from '@ethereumjs/trie';
import { arrayify, hexlify, isHexString } from "@ethersproject/bytes";


export class ExecutionContext {

    public _stack: Stack;
    public _memory: Memory;
    private readonly _code: Uint8Array;
    private _pc:number;
    private _stopped: boolean;
    public output:bigint;
    public storage:Trie;


    constructor(code: string, storage: Trie) {

        if (!isHexString(code) || code.length%2 !== 0) {
            throw new InvalidBytecode()
        }

        this._stack = new Stack();
        this._memory = new Memory();
        this._pc = 0
        this._code = arrayify(code) // arrayify
        this._stopped = false
        this.output=BigInt(0)
        this.storage=storage
    }


    stop(){
        this._stopped=true
    }


    async run(){

        while (!this._stopped) {

            const currentPC = this._pc

            const instruction = this.fetchInstruction()
            await instruction.execute(this)

            console.info(`${instruction.name} \t @pc ${currentPC}`)
            this._memory.print()
            this._stack.print()
        }
        const hexString = `0x${this.output.toString(16)}`;
        console.log(`Output: \t ${hexString}`);
        console.log(`Hash Root BD: \t ${hexlify(this.storage.root())} `);
    }

    readByteFromCode(bytes=1):bigint{
        const hexvalues= this._code.slice(this._pc,this._pc+bytes)
        const values = BigInt(hexlify(hexvalues))
        this._pc+=bytes
        return values
    }

    private fetchInstruction():Instruction{

        if (this._pc>=this._code.length)  return Opcodes[0] // deberia usar la funcion stop()

        if (this._pc<0) throw new InvalidProgramCountexIndex()

        const opcode = this.readByteFromCode(1)

        const instruction = Opcodes[Number(opcode)]

        if (!instruction) throw new UnknowOpcode()

        return instruction
    }


}

