let data = [];

// Load JSON data
fetch("data.json")
    .then(response => response.json())
    .then(json => {
        data = json;
        console.log("Data loaded:", data);
    });

// Send message
function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.toLowerCase();

    if (message.trim() === "") return;

    addMessage(message, "user");
    input.value = "";

    // Show typing indicator
    const typingDiv = addMessage("typing...", "bot");

    const delay = 500 + message.length * 30;

    setTimeout(() => {
        const reply = getBestMatch(message);

        // Replace typing with actual message
        typingDiv.innerText = reply;
    }, delay);
}

// Add message to UI
function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageDiv; // IMPORTANT
}

// Core matching logic
function getBestMatch(userInput) {
    if (userInput.includes("secret") || userInput.includes("i love you most")) {
        return "No matter what happens, you are the best thing in my life. Always. ❤️";
    }
    
    let bestScore = 0;
    let bestAnswer = "I'm thinking about you... tell me more ❤️";

    const words = userInput.toLowerCase().split(" ");

    data.forEach(item => {
        let score = 0;

        item.keywords.forEach(keyword => {
            const keyWordsSplit = keyword.toLowerCase().split(" ");

            keyWordsSplit.forEach(k => {
                if (words.includes(k)) {
                    score++;
                }
            });
        });

        if (score > bestScore) {
            bestScore = score;
            bestAnswer = item.answer;
        }
    });

    if (Array.isArray(bestAnswer)) {
        return bestAnswer[Math.floor(Math.random() * bestAnswer.length)];
    }

    return bestAnswer;
}

document.getElementById("user-input")
    .addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });