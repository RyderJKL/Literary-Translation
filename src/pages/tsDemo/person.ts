export enum Choose {
    Wife = 1,
    Mother = 2
}

export function question(choose: Choose): void {
    console.log('你老婆和你妈妈同时掉进水里你先救哪个?');
    console.log('你的选择是： ' + choose);
}

class Person {
    public name: string;
    public age: number;
    public labels: Array<string>;
    public wives: string[];
    public contact: [string, number];
    public other: any;
    public saveMonter: boolean = true;

    constructor() {
        console.log('logs');
    }

    public anwser(): Choose {
        return this.saveMonter ? Choose.Mother : Choose.Wife;
    }

    public hello(): void {
        console.log(`hello i'm ${this.name}`);
    }

    public empty() {
        console.log('empety');
    }

    public down(): never {
        while (true) {
            console.log('true');
        }
    }
}

export interface MyDate {
    year: string;
    month: string;
    day: string;
}

// export interface MyDateInit {
//     new(year: string, month: string, day: string): MyDate;
// }

export type MyDateInit = new(year: string, month: string, day: string) => MyDate;

// tslint:disable-next-line:max-classes-per-file
export class DateClass implements MyDate {
    public year: string;
    public month: string;
    public day: string;

    constructor(year: string, month: string, day: string) {
        this.year = year;
        this.month = month;
        this.day = day;
        return this;
    }
}

export function getDate(Class: MyDateInit, { year, month, day }): MyDate {
    return new Class(year, month, day);
}

export interface Counter {
    (start: number): string;

    interval: number;

    reset(): void;
}

export function getCounter(): Counter {
    const counter = ((start: number) => {
        console.log(`start is' ${start}`);
    }) as Counter;

    counter.interval = 124;
    counter.reset = () => {
        console.log('do you want reset counter?');
    };

    return counter;
}

// tslint:disable-next-line:align
// getDate(DateClass, { year: '2018', month: '09', day: '29'});

// const zhangsan: Person = new Person();
//
// zhangsan.name = '张三';
// zhangsan.age = 28;
// zhangsan.saveMonter = true;
// zhangsan.labels = ['穷', '帅', '抠搜', '老婆多'];
// zhangsan.wives = ['一号', '二号', '...', '七号'];
// zhangsan.contact = ['北京七环出租屋', 18810218349];
// zhangsan.other = '想要暴富！';
//
// const len = (zhangsan.other as string).length;
//
// console.log(len);
// question(zhangsan.anwser());
//
// zhangsan.hello();
//
// console.log(zhangsan.empty());
//
// // tslint:disable-next-line:align no-unused-expression
// export zhangsan;

