import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, utils, Checkbox, Icon } from 'lego-ui';
import { CreateFormProps } from 'lego-ui/dist/lib/form';
import styles from './style.scss';

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

const { preClass } = utils;

const UserLogin: React.FC<LoginProps> = (props: LoginProps) => {
    const {
        form: { Validator, verify },
        submitLoading,
        submitButtonDisabled = false
    } = props;

    const [username, setUsername] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

    const verifyForm = () => {
        verify((error, values) => {
            if (props.onSubmit && !error) {
                props.onSubmit(values);
            }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13) {
            verifyForm();
        }
    };

    return (
        <Form labelPosition='top'>
            <Form.Item required={true} label='账号'>
                <Validator name='username' rules={[{ required: true, message: '请输入用账号' }]}>
                    <Input
                        value={username}
                        size='large'
                        placeholder=''
                        prefix={<Icon type='account' />}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Validator>
            </Form.Item>
            <Form.Item required={true} label='密码'>
                <Validator name='password' rules={[{ required: true, message: '请输入密码' }]}>
                    <Input
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        size='large'
                        placeholder=''
                        prefix={<Icon type='password' />}
                        suffix={
                            <button onClick={e => setPasswordVisible(!passwordVisible)} className={styles.pwdVisbleBtn}>
                                <Icon type={passwordVisible ? 'eye-close' : 'eye'} />
                            </button>
                        }
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Validator>
            </Form.Item>
            <Form.Item className={preClass('mb-22')}>
                <Link to='/user/forget' className={styles.forgetPassword}>
                    忘记密码？
                </Link>
                <Validator name='auto_login' rules={[{ required: true, message: '请输入密码' }]}>
                    <Checkbox label='自动登录' />
                </Validator>
            </Form.Item>
            <Button
                onClick={verifyForm}
                block={true}
                size='large'
                disabled={submitButtonDisabled}
                loading={submitLoading}
                type='primary'
            >
                登录
            </Button>
        </Form>
    );
};

export default Form.createForm()(UserLogin);
