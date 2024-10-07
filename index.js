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
  const monthValue = parseInt(document.getElementById("MONTH").value) - 1;
  const yearValue = parseInt(document.getElementById("YEAR").value);

  if (dayValue && monthValue && yearValue) {
    if (dayValue > 31) {
      document.getElementById("DAY").style.borderColor = "hsl(0, 100%, 67%)";
      document.querySelector(".label-Day").style.color = "hsl(0, 100%, 67%)";
      document.getElementById("Day").style.display = "block";
    }

    if (monthValue > 11) {
      document.getElementById("MONTH").style.borderColor = "hsl(0, 100%, 67%)";
      document.querySelector(".label-Month").style.color = "hsl(0, 100%, 67%)";
      document.getElementById("Month").style.display = "block";
    }

    if (yearValue > currentYear) {
      document.getElementById("YEAR").style.borderColor = "hsl(0, 100%, 67%)";
      document.querySelector(".label-Year").style.color = "hsl(0, 100%, 67%)";
      document.getElementById("Year").style.display = "block";
    } else if (dayValue < 31 && monthValue < 11 && yearValue <= currentYear) {

      document.querySelector(".submit-arrow").style.backgroundColor =
        "hsl(0, 0%, 8%)";

      const outputDay = Math.abs(currentDay - dayValue);
      const outputMonth = Math.abs(currentMonth - monthValue);
      const outputYear = Math.abs(currentYear - yearValue);

      day.textContent = outputDay;
      month.textContent = outputMonth;
      year.textContent = outputYear;

      for (let input of allInputs) {
        input.style.borderColor = "hsl(259, 100%, 65%)";
      }
    
      for (let label of allLabels) {
        label.style.color = "hsl(0, 1%, 44%)";
      }
    
      for (let Erorr of hiddenError) {
        Erorr.style.display = "none";
      }


    }
  } else {
    ErrorAll();
  }
});
