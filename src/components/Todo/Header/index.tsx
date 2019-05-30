import * as React from 'react';
import { addTodo } from '../../../store/modules/todo/actions';
import TodoTextInput from '../TextInput';

export interface Props {
    addToDo: typeof addTodo;
}

export default class Header extends React.Component<Props>{
   constructor(props: Props, context?: any) {
      super(props, context);
      this.handleSave = this.handleSave.bind(this);
   }

   private handleSave(text: string) {
       if (text.length) {
           this.props.addToDo({ text });
       }
   }

   public render() {
       return (
           <header>
               <TodoTextInput newTodo={true} onSave={this.handleSave} placeholder='What needs to be done?'/>
           </header>
       );
   }
}
