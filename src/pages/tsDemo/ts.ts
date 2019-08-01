import { bool } from 'prop-types';

class Person<T, U> {
    public other: T;
    public age: U;

    constructor(other: T, age: U) {
        // super(props);
        this.other = other;
        this.age = age;
    }
}

const p = new Person<string, number>('jack', 344);

p.age = 34;

interface A {
    name: string;
}

interface B {
    age: number;
}

function baby<T, U>(a: T & U) {
    console.log(a);
}

baby<A, B>({ name: 'jack', age: 34 });

function baby2(a: A & B) {
    console.log(a.age);
}

const some = (a: A & B) => {
    console.log(a.age);
};

const some2: (a: A & B) => any = (a) => {
    console.log(a.age, a.name);
};

const some3: (a: B) => any = (a) => {
    console.log(a.age);
};

const some4: (a: A | B) => any = (a) => {
    if (a as A) {

    }
};

interface Bird {
    fly();

    layEggs();
}

interface Fish {
    swim();

    layEggs();
}

function getSmallPet(): Bird | Fish {
    return {
        swim() {
            console.log('swim');
        },
        fly() {
            console.log('fly');
        },
        layEggs() {
            console.log('layEggs');
        },
    };
}

const pet = getSmallPet();

pet.layEggs();
// if ((pet as Fish).swim()) {
//     (pet as Fish).swim();
// }

function checkFish(pet1: Fish | Bird): pet1 is Fish {
    return (pet1 as Fish).swim !== undefined;
}

if (checkFish(pet)) {
    pet.swim();
}

const checkFish2 = (pet2: Fish | Bird): pet2 is Fish  => {
    return (pet2 as Fish).swim !== undefined;
};

// const checkFish3: (pet3: Fish | Bird) => pet3 is Fish = (pet3) => {
//     return (pet3 as Fish).swim !== undefined;
// }
