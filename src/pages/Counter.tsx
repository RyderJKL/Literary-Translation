import * as React from 'react';

function Example({ title }: Props) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        document.title = `You Clicked ${count} times`;
    });

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>{title}Click Me</button>
        </div>
    );
}

export interface Props {
    title: string;
}

export default Example;
