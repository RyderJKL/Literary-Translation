import { TodoModel } from './modules/todo/model';

export type TodoState = TodoModel[];

export default interface RootState {
   todos: TodoState;
   router?: any;
}
