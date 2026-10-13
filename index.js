const form = document.querySelector('#bug-form');
const bugDescription = document.querySelector('#bug-description');
const codeInput = document.querySelector('#code-input');
const analysisResult = document.querySelector('#analysis-result');
const tryExampleBtn = document.querySelector("#try-example-btn");
const analyzeBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", handleSubmit)
tryExampleBtn.addEventListener("click", loadExample);

function handleSubmit(event) {
    event.preventDefault();
    
    const userCode = codeInput.value;
    const userDescription = bugDescription.value;
    
    const bugData = {
        description: userDescription,
        code: userCode
    }
    const jsonData = JSON.stringify(bugData);

    // Show loading state
analyzeBtn.disabled = true;
analyzeBtn.textContent = "Analyzing Code...";

analysisResult.innerHTML = `
    <div class="analysis-loading" role="status" aria-live="polite">
        <div class="loading-icon">
            <span>✦</span>
        </div>

        <div class="loading-content">
            <div class="loading-label">BUGLENS AI IS WORKING</div>

            <h3>Analyzing your code<span class="loading-dots"><i></i><i></i><i></i></span></h3>

            <p>Looking for potential issues and preparing suggestions.</p>
        </div>
    </div>
`;

    console.log("Form submitted");
    console.log("Bug Data:", bugData);
    console.log("JSON Data:", jsonData);

    fetch("http://localhost:3000/api/analyze",{
        method : "POST",
        headers : { 
            "Content-Type" : "application/json"
        },
        body : jsonData
    }).then(response => response.json())
      .then(data => {
          if (!data.success || !data.analysis) {

        throw new Error(data.message || "Analysis failed.");

    }
          console.log("Response from server:", data);
         
          analysisResult.innerHTML = `
    <div class="result-card">
        <h3>🐞 Bug Detected</h3>
        <p id="error-text"></p>
    </div>
    <div class="result-card">
        <h3>🧠 Why It Happens</h3>
        <p id="explanation-text"></p>
    </div>
       <div class="result-card">
        <h3>📍 Error Location</h3>
        <p id="location-text"></p>
    </div>
       <div class="result-card">
        <h3>🛠️ How to Fix It</h3>
        <p id="solution-text"></p>
    </div>
       <div class="result-card">
        <h3>✨ Fixed Code</h3>
    <pre><code id="fixed-code"></code></pre>
    </div>
       <div class="result-card">
        <h3>📚 What You Learned</h3>
        <p id="learning-tip"></p>
    </div>
`

    const errorText = document.querySelector("#error-text");
    const explanationText = document.querySelector("#explanation-text");
    const locationText = document.querySelector("#location-text");
    const solutionText = document.querySelector("#solution-text");
    const fixedCodeText = document.querySelector("#fixed-code");
    const learningTipText = document.querySelector("#learning-tip");

    errorText.textContent = data.analysis.error;
    explanationText.textContent = data.analysis.explanation;
    locationText.textContent = data.analysis.location ?? "Not identified";
    solutionText.textContent = data.analysis.solution;
    fixedCodeText.textContent = data.analysis.fixedCode;
    learningTipText.textContent = data.analysis.learningTip;
      }).catch(error => {

    console.error("BugLens Error:", error);

    analysisResult.innerHTML = `

        <div class="analysis-error" role="alert">

            <span class="error-icon">!</span>

            <div>

                <h3>Analysis couldn't be completed</h3>

                <p id="analysis-error-message"></p>

            </div>

        </div>

    `;

    document.querySelector("#analysis-error-message").textContent =

        error.message || "Something went wrong. Please try again.";

})

.finally(() => {

    analyzeBtn.disabled = false;

    analyzeBtn.textContent = "Analyze My Code";

});

}

function loadExample() {
    const exampleCode = `const products = [
    { name: "Laptop", price: 1200, inStock: true },
    { name: "Mouse", price: 25, inStock: false },
    { name: "Keyboard", price: 80, inStock: true },
    { name: "Monitor", price: 300, inStock: true }
];

function calculateTotal(items) {
    const availableProducts = items.filter(item => item.inStock);

    const total = availableProducts.reduce((sum, item) => {
        return sum + item.prize;
    }, 0);

    return total;
}

console.log("Total inventory value:", calculateTotal(products));`;

    const exampleDescription =
        "I'm calculating the total value of products that are in stock, but my function returns NaN instead of the expected total. Can you identify the bug, explain why it happens, and show me how to fix it?";

    codeInput.value = exampleCode;
    bugDescription.value = exampleDescription;

    analysisResult.innerHTML = "";

    codeInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}