'use strict';

import { createEl } from '../helpers';
import pencilSvg from '../../img/pencil.svg';
import deleteSvg from '../../img/delete.svg';
import plusSvg from '../../img/plus.svg';

const projectsList = document.querySelector('.projects__list');
const addProjectBtn = document.querySelector('.projects__add');

function createProject(title, description, numTodos, counter) {
  const project = createEl('div', ['projects__project', 'project']);
  project.dataset.projectNum = counter;
  const head = createEl('div', ['project__head']);
  const projectTitle = createEl('h3', ['project__title'], title);
  const projectControls = createEl('h3', ['project__controls']);
  const buttonEdit = createEl('button', ['project__edit']);
  const buttonDelete = createEl('button', ['project__delete']);

  buttonEdit.insertAdjacentHTML(
    'afterbegin',
    `
      <svg>
        <use href="${pencilSvg}#pencil"></use>
      </svg>
    `
  );

  buttonDelete.insertAdjacentHTML(
    'afterbegin',
    `
      <svg>
        <use href="${deleteSvg}#delete"></use>
      </svg>
    `
  );

  projectControls.append(buttonEdit, buttonDelete);
  head.append(projectTitle, projectControls);
  project.append(head);

  const projectDescription = createEl(
    'h4',
    ['project__description'],
    description
  );

  const numTodosEl = createEl(
    'h4',
    ['project__num-todos'],
    'Todos in this project: '
  );

  numTodosEl.insertAdjacentHTML(
    'beforeend',
    `<span class="num-todos">${numTodos}</span>`
  );

  project.append(projectDescription, numTodosEl);

  return project;
}

function createAddProject() {
  const addContainer = createEl('div', ['projects__add']);
  const addBtn = createEl('button', ['projects__add-btn']);
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

export function renderProjects(projects, counter) {
  for (const property in projects) {
    const title = projects[property]['title'];
    const description = projects[property]['description'];
    const numTodos = Object.values(projects[property]['todos']).length;
    const newProject = createProject(title, description, numTodos, counter);
    counter++;
    projectsList.append(newProject);
  }
}

export function renderPlusProject() {
  projectsList.append(createAddProject());
}
