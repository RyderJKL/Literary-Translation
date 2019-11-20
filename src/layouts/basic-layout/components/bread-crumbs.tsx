import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { IMenuItem } from '@/typings';

import { Breadcrumb } from 'lego-ui';
import { matchMenusWithPathname } from '@/layouts/utils';

export interface IBreadCrumbsProps extends RouteComponentProps {
    menusData: IMenuItem[];
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({ menusData, history }) => {
    const [breadCrumbsData, setBreadCrumbsData] = React.useState<IMenuItem[]>([]);

    const refreshBreadCrumbs = () => {
        const {
            location: { pathname }
        } = history;

        const matchMenus = matchMenusWithPathname(menusData, pathname);
        setBreadCrumbsData(matchMenus);
    };

    React.useEffect(() => {
        refreshBreadCrumbs();

        history.listen(location => {
            refreshBreadCrumbs();
        });
    }, []);

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

export default withRouter(BreadCrumbs);
