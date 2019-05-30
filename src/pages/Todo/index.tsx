import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import RootState, {TodoState} from '../../store/rootState';
import TodoActions, {TodoActionType} from '../../store/modules/todo/actions';
import {Filter as TodoFilter, TodoModel} from '../../store/modules/todo/model';
import { omit } from '../../utils';
import * as styles from './style.css';
import Header from '../../components/Todo/Header';
import TodoList from '../../components/Todo/List';
import Footer from '../../components/Todo/Footer';

const FILTER_VALUES = Object.keys(TodoFilter).map((key) => TodoFilter[key]);
const FILTER_FUNCION: Record<TodoFilter, (todo: TodoModel) => boolean> = {
    [TodoFilter.SHOW_ALL]: () => true,
    [TodoFilter.SHOW_ACTIVE]: (todo) => !todo.completed,
    [TodoFilter.SHOW_COMPLETED]: (todo) => todo.completed,
};

interface Props extends RouteComponentProps<void> {
    todos: TodoState;
    actions: TodoActionType;
    filter: TodoFilter;
}

@connect(
    (state: RootState, ownProps): Pick<Props, 'todos' | 'filter'> => {
        const hash = ownProps.location && ownProps.location.hash.replace('#', '');
        const filter = FILTER_VALUES.find((value) => value === hash) || TodoFilter.SHOW_ALL;
        return { todos: state.todos, filter };
    },
    (dispatch: Dispatch): Pick<Props, 'actions'> => ({
        actions: bindActionCreators(omit(TodoActions, 'Type'), dispatch)
    })
)

export default class Index extends React.Component<Props> {
    public static defaultProps: Partial<Props> = {
        filter: TodoFilter.SHOW_ALL
    };

    constructor(props: Props, context?: any) {
        super(props, context);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    public handleClearCompleted(): void {
        const hasCompletedTodo = this.props.todos.some((todo) => todo.completed || false);
        if (hasCompletedTodo) {
            this.props.actions.clearCompleted();
        }
    }

    public handleFilterChange(filter: TodoFilter): void {
        this.props.history.push(`#${filter}`);
    }

    public render() {
        const {todos, actions, filter} = this.props;
        const activeCount = todos.length - (todos.filter((todo) => !todo.completed)).length;
        const filteredTodos = filter ? todos.filter(FILTER_FUNCION[filter]) : todos;
        const completedCount = todos.filter((todo) => todo.completed).length;

        return (
            <div className={styles.normal}>
                <Header addToDo={actions.addTodo}/>
                <TodoList todos={filteredTodos} actions={actions}/>
                <Footer
                    filter={filter}
                    activeCount={activeCount}
                    completedCount={completedCount}
                    onClickClearCompleted={this.handleClearCompleted}
                    onClickFilter={this.handleFilterChange}
                />
            </div>
        );
    }
}
