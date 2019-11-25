import * as React from 'react';
import { CreateFormProps } from 'lego-ui/dist/lib/form';
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
declare const _default: any;
export default _default;
