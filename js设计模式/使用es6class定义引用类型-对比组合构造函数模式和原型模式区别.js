class Person{
    constructor (name, age, job){
        this.name = name
        this.age = age
        this.job = job
        this.friends = ['a','b']
    }
    sayName (){
        console.log(this.name)
    }
}

let person1 = new Person('zhang')
let person2 = new Person('li')

person1.friends.push('c')
person1.sayName()
// 很棒，每个实例都有自己单独的属性 即便是引用类型，也互不干扰
console.log(person1.friends) // [ 'a', 'b', 'c' ]
console.log(person2.friends) // [ 'a', 'b' ]
