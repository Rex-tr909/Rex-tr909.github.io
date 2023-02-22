const project1 = document.getElementById("pc0");
const contactLink = document.getElementById("contactButton");
const contactPage = document.getElementById("contact");
const homeButton = document.getElementById("homeButton");
const allProjects = document.getElementsByClassName("projectContainer");
let currentlyDisplayed = "";

window.onload = () => {
    homeButton.addEventListener('click', () => Navigate("?"))
    contactLink.addEventListener('click', () => Navigate("?contact"));
}

function Navigate(location) {
    if (location == "?") {
        HideProject();
        window.history.replaceState({ page: 1 }, "title 0", location);
        return;
    }

    HideProjectsLinks();
    window.history.replaceState({ page: 2 }, "title 2", location);
}

function HideProjectsLinks() {
    for (projectDiv of allProjects) {
        projectDiv.classList.remove('fade-in-bottom');
        projectDiv.classList.add('fade-out-bottom');
        let currentDiv = projectDiv;
        setTimeout(() => FinishHiding(currentDiv, contactPage), 1000);
    }
}

function FinishHiding(div, newLocation) {
    div.style.display = 'none';
    div.classList.remove('fade-out-bottom');
    div.classList.add('fade-in-bottom');
    ShowTargetPage(newLocation);
}

function ShowTargetPage(target) {
    if (target == "") {
        ShowProjectsLinks();
    }
    else ShowProject(target);
}

function ShowProjectsLinks() {
    for (projectDiv of allProjects) {
        projectDiv.style.display = 'flex';
        projectDiv.classList.remove('fade-out-bottom');
        projectDiv.classList.add('fade-in-bottom');
    }
}

function ShowProject(project) {
    project.style.display = 'flex';
    currentlyDisplayed = project;
}

function HideProject() {
    currentlyDisplayed.classList.remove('fade-in-bottom');
    currentlyDisplayed.classList.add('fade-out-bottom');
    setTimeout(() => FinishHiding(currentlyDisplayed, ""), 1000);
}