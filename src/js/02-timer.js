import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import flatpickr from "flatpickr";
import iziToast from "izitoast";

const refs = {
    input: document.querySelector("#datetime-picker"),
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

refs.start.addEventListener('click', onStartCountDown)
refs.start.setAttribute("disabled", "true")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    selectedDate: null,
    onClose(selectedDates) {
        options.selectedDate = selectedDates;
        const currentDate = options.defaultDate.getTime();
        const choosenDate = selectedDates[0].getTime();

        if (choosenDate < currentDate) {
            return iziToast.warning({
                title: 'Caution',
                message: "Please choose a date in the future",
                position: 'topCenter',
                timeout: 3000,
            });
        }
        refs.start.removeAttribute("disabled")
    },
};

flatpickr(refs.input, options)

function onStartCountDown() {
    const DELAY = 1000;
    refs.start.setAttribute("disabled", "true")
    refs.input.setAttribute("disabled", "true")

    const id = setInterval((() => {
        const currentDate = new Date().getTime();
        const selectedDate = options.selectedDate[0].getTime();
        const deltaTime = selectedDate - currentDate;

        convertMs(deltaTime)

        if (deltaTime <= 1000) {
            clearInterval(id)
            return;
        }
    }), DELAY)
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return addLeadingZero({ days, hours, minutes, seconds });
}

function addLeadingZero(obj) {
    const { days, hours, minutes, seconds } = obj

    const day = String(days).padStart(2, 0)
    const hour = String(hours).padStart(2, 0)
    const minute = String(minutes).padStart(2, 0)
    const second = String(seconds).padStart(2, 0)

    return createMarkup({ day, hour, minute, second })
}

function createMarkup({ day, hour, minute, second }) {
    refs.days.innerHTML = day;
    refs.hours.innerHTML = hour;
    refs.minutes.innerHTML = minute;
    refs.seconds.innerHTML = second;
}