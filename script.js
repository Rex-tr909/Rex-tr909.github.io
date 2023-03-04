const homeButton = document.getElementById("homeButton");
const returnHomeButton = document.getElementById("returnHomeButton");
const contactButton = document.getElementById("contactButton");
const homePage = document.getElementById("homePage");
const contactPage = document.getElementById("contactPage");
let currentlyDisplayed = "";

if (window.location.search == "?contact")
    FinishHiding(homePage, ShowTargetPage(contactPage));

window.onload = () => {
    homeButton.addEventListener('click', () => Navigate("?"))
    returnHomeButton.addEventListener('click', () => Navigate("?"))
    contactButton.addEventListener('click', () => Navigate("?contact"));
}

function Navigate(location) {
    if (location == "?") {
        HideContactPage();
        window.history.replaceState({ page: 1 }, "Home", location);
        return;
    }

    HideHomePage(contactPage);
    window.history.replaceState({ page: 2 }, "Contact", location);
}

function HideHomePage(newLocation) {
    homePage.classList.add('fade-out-bottom');
    setTimeout(() => FinishHiding(homePage, ShowTargetPage(newLocation)), 1000);
}

function FinishHiding(div, callback) {
    div.style.display = 'none';
    div.classList.remove('fade-out-bottom');
    () => callback();
}

function ShowTargetPage(target) {
    if (target == "") {
        ShowHomePage();
    }
    else ShowPage(target);
}

function ShowHomePage() {
    homePage.style.display = 'flex';
    homePage.classList.remove('fade-out-bottom');
}

function ShowPage(page) {
    page.style.display = 'flex';
    currentlyDisplayed = page;
}

function HideContactPage() {
    currentlyDisplayed.classList.remove('fade-in-bottom');
    currentlyDisplayed.classList.add('fade-out-bottom');
    setTimeout(() => FinishHiding(currentlyDisplayed, ShowTargetPage("")), 1000);
}