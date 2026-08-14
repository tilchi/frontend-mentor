const bill = document.getElementById("billInput");
const tipBoxs = document.querySelectorAll(
    ".tip-calculator-app__tip:not(#customValue)"
);
const tipCustomValue = document.getElementById("customValue");
const people = document.getElementById("peopleInput");
const perPersonPrice = document.getElementById("perPersonPrice");
const totalPrice = document.getElementById("totalPrice");
const reset = document.getElementById("resetBtn");

let selectedTip = 0;


function run() {

    // Bill
    bill.addEventListener("input", updateCalculator);


    // Tip boxes
    tipBoxs.forEach(function (box) {
        box.addEventListener("click", function () {
            handleBox(box);
            tipBoxsAddClass(box);
            updateCalculator();
        });
    });


    // Custom tip
    tipCustomValue.addEventListener("input", function () {
        customValue();
        tipCustomAddClass();
        updateCalculator();
    });


    // Number of people
    people.addEventListener("input", updateCalculator);


    // Reset
    reset.addEventListener("click", resetAll);
}


function billValue() {

    const billValue = Number(bill.value.trim());

    return billValue;
}


function handleBox(box) {

    const boxValue = Number(
        box.textContent.replace("%", "").trim()
    );

    selectedTip = boxValue;
}


function customValue() {

    const customValue = Number(
        tipCustomValue.value.trim()
    );

    selectedTip = customValue;
}


function peopleInput() {

    const peopleValue = Number(
        people.value.trim()
    );

    return peopleValue;
}


function calculator(billValue, selectedTip, peopleValue) {

    if (billValue === 0 || peopleValue === 0) {
        return;
    }

    const tipAmount = billValue * (selectedTip * 0.01);

    const tipPerPerson = tipAmount / peopleValue;

    const totalPerPerson =
        (billValue + tipAmount) / peopleValue;

    perPersonPrice.textContent =
        tipPerPerson.toFixed(2);

    totalPrice.textContent =
        totalPerPerson.toFixed(2);
}


function updateCalculator() {

    const bill = billValue();

    const people = peopleInput();

    calculator(
        bill,
        selectedTip,
        people
    );
}


function tipBoxsAddClass(box) {

    tipBoxs.forEach(function (box) {
        box.classList.remove("btn-active");
    });

    tipCustomValue.classList.remove("btn-active");

    box.classList.add("btn-active");
}


function tipCustomAddClass() {

    tipBoxs.forEach(function (box) {
        box.classList.remove("btn-active");
    });

    tipCustomValue.classList.add("btn-active");
}


function resetAll() {

    bill.value = "";

    tipCustomValue.value = "";

    people.value = "";

    selectedTip = 0;

    perPersonPrice.textContent = "0.00";

    totalPrice.textContent = "0.00";


    tipBoxs.forEach(function (box) {
        box.classList.remove("btn-active");
    });

    tipCustomValue.classList.remove("btn-active");
}


run();