'use strict';

/*Что необходимо реализовать (первые 2 пункта по видео):
1) Добавление новых дел по нажатию ENTER и на кнопку ПЛЮС
2) Отмечать выполненные дела, выполненные дела должны перемещаться в блок с выполненными делами
3) Пустые дела добавляться не должны
4) Поле ввода после добавления дела должно очищаться
5) Удаление дел на кнопку КОРЗИНА
6) Сохранять данные о делах в localStorage (советую в виде массива)
внимание чтобы сохранить массив в localStorage необходимо его конвертировать в json формат
7) Дела из localStorage подгружаться должны автоматически при загрузки странице
внимание из localStorage мы всегда получаем json строку и её необходимо конвертировать обратно в формат javascript
8) Проверить, чтобы все работало и не было ошибок в консоли (Учесть вариант отсутствия объекта в localstorage клиента)
9) Сохранить проект в отдельном репозитории на GitHub
*/

const todoControl = document.querySelector('.todo-control'),
        headerInput = document.querySelector('.header-input'),
        todoList = document.querySelector('.todo-list'),
        todoCompleted = document.querySelector('.todo-completed');


        //получаем из LocalStorag массив данных если нет то пустой
        
    let todoData = localStorage.getItem('todoData') ? 
    JSON.parse(localStorage.getItem('todoData')) : []; 
    
    // [
        // {
        //     value: 'Сварить кофе',
        //     completed: false
        // },
        // {
        //     value: 'Помыть посуду',
        //     completed: true
        // }
    // ];

// 

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    headerInput.value = '';
    
    //добавляем в LocalStogage
    localStorage.setItem('todoData', JSON.stringify(todoData));

        todoData.forEach(function(item, id){
            const li = document.createElement('li');
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' + 
            `<button class="todo-remove" data-id=${id}></button>` + 
            '<button class="todo-complete"></button>' +
            '</div>';

            if(item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li);
            }
            //изменение статуса
            const btntodoCompleted = li.querySelector('.todo-complete');
            btntodoCompleted.addEventListener('click', function(){
                item.completed = !item.completed;
                render();
            });
            
    });
};

// удоление блока
function remove (event){
    const target = event.target;
    if(target.classList.contains('todo-remove')) {
        const delItem = todoData.find(function(item) {
            
            return item.id === target.dataset.id;
        });

        todoData.splice(target.dataset.id, 1);
        render();
    }
}
//кликаем по элементу и определяем по какому элементу в блоке
const todoContainer = document.querySelector('.todo-container');
todoContainer.addEventListener('click', remove);


todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    //добавляем блок если не пустой
    if(headerInput.value !== '') {todoData.push(newTodo);}
    else {return;}
    
    render();
});
render();