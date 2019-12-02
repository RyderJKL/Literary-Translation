import * as React from 'react';
import { Spin, Select, Form } from 'lego-ui';

import { of } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';

import ModelConnect from './model-connect';
import { useHighState } from '@/hooks';

import formStore, { BasicFormStore } from './store';
import intent, { Intent } from './intent';

export interface BasicFormProps {
    model: BasicFormStore;
    intent: Intent;
}

export interface State {
    loading: boolean;
}

const BasicForm: React.FC<BasicFormProps> = (props) => {
    const { modules, environments } = props.model;
    const { getConfigList$ } = props.intent;

    const [state, setFormState] = useHighState<State>({
        loading: false
    });

    React.useEffect(() => {
        of('').pipe(
            tap(() => setFormState({ loading: true })),
            switchMap(() => getConfigList$),
            finalize(() => setFormState({ loading: false }))
        );
    }, []);

    return (
        <div>
            Form basic
            {state.loading && <Spin loadingText={'数据加载中'} />}
            <Form>
                <Form.Item label={'产品'}>
                    <Select>
                        {modules &&
                            modules.map((module, index) => (
                                <Select.Option key={index} value={module.name}>
                                    {module.name}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item label={'上线环境'}>
                    <Select>
                        {environments &&
                            environments.map((environment, index) => (
                                <Select.Option key={index} value={environment.id}>
                                    {environment.name_cn}
                                </Select.Option>
                            ))}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ModelConnect(BasicForm, formStore, intent);
