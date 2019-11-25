import { useEffect } from 'react';
import { IRoute } from '@/typings';
import { getCurrentMenuItemWitPathname } from '@/layouts/utils';

export default function useDocumentTitle(route?: IRoute, pathname?) {
    useEffect(() => {
        const currentMenu = getCurrentMenuItemWitPathname(route, pathname);
        const currentTitle = currentMenu && currentMenu.name;
        const appTitle  =  process.env.APP_TITLE;

        document.title = currentTitle ? `${currentTitle} | ${appTitle}` : appTitle;

        return () => {
            document.title = appTitle;
        };
    }, [pathname]);
}
