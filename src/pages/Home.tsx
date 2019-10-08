import * as React from 'react';
import useStore from 'hooks/use-store';

const Home = () =>  {
    const userStore = useStore((store) => store.user);
    const router = useStore((store) => store.router);

    return (<div>
        <h2>Home</h2>
        {
            userStore.name
        }
        <button onClick={() => router.push('/hello')} >go to hello</button>
    </div>);
};

export default Home;
