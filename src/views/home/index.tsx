import * as React from 'react';
import useStore from '@/hooks/use-store';

import { useEventCallback } from 'rxjs-hooks';
import { Observable, EMPTY } from 'rxjs';
import { map, filter, switchMap, debounceTime, distinctUntilChanged, catchError, retry } from 'rxjs/operators';

import { Button } from 'lego-ui';

export interface IGitHubProps {
    name: string;
}

const Home = () => {
    // const { id, name, changeName } = useStore(store => ({
    //     id: store.common.id,
    //     name: store.common.name,
    //     changeName: store.common.changeName
    // }));
    //
    // const router = useStore(store => store.router);
    //
    // const [handleInputChange, [value]] = useEventCallback(
    //     (event$: Observable<React.ChangeEvent<HTMLInputElement>>) =>
    //         event$.pipe(
    //             map(event => event.target.value),
    //             debounceTime(300),
    //             filter((inputValue: string) => !!inputValue),
    //             distinctUntilChanged(),
    //             // switchMap(user => getUser(`/users/${user}`)),
    //             // map((response: IGitHubProps) => {
    //             //     changeName(response.name);
    //             //     return [response.name];
    //             // }),
    //             // retry(),
    //             // catchError(error => {
    //             //     console.log(error);
    //             //     return EMPTY;
    //             // })
    //         ),
    //     ['']
    // );

    return (
        <div>
            <h2>Home</h2>
            {/*{`${id}-${name}`}
            <h2>value{value}</h2>
            <input type='text' onChange={handleInputChange} />
            <Button type='default' onClick={() => router.push('/dashboard')}>
                go to dashboard
            </Button>*/}
        </div>
    );
};

export default Home;
