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

const calcTip = (bill, percent, numPerson) => {
  const result = (bill * (percent / 100)) / numPerson;
  return result.toFixed(2);
};

const calcTotal = (bill, percent, numPerson) => {
  const result = (bill * (1 + percent / 100)) / numPerson;
  return result.toFixed(2);
};

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
  console.log(tipPerson);
  tipPerPerson.textContent = `$${tipPerson ? tipPerson : "0.00"}`;

  const totalResult = calcTotal(billAmount, tipPercent, people);
  console.log(totalResult);
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
      tipPercent = parseInt(this.value);
    }
    updateResult();
  });
});

customTipInput.addEventListener("click", function () {
  removeDataStateOnBtnTips();
  tips.forEach((tip) => {
    tip.checked = false;
  });
});

customTipInput.addEventListener("change", function (event) {
  const tip = parseInt(event.target.value);
  if (!(tip > 0 && tip <= 100)) {
    event.target.setAttribute("aria-invalid", "true");
    return;
  }
  event.target.setAttribute("aria-invalid", "false");
  tipPercent = tip;
  updateResult();
});

billAmountInput.addEventListener("change", function (event) {
  const bill = parseInt(event.target.value);
  if (!(bill > 0)) {
    event.target.setAttribute("aria-invalid", "true");
    event.target.value = null;
    return;
  }
  billAmount = bill;
  event.target.setAttribute("aria-invalid", "false");
  updateResult();
});

numberOfPeople.addEventListener("change", function (event) {
  const amount = parseInt(event.target.value);
  if (!(amount > 0)) {
    event.target.setAttribute("aria-invalid", "true");
    event.target.value = null;
    errorMessage.style.display = "block";
    return;
  }
  people = amount;
  event.target.setAttribute("aria-invalid", "false");
  errorMessage.style.display = "none";
  updateResult();
});
