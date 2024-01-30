import { ExecutionContext } from "../execution";
import NotImplementedError from "./errors";

const defaultexecute=()=>{
    throw new NotImplementedError
}

export default class Instruction {
    public readonly opcode: number;
    public readonly name:string;
    public readonly execute:(ctx: ExecutionContext)=>void | Promise<void>;

    constructor(opcode:number, name:string, execute:(ctx: ExecutionContext)=>void=defaultexecute){
        this.opcode = opcode;
        this.name = name;
        this.execute = execute
    }
}

// export default Instruction