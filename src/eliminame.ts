// ./examples/basicUsage.ts

import { Trie } from '@ethereumjs/trie'
import { bytesToUtf8, MapDB, utf8ToBytes } from '@ethereumjs/util'
import { Level } from 'level'
import { LevelDB } from './clases/store/custonLevelDB'

async function test() {

  const db = new LevelDB(new Level('MY_TRIE_DB_LOCATION') as any ) as any;
  await db.open(); // Asegúrate de abrir la base de datos

  const trie = new Trie({ db: db,
  useRootPersistence:true})
  // console.log(await trie.database().db)
  await trie.put(utf8ToBytes('test'), utf8ToBytes('one'))
  console.log("ta mate");

  const value = await trie.get(utf8ToBytes('test'))
  console.log(value ? bytesToUtf8(value) : 'not found')

}

test()