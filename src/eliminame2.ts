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

import { log } from "console"
import { ethers } from "ethers"



const code = "0x10101015"

const codew = BigInt("0x10101015")
console.log(codew);


const hex = ethers.getBytes(code)


console.log(hex[0]);
console.log(hex);
// console.log(hex.push(BigInt(244)));

