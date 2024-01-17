
export class InvalidStackValue extends Error {
    constructor(value:bigint | undefined) {
        super(`El valor ${value} es invalido`)
    }
}


export class StackOverflow extends InvalidStackValue {

}

export class StackUnderflow extends InvalidStackValue {

}

export class IndexOutOfBonds extends Error{
    
}