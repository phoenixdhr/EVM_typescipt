import { argv } from "process"
import { ExecutionContext } from "./clases/execution";

const main =()=>{

    const code = argv[2]??"0x00"

    const execution = new ExecutionContext(code);
    execution.run()
}


main()