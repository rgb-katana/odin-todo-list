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
          due: format(new Date(2022, 3, 20), 'dd, MM, y'),
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
  projectCounter: 1,
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
