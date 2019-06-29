import * as React from 'react';
import TodoActions from '../../../store/modules/todo/actions';
import { TodoModel } from '../../../store/modules/todo/model';
import TodoTextInput from '../TextInput';
import * as classNames from 'classnames';
import * as styles from './style.css';

export interface Props {
    todo: TodoModel;
    editTodo: typeof TodoActions.editTodo;
    deleteTodo: typeof TodoActions.deleteTodo;
    completeTodo: typeof TodoActions.completeTodo;
}

const TodoItem = (props: Props) => {
    const [editing, setEditing] = React.useState<boolean>(false);
    const { todo, completeTodo, deleteTodo } = props;
    let element;

    const handleDoubleClick = () => {
        setEditing(true);
    };

    const handleSave = (id: number, text: string) => {
        if (text.length === 0) {
            props.deleteTodo(id);
        } else {
            props.editTodo({ id, text });
        }

        setEditing(false);
    };

    if (editing) {
        element = (
            <TodoTextInput
                text={todo.text}
                editing={editing}
                onSave={(text) => todo.id && handleSave(todo.id, text)}
            />
        );
    } else {
        element = (
            <div className={styles.view}>
                <input
                    className={styles.toggle}
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => todo.id && completeTodo(todo.id)}
                />
                <label onDoubleClick={() => handleDoubleClick()}>{todo.text}</label>
                <button
                    className={styles.destroy}
                    onClick={() => todo.id && deleteTodo(todo.id)}
                />
            </div>
        );
    }

    const classes = classNames({
        [styles.completed]: todo.completed,
        [styles.editing]: editing,
        [styles.normal]: !editing
    });

    return (<li className={classes}>{element}</li>);
};

export default TodoItem;
//
// function TodoItem(props: Props):  {
//
// }
// export default class TodoItem extends React.Component<Props, State> {
//     constructor(props: Props, context?: any) {
//         super(props, context);
//         this.state = {editing: false};
//         this.handleDoubleClick = this.handleDoubleClick.bind(this);
//         this.handleSave = this.handleSave.bind(this);
//     }
//
//     public handleDoubleClick() {
//         this.setState({editing: true});
//     }
//
//     public handleSave(id: number, text: string) {
//         if (text.length === 0) {
//             this.props.deleteTodo(id);
//         } else {
//             this.props.editTodo({id, text});
//         }
//
//         this.setState({editing: false});
//     }
//
//     public render() {
//         const {todo, completeTodo, deleteTodo} = this.props;
//         const {editing} = this.state;
//         let element;
//
//         if (editing) {
//             element = (
//                 <TodoTextInput
//                     text={todo.text}
//                     editing={editing}
//                     onSave={(text) => todo.id && this.handleSave(todo.id, text)}
//                 />
//             );
//         } else {
//             element = (
//                 <div className={styles.view}>
//                     <input
//                         className={styles.toggle}
//                         type='checkbox'
//                         checked={todo.completed}
//                         onChange={() => todo.id && completeTodo(todo.id)}
//                     />
//                     <label onDoubleClick={() => this.handleDoubleClick()}>{todo.text}</label>
//                     <button
//                         className={styles.destroy}
//                         onClick={() => todo.id && deleteTodo(todo.id)}
//                     />
//                 </div>
//             );
//         }
//
//         const classes = classNames({
//             [styles.completed]: todo.completed,
//             [styles.editing]: editing,
//             [styles.normal]: !editing
//         });
//
//         return <li className={classes}>{element}</li>;
//    }
// }
