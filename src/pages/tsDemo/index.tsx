import * as React from 'react';
import { baby } from '../Baby';
import { Choose, question, getDate, DateClass, getCounter } from './person';

export interface Props {
    title: string;
}

export default function Example({ title }: Props) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        document.title = `You Clicked ${count} times`;
        baby.getBabyName();
        question(Choose.Mother);
        const obj = { a: '23', b: 3434 };
        console.log(obj);
        console.log(getDate(DateClass, { year: '2019', month: '09', day: '28' }));
        const counter = getCounter();
        counter.interval = 3434;
        counter.reset();
        console.dir(counter);
    });

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>{title}Click Me</button>
        </div>
    );
}

