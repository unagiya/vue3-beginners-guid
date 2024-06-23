import {ref} from 'vue';

const todoListRef = ref([]);

//外部から使えるようにExportする
export const useTodoList = (id) => {
    //ローカルストレージを確認し、todoListが存在していればparseし、なければ undifinedになるため空配列をセットする。

    const ls = localStorage.getItem('todoList');
    todoListRef.value = ls?JSON.parse(ls):[];

    const add = (task) => {
        const id = new Date().getTime();
        todoListRef.value.push({id: id, task: task});
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const editId = ref(-1);

    const show = (id) => {
        const todo = findById(id);
        editId.value = id;
        return todo.task;
    };

    const edit = (task) => {
        const todo = findById(editId.value);
        const idx = findIndexById(editId.value);
        todo.task = task;

        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };

    const del = (id) => {
        const todo = findById(id);

        const delMsg = '[' + todo.task + ']を削除しますか？';
        if (!confirm(delMsg)) return;

        const idx = findIndexById(id);
        todoListRef.value.splice(idx, 1);

        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const check = (id) => {
        const todo = findById(id);
        const idx = findIndexById(id);
        todo.checked = !todo.checked;

        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    return {todoListRef, add, show, edit, del, check}
}

const findById = (id) => {
    return todoListRef.value.find(item => item.id === id);
}

const findIndexById = (id) => {
    return todoListRef.value.findIndex(item => item.id === id);
}