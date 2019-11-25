import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useHistoryListener(callback: () => any, fireImmediately = true) {
    const history = useHistory();

    useEffect(() => {
        if (fireImmediately) {
            callback();
        }

        const unListen = history.listen(() => callback());

        return () => unListen();
    }, null);
}
