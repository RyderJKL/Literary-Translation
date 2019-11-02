import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { IMenuItem } from '@/typings';

import { toJS } from 'mobx';
import Breadcrumb from 'lego-ui/dist/lib/breadcrumb';
import { matchMenusWithPathname } from '@/layouts/basic-layout/components/side-bar/utils';

export interface IBreadCrumbsProps extends RouteComponentProps {
    menusData: IMenuItem[];
}

const BreadCrumbs: React.FC<IBreadCrumbsProps> = ({ menusData, children, history }) => {
    const [breadCrumbsData, setBreadCrumbsData] = React.useState<IMenuItem[]>([]);

    const refreshBreadCrumbs = () => {
        const {
            location: { pathname }
        } = history;

        const matchMenus = matchMenusWithPathname(menusData, pathname);
        // const getHomeMenus = matchMenusWithPathname(menusData, '/home');
        // console.log(toJS(matchMenus));
        // console.log(toJS(getHomeMenus));
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
