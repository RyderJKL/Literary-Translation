import * as React from 'react';

import { Form, Input, Button } from 'lego-ui';
import { CreateFormProps } from 'lego-ui/dist/lib/form'
import style from './style.scss';

export interface LoginProps {
    defaultActiveKey?: string;
    onTabChange?: (key: string) => void;
    style?: React.CSSProperties;
    onSubmit?: (error: any, values: any) => void;
    className?: string;
    form: CreateFormProps['form'];
}

const UserLogin: React.FC<LoginProps> = (props: LoginProps) => {
    const {
        form: { Validator, verify }
    } = props;

    const verifyForm = () => {
        verify((error, values) => {
            if (error) {
                console.log(error, values);
                return;
            }
        });
    };

    return (
        <Form>
            <Form.Item required={true} label={'用户名'}>
                <Validator name='name' rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input type='text' />
                </Validator>
            </Form.Item>
            <Form.Item required={true} label={'密码'}>
                <Validator name='password' rules={[{ min: 3, message: '请输入密码' }]}>
                    <Input type='text' />
                </Validator>
            </Form.Item>
            <Button className={style.loginSubmitButton} onClick={verifyForm} type={'primary'}>登录</Button>
        </Form>
    );
};

export default Form.createForm()(UserLogin);
