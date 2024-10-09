"use strict";

const submitBtn = document.querySelector(".submit-arrow");
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const dayDisplay = document.querySelector(".days");
const monthDisplay = document.querySelector(".months");
const yearDisplay = document.querySelector(".years");
const allInputs = document.getElementsByTagName("input");
const allLabels = document.getElementsByTagName("label");
const hiddenError = document.querySelectorAll(".hidden");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Get input values
    const dayValue = parseInt(document.getElementById("DAY").value);
    const monthValue = parseInt(document.getElementById("MONTH").value) - 1; // month is 0-indexed
    const yearValue = parseInt(document.getElementById("YEAR").value);

    let hasError = false;

    // Reset all styles and error messages
    for (let error of hiddenError) {
        error.style.display = "none"; // Hide all error messages
    }
    for (let input of allInputs) {
        input.style.borderColor = "hsl(0, 0%, 0%)"; // Reset border color
    }
    for (let label of allLabels) {
        label.style.color = "hsl(0, 0%, 0%)"; // Reset label color
    }

    // Validate day
    if (dayValue < 0 || dayValue > 31) {
        hasError = true;
        document.getElementById("DAY").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".label-Day").style.color = "hsl(0, 100%, 67%)";
        document.getElementById("errorDay").style.display = "block"; // Show day error
    }

    // Validate month
    if (monthValue < 0 || monthValue > 11) {
        hasError = true;
        document.getElementById("MONTH").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".label-Month").style.color = "hsl(0, 100%, 67%)";
        document.getElementById("errorMonth").style.display = "block"; // Show month error
    }

    // Validate year
    if (yearValue < 0) {
        hasError = true;
        document.getElementById("YEAR").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".label-Year").style.color = "hsl(0, 100%, 67%)";
        document.getElementById("errorYear").style.display = "block"; // Show year error
    } else if (yearValue > currentYear) {
        hasError = true;
        document.getElementById("YEAR").style.borderColor = "hsl(0, 100%, 67%)";
        document.querySelector(".label-Year").style.color = "hsl(0, 100%, 67%)";
        document.getElementById("errorYear").style.display = "block"; // Show year error
    }

    // If no errors, proceed with age calculation
    if (!hasError) {
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
        dayDisplay.textContent = Math.abs(outputDay);
        monthDisplay.textContent = Math.abs(outputMonth);
        yearDisplay.textContent = Math.abs(outputYear);

        // Style inputs to indicate valid entries
        for (let input of allInputs) {
            input.style.borderColor = "hsl(259, 100%, 65%)"; // Change to a valid color
        }

        for (let label of allLabels) {
            label.style.color = "hsl(0, 1%, 44%)"; // Change label color
        }

        // Hide all error messages
        for (let error of hiddenError) {
            error.style.display = "none";
        }
    }
});
