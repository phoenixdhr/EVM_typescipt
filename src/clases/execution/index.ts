import Memory from "../memory";
import Stack from "../stack";
import {ethers} from "ethers";
import { InvalidBytecode, InvalidProgramCountexIndex, UnknowOpcode } from "./erros";
import Instruction from "../instruction";
import Opcodes from "../../opcodes";


export class ExecutionContext {

    public _stack: Stack;
    public _memory: Memory;
    private readonly _code: Uint8Array;
    private _pc:number;
    private _stopped: boolean;
    public output:bigint;


    constructor(code: string) {

        if (!ethers.isHexString(code) || code.length%2 !== 0) {
            throw new InvalidBytecode()
        }

        this._stack = new Stack();
        this._memory = new Memory();
        this._pc = 0
        this._code = ethers.getBytes(code) // arrayify
        this._stopped = false
        this.output=BigInt(0)
    }


    stop(){
        this._stopped=true
    }


    run(){

        while (!this._stopped) {

            const currentPC = this._pc

            const instruction = this.fetchInstruction()
            instruction.execute(this)

            console.info(`${instruction.name} \t @pc ${currentPC}`)
            this._memory.print()
            this._stack.print()

        }
        const hexString = `0x${this.output.toString(16)}`;
        console.log(`Output: \t ${hexString}`);
        // console.log(`Output con hexlify: \t ${ethers.hexlify(hexString)}`);

    }

    readByteFromCode(bytes=1):bigint{
        const hexvalues= this._code.slice(this._pc,this._pc+bytes)
        const values = BigInt(ethers.hexlify(hexvalues))
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