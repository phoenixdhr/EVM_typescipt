export const decToHex0x = (num:number,bytes:number) => {
    const hex = num.toString(16)
    const len_number = bytes*2
    const len_Zeros = len_number-hex.length
    const hex_zeroLeft = "0".repeat(len_Zeros) + hex
    const hex0x = "0x" + hex_zeroLeft
    return hex0x
}