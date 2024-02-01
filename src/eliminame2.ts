import internal from "stream";

const sec =(a:number,b:number) => a+b

const main =sec

const main2 = async (a:number,b:number) => {return await main(a,b)}

// Set the module and target options
// console.log("main2(1,2) ", await main2(1,2))
main2(1,2).then((val)=>{console.log("main2(1,2) ", val)})
// (async()=>{console.log("main2(1,2) ", await main2(1,2))})()

