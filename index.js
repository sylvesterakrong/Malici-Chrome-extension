document.addEventListener("DOMContentLoaded", function() {
    const checkButton = document.getElementById("checkButton");
    const urlInput = document.getElementById("urlInput");
    const resultElement = document.getElementById("result");


    checkButton.addEventListener("click", function() {
      const inputUrl = urlInput.value;
  
      if (inputUrl.startsWith("http")) {
        resultElement.textContent = "Flagged as Unsafe (HTTP)";
      } else if (safeUrls.includes(inputUrl)) {
        resultElement.textContent = "Safe";
      } else if (notSafeUrls.includes(inputUrl)) {
        resultElement.textContent = "Not Safe";
      } else if (checkForPhishingKeywords(inputUrl)) {
        resultElement.textContent = "Flagged as Unsafe (Phishing Keyword)";
      } else if (checkLengthAndComplexity(inputUrl)) {
        resultElement.textContent = "Flagged as Unsafe (Length and Complexity)";
      } else {
        resultElement.textContent = "Unknown";
      }
    });
  });


  const safeUrls = [
    "https://www.google.com",
    "https://www.knust.edu.gh",
    "knust.edu.gh",
  ];

  const notSafeUrls = [
    "https://www.malicious-site.com",
    "https://www.phishing-site.com",
  ];

  const knownPhishingKeywords = [
    "login",
  "bank",
  "password",
  "security",
  "verify",
  "account",
  "update",
  "billing",
  "payment",
  "confirm",
  ];


  function checkForPhishingKeywords(url) {
    return knownPhishingKeywords.some(keyword => url.includes(keyword));
  }

  function checkLengthAndComplexity(url) {
    return url.length > 100;
  }

