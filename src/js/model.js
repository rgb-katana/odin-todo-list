'use strict';

import { format, compareAsc } from 'date-fns';

export const state = {
  projects: {
    pr1: {
      title: 'My First Project',
      description:
        'This is your template project. You can edit it or remove it entirely.',
      todos: {
        td1: {
          title: 'My First Todo',
          description:
            'This is your template todo description. You can edit it or remove it entirely.',
          due: format(new Date(2022, 2, 20), 'MM, dd, y'),
        },
      },
    },
    // pr2: {
    //   title: 'My Second Project',
    //   description:
    //     'This is your template project. You can edit it or remove it entirely.',
    //   todos: {
    //     td1: {
    //       title: 'My First Todo',
    //       description:
    //         'This is your template todo description. You can edit it or remove it entirely.',
    //       due: format(new Date(2022, 3, 20), 'dd, MM, y'),
    //     },
    //   },
    // },
  },
};

function persistProjects() {
  localStorage.setItem('projects', JSON.stringify(state.projects));
}

function init() {
  const storage = localStorage.getItem('projects');
  if (storage) state.projects = JSON.parse(storage);
}

function clearProjects() {
  localStorage.clear('projects');
}

export function deleteProject(projectNum) {
  delete state.projects[projectNum];
  persistProjects();
}

export function addProjectEditing(projectNum) {
  state.projects[projectNum] = {
    title: '',
    description: '',
    todos: {},
  };
  persistProjects();
}

export function addRealProject(projectNum, title, description) {
  state.projects[projectNum].title = title;
  state.projects[projectNum].description = description;
  persistProjects();
}

export function deleteTodo(projectNum, todoNum) {
  delete state.projects[projectNum].todos[todoNum];
  persistProjects();
}

export function updateTodo(curProject, todoNum, title, date, isEditing) {
  if (state.projects[curProject].todos[todoNum] && !isEditing) {
    let r = /\d+/;
    let number = todoNum.match(r);

    todoNum = `td${+number[0] + 1}`;
  }
  state.projects[curProject].todos[todoNum] = {
    title: '',
    due: '',
  };
  state.projects[curProject].todos[todoNum].title = title;
  state.projects[curProject].todos[todoNum].due = date;
  persistProjects();
}

init();
