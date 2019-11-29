import * as React from 'react';
import { Spin } from 'lego-ui';

import { of } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import { delay, switchMap, tap } from 'rxjs/operators';

import formStore, { BasicFormStore } from './store';
import intent, { Intent } from './intent';
import ModelConnect from './model-connect';

import { useHighState } from '@/hooks';

export interface BasicFormProps {
    model: BasicFormStore;
    intent: Intent;
}

export interface State {
    loading: boolean;
}

const BasicForm: React.FC<BasicFormProps> = (props) => {
    const { environments } = props.model;
    const { getConfigList$ } = props.intent;

    const [state, setFormState] = useHighState<State>({
        loading: false
    });

    useObservable(() =>
        of('').pipe(
            tap(() => setFormState({ loading: true })),
            delay(2000),
            switchMap(() => getConfigList$),
            tap(() => setFormState({ loading: false }))
        )
    );

    React.useEffect(() => {
        console.log(state);
    });

    return (
        <div>
            Form basic
            {state.loading && <Spin loadingText={'数据加载中'} />}
            <h2>name {props.model.name}</h2>
            {environments && environments.map((item, key) => <span key={key}>{item.name}</span>)}
        </div>
    );
};

export default ModelConnect(BasicForm, formStore, intent);
