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
  const { delay, step, amount } = evt.currentTarget.elements;

  formData[delay.name] = delay.value
  formData[step.name] = step.value
  formData[amount.name] = amount.value

  const FIRST_DELAY = Number(formData.delay);
  const AMOUNT = Number(formData.amount);
  const STEP = Number(formData.step)
  let counter = 0;
  let DELAY = FIRST_DELAY;

  const idCreatePromise = setInterval(() => {
    counter += 1;
    DELAY = FIRST_DELAY + STEP * (counter - 1);
    createPromise(counter, DELAY)

    if (counter === AMOUNT) {
      return clearInterval(idCreatePromise);
    }
  }, DELAY)
  refs.form.reset()
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promises = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  })

  return promises.then(({ position, delay }) => (iziToast.success({
    title: 'OK',
    message: `✅ Fulfilled promise ${position} in ${delay}ms`,
    position: 'topRight',
    timeout: 3000,
  }))).catch(({ position, delay }) => (iziToast.error({
    title: 'OK',
    message: `❌ Rejected promise ${position} in ${delay}ms`,
    position: 'topRight',
    timeout: 3000,
  })))
}

