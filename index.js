"use strict";

const submitBtn = document.querySelector(".submit-arrow");
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const day = document.querySelector(".days");
const month = document.querySelector(".months");
const year = document.querySelector(".years");
const allInputs = document.getElementsByTagName("input");
const allLabels = document.getElementsByTagName("label");
const hiddenError = document.querySelectorAll(".hidden");

const resetErrors = () => {
  for (let input of allInputs) {
    input.style.borderColor = "hsl(0, 0%, 0%)"; // Reset border color
  }
  for (let label of allLabels) {
    label.style.color = "hsl(0, 0%, 0%)"; // Reset label color
  }
  for (let error of hiddenError) {
    error.style.display = "none"; // Hide all errors
  }
};

const validateFields = () => {
  let dayValue = parseInt(document.getElementById("DAY").value);
  let monthValue = parseInt(document.getElementById("MONTH").value) - 1; // month is 0-indexed
  let yearValue = parseInt(document.getElementById("YEAR").value);

  let hasError = false;

  // Validate day
  if (!dayValue || dayValue < 1 || dayValue > 31) {
    document.getElementById("DAY").style.borderColor = "hsl(0, 100%, 67%)";
    document.querySelector(".label-Day").style.color = "hsl(0, 100%, 67%)";
    document.getElementById("Day").style.display = "block";
    hasError = true;
  }

  // Validate month
  if (monthValue < 0 || monthValue > 11) {
    document.getElementById("MONTH").style.borderColor = "hsl(0, 100%, 67%)";
    document.querySelector(".label-Month").style.color = "hsl(0, 100%, 67%)";
    document.getElementById("Month").style.display = "block";
    hasError = true;
  }

  // Validate year
  if (!yearValue || yearValue > currentYear) {
    document.getElementById("YEAR").style.borderColor = "hsl(0, 100%, 67%)";
    document.querySelector(".label-Year").style.color = "hsl(0, 100%, 67%)";
    document.getElementById("Year").style.display = "block";
    hasError = true;
  }

  return { hasError, dayValue, monthValue, yearValue };
};

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetErrors();

  const { hasError, dayValue, monthValue, yearValue } = validateFields();

  if (!hasError) {
    // All fields are valid
    submitBtn.style.backgroundColor = "hsl(0, 0%, 8%)";

    // Calculate differences
    let outputYear = currentYear - yearValue;
    let outputMonth = currentMonth - monthValue;
    let outputDay = currentDay - dayValue;

    // Adjust for negative day difference
    if (outputDay < 0) {
      outputMonth -= 1;
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
});
