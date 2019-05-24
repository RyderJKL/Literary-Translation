import * as React from 'react';

export interface Props {
    title: string;
}

function Example({ title }: Props) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        document.title = `You Clicked ${count} times`;
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
