/** Global definitions for development **/

// for style loader
declare module '*.css' {
    const content: any;
    export default content;
  // const styles: any;
  // export = styles;
}

declare module '*.scss' {
    const content: any;
    export default content;
    // const styles: any;
    // export = styles;
}

declare module 'googlemaps';

type WithFalse<T> = T | false;

// Omit type https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-377567046
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Omit example

// type OmitType = Omit<{name: string, age: number}, 'name'> // -> { age: number }

//  PartialPick https://stackoverflow.com/questions/53741993/typescript-partially-partial-type
type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/*
// PartialPick example

interface Person {
    name: string;
    age: number;
    weight: number;
}

// 如何 name 是必须的，那么在 personType 中 name 也是必须，而其他的参数，age 和 weight 则是可选的
type personType = PartialPick<Person, 'name'>;

const person: personType = {
    name: 'jack',
    age: 343
};*/

