import * as React from 'react';
import { findKeeper, findKeeperProto, Lion } from '../Baby';

export interface Props {
    title: string;
}

// type func1 = <T>(a: T[]) => T;
type Func1<T> = (a: T) => T;

type Func2 = <T>(a: T[]) => T;

export default function Example({ title }: Props) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        document.title = `You Clicked ${count} times`;
        // console.log(findKeeperProto(Lion));
        console.log(findKeeper(Lion).nametag);
    });

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>{title}Click Me</button>
        </div>
    );
}

