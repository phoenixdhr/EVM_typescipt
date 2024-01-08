class OffsetValueError extends Error {
    constructor(offset:bigint, value:bigint) {
        super(`El acceso a la memoria con Offset ${offset} y valor ${value} es invalido`)
    }
}


export class InvalidMemoryOffset extends OffsetValueError{}

export class InvalidMemoryValue extends OffsetValueError{}