'use strict';

import { createEl } from '../helpers';
import deleteSvg from '../../img/delete.svg';
import plusSvg from '../../img/plus.svg';
import checkSvg from '../../img/check.svg';
import pencilRemoveSvg from '../../img/pencil-remove.svg';

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

  // buttonEdit.insertAdjacentHTML(
  //   'afterbegin',
  //   `
  //     <svg>
  //       <use href="${pencilSvg}#pencil"></use>
  //     </svg>
  //   `
  // );

  buttonDelete.insertAdjacentHTML(
    'afterbegin',
    `
      <svg>
        <use href="${deleteSvg}#delete"></use>
      </svg>
    `
  );

  // projectControls.append(buttonEdit, buttonDelete);
  projectControls.append(buttonDelete);
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

export function renderProjects(projects) {
  projectsList.innerHTML = '';
  for (const property in projects) {
    const title = projects[property]['title'];
    const description = projects[property]['description'];
    const numTodos = Object.values(projects[property]['todos']).length;
    const newProject = createProject(title, description, numTodos, property);
    projectsList.append(newProject);
  }
}

export function renderPlusProject() {
  projectsList.append(createAddProject());
}

export function renderEditNewProject(projectNum) {
  const project = createEl('div', [
    'projects__project',
    'project--edit',
    'project',
  ]);
  project.dataset.projectNum = projectNum;

  const head = createEl('div', ['project__head', 'project__head--edit']);

  const projectTitle = createEl('input', [
    'project__title',
    'project__title--edit',
  ]);

  projectTitle.type = 'text';
  projectTitle.placeholder = 'Input project name';
  projectTitle.maxLength = '17';

  const projectControls = createEl('h3', ['project__controls']);
  const buttonUnedit = createEl('button', ['project__unedit']);
  const buttonCheck = createEl('button', ['project__check']);

  buttonUnedit.insertAdjacentHTML(
    'afterbegin',
    `
      <svg>
        <use href="${pencilRemoveSvg}#pencil-remove"></use>
      </svg>
    `
  );

  buttonCheck.insertAdjacentHTML(
    'afterbegin',
    `
      <svg>
        <use href="${checkSvg}#check"></use>
      </svg>
    `
  );

  projectControls.append(buttonUnedit, buttonCheck);
  head.append(projectTitle, projectControls);
  project.append(head);

  const projectDescription = createEl('textarea', [
    // 'project__description',
    // 'project__description--edit',
  ]);

  projectDescription.cols = '25';
  projectDescription.rows = '2';
  projectDescription.maxLength = '60';
  projectDescription.placeholder = 'Input your description here!!';
  projectDescription.classList.add('project__description--edit');

  const numTodosEl = createEl(
    'h4',
    ['project__num-todos'],
    'Todos in this project: '
  );

  numTodosEl.insertAdjacentHTML(
    'beforeend',
    `<span class="num-todos">0</span>`
  );

  project.append(projectDescription, numTodosEl);
  project.dataset.editing = 'yes';
  projectsList.append(project);
  return project;
}

export function renderEditExistingProject(projuectNum) {}
