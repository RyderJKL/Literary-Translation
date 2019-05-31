import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './style.css';

export interface Props {
    onSave: (text: string) => void;
    text?: string;
    placeholder?: string;
    newTodo?: boolean;
    editing?: boolean;
}

export interface State {
    text: string;
}

const TodoTextInput = (props: Props) => {
    const [text, setText] = React.useState<string>(props.text || '');

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        if (!props.newTodo) {
            props.onSave(value);
            setText('');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setText(value);
    };

    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value.trim();
        if (event.which === 13) {
            props.onSave(text);
            if (props.newTodo) {
                setText(value);
            }
            setText('');
        }
    };

    const classes = classNames(
        {
            [styles.edit]: props.editing,
            [styles.new]: props.newTodo,
        }
    );

    return (
        <input
            className={classes}
            type='text'
            autoFocus={true}
            placeholder={props.placeholder}
            value={text}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleSubmit}
        />
    );
};

export default TodoTextInput;
// export default class TodoTextInput extends React.Component<Props, State> {
//     constructor(porps: Props, context?: any) {
//         super(porps, context);
//         this.state = {text: this.props.text || ''};
//         this.handleBlur = this.handleBlur.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     private handleBlur(event: React.FocusEvent<HTMLInputElement>) {
//         const text = event.target.value.trim();
//         if (!this.props.newTodo) {
//             this.props.onSave(text);
//             this.setState({ text: ''});
//         }
//     }
//
//     private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//         const text = event.target.value.trim();
//         this.setState({text});
//     }
//
//     private handleSubmit(event: React.KeyboardEvent<HTMLInputElement>) {
//         const text = event.currentTarget.value.trim();
//         if (event.which === 13) {
//             this.props.onSave(text);
//             if (this.props.newTodo) {
//                 this.setState({text});
//             }
//             this.setState({ text: ''});
//         }
//     }
//
//     public render() {
//         const classes = classNames(
//             {
//                 [styles.edit]: this.props.editing,
//                 [styles.new]: this.props.newTodo,
//             }
//         );
//
//         return (
//             <input
//                 className={classes}
//                 type='text'
//                 autoFocus={true}
//                 placeholder={this.props.placeholder}
//                 value={this.state.text}
//                 onBlur={this.handleBlur}
//                 onChange={this.handleChange}
//                onKeyDown={this.handleSubmit}
//             />
//         );
//     }
// }
