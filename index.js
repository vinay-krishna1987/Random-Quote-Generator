const apiUrl = "https://api.quotable.io/random";
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const copyButton = document.getElementById("copy-button");
const copyMessage = document.getElementById("copy-message");
const newQuoteButton = document.getElementById("new-quote-button");

async function getQuote(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        quote.innerHTML = data.content;
        author.innerHTML = data.author;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

function copyToClipboard() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;
    const textToCopy = `"${quoteText}" - ${authorText}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyMessage.innerText = "Copied!";
        copyMessage.style.display = "inline";
        setTimeout(() => {
            copyMessage.style.display = "none";
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

// Attach event listeners
if (newQuoteButton) {
    newQuoteButton.addEventListener("click", () => getQuote(apiUrl));
}

if (copyButton) {
    copyButton.addEventListener("click", copyToClipboard);
}

// Load the initial quote
getQuote(apiUrl);
