

const refs = {
  form: document.querySelector(".form"),
  button: document.querySelector("button")
}

refs.form.addEventListener('submit', onSubmitPromise)

const formData = {};
let counter = 0;

function onSubmitPromise(evt) {
  evt.preventDefault();
  const elements = evt.currentTarget.elements;

  formData[elements.delay.name] = elements.delay.value
  formData[elements.step.name] = elements.step.value
  formData[elements.amount.name] = elements.amount.value
  console.log(formData)

  const DELAY = formData.delay;
  const AMOUNT = Number(formData.amount);
  console.log(AMOUNT)

  const idCreatePromise = setInterval(() => {
    console.log("START")
    counter += 1;
    console.log(counter)
    createPromise(counter, DELAY)

    if (counter === AMOUNT) {
      clearInterval(idCreatePromise);
      console.log("THAT ALL")
      return;
    }
    console.log("INVISIBLE CONSOLE")
  }, DELAY)
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promises = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve("✅ Все хорошо, лови промис")
    } else {
      reject("❌ Все плохо, ничего не получится")
    }
    return;
  })

  promises.then(resp => console.log(resp)).catch(err => console.log(err))
}
