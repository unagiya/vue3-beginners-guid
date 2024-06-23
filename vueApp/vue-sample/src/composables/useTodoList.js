import {ref} from 'vue';
//外部から使えるようにExportする
export const useTodoList = (id) => {
    //ローカルストレージを確認し、todoListが存在していればparseし、なければ undifinedになるため空配列をセットする。

    const ls = localStorage.getItem('todoList');
    const todoListRef = ref([]);
    todoListRef.value = ls?JSON.parse(ls):[];

    const todo = todoListRef.value.find((todo) => todo.id === todo.id);
    const idx = todoListRef.value.findIndex((todo) => todo.id === todo.id);

    //return することでtodoとidxを外部からつかえるようにする。
    return {idx, todo}
}