import * as React from 'react';
import {addTodo} from '../../../store/modules/todo/actions';
import TodoTextInput from '../TextInput';

export interface Props {
    addToDo: typeof addTodo;
}

const Header = (props: Props) => {
    const handleOnSave = (text: string) => {
        if (text.length) {
            props.addToDo({ text });
        }
    };

    return (
        <header>
            <TodoTextInput newTodo={true} onSave={handleOnSave} placeholder='What needs to be done?'/>
        </header>
    );
};

export default Header;
