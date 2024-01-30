// import { validateHeaderValue } from "http";


// const obj= {"nombre":"dany",
//             "edad":25}

// console.log(obj["nombre"]);
// console.log(obj.nombre);


// const obj = ["dany", 25]


// const b ={
//     value:2
// }
// const addOne=(b:{value:number})=>Object.assign({},b, {value:b.value+1})
// const timesTwo=(b:{value:number})=>Object.assign({},b, {value:b.value*2})

// timesTwo(b)
// addOne(b)


// console.log(b);
// console.log(addOne(timesTwo(b)));
// console.log(timesTwo(addOne(b)));
// ______________________________
// ______________________________
// ______________________________

// const b ={
//     value:2
// }

// const addOne=(b:{value:number})=>{
//     const bb= {...b}
//     const bbb= {value: bb.value+=1};
//     return bbb};

// const timesTwo=(b:{value:number})=>{
//     const bb={...b}
//     const bbb= {value: bb.value*=2};
//     return bb}

// console.log(b);
// addOne(b)
// timesTwo(b)


// console.log(b);
// timesTwo(b)
// addOne(b)

// console.log(b);
// console.log(addOne(timesTwo(b)));
// console.log(timesTwo(addOne(b)));
// console.log(b);

import { decToHex0x } from "./metods/decToHex0x";

const _decToHex0x = (num:number,bytes:number) => {
    const hex = num.toString(16)
    const len_number = bytes*2
    const len_Zeros = len_number-hex.length
    const hex_zeroLeft = "0".repeat(len_Zeros) + hex
    const hex0x = "0x" + hex_zeroLeft
    return hex0x
}


console.log(decToHex0x(12,32));
decToHex0x(12,32)

// const num = 12;
// const numhex = num.toString(16)
// console.log("num =>",num ,"   numhex=> ", numhex, "   numhex.length=> ", numhex.length); // "1b"
// const len_Zeros = 64-numhex.length
// console.log("len_Zeros =>",len_Zeros); // "1b"
// console.log("0.repeat(len) =>", "0".repeat(len_Zeros)); // "1b"
// const numhex_zeroLeft = "0".repeat(len_Zeros) + numhex
// console.log("numhex_zeroLeft Len =>",numhex_zeroLeft.length ,"numhex_zeroLeft=> ", numhex_zeroLeft); // "1b"
// const numHex0x = "0x" + numhex_zeroLeft

