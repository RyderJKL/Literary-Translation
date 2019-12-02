import { useState, useEffect, useRef } from 'react';

export function useHighState<S>(
    initialState: S | (() => S)
): [S, (value: Partial<S>, callback?: (s: S) => void) => void] {
    const [state, setState] = useState<S>(initialState);
    const fn = useRef(undefined);

    function updateState(newValue: Partial<S>, cb?: (newState: S) => void) {
        setState((prevState) => {
            return {
                ...prevState,
                ...newValue
            };
        });

        if (typeof cb === 'function') {
            fn.current = cb;
        }
    }

    useEffect(() => fn.current && fn.current(state), [state, fn.current]);

    return [state, updateState];
}
