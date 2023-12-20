document.addEventListener('DOMContentLoaded', function() {
  const uploadButton = document.getElementById('uploadButton');
  const optimizeButton = document.getElementById('optimizeButton');

  uploadButton.addEventListener('click', handleUpload);
  optimizeButton.addEventListener('click', handleOptimize);
});

function handleUpload() {
  const resumeFileInput = document.getElementById('resumeFile');
  const file = resumeFileInput.files[0];

  if (file) {
    readAndDisplayFile(file);
  } else {
    alert('Please select a file.');
  }
}

function handleOptimize() {
  const resumeText = document.getElementById('resumeText').value;

  clearResult(); // Clear previous content

  // Handle Word document
  if (resumeText.startsWith("PK")) {
    extractTextFromWordDocument(resumeText, displayOptimizedResume);
  } else {
    // Call functions for keyword suggestions, ATS compatibility check, and document matching
    const keywords = getKeywordSuggestions(resumeText);
    const compatibilityIssues = checkATSCompatibility(resumeText);
    const jobDescription = "Placeholder job description text.";
    const matchingResult = matchDocument(resumeText, jobDescription);

    // Display results
    displayKeywords(keywords);
    displayCompatibilityIssues(compatibilityIssues);
    displayMatchingResult(matchingResult);

    // Call function for basic optimization (placeholder)
    const optimizedResume = optimizeResume(resumeText);

    // Display the optimized resume
    displayOptimizedResume(optimizedResume);
  }
}

// Function to read and display the content of the uploaded file
function readAndDisplayFile(file) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const resumeText = event.target.result;
    document.getElementById('resumeText').value = resumeText;
  };
  reader.readAsText(file);
}

// Function to clear previous content in the result container
function clearResult() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
}

// Function to extract text from a Word document using mammoth.js
function extractTextFromWordDocument(wordContent, callback) {
  mammoth.extractRawText({ arrayBuffer: wordContent })
    .then(result => {
      const text = result.value;
      callback(text);
    })
    .catch(error => {
      console.error('Error extracting text from Word document:', error);
    });
}

// Function to display keyword suggestions
function displayKeywords(keywords) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML += `<p>Keyword Suggestions:</p><ul>${keywords.map(keyword => `<li>${keyword}</li>`).join('')}</ul>`;
}

// Function to display ATS compatibility issues
function displayCompatibilityIssues(issues) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML += `<p>ATS Compatibility Issues:</p><ul>${issues.map(issue => `<li>${issue}</li>`).join('')}</ul>`;
}

// Function to display document matching result
function displayMatchingResult(matchingResult) {
  const resultDiv = document.getElementById('result');
  const resultMessage = matchingResult
    ? '<p>Your resume matches the job description!</p>'
    : '<p>Your resume does not match the job description.</p>';
  resultDiv.innerHTML += resultMessage;
}

// Function to display the optimized resume
function displayOptimizedResume(optimizedResume) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML += `<p>Optimized Resume:</p><pre>${optimizedResume}</pre>`;
}

// Function for basic optimization (placeholder)
function optimizeResume(resume) {
  // Add your basic optimization logic here
  // This is a placeholder, replace it with the actual optimization process
  return resume.toUpperCase(); // Example: Convert to uppercase for demonstration
}

// Function to get keyword suggestions (simplified example)
function getKeywordSuggestions(resume) {
  // Implement your keyword suggestion logic here (e.g., using an API or simple rule-based approach)
  // This is a placeholder, replace it with a more sophisticated solution
  const keywords = resume.split(/\s+/).slice(0, 5); // Example: Extract the first 5 words
  return keywords;
}

// Function to check ATS compatibility (simplified example)
function checkATSCompatibility(resume) {
  // Implement your ATS compatibility check logic here
  // This is a placeholder, replace it with a more sophisticated solution
  const issues = [];
  if (resume.toLowerCase().includes('objective')) {
    issues.push("Remove 'Objective' section for better ATS parsing.");
  }
  // Add more ATS compatibility checks as needed
  return issues;
}

// Function to match the document against a job description (placeholder)
function matchDocument(resumeText, jobDescription) {
  // Implement your document matching logic here
  // This is a placeholder, replace it with the actual matching process
  const matchingResult = Math.random() > 0.5; // Example: Random result for demonstration
  return matchingResult;
}
