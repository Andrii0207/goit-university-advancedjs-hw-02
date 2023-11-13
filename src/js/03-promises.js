import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector(".form"),
  button: document.querySelector("button")
}

refs.form.addEventListener('submit', onSubmitPromise)

const formData = {};
let counter = 0;
let DELAY = null;

function onSubmitPromise(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  formData[delay.name] = delay.value
  formData[step.name] = step.value
  formData[amount.name] = amount.value

  const FIRST_DELAY = Number(formData.delay);
  const STEP = Number(formData.step)

  const idCreatePromise = setInterval(() => {
    counter += 1;
    DELAY = FIRST_DELAY + STEP * counter;

    createPromise(counter, DELAY)

    if (counter === AMOUNT) {
      return clearInterval(idCreatePromise);
    }
  }, DELAY)
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promises = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      }))
    } else {
      reject(iziToast.error({
        title: 'ERROR',
        message: `❌ Rejected promise ${position} in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      }))
    }
  })
  return promises.then(resp => console.log(resp)).catch(err => console.log(err))
}

