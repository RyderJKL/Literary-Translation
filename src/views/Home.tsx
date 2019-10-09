import * as React from 'react';
import useStore from 'hooks/use-store';
import request$ from 'utils/request';
import { useEventCallback } from 'rxjs-hooks';
import { Observable, EMPTY } from 'rxjs';
import {
    map,
    filter,
    switchMap,
    debounceTime,
    distinctUntilChanged,
    catchError,
    retry
} from 'rxjs/operators';

export interface GitHubProps {
    name: string;
}

const Home = () =>  {
    const userStore = useStore((store) => store.user);
    const router = useStore((store) => store.router);

    const [handleInputChange, [value]] = useEventCallback((event$: Observable<React.ChangeEvent<HTMLInputElement>>) =>
        event$.pipe(
            map((event) => event.target.value),
            debounceTime(300),
            filter((inputValue: string) => !!inputValue),
            distinctUntilChanged(),
            switchMap((user) => request$.get(`/users/${user}`)),
            map((response: GitHubProps) => [response.name]),
            retry(),
            catchError((error) => {
                return EMPTY;
            })
        ), ['']
    );

    // function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    //    // const value = event.target.value;
    //    // const request = useObservable(() => request$.get(`/users/${value}`));
    //    // .subscribe((response) => {
    //    //      console.log(response);
    //    //  }, (error) => {
    //    //     // console.error(error);
    //    // });
    // }

    return (<div>
        <h2>Home</h2>
        {
            userStore.name
        }
        <h2>{value}</h2>
        <button onClick={() => router.push('/hello')} >go to hello</button>
        <input type='text' onChange={handleInputChange} />
    </div>);
};

export default Home;
