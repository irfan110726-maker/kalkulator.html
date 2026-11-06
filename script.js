
const screen = document.getElementById("screen");
const history = document.getElementById("history");

let finished = false;

function add(value) {

    if (screen.value === "Error") {
        screen.value = "0";
    }

    if (finished) {
        if ("0123456789.".includes(value)) {
            screen.value = "0";
        }

        finished = false;
    }

    if (screen.value === "0" &&
        "0123456789.".includes(value)) {
        screen.value = value;
    } else {
        screen.value += value;
    }
}

function clearScreen() {
    screen.value = "0";
    history.innerText = "Believe It! Dattebayo!";
    finished = false;
}

function deleteOne() {

    if (screen.value === "Error") {
        clearScreen();
        return;
    }

    screen.value =
        screen.value.slice(0, -1) || "0";

    finished = false;
}

function percent() {

    if (screen.value === "Error") return;

    try {
        const value = Function(
            '"use strict"; return (' + screen.value + ')'
        )();

        if (!Number.isFinite(value)) throw Error();

        screen.value = String(value / 100);
        finished = false;

    } catch {
        screen.value = "Error";
        finished = true;
    }
}

function calculate() {

    let expression = screen.value;

    try {

        if (!expression ||
            !/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw Error();
        }

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) throw Error();

        history.innerText = expression + " =";

        screen.value = Number(
            result.toPrecision(12)
        ).toString();

        finished = true;

    } catch {

        screen.value = "Error";
        history.innerText = "Jutsu gagal! Coba lagi!";
        finished = true;

    }
}

// Menggunakan keyboard komputer
document.addEventListener("keydown", function(e) {

    if ("0123456789.+-*/()".includes(e.key)) {
        add(e.key);
    }

    if (e.key === "Enter" || e.key === "=") {
        calculate();
    }

    if (e.key === "Backspace") {
        deleteOne();
    }

    if (e.key === "Escape") {
        clearScreen();
    }

});
