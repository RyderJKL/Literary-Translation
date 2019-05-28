import * as React from 'react';

export interface Props {
    title: string;
}

function Example({ title }: Props) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        document.title = `You Clicked ${count} times`;
    });

    React.useEffect(() => {
        interface Person {
            name: string;
            age: number;
            weight: number;
        }

        // type PickPartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>

        type personType = PartialPick<Person, 'name'>;
        // type personType2 = PickPartial<Person, 'name'>;

        const person: personType = {
            name: 'jack',
            age: 343
        };

        const person2: Person = {
            name: 'jack',
            age: 343,
            weight: 334
        };
    });

    return (
        <div>
            <h2>{title}</h2>
            <p>clicked {count}</p>
            <button onClick={() => setCount(count + 1)}>Click Me</button>
        </div>
    );
}

export default Example;
