
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}

refs.start.addEventListener('click', onStart)
refs.stop.addEventListener('click', onStop)

refs.stop.setAttribute("disabled", "true");
let id = null;

function onStart() {
    id = setInterval((() => refs.body.style.backgroundColor = `${getRandomHexColor()}`), 1000)
    refs.start.setAttribute("disabled", "true");
    refs.stop.removeAttribute("disabled");
}

function onStop() {
    clearInterval(id)
    refs.start.removeAttribute("disabled");
    refs.stop.setAttribute("disabled", "true");
}