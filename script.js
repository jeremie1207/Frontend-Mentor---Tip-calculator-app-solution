const form = document.getElementById("form");
const resetBtn = document.getElementById("btn-reset");
const tips = document.querySelectorAll("input[name='tip']");
const btnTips = document.querySelectorAll(".btn-tip");
const customTipInput = document.getElementById("custom-tip");
const billAmountInput = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const errorMessage = document.querySelector(".error-message");
const tipPerPerson = document.querySelector(".tip-per_person");
const totalPerPerson = document.querySelector(".total-per_person");
let tipPercent;
let billAmount;
let people;

const round2 = (number) => Math.round(number * 100) / 100;

const calcTip = (bill, percent, numPerson) =>
  round2((bill * percent) / numPerson / 100);

const calcTotal = (bill, percent, numPerson) =>
  round2((bill * (1 + percent / 100)) / numPerson);

const updateResult = () => {
  if (!tipPercent) {
    return;
  }
  if (!billAmount) {
    return;
  }

  if (!people) {
    return;
  }

  resetBtn.disabled = false;

  const tipPerson = calcTip(billAmount, tipPercent, people);
  tipPerPerson.textContent = `$${tipPerson ? tipPerson : "0.00"}`;

  const totalResult = calcTotal(billAmount, tipPercent, people);
  totalPerPerson.textContent = `$${totalResult ? totalResult : "0.00"}`;
};

const removeDataStateOnBtnTips = () => {
  btnTips.forEach((btn) => {
    btn.removeAttribute("data-state");
  });
};

const setActive = (id) => {
  removeDataStateOnBtnTips();
  document.querySelector(`.${id}`).setAttribute("data-state", "active");
};

tips.forEach((tip) => {
  tip.addEventListener("change", function () {
    customTipInput.value = "";
    if (this.checked) {
      setActive(this.id);
      tipPercent = parseFloat(this.value);
    }
    updateResult();
  });
});

const setTipCheckedToFalse = () => {
  removeDataStateOnBtnTips();
  tips.forEach((tip) => {
    tip.checked = false;
  });
};

customTipInput.addEventListener("click", setTipCheckedToFalse);

const setAriaInvalidToTrue = (event) => {
  event.target.setAttribute("aria-invalid", "true");
  event.target.value = null;
};

const setAriaInvalidToFalse = (event) => {
  event.target.setAttribute("aria-invalid", "false");
};

customTipInput.addEventListener("input", function (event) {
  const tip = parseFloat(event.target.value);
  if (!(tip > 0 && tip <= 100)) {
    setAriaInvalidToTrue(event);
    return;
  }
  setAriaInvalidToFalse(event);
  tipPercent = tip;
  updateResult();
});

billAmountInput.addEventListener("change", function (event) {
  const bill = parseFloat(event.target.value);
  if (!(bill > 0)) {
    setAriaInvalidToTrue(event);
    return;
  }
  setAriaInvalidToFalse(event);
  billAmount = bill;
  updateResult();
});

numberOfPeople.addEventListener("input", function (event) {
  const amount = parseInt(event.target.value);
  if (!(amount > 0)) {
    setAriaInvalidToTrue(event);
    errorMessage.style.display = "block";
    return;
  }
  people = amount;
  event.target.setAttribute("aria-invalid", "false");
  errorMessage.style.display = "none";
  updateResult();
});

const resetBtnHandler = (event) => {
  event.preventDefault();
  billAmount = null;
  tipPercent = null;
  people = null;
  numberOfPeople.value = null;
  billAmountInput.value = null;
  customTipInput.value = null;
  setTipCheckedToFalse();
  tipPerPerson.textContent = `$0.00`;
  totalPerPerson.textContent = `$0.00`;
  resetBtn.disabled = true;
  errorMessage.style.display = "none";
  numberOfPeople.setAttribute("aria-invalid", "false");
  form.reset();
};

form.addEventListener("submit", resetBtnHandler);
