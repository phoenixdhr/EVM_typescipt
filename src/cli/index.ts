import {  runCli, Command } from "command-line-interface";
import { ExecutionContext } from "../clases/execution";
import { LevelDB } from "../clases/store/custonLevelDB";
import { Level } from "level";
import { Trie } from "@ethereumjs/trie";

interface CliOptions {
    code:       string;
    gasLimit:   number;
}


const evm: Command<CliOptions> = {
    name: "evm",
    description: "Ethereum Virtual Machine",
    optionDefinitions:[
        {
            name    : "code",
            description: "Bytecode to execute by the EVM",
            type: "string",
            alias: "c",
            isRequired: true
        },
        {
            name    : "gasLimit",
            description: "Gas limit to execute the code",
            type: "number",
            alias: "g",
            isRequired: true
        }
    ],
    handle: async ({options:{code, gasLimit}})=>{
        const db = new LevelDB(new Level('DATACHAIN') as any) as any
        await db.open(); // Asegúrate de abrir la base de datos

        const trie = await Trie.create({
            db: db,
            useRootPersistence: true,
        })

        const executionContext = new ExecutionContext(code, trie,BigInt(gasLimit))

        await executionContext.run()
    }


}

runCli({rootCommand: evm, argv: process.argv})


//COMANDO DE EJECUCION
//npm run evm --code 0x6000600A576001600C57FE5B6001 --gasLimit  3444444