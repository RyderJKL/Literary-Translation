import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Breadcrumb } from 'lego-ui';

import useHistoryListener from '@/hooks/use-history-listener';
import { matchMenusWithPathname } from '@/layouts/utils';

import { IMenuItem } from '@/typings';

export interface IBreadCrumbsProps {
    menusData: IMenuItem[];
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({ menusData }) => {
    const [breadCrumbsData, setBreadCrumbsData] = React.useState<IMenuItem[]>([]);
    const {
        location: { pathname }
    } = useHistory();

    const getBreadCrumbs = () => {
        const matchMenus = matchMenusWithPathname(menusData, pathname);
        setBreadCrumbsData(matchMenus);
    };

    useHistoryListener(getBreadCrumbs);

    const renderBreadCrumbItem = breadCrumbsList => {
        return breadCrumbsList.map((item, index) => {
            if (item.children) {
                return <Breadcrumb.Item key={item.path || index}> {item.name}</Breadcrumb.Item>;
            }
            return (
                <Breadcrumb.Item key={item.path || index}>
                    {item.path ? <Link to={item.path}>{item.name}</Link> : item.name}
                </Breadcrumb.Item>
            );
        });
    };

    return <Breadcrumb>{renderBreadCrumbItem(breadCrumbsData)}</Breadcrumb>;
};

export default BreadCrumbs;
