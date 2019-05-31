import * as React from 'react';
import {TodoActionType} from '../../../store/modules/todo/actions';
import {TodoModel} from '../../../store/modules/todo/model';
import TodoItem from '../Item';
import * as style from './style.css';

export interface Props {
    todos: TodoModel[];
    actions: TodoActionType;
}

const TodoList = (props: Props) => {
    const {todos, actions} = props;

    const renderToggleAll: () => JSX.Element | void = () => {
        if (todos.length > 0) {
            const hasInCompleted = todos.some((todo) => !todo.completed);

            return (
                <input
                    className={style.toggleAll}
                    type='checkbox'
                    checked={hasInCompleted}
                    onChange={actions.completeAll}
                />
            );
        }
    };

    return (
        <section className={style.main}>
            {renderToggleAll()}
            <ul className={style.normal}>
                {
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            completeTodo={actions.completeTodo}
                            deleteTodo={actions.deleteTodo}
                            editTodo={actions.editTodo}
                        />
                    ))
                }
            </ul>
        </section>
    );
};

export default TodoList;
// export default class TodoList extends React.Component<Props> {
//     public renderToggleAll(): JSX.Element | void {
//         const {todos, actions} = this.props;
//         if (todos.length > 0) {
//             const hasInCompleted = todos.some((todo) => !todo.completed);
//             return (
//                 <input
//                     className={style.toggleAll}
//                     type='checkbox'
//                     onChange={actions.completeAll}
//                 />
//             );
//         }
//     }
//
//     public render() {
//         const {todos, actions} = this.props;
//
//         return (
//             <section className={style.main}>
//                 {this.renderToggleAll()}
//                 <ul className={style.normal}>
//                     {
//                         todos.map((todo) => (
//                             <TodoItem
//                                 key={todo.id}
//                                 todo={todo}
//                                 completeTodo={actions.completeTodo}
//                                 deleteTodo={actions.deleteTodo}
//                                 editTodo={actions.editTodo}
//                             />
//                         ))
//                     }
//                 </ul>
//             </section>
//         );
//     }
// }
