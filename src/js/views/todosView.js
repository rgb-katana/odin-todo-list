'use strict';

import { createEl } from '../helpers';
import expandSvg from '../../img/arrow-expand.svg';
import deleteSvg from '../../img/delete.svg';

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
        <use href="${expandSvg}#expand"></use>
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
    todosLists.append(todoEl);
  }
}

function createAddTodo() {
  const addContainer = createEl('div', ['todos__add']);
  const addBtn = createEl('button', ['todoss__add-btn']);
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
