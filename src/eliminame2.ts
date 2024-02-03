import { arrayify } from "@ethersproject/bytes"

let obj:Map<Uint8Array, Uint8Array> = new Map()

obj.set( arrayify(55), arrayify(550))


console.log(obj.get(arrayify(55))) // Uint8Array [ 0x02, 0x26 ]