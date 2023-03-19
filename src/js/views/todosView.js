'use strict';

import { createEl } from '../helpers';
import expandSvg from '../../img/arrow-expand.svg';
import deleteSvg from '../../img/delete.svg';
import plusSvg from '../../img/plus.svg';
import pencilSvg from '../../img/pencil.svg';
import returnSvg from '../../img/return.svg';
import checkSvg from '../../img/check.svg';
import { format, parse } from 'date-fns';

const projectTitle = document.querySelector('.todos__title');
const todosLists = document.querySelector('.todos__list');
const addTodoBtn = document.querySelector('.todos__add');

export function renderTodos(title, todos) {
  projectTitle.innerText = title;
  todosLists.innerHTML = '';

  for (const todo in todos) {
    const curTodo = todos[todo];

    const todoEl = createEl('div', ['todos__todo', 'todo']);

    const todoTitle = createEl('h3', ['todo__title'], curTodo['title']);
    const todoDueDate = createEl('h4', ['todo__due-date'], 'Due: ');
    todoDueDate.insertAdjacentHTML(
      'beforeend',
      `
      <span class="date">${curTodo['due']}</span>
      `
    );
    const todoControls = createEl('div', ['todo__controls']);
    const expandBtn = createEl('button', ['todo__expand']);
    expandBtn.insertAdjacentHTML(
      'afterbegin',
      `
      <svg>
        <use href="${pencilSvg}#pencil"></use>
      </svg>
      `
    );
    const deleteBtn = createEl('button', ['todo__delete']);
    deleteBtn.insertAdjacentHTML(
      'afterbegin',
      `
    <svg>
      <use href="${deleteSvg}#delete"></use>
    </svg>
    `
    );

    todoControls.append(expandBtn, deleteBtn);
    todoEl.append(todoTitle, todoDueDate, todoControls);
    todoEl.dataset.todoNum = todo;
    todosLists.append(todoEl);
  }
}

export function clearAllTodos() {
  projectTitle.innerText = 'No Project Selected';
  todosLists.innerHTML = '';
}

function createAddTodo() {
  const addContainer = createEl('div', ['todos__add']);
  const addBtn = createEl('button', ['todos__add-btn']);
  addBtn.insertAdjacentHTML(
    'afterbegin',
    `
    <svg>
      <use href="${plusSvg}#plus"></use>
    </svg>
    `
  );
  addContainer.append(addBtn);
  return addContainer;
}

export function RenderPlusTodo() {
  todosLists.append(createAddTodo());
}

export function renderEditTodo(curTodo, todoNum, task, date) {
  const todoEl = createEl('div', ['todos__todo', 'todo--edit']);

  const realTask = task.innerText;

  const titleInput = createEl('input', ['todo__title', 'todo__title--edit']);
  titleInput.type = 'text';
  titleInput.placeholder = realTask;
  titleInput.maxLength = '50';

  curTodo.innerHTML = '';
  curTodo.classList.add('todo--edit');
  curTodo.append(titleInput);

  const dateInput = createEl('input', [
    'todo__due-date',
    'todo__due-date--edit',
  ]);

  const realDate = date.querySelector('.date').innerText;
  const dateParsed = parse(realDate, 'MM, dd, y', new Date());
  const formattedDate = format(dateParsed, 'yyyy-MM-dd');
  dateInput.type = 'date';
  dateInput.value = formattedDate;

  curTodo.append(dateInput);

  const todoControls = createEl('div', [
    'todo__controls',
    'todo__controls--edit',
  ]);

  const returnBtn = createEl('button', ['todo__return']);
  returnBtn.insertAdjacentHTML(
    'afterbegin',
    `
    <svg>
      <use href="${returnSvg}#return"></use>
    </svg>
    `
  );

  const checkBtn = createEl('button', ['todo__check']);
  checkBtn.insertAdjacentHTML(
    'afterbegin',
    `
    <svg>
      <use href="${checkSvg}#check"></use>
    </svg>
    `
  );

  todoControls.append(returnBtn, checkBtn);
  curTodo.append(todoControls);

  return todoEl;
}
