const form = document.getElementById("form");
const resetBtn = document.getElementById("btn-reset");
const tips = document.querySelectorAll("input[name='tip']");
const btnTips = document.querySelectorAll(".btn-tip");
const customTipInput = document.getElementById("custom-tip");
const billAmountInput = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const errorMessage = document.querySelector(".error-message");
let tipPercent;

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
      console.log(tipPercent);
    }
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
  console.log(tipPercent);
});

billAmountInput.addEventListener("change", function (event) {
  const bill = parseInt(event.target.value);
  if (!(bill > 0)) {
    event.target.setAttribute("aria-invalid", "true");
    event.target.value = null;
    return;
  }
  event.target.setAttribute("aria-invalid", "false");
});

numberOfPeople.addEventListener("change", function (event) {
  const amount = parseInt(event.target.value);
  if (!(amount > 0)) {
    event.target.setAttribute("aria-invalid", "true");
    event.target.value = null;
    errorMessage.style.display = "block";
    return;
  }
  event.target.setAttribute("aria-invalid", "false");
  errorMessage.style.display = "none";
});
