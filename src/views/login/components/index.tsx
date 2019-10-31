import * as React from 'react';

import Form, { CreateFormProps } from 'lego-ui/dist/lib/form';
import Input from 'lego-ui/dist/lib/Input';
import Button from 'lego-ui/dist/lib/Button';

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
            console.log(error, values);
        });
    };

    return (
        <Form>
            <Form.Item required={true} label='账号'>
                <Validator name='name' rule={[{ min: 3, message: '姓名最少3个字' }]}>
                    <Input type='text' />
                </Validator>
            </Form.Item>
            <Button onClick={verifyForm}>登录</Button>
        </Form>
    );
};

export default Form.createForm()(UserLogin);
