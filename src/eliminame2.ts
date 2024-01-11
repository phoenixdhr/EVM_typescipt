import ethers, { toBeHex } from 'ethers';


// Suponiendo que toBeHex convierte números a hexadecimal
let number = 32323232//12345;
let hexFromNumber = toBeHex(number);
console.log(hexFromNumber); // Salida hipotética: '0x3039'

console.log(typeof(hexFromNumber)); // Salida hipotética: '0x3039'

// // Suponiendo que toBeHex convierte cadenas de texto a hexadecimal
// let text = 'Hello';
// let hexFromText = toBeHex(text);
// console.log(hexFromText); // Salida hipotética: '0x48656c6c6f'

