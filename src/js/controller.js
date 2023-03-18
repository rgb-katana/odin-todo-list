"use strict";

import "../sass/main.scss";
import * as model from "./model";
import * as todosView from "./views/todosView";
import * as projectsView from "./views/projectsView";

function controlAddProject(newProject) {}

function controlAddTodo(newTodo) {}

function selectProject() {
    document.addEventListener("click", function (e) {
        if (e.target.closest(".project")) {
            // Delete all selections
            Array.from(document.querySelectorAll(".project")).map((elem) => {
                elem.classList.remove("chosen");
            });

            e.target.closest(".project").classList.add("chosen");
            const projectNum = e.target.closest(".project").dataset.projectNum;
            todosView.renderTodos(
                model.state.projects[`pr${projectNum}`].title,
                model.state.projects[`pr${projectNum}`].todos
            );
            todosView.RenderPlusTodo();
        }
    });
}

function createNewProject() {
    document.addEventListener("click", function (e) {
        console.log(e.target.closest(".projects__add-btn"));
    });
}

function init() {
    projectsView.renderProjects(
        model.state.projects,
        model.state.projectCounter
    );
    projectsView.renderPlusProject();
    selectProject();
    createNewProject();
}

init();
