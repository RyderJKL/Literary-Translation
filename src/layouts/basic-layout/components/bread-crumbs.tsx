import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Breadcrumb from 'lego-ui/dist/lib/breadcrumb';
import { IMenuItem } from '@/typings';
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
        setBreadCrumbsData(matchMenus);
    };

    React.useEffect(() => {
        refreshBreadCrumbs();

        history.listen(location => {
            refreshBreadCrumbs();
        });
    }, []);

    return (
        <Breadcrumb>
            {breadCrumbsData.map(item => (
                <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default withRouter(BreadCrumbs);
