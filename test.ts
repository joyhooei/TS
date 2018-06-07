// 基类
class Animal {
    name: string;

    constructor(theName: string) {
        this.name = theName;
    }

    eat() {
        console.log(`${this.name} 吃食物。`);
    }
}

// 子类继承基类
class Dog extends Animal {
    constructor(theName: string) {
        super(theName);
    }

    eat() {
        super.eat();
        console.log('并且吃的是狗粮。');
    }
}


class People extends Animal {
    constructor(theName: string) {
        super(theName);
    }

    // 子类重写基类方法
    eat() {
        console.log(`${this.name} 拒绝吃狗粮。`);
    }
}

let animal = new Animal('动物');
animal.eat();

let dog: Animal;
dog = new Dog('狗');
dog.eat();

let people: Animal;
people = new People('人类');
people.eat();