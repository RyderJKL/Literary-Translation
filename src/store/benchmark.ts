import { types, Instance } from 'mobx-state-tree';

export const TodoModel = types.model('Todo', {
    text: types.string
});

export const TodoStoreModel = types.model('TodoStore', {
    todos: types.array(TodoModel)
}).actions((self) => {
    function add(todo: TodoType) {
        self.todos.push(todo);
    }

    return {
        add
    };
});

export const createTodoStore = () => TodoStoreModel.create({
    todos: [
        {
            text: 'Get coffee'
        },
        {
            text: 'Get tea'
        },
        {
            text: 'Get milk'
        }
    ]
});

export type TodoType = Instance<typeof TodoModel>;
export type TodoStoreType = Instance<typeof TodoStoreModel>;
