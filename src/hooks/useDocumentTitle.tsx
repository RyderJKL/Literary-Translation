import { useEffect } from 'react';

export default function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = title ? title : process.env.APP_TITLE;

        return () => {
            document.title = process.env.APP_TITLE;
        };
    }, [title]);
}
