import { createAction } from 'redux-actions';
import { TodoModel } from './model';
import { Type } from './actionTypes';

export const addTodo = createAction<PartialPick<TodoModel, 'text'>>(Type.ADD_TODO);
export const editTodo = createAction<PartialPick<TodoModel, 'id'>>(Type.EDIT_TODO);
export const deleteTodo = createAction<TodoModel['id']>(Type.DELETE_TODO);
export const completeTodo = createAction<TodoModel['id']>(Type.COMPLETE_TODO);
export const completeAll = createAction(Type.COMPLETE_ALL);
export const clearCompleted = createAction(Type.CLEAR_COMPLETED);

const TodoActions = {
    Type,
    addTodo,
    editTodo,
    deleteTodo,
    completeTodo,
    completeAll,
    clearCompleted,
};

export type TodoActionType = Omit<typeof TodoActions, 'Type'>;

export default TodoActions;

