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
          due: format(new Date(2022, 3, 20), 'MM, dd, y'),
        },
        td2: {
          title: 'My Second Todo',
          description:
            'This is your template todo description. You can edit it or remove it entirely.',
          due: format(new Date(2022, 7, 26), 'MM, dd, y'),
        },
        td3: {
          title: 'My Third Todo',
          description:
            'This is your template todo description. You can edit it or remove it entirely.',
          due: format(new Date(2022, 5, 2), 'MM, dd, y'),
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
  console.log(projectNum);
  console.log(state.projects[projectNum]);
  delete state.projects[projectNum];
  console.log(state.projects[projectNum]);
}

export function addProjectEditing(projectNum) {
  console.log(projectNum);
  console.log(state.projects[projectNum]);
  state.projects[projectNum] = {
    title: '',
    description: '',
    todos: {},
  };
  console.log(state.projects[projectNum]);
}

export function addRealProject(projectNum, title, description) {
  state.projects[projectNum].title = title;
  state.projects[projectNum].description = description;
}

export function deleteTodo(projectNum, todoNum) {
  console.log(state.projects[projectNum].todos);
  console.log(todoNum);
  delete state.projects[projectNum].todos[todoNum];
  console.log(state.projects[projectNum].todos);
}
