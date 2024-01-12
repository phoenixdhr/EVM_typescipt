import { argv } from "process"
import { ExecutionContext } from "./clases/execution";

const main =()=>{
    // Obtención del tercer argumento de la línea de comandos.
    // Se utiliza "0x00" como valor predeterminado si no se proporciona ningún argumento.
    const code = argv[2]??"0x00"

    const execution = new ExecutionContext(code);
    execution.run()
}


main()