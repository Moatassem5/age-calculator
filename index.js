"use strict";

const submitBtn = document.querySelector(".submit-arrow");
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
///////////////////////

const day = document.querySelector(".days");
const month = document.querySelector(".months");
const year = document.querySelector(".years");
const allInputs = document.getElementsByTagName("input");
const allLabels = document.getElementsByTagName("label");
const hiddenError = document.querySelectorAll(".hidden");

const ErrorAll = function () {
  for (let input of allInputs) {
    input.style.borderColor = "hsl(0, 100%, 67%)";
  }

  for (let label of allLabels) {
    label.style.color = "hsl(0, 100%, 67%)";
  }

  for (let Erorr of hiddenError) {
    Erorr.style.display = "block";
  }
};

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const dayValue = parseInt(document.getElementById("DAY").value);
  const monthValue = parseInt(document.getElementById("MONTH").value) - 1; // month is 0-indexed
  const yearValue = parseInt(document.getElementById("YEAR").value);

  if (dayValue && monthValue >= 0 && yearValue) {
    // Validate date (basic validation)
    const isValidDate =
      new Date(yearValue, monthValue, dayValue).getDate() === dayValue;

    if (
      !isValidDate ||
      dayValue > 31 ||
      monthValue > 11 ||
      yearValue > currentYear
    ) {
      ErrorAll();
    } else {
      submitBtn.style.backgroundColor = 'hsl(0, 0%, 8%)'
      // Calculate differences
      let outputYear = currentYear - yearValue;
      let outputMonth = currentMonth - monthValue;
      let outputDay = currentDay - dayValue;

      // Adjust for negative day difference
      if (outputDay < 0) {
        outputMonth -= 1;
        // Calculate days in the previous month
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        outputDay += new Date(currentYear, previousMonth + 1, 0).getDate();
      }

      // Adjust for negative month difference
      if (outputMonth < 0) {
        outputYear -= 1;
        outputMonth += 12;
      }

      // Update the output
      day.textContent = outputDay;
      month.textContent = outputMonth;
      year.textContent = outputYear;

      // Style changes after successful validation
      for (let input of allInputs) {
        input.style.borderColor = "hsl(259, 100%, 65%)";
      }

      for (let label of allLabels) {
        label.style.color = "hsl(0, 1%, 44%)";
      }

      for (let error of hiddenError) {
        error.style.display = "none";
      }
    }
  } else {
    ErrorAll();
  }
});
