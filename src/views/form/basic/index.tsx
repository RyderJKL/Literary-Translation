import * as React from 'react';
import { Spin, Select, Form, Input, Button, Card } from 'lego-ui';

import { of } from 'rxjs';
import { finalize, switchMap, tap, map, withLatestFrom, catchError, startWith } from 'rxjs/operators';
import ModelConnect from './model-connect';
import { useHighState } from '@/hooks';

import formStore, { BasicFormStore } from './model';
import intent, { Intent } from './intent';
import { useEventCallback } from 'rxjs-hooks';

export interface BasicFormProps {
    model: BasicFormStore;
    intent: Intent;
}

export interface FromState {
    module: string;
    environment: string;
    updateType: string;
    changeReason: string;
}

const BasicForm: React.FC<BasicFormProps & FromState> = (props) => {
    const { modules, environments, updateTypes } = props.model;

    const { getConfigList$, submitForm$ } = props.intent;

    const [loading, setLoading] = React.useState(false);

    const [formState, setFormState] = useHighState<FromState>({
        module: '',
        environment: '',
        updateType: '',
        changeReason: ''
    });

    React.useEffect(() => {
        of('')
            .pipe(
                tap(() => setLoading(true)),
                switchMap(() => getConfigList$),
                finalize(() => setLoading(false))
            )
            .subscribe();
    }, []);

    const [onSubmit, [submitLoading]] = useEventCallback(
        (event$, formState$) =>
            event$.pipe(
                withLatestFrom(formState$),
                map(([event, [formState]]) => formState),
                switchMap((submitData) =>
                    submitForm$(submitData).pipe(
                        map(() => [false]),
                        catchError(() => {
                            return of([false]);
                        }),
                        startWith([true])
                    )
                )
            ),
        [false],
        [formState]
    );

    return (
        <div>
            <Card>
                {loading && <Spin loadingText={'数据加载中'} />}
                <Form>
                    <Form.Item labelPosition={'top'} label={'产品'}>
                        <Select onChange={(value) => setFormState({ module: value })}>
                            {modules &&
                                modules.map((module, index) => (
                                    <Select.Option key={index} value={module.name}>
                                        {module.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item labelPosition={'top'} label={'上线环境'}>
                        <Select
                            onChange={(value) => {
                                setFormState({ environment: value });
                            }}
                        >
                            {environments &&
                                environments.map((environment, index) => (
                                    <Select.Option key={index} value={environment.id}>
                                        {environment.name}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item labelPosition={'top'} label={'变更类型'}>
                        <Select onChange={(value) => setFormState({ updateType: value })}>
                            {updateTypes &&
                                updateTypes.map((updateItem, index) => (
                                    <Select.Option key={index} value={updateItem}>
                                        {updateItem}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>
                    <Form.Item labelPosition={'top'} label={'变更原因'}>
                        <Input
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setFormState({ changeReason: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Button loading={submitLoading} type={'primary'} onClick={onSubmit}>
                        提交
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default ModelConnect(BasicForm, formStore, intent);
