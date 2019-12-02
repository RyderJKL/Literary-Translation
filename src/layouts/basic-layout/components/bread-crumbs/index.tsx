import * as React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'lego-ui';

export interface IMenuItem {
    children?: [];
    name?: string;
    path?: string;
    title?: string;
}

export interface IBreadCrumbsProps {
    breadCrumbsData: IMenuItem[];
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({ breadCrumbsData }) => {
    const renderBreadCrumbItem = (breadCrumbsList: IMenuItem[]) => {
        return breadCrumbsList.map((item: IMenuItem, index: number) => {
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
