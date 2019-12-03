import * as React from 'react';
import { Select, Form, Input, Button, Card, Message } from 'lego-ui';

import { CreateFormProps } from 'lego-ui/dist/lib/form';

import { of } from 'rxjs';
import { finalize, switchMap, map, withLatestFrom, startWith, tap, debounceTime } from 'rxjs/operators';
import ModelConnect from '../../../utils/model-connect';
import { useHighState } from '@/hooks';

import formStore, { BasicFormStore } from './model';
import intent, { Intent } from './intent';
import { useEventCallback } from 'rxjs-hooks';

import { observer } from 'mobx-react-lite';
import styles from './style.scss';

export interface BasicFormProps extends CreateFormProps {
    model: BasicFormStore;
    intent: Intent;
    name?: string;
    forwardRef?: React.Ref<any>;
}

export interface FromState {
    module: string;
    environment: string;
    updateType: string;
    changeReason: string;
}

const BasicForm: React.FC<BasicFormProps & FromState> = observer(
    ({ forwardRef, ...props }) => {
        const { modules, environments, updateTypes } = props.model;
        const { getConfigList$, submitForm$ } = props.intent;

        const {
            form: { Validator, verify }
        } = props;

        const [formState, setFormState] = useHighState<FromState>({
            module: '',
            environment: '',
            updateType: '',
            changeReason: ''
        });

        React.useEffect(() => {
            of('')
                .pipe(switchMap(() => getConfigList$))
                .subscribe();
        }, []);

        const [onSubmit, [submitLoading]] = useEventCallback(
            (event$, formState$) =>
                event$.pipe(
                    debounceTime(500),
                    withLatestFrom(formState$),
                    // withLatestData[1][0] <=> [event, [formState]]
                    map((withLatestData) => withLatestData[1][0]),
                    switchMap((formState) =>
                        submitForm$(formState).pipe(
                            startWith([true]),
                            finalize(() => [false])
                        )
                    ),
                    tap(() => Message.$message({ type: 'success', content: '提交成功' }))
                ),
            [false],
            [formState]
        );

        const preSubmit = () => {
            verify((error, values) => {
                if (!error) {
                    onSubmit(values);
                }
            });
        };

        return (
            <div ref={forwardRef}>
                <Card>
                    <h2>{props.name}</h2>
                    <Form className={styles.basicForm}>
                        <Form.Item required={true} labelPosition={'left'} label={'上线产品'}>
                            <Validator name='module' rules={[{ required: true, message: '请选择产品' }]}>
                                <Select onChange={(value) => setFormState({ module: value })}>
                                    {modules &&
                                        modules.map((module, index) => (
                                            <Select.Option key={index} value={module.name}>
                                                {module.name}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Validator>
                        </Form.Item>
                        <Form.Item required={true} labelPosition={'left'} label={'上线环境'}>
                            <Validator name='environment' rules={[{ required: true, message: '请选择上线环境' }]}>
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
                            </Validator>
                        </Form.Item>
                        <Form.Item required={true} labelPosition={'left'} label={'变更类型'}>
                            <Validator name='updateType' rules={[{ required: true, message: '请选择变更类型' }]}>
                                <Select onChange={(value) => setFormState({ updateType: value })}>
                                    {updateTypes &&
                                        updateTypes.map((updateItem, index) => (
                                            <Select.Option key={index} value={updateItem}>
                                                {updateItem}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Validator>
                        </Form.Item>
                        <Form.Item required={true} labelPosition={'left'} label={'变更原因'}>
                            <Validator name='changeReason' rules={[{ required: true, message: '请输入变更原因' }]}>
                                <Input
                                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFormState({ changeReason: e.target.value })
                                    }
                                />
                            </Validator>
                        </Form.Item>
                        <div className={styles.basicFormSubmitButtonWrapper}>
                            <Button loading={submitLoading} type={'primary'} onClick={preSubmit}>
                                提交
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        );
    },
    { forwardRef: true }
);

export default ModelConnect(Form.createForm()(BasicForm), formStore, intent);
