import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {TodoState} from '../../store/rootState';
import {TodoActions} from '../../store/modules/todo/actions';
import {Filter as TodoFilter} from '../../store/modules/todo/model';
import styles from './style.css';

interface Props extends RouteComponentProps<void> {
    todos: TodoState;
    actions: TodoActions;
    filter: TodoFilter;
}

export default class Todo extends React.Component<Props> {
    private defaultProps: Partial<Props> = {
        filter: TodoFilter.SHOW_ALL
    };

    constructor(props: Props, context?: any) {
        super(props, context);
    }

    public render() {
        return (
            <div className={styles.normal}>jack</div>
        );
    }
}
