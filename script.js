const homeButton = document.getElementById("homeButton");
const returnHomeButton = document.getElementById("returnHomeButton");
const homePage = document.getElementById("homePage");
const contactPage = document.getElementById("contactPage");
const contactMeText = document.getElementById("contactMeText");
const bodyElement = document.getElementById("body");

shaderBG(bodyElement);

let currentlyDisplayed = "";

if (window.location.search == "?contact")
    finishHiding(homePage, showTargetPage(contactPage));

window.onload = () => {
    bodyElement.classList.remove('hidden');
    homeButton.addEventListener('click', () => navigate());
}

function navigate(location) {
    if (location == null) {
        if (window.location.search == "?contact") {
            hideContactPage();
            window.history.replaceState({ page: 1 }, "Home", "?");
            return;
        }
        else {
            hideHomePage(contactPage);
            window.history.replaceState({ page: 2 }, "Contact", "?contact");
            return;
        }
    }

    if (location == "?") {
        hideContactPage();
        window.history.replaceState({ page: 1 }, "Home", location);
        return;
    }

    hideHomePage(contactPage);
    window.history.replaceState({ page: 2 }, "Contact", location);
}

function hideHomePage(newLocation) {
    homePage.classList.add('fade-out-bottom');
    setTimeout(() => finishHiding(homePage, showTargetPage(newLocation)), 1000);
}

function finishHiding(div, callback) {
    div.style.display = 'none';
    div.classList.remove('fade-out-bottom');
    () => callback();
}

function showTargetPage(target) {
    if (target == "") {
        showHomePage();
    }
    else showPage(target);
}

function showHomePage() {
    homePage.style.display = 'flex';
    homePage.classList.remove('fade-out-bottom');
    contactMeText.textContent = "Contact Me";
}

function showPage(page) {
    page.style.display = 'flex';
    currentlyDisplayed = page;
    contactMeText.textContent = "Go Back";
}

function hideContactPage() {
    currentlyDisplayed.classList.remove('fade-in-bottom');
    currentlyDisplayed.classList.add('fade-out-bottom');
    setTimeout(() => finishHiding(currentlyDisplayed, showTargetPage("")), 1000);
}

async function shaderBG(appContainer) {
    const canvasContainer = document.createElement("div");
    canvasContainer.style.height = "100%";
    canvasContainer.style.width = "100%";
    canvasContainer.style.overflow = "hidden";
    canvasContainer.style.position = "fixed";
    canvasContainer.style.top = "0";
    canvasContainer.style.pointerEvents = "auto";
    canvasContainer.style.zIndex = -1;
    canvasContainer.style.filter = "hue-rotate(-45deg) saturate(0.5)";
    appContainer.append(canvasContainer);

    const appCanvas = document.createElement("canvas");
    appCanvas.style.border = "1px dotted black";
    appCanvas.height = canvasContainer.clientHeight;
    appCanvas.width = canvasContainer.clientWidth;
    appCanvas.style.height = "100%";
    appCanvas.style.width = "100%";
    canvasContainer.append(appCanvas);

    window.onresize = () => {
        appCanvas.height = canvasContainer.clientHeight;
        appCanvas.width = canvasContainer.clientWidth;
    }

    const gl = appCanvas.getContext("webgl2");
    let mousePosition = { x: 0, y: 0 };
    appCanvas.onmousemove = e => { mousePosition.x = e.clientX; mousePosition.y = e.clientY };

    const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

    const arrays = {
        position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    function render(time) {
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        const uniforms = {
            time: time * 0.001,
            resolution: [gl.canvas.width, gl.canvas.height],
            mouse: [mousePosition.x, mousePosition.y], 
            random: Math.random()
        };

        gl.useProgram(programInfo.program);
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.setUniforms(programInfo, uniforms);
        twgl.drawBufferInfo(gl, bufferInfo);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}