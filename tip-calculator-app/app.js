const bill = document.getElementById("billInput");
const tipBoxs = document.querySelectorAll(
    ".tip-calculator-app__tip:not(#customValue)"
);
const tipCustomValue = document.getElementById("customValue");
const people = document.getElementById("peopleInput");
const tipPerPerson = document.getElementById("tipPerPersonPrice");
const totalPrice = document.getElementById("totalPrice");
const reset = document.getElementById("resetBtn");

let selectedTip = 0;

function run() {

    // get bill input value, event
    bill.addEventListener("input", updateCalculator);
    // tip box active click, event
    tipBoxs.forEach(function (box) {
        box.addEventListener("click", function () {
            selectedTipbox(box)
            tipBoxsClassOpt(box);
            updateCalculator();

        });
    });
    // get tip box custom value, event
    tipCustomValue.addEventListener("input", function () {

        selectedTipCustom();
        tipCustomClassOpt();
        updateCalculator();
    });

    // get people value, event
    people.addEventListener("input", updateCalculator);

    // reset btn, event

    reset.addEventListener("click", resetAll);
}

function getBill() {

    const getBillValue = Number(bill.value.trim());

    return getBillValue;
}


function selectedTipbox(box) {

    const getSelectedTip = Number(box.textContent.trim().replace("%", ""));

    selectedTip = getSelectedTip;
}


function tipBoxsClassOpt(box) {

    tipBoxs.forEach(function (box) {

        box.classList.remove("btn-active")
    });

    tipCustomValue.classList.remove("btn-active")
    box.classList.add("btn-active")
}


function tipCustomClassOpt(box) {

    tipBoxs.forEach(function (box) {

        box.classList.remove("btn-active")
    });

    tipCustomValue.classList.add("btn-active");

}

function selectedTipCustom() {

    const getTipCustomValue = Number(tipCustomValue.value.trim())

    selectedTip = getTipCustomValue;
}



function getPeopleValue() {

    const getPeopleValue = Number(people.value.trim());

    return getPeopleValue;

}


function calculator(getBillValue, selectedTip, getPeopleValue) {

    if (getBillValue <= 0 || getPeopleValue <= 0) {
        tipPerPerson.textContent = "$0.00";
        totalPrice.textContent = "$0.00";
        return;
    }

    const tipPerPersonResult = (getBillValue * (selectedTip * 0.01)) / getPeopleValue;
    const totalPerPersonResult = (getBillValue + (getBillValue * (selectedTip * 0.01))) / getPeopleValue;

    tipPerPerson.textContent = "$" + tipPerPersonResult.toFixed(2);
    totalPrice.textContent = "$" + totalPerPersonResult.toFixed(2);
}


function updateCalculator() {

    const bill = getBill();
    const people = getPeopleValue();

    calculator(bill, selectedTip, people);
}


function resetAll() {

    bill.value = "";

    selectedTip = 0;

    tipCustomValue.value = "";

    people.value = "";

    tipPerPerson.textContent = "$0.00";

    totalPrice.textContent = "$0.00";

    tipBoxs.forEach(function (box) {
        box.classList.remove("btn-active");
    });

    tipCustomValue.classList.remove("btn-active");

}


run();