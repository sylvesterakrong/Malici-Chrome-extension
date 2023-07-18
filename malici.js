chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    document.addEventListener('DOMContentLoaded', function() {
    const myButton = document.getElementById('myButton');

    myButton.addEventListener('click', function() {
        // Handle the click event here.
        detectMaliciousUrls();
    });
    });


function detectMaliciousUrls() {

    const url = 'https://www.ipqualityscore.com/api/json/url/SH4d9yDddF6h56EwrSZpaLM2GEvM69JL/https%3A%2F%2Fgoogle.com';

    const apiKey = 'SH4d9yDddF6h56EwrSZpaLM2GEvM69JL';
    const inputText = document.getElementById('urlInput').value;

    const urls = inputText.trim().split('\n').map(url => url.trim());

    // Create a new Headers object and add the API key to it
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${apiKey}`);

    // Prepare the payload with the URLs
    const payload = {
      urls: urls,
      strictness: 1, // Adjust this as per your requirements
    };

    // Make the POST request with custom headers using the Fetch API
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here
        console.log(data);
        // The response will contain information about the URLs, such as if they are malicious or not.
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });

      if (message.data) {
        // Handle the received data here and update the DOM on your webpage.

        const resultsDiv = document.getElementById("results");
        resultsDiv.textContent = JSON.stringify(message.data, null, 2); // Display the data in a readable format.
    }
  }
});