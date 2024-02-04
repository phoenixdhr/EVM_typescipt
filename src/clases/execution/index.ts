import Memory from "../memory";
import Stack from "../stack";
import { GasInsuficiente, InvalidBytecode, InvalidProgramCountexIndex, UnknowOpcode } from "./erros";
import Instruction from "../instruction";
import Opcodes from "../../opcodes";
import {Trie} from '@ethereumjs/trie';
import { arrayify, hexlify, isHexString } from "@ethersproject/bytes";
import AccessSet  from "../AccessSet";

export class ExecutionContext {

    public _stack: Stack;
    public _memory: Memory;
    public _AccessSet:AccessSet;
    private readonly _code: Uint8Array;
    private _pc:number;
    private _stopped: boolean;
    public output:bigint;
    public storage:Trie;
    public readonly originalStorage:Trie;
    public gas:bigint;



    constructor(code: string,  storage: Trie, gas:bigint= BigInt(21000)) {

        if (!isHexString(code) || code.length%2 !== 0) {
            throw new InvalidBytecode()
        }

        this._stack = new Stack();
        this._memory = new Memory();
        this._AccessSet= new AccessSet();
        this._pc = 0
        this._code = arrayify(code) // arrayify
        this._stopped = false
        this.output=BigInt(0)
        this.storage=storage
        this.originalStorage=storage.shallowCopy()
        this.gas=gas

    }

    usegas(fee:number){
        this.gas-=BigInt(fee)
        if (this.gas<BigInt(0))  throw new GasInsuficiente()
    }


    stop(){
        this._stopped=true
    }


    async run(){

        while (!this._stopped) {

            const currentPC = this._pc

            const instruction = this.fetchInstruction()
            const currentAvaiableGas = this.gas
            const {gasFee}= await instruction.execute(this)

            console.info(`${instruction.name} \t @pc ${currentPC} \t gas=${currentAvaiableGas} \t cost= ${gasFee} gas`)

            this._stack.print()
            this._memory.print()
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


    jump(pc_destination:bigint) {
        if (!this.isValidJumpDestination(Number(pc_destination)))  throw new InvalidProgramCountexIndex()
        this._pc=Number(pc_destination)
    }

    private isValidJumpDestination(pc_destination:number):boolean{
        console.log("this._code[pc_destination] ==> ",this._code[Number(pc_destination)]);
        console.log("Opcodes[0x5b]?.opcode ==> ",Opcodes[0x5b]?.opcode);

        return this._code[pc_destination-1]==Opcodes[0x5b]?.opcode // Se resta -1, pero esto depende de como se implemente la EVM e influye en los valores que se ingresen como opdode
    }


}
