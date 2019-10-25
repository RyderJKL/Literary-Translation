import { useEffect } from 'react';

export default function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = 'lego-ui-admin-pro';
        };
    }, [title]);
}
