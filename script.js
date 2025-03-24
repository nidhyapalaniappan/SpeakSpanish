document.getElementById("translateBtn").addEventListener("click", async function () {
    const inputWord = document.getElementById("inputWord").value.trim();
    const outputElement = document.getElementById("outputWord");

    if (!inputWord) {
        alert("Please enter a word!");
        return;
    }

    // API: LibreTranslate (Free, No Key Required for localhost testing)
    const url = "https://libretranslate.com/translate";
    const data = {
        q: inputWord,
        source: "en",
        target: "es",
        format: "text"
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        const result = await response.json();
        const translatedWord = result.translatedText;

        // Display the translated word
        outputElement.textContent = translatedWord;

        // Speak the translated word after 5 seconds
        setTimeout(() => {
            speakSpanish(translatedWord);
        }, 5000);
    } catch (error) {
        console.error("Error translating:", error);
        outputElement.textContent = "Translation failed!";
    }
});

// Function to speak the Spanish word
function speakSpanish(word) {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "es-ES"; // Spanish voice
    window.speechSynthesis.speak(speech);
}
