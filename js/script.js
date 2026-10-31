console.log("script.js connected!");

// 1. Select all elements with the class question-block
let questionBlocks = document.querySelectorAll(".question-block");

// 2. Loop through each question block to find its answer buttons and add event listeners
questionBlocks.forEach(function(block) {
    let answerButtons = block.querySelectorAll(".answer-btn");
    
    answerButtons.forEach(function(button) {
        // 3. Add a click event listener to each answer button
        button.addEventListener("click", function() {
            
            // Remove the 'selected' class from all buttons in this specific block
            answerButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });
            
            // Add the 'selected' class to the clicked button
            button.classList.add("selected");
            
            // 4. Store/track the user's selected answer using data-answer attribute
            let selectedAnswer = button.getAttribute("data-answer");
            console.log("Selected answer:", selectedAnswer);
        });
    });
});

// Define the displayResult() function to calculate and display the final score/result
function displayResult() {
    // Initialize score counter for each house
    let scores = {
        Gryffindor: 0,
        Hufflepuff: 0,
        Ravenclaw: 0,
        Slytherin: 0
    };

    // Find all buttons that currently have the 'selected' class
    let selectedButtons = document.querySelectorAll(".answer-btn.selected");

    // Make sure the user answered at least one question
    if (selectedButtons.length === 0) {
        alert("Please answer at least one question before viewing your sorting results!");
        return;
    }

    // Tally up the points based on the data-answer attribute
    selectedButtons.forEach(function(btn) {
        let house = btn.getAttribute("data-answer");
        if (scores.hasOwnProperty(house)) {
            scores[house]++;
        }
    });

    // Determine the winning house based on highest score
    let winningHouse = "Gryffindor";
    let maxScore = -1;

    for (let house in scores) {
        if (scores[house] > maxScore) {
            maxScore = scores[house];
            winningHouse = house;
        }
    }

    // Update the DOM to show the result container and message using textContent
    let resultContainer = document.getElementById("result-container");
    let resultText = document.getElementById("result-text");

    resultContainer.style.display = "block";
    resultText.textContent = `The Sorting Hat has pondered deeply and decided... You belong in ${winningHouse}! ✨`;
}

// 5. Use getElementById() to select the "Show Results" button and add a click event listener calling displayResult()
let showResultBtn = document.getElementById("show-result");
showResultBtn.addEventListener("click", displayResult);