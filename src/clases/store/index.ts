// Importaciones de los módulos necesarios
import { MemoryLevel } from 'memory-level'
import { bytesToUtf8, utf8ToBytes, type BatchDBOp, type DB } from '@ethereumjs/util'
import type { AbstractLevel } from 'abstract-level'

// Opciones de codificación para las claves y valores en la base de datos
const ENCODING_OPTS = { keyEncoding: 'view', valueEncoding: 'view' }

// Definición de la clase LevelDB que implementa la interfaz DB
export class LevelDB implements DB {
  // Declaración del miembro privado _leveldb, del tipo AbstractLevel
  readonly _leveldb: AbstractLevel<
    string | Uint8Array | Uint8Array,
    string | Uint8Array,
    string | Uint8Array
  >

  // Constructor de la clase
  constructor(
    // Parametro opcional leveldb que puede ser de tipo AbstractLevel o null
    leveldb?: AbstractLevel<
      string | Uint8Array | Uint8Array,
      string | Uint8Array,
      string | Uint8Array
    > | null
  ) {
    // Inicialización del miembro _leveldb. Si leveldb no es proporcionado, se usa MemoryLevel
    this._leveldb = leveldb ?? new MemoryLevel(ENCODING_OPTS)
  }

  // Método asincrónico para obtener un valor de la base de datos
  async get(key: Uint8Array): Promise<Uint8Array | undefined> {

    try {
      // Intenta obtener el valor usando la clave proporcionada
      let value = await this._leveldb.get(key, ENCODING_OPTS)
      if (typeof value == "string") {
        return utf8ToBytes(value)
      }
      return value

    } catch (error: any) {
      // Maneja errores específicos, como la no existencia de una clave (error 404)
      if (error.notFound !== true) {
        throw error
      }
    }

  }

  // Método asincrónico para insertar un par clave-valor en la base de datos
  async put(key: Uint8Array, val: Uint8Array): Promise<void> {
    await this._leveldb.put(key, val, ENCODING_OPTS)
  }

  // Método asincrónico para eliminar un valor de la base de datos usando su clave
  async del(key: Uint8Array): Promise<void> {
    await this._leveldb.del(key, ENCODING_OPTS)
  }

  // Método asincrónico para realizar varias operaciones en la base de datos en un solo lote
  async batch(opStack: BatchDBOp[]): Promise<void> {
    await this._leveldb.batch(opStack, ENCODING_OPTS)
  }

  // Método para crear una copia superficial de la instancia de la base de datos
  shallowCopy(): DB {
    return new LevelDB(this._leveldb)
  }
  async  open(): Promise<void> {

  }
}
