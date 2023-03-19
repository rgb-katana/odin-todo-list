'use strict';

import '../sass/main.scss';
import * as model from './model';
import * as todosView from './views/todosView';
import * as projectsView from './views/projectsView';

let currentProject = '';
let isEditing = false;

function selectProject() {
  document.addEventListener('click', function (e) {
    if (
      e.target.closest('.project') &&
      !e.target.closest('.project__delete') &&
      !e.target.closest('.project').dataset.editing
    ) {
      // Delete all selections
      Array.from(document.querySelectorAll('.project')).map(elem => {
        elem.classList.remove('chosen');
      });

      e.target.closest('.project').classList.add('chosen');
      const projectNum = e.target.closest('.project').dataset.projectNum;
      currentProject = projectNum;
      todosView.renderTodos(
        model.state.projects[`${projectNum}`].title,
        model.state.projects[`${projectNum}`].todos
      );
      todosView.RenderPlusTodo();
    }
  });
}

function deleteProject() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.project__delete')) {
      if (isEditing) {
        document.querySelector('.project--edit').classList.add('shaking');
        setTimeout(function () {
          document.querySelector('.project--edit').classList.remove('shaking');
        }, 820);
        return;
      }
      e.preventDefault();
      console.log(e.target.closest('.project').dataset);
      const projectNum = e.target.closest('.project').dataset.projectNum;
      console.log(projectNum);
      model.deleteProject(projectNum);
      projectsView.renderProjects(model.state.projects);
      todosView.clearAllTodos();
      projectsView.renderPlusProject();
    }
  });
}

function deleteCreatingProject() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.project__unedit')) {
      const projectNum = e.target.closest('.project').dataset.projectNum;
      e.target.closest('.project').remove();
      model.deleteProject(projectNum);
      projectsView.renderPlusProject();
    }
  });
}

function createNewProject() {
  document.addEventListener('click', function (e) {
    console.log(e.target.closest('.projects__add-btn'));
  });
}

function deleteTodo() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.todo__delete')) {
      if (isEditing) {
        document.querySelector('.project--edit').classList.add('shaking');
        setTimeout(function () {
          document.querySelector('.project--edit').classList.remove('shaking');
        }, 820);
        return;
      }
      const curTodo = e.target.closest('.todo__delete').closest('.todo')
        .dataset.todoNum;
      model.deleteTodo(currentProject, curTodo);
      todosView.renderTodos(
        model.state.projects[currentProject].title,
        model.state.projects[currentProject].todos
      );
      todosView.RenderPlusTodo();
      projectsView.renderProjects(model.state.projects);
      projectsView.renderPlusProject();
    }
  });
}

function addNewProjectEditor() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.projects__add-btn')) {
      e.target.closest('.projects__add').remove();
      e.target.closest('.projects__add-btn').remove();
      isEditing = true;
      projectsView.renderEditNewProject(
        `pr${Object.values(model.state.projects).length + 1}`
      );
      model.addProjectEditing(
        `pr${Object.values(model.state.projects).length + 1}`
      );
    }
  });
}

function submitNewProject() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.project__check')) {
      const curProject = e.target.closest('.project');
      const projectNum = e.target.closest('.project').dataset.projectNum;
      const title = curProject.querySelector('.project__title--edit').value;
      const description = curProject.querySelector(
        '.project__description--edit'
      ).value;
      if (description === '') {
        document
          .querySelector('.project__description--edit')
          .classList.add('shaking');
        setTimeout(function () {
          document
            .querySelector('.project__description--edit')
            .classList.remove('shaking');
        }, 820);
        return;
      }
      if (title === '') {
        document
          .querySelector('.project__title--edit')
          .classList.add('shaking');
        setTimeout(function () {
          document
            .querySelector('.project__title--edit')
            .classList.remove('shaking');
        }, 820);
        return;
      }
      {
        model.addRealProject(projectNum, title, description);
        projectsView.renderProjects(model.state.projects);
        projectsView.renderPlusProject();
        todosView.clearAllTodos();
        isEditing = false;
      }
    }
  });
}

// function editProject() {
//   document.addEventListener('click', function (e) {
//     if (e.target.closest('.project__edit')) {
//     }
//   });
// }

function editTodo() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.todo__expand')) {
      if (isEditing) {
        document.querySelector('.project--edit').classList.add('shaking');
        setTimeout(function () {
          document.querySelector('.project--edit').classList.remove('shaking');
        }, 820);
        return;
      }
      let curTodo = e.target.closest('.todo');
      let todoNum = curTodo.dataset.todoNum;

      const task = curTodo.querySelector('.todo__title');
      const date = curTodo.querySelector('.todo__due-date');

      todosView.renderEditTodo(curTodo, todoNum, task, date);
    }
  });
}

function sumbitTodoEdits() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('.todo__check')) {
      let curTodo = e.target.closest('.todo');

      const newTask = document.querySelector('.todo__title--edit');
      const newDate = document.querySelector('.todo__due-date--edit');
    }
  });
}

function init() {
  projectsView.renderProjects(model.state.projects);
  projectsView.renderPlusProject();
  selectProject();
  createNewProject();
  deleteProject();
  deleteTodo();
  addNewProjectEditor();
  deleteCreatingProject();
  submitNewProject();
  editTodo();
}

init();
