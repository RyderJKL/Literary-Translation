import * as React from 'react';
import { Form, Input, Button } from 'lego-ui/dist/lib';
import { CreateFormProps } from 'lego-ui/dist/lib/form';
// import style from './style.scss';

export interface ILoginState {
    username: string;
    password: string;
}

export interface LoginProps {
    style?: React.CSSProperties;
    className?: string;
    onSubmit?: (values: any) => ILoginState;
    submitLoading?: boolean;
    submitButtonDisabled?: boolean;
    form: CreateFormProps['form'];
}

const UserLogin: React.FC<LoginProps> = (props: LoginProps) => {
    const {
        form: { Validator, verify },
        submitLoading,
        submitButtonDisabled = false
    } = props;

    const [username, setUsername] = React.useState<string>();
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
                <Validator name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input value={username} onChange={e => setUsername(e.target.value)} />
                </Validator>
            </Form.Item>
            <Form.Item required={true} label={'密码'}>
                <Validator name='password' rules={[{ required: true, message: '请输入密码' }]}>
                    <Input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </Validator>
            </Form.Item>
            <Button onClick={verifyForm} block={true} disabled={submitButtonDisabled} loading={submitLoading} type={'primary'}>
                登录
            </Button>
        </Form>
    );
};

export default Form.createForm()(UserLogin);
