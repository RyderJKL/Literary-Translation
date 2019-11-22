import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, utils, Checkbox, Icon } from 'lego-ui';
import { CreateFormProps } from 'lego-ui/dist/lib/form';
import styles from './style.scss';

export interface LoginFormValues {
    username: string;
    password: string;
    auto_login: boolean;
}

export interface LoginFormProps extends CreateFormProps {
    style?: React.CSSProperties;
    className?: string;
    onSubmit?: (values: LoginFormValues) => void;
    submitLoading?: boolean;
    submitButtonDisabled?: boolean;
}

const { preClass } = utils;

const LoginForm: React.FC<LoginFormProps> = (props) => {
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
                props.onSubmit(values as LoginFormValues);
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
                <Validator name='username' rules={[{ required: true, message: '请输入账号' }]}>
                    <Input
                        value={username}
                        size='large'
                        placeholder='账号：admin 或 user'
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
                        placeholder='密码： lego-ui'
                        prefix={<Icon type='password' />}
                        suffix={
                            <button onMouseDown={() => setPasswordVisible(!passwordVisible)} className={styles.pwdVisbleBtn}>
                                <Icon type={passwordVisible ? 'eye-close' : 'eye'} />
                            </button>
                        }
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Validator>
            </Form.Item>
            <Form.Item className={preClass('mb-22')}>
                <Link to='/user/iforgot' className={styles.forgetPassword}>
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
                登 录
            </Button>
        </Form>
    );
};

export default Form.createForm()(LoginForm);
