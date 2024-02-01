import { ExecutionContext } from "../execution";
import NotImplementedError from "./errors";

// const defaultexecute=()=>{
//     throw new NotImplementedError
// }

interface ExecutionResult {
    gasFee:number
}

export default class Instruction {
    public readonly opcode: number;
    public readonly name:string;
    public readonly execute:(ctx: ExecutionContext)=>Promise<ExecutionResult>;


    constructor(
        opcode_:number,
        name_:string,
        gasFee_:((ctx: ExecutionContext)=>Promise<number>)| number,
        execute_:(ctx: ExecutionContext)=>void
    ){  
        this.opcode = opcode_;
        this.name = name_;

        this.execute = async (ctx:ExecutionContext)=>{
            const gasfeeFunction = typeof gasFee_ === 'function' ? gasFee_ : ()=>gasFee_
            const effectGasFee = await gasfeeFunction(ctx)

            ctx.usegas(effectGasFee) //  siempre usa el gas antes de ejecutar la instrucción
            await execute_ (ctx)

            return {gasFee:effectGasFee}

        }
    }
}

// export default Instruction