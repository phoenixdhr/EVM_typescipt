class Person {
    public name:string;
    public age:number;

    constructor(name:string, age:number) {
        this.name= name,
        this.age=age
    }

    getOld(){
        this.age+=1
    }
}

let person_C = new Person("David",25)
person_C.getOld()


const person_f = {
    name: "David",
    age:25
}

const getOld_f = (person: {name:string, age:number}) => Object.assign({},
    person, {age:person.age+1})

getOld_f(person_f)


let array = [1,2,3,4,5]
let array_2 =[]

for (let index = 0; index < array.length; index++) {
  array_2.push(array[index]*2)
}

let array_3 = array.map(item=>item*2)

