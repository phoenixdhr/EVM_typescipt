import { argv } from "process"
import { ExecutionContext } from "./clases/execution";
import { Trie } from "@ethereumjs/trie";
import { Level } from 'level'
import { LevelDB } from "./clases/store/custonLevelDB";


const main = async () => {
    // Obtención del tercer argumento de la línea de comandos.
    // Se utiliza "0x00" como valor predeterminado si no se proporciona ningún argumento.
    const code = argv[2] ?? "0x00"
    const gaslimit = argv[3] ?? "22000"

    const db = new LevelDB(new Level('DATACHAIN') as any) as any
    await db.open(); // Asegúrate de abrir la base de datos

    // si se declara con await Trie.Create, entonces el root de la trie se guarda en la base de datos
    // se se declara con new Trie, entonces el root de la trie no se guarda en la base de datos
    const trie = await Trie.create({
        db: db,
        useRootPersistence: true,
    })

    const execution = new ExecutionContext(code, trie, BigInt(gaslimit));
    execution.run()
}


main()

// npx ts-node src/index.ts 0x6000600A576001600C57FE5B6001
// npm run evm1 0x6000600A576001600C57FE5B6001

// npx ts-node src/index.ts 0x6000600A576001600C57FE5B6001 31000
// npm run evm1 0x6000600A576001600C57FE5B6001    31000