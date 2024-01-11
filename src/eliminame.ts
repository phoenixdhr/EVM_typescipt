import { ethers, hexlify } from 'ethers';
// getBytes es similar a hexlify

// Ejemplo de entrada en diferentes formatos
let hexString = '0x1234560aff';
let array = [1, 35, 69,]; // Array de números
let byteArray = new Uint8Array([257]);

// Uso de getBytes que es lo mismo que arrayify
let bytesFromHexString = ethers.getBytes(hexString);
// let bytesFromArray = ethers.getBytes(array);
let bytesFromByteArray = ethers.getBytes(byteArray);

console.log("bytesFromHexString => ",bytesFromHexString, typeof(bytesFromHexString)); // Uint8Array representando el hexString
// console.log(bytesFromArray);     // Uint8Array representando el array
console.log("byteArray => ",byteArray, typeof(byteArray))
console.log("bytesFromByteArray => ",bytesFromByteArray, typeof(bytesFromByteArray)); // Uint8Array original, ya que es una entrada válida
let arra= [223,34,3,4]
console.log("typeof(arra) ",typeof(arra));

console.log("byteArray =>", byteArray);

const hexlifyval = hexlify(byteArray)
console.log("hexlifyval => ",hexlifyval);
console.log("hexlifyval => ",typeof hexlifyval);
console.log("hexlifyval to BigInt => ", BigInt(hexlifyval));

