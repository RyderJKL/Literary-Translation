import * as React from 'react';

import { Form, Input, Button } from 'lego-ui/dist/lib';
import { CreateFormProps } from 'lego-ui/dist/lib/form';
import style from './style.scss';

export interface LoginProps {
    style?: React.CSSProperties;
    onSubmit?: (values: any) => void;
    className?: string;
    form: CreateFormProps['form'];
}

const UserLogin: React.FC<LoginProps> = (props: LoginProps) => {
    const {
        form: { Validator, verify }
    } = props;

    const [account, setAccount] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const verifyForm = () => {
        verify((error, values) => {
            if (props.onSubmit && !error) {
                props.onSubmit(values);
            }
        });
    };

    return (
        <Form>
            <Form.Item required={true} label={'用户名'}>
                <Validator name='account' rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input value={account} onChange={e => setAccount(e.target.value)} />
                </Validator>
            </Form.Item>
            <Form.Item required={true} label={'密码'}>
                <Validator name='password' rules={[{ required: true, message: '请输入密码' }]}>
                    <Input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </Validator>
            </Form.Item>
            <Button className={style.loginSubmitButton} onClick={verifyForm} type={'primary'}>
                登录
            </Button>
        </Form>
    );
};

export default Form.createForm()(UserLogin);
