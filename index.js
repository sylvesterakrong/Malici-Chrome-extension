document.addEventListener("DOMContentLoaded", function() {
    const checkButton = document.getElementById("checkButton");
    const urlInput = document.getElementById("urlInput");
    let resultElement = document.getElementById("result"); // Declare resultElement using let
    const refreshButton = document.getElementById("refreshButton");

    //this listens for the refresh button then clears all feilds
    refreshButton.addEventListener("click", function() {
      urlInput.value = ""; 
      resultElement.textContent = ""; 
    });


    //this is where all the query takes place when the detect button is clicked
    checkButton.addEventListener("click", function() {
      const inputUrl = urlInput.value;
  
      if (!inputUrl.startsWith("http://") && !inputUrl.startsWith("https://")) {
        resultElement.textContent = " Invalid URL: Please enter a valid URL with http:// or https:// protocol. ";
      }
      else if(isGibberish(inputUrl)) {
        resultElement.textContent = "Flagged as Gibberish(Unsafe)";
      }else if (inputUrl.startsWith("https")) {
        resultElement.textContent = "Flagged as safe ( HTTPS)";
      } else if(inputUrl.startsWith("http")) {
          resultElement.textContent = " Flagged as Unsafe (HTTP) ";
      }else if (safeUrls.includes(inputUrl)) {
        resultElement.textContent = "Safe ";
      } else if (notSafeUrls.includes(inputUrl)) {
        resultElement.textContent = " Not Safe ";
      } else if (checkForPhishingKeywords(inputUrl)) {
        resultElement.textContent = " Flagged as Unsafe (Phishing Keyword) ";
      } else if (checkLengthAndComplexity(inputUrl)) {
        resultElement.textContent = " Flagged as Unsafe (Length and Complexity) ";
      } else if (isSpecialTLD(inputUrl)) {
        resultElement.textContent = "Flagged as Special TLD (safe) ";
      }else {
        resultElement.textContent = "Unknown";
      }

      
    });

    
  });

//sample of safe urls
  const safeUrls = [
      "https://www.google.com",
      "https://www.microsoft.com",
      "https://www.apple.com",
      "https://www.amazon.com",
      "https://www.facebook.com",
      "https://www.netflix.com",
      "https://www.nytimes.com",
      "https://www.wikipedia.org",
      "https://www.instagram.com",
      "https://www.linkedin.com",
      "https://www.github.com",
      "https://www.spotify.com",
      "https://www.pinterest.com",
      "https://www.quora.com",
      "https://www.reddit.com",
      "https://www.stackoverflow.com",
      "https://www.twitter.com",
      "https://www.udemy.com",
      "https://www.youtube.com",
      "https://www.zoom.us",
      "https://www.knust.edu.gh",
      "knust.edu.gh",
  ];


  //sample of unsafe urls
  const notSafeUrls = [
    "https://www.malicious-site.com",
    "https://www.phishing-site.com",
    "https://www.fakesite123.com",
    "https://www.scammywebsite.org",
    "https://www.dangerous-link.net",
    "https://www.suspicious-url.biz",
    "https://www.fakebank-login.com",
    "https://www.virus-infected-site.xyz",
    "https://www.identity-theft-scam.com",
    "https://www.unsecured-login-page.com",
    "https://www.hackyouraccount.net",
    "https://www.malware-download-link.org",
    "https://www.phishing-attempt-abc.com",
    "https://www.ponzi-scheme-scam.xyz",
    "https://www.malicious-download-link.net",
    "https://www.fraudulent-page.org",
    "https://www.spoofed-login-website.com",
    "https://www.data-breach-attempt.com",
    "https://www.fake-online-store.xyz",
    "https://www.credit-card-scam.net",
  ];
  
//sample of common phishing keywoards
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

  //these are sample special domains
  function isSpecialTLD(url) {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
  
    return (
      hostname.endsWith(".edu") ||
      hostname.endsWith(".gh") ||
      hostname.endsWith(".gov") ||
      hostname.endsWith(".mil") || 
      hostname.endsWith(".int") || 
      hostname.endsWith(".ac")  ||  
      hostname.endsWith(".org") ||  
      hostname.endsWith(".museum") || 
      hostname.endsWith(".coop") ||  
      hostname.endsWith(".aero") ||  
      hostname.endsWith(".jobs")   
    );
  }


  //this is to read if the user inoutted gibberish or not
  function isGibberish(url) {
    const alphanumericChars = url.match(/[a-zA-Z0-9]/g);
    const ratio = alphanumericChars ? alphanumericChars.length / url.length : 0;
    
    return ratio < 0.5;
  }
  
  
  

