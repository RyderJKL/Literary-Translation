import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Nprogress, utils, Spin } from 'lego-ui';

interface RouterPorps {
    router: RouteComponentProps<any>;
}

interface DynamicImportProps extends RouterPorps {
    title: string;
    layout: () => Promise<any>;
    component: () => Promise<any>;
}

interface DynamicImportState {
    withLayout: boolean;
    L: React.ComponentClass<RouterPorps>;
    C: React.ComponentClass<RouterPorps>;
}

const { $nprogress } = Nprogress;

class DynamicImport extends React.PureComponent<DynamicImportProps, DynamicImportState> {
    private destroyed = false;

    public constructor(props: DynamicImportProps) {
        super(props);

        $nprogress.start();

        this.state = {
            withLayout: utils.isExist(props.layout),
            C: null,
            L: null
        };
    }

    public componentDidMount() {
        const { withLayout } = this.state;
        const { layout, component } = this.props;
        const lastLoader = () =>
            component().then(({ default: C }) => {
                if (!this.destroyed) {
                    this.setState({ C }, () => $nprogress.done());
                }
            });

        if (withLayout) {
            layout().then(({ default: L }) => {
                if (!this.destroyed) {
                    this.setState({ L }, lastLoader);
                }
            });
            return;
        }

        lastLoader();
    }

    public componentWillUnmount() {
        this.destroyed = true;
    }

    public render() {
        const { withLayout, L, C } = this.state;
        const { router } = this.props;
        const placeholder = (
            <Spin loading={true}>
                <div style={{ height: 466 }} />
            </Spin>
        );

        const component = () => (C === null ? placeholder : React.createElement(C, { router }));

        if (withLayout) {
            return L === null ? placeholder : React.createElement(L, { router }, component());
        }

        return component();
    }
}

export default DynamicImport;
