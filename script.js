const resetBtn = document.getElementById("btn-reset");
const tips = document.querySelectorAll("input[name='tip']");
const btnTips = document.querySelectorAll(".btn-tip");
const customTipInput = document.getElementById("custom-tip");

console.log(btnTips);

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
    if (this.checked) {
      console.log(`Radio button with value "${this.id}" is now checked.`);
      setActive(this.id);
    }
  });
});
