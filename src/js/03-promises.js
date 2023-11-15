import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector(".form"),
  button: document.querySelector("button")
}

refs.form.addEventListener('submit', onSubmitPromise)

const formData = {};

function onSubmitPromise(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target;

  formData[delay.name] = delay.value
  formData[step.name] = step.value
  formData[amount.name] = amount.value

  onStartPromise(formData)

  refs.form.reset()
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {

    setTimeout((() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }), delay)
  })
}

function onStartPromise(formData) {
  const { delay, step, amount } = formData;

  const FIRST_DELAY = Number(delay);
  const STEP = Number(step);
  const AMOUNT = Number(amount);

  for (let i = 1; i <= AMOUNT; i += 1) {
    let DELAY = FIRST_DELAY + STEP * (i - 1);

    createPromise(i, DELAY)
      .then(({ position, delay }) => (iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        timeout: 3000,
        position: 'topRight',
      })))
      .catch(({ position, delay }) => (iziToast.error({
        title: 'ERROR',
        message: `❌ Rejected promise ${position} in ${delay}ms`,
        timeout: 3000,
        position: 'topRight',
      })))
  }
}


