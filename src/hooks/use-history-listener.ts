import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useHistoryListener(callback: () => any) {
    const history = useHistory();

    useEffect(() => {
        const unListen = history.listen(() => callback());

        return () => unListen()
    });
}
