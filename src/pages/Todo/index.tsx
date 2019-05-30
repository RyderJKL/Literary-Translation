import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import { connect } from 'react-redux';
import RootState, {TodoState} from '../../store/rootState';
import {TodoActions} from '../../store/modules/todo/actions';
import {Filter as TodoFilter, TodoModel} from '../../store/modules/todo/model';
import styles from './style.css';
import Header from '../../components/Todo/Header';

const FILTER_VALUES:
const FILTER_FUNCION: Record<TodoFilter, (todo: TodoModel) => boolean> = {
    [TodoFilter.SHOW_ALL]: () => true,
    [TodoFilter.SHOW_ACTIVE]: (todo) => !todo.completed,
    [TodoFilter.SHOW_COMPLETED]: (todo) => todo.completed,
};

interface Props extends RouteComponentProps<void> {
    todos: TodoState;
    actions: TodoActions;
    filter: TodoFilter;
}

@connect(
    (state: RootState, ownProps): Pick<Props, 'todos' | 'filter'> => {
        const hash = ownProps.location && ownProps.location.hash.replace('#', '');
        const filter = FILTER_VALUES.find((value) => value === hash) || TodoModel.Filter.SHOW_ALL;
        return { todos: state.todos, filter };
    }
)
export default class Index extends React.Component<Props> {
    private defaultProps: Partial<Props> = {
        filter: TodoFilter.SHOW_ALL
    };

    constructor(props: Props, context?: any) {
        super(props, context);
    }

    public render() {
        const {todos, actions, filter} = this.props;
        const activeCount = todos.length - (todos.filter((todo) => !todo.completed)).length;
        const filteredTodos = filter ? todos.filter(FILTER_FUNCION[filter]) : todos;
        const completedCount = todos.filter((todo) => todo.completed).length;

        return (
            <div className={styles.normal}>
                <Header addToDo={actions.addTodo}/>
            </div>
        );
    }
}
