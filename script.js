const project1 = document.getElementById("pc0");
const project1Page = document.getElementById("p1Page");
const allProjects = document.getElementsByClassName("projectContainer");

if (project1 != null) {
    project1.addEventListener('click', () => Navigate("?project=1"));
}

function Navigate(location) {
    HideProjectsLinks();
    window.history.replaceState({ page: 2 }, "title 2", location);
}

function HideProjectsLinks() {
    for (projectDiv of allProjects) {
        projectDiv.classList.remove('fade-in-bottom');
        projectDiv.classList.add('fade-out-bottom');
        let currentDiv = projectDiv;
        setTimeout(() => FinishHiding(currentDiv), 1000);
    }
}

function FinishHiding(projectDiv) {
    projectDiv.style.display = 'none';
    projectDiv.classList.remove('fade-out-bottom');
    projectDiv.classList.add('fade-in-bottom');
    ShowProject();
}

function ShowProject() {
    project1Page.style.display = 'block';
}