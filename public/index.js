const form = document.querySelector('#bug-form');
const bugDescription = document.querySelector('#bug-description');
const codeInput = document.querySelector('#code-input');
const analysisResult = document.querySelector('#analysis-result');
const tryExampleBtn = document.querySelector("#try-example-btn");
const analyzeBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", handleSubmit)
tryExampleBtn.addEventListener("click", loadExample);

codeInput.addEventListener("input", () => {
    autoResizeTextarea(codeInput);
});

bugDescription.addEventListener("input", () => {
    autoResizeTextarea(bugDescription);
});

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
    analysisResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    console.log("Form submitted");


    fetch("/api/analyze",{
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
    const fixedCodeElement = document.querySelector("#fixed-code");
    fixedCodeElement.replaceChildren(
    ...highlightChanges(userCode, data.analysis.fixedCode)
    );
    const learningTipText = document.querySelector("#learning-tip");

    errorText.textContent = data.analysis.error;
    explanationText.textContent = data.analysis.explanation;
    locationText.textContent = data.analysis.location ?? "Not identified";
    solutionText.textContent = data.analysis.solution;
    learningTipText.textContent = data.analysis.learningTip;

    const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

analysisResult.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start"
});
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
    const exampleCode = `async function getUserProfile(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const user = response.json();

    return user;
}

async function displayUserProfile() {
    const user = await getUserProfile(42);

    console.log("Username:", user.name);
    console.log("Email:", user.email);
}

displayUserProfile();`;

const exampleDescription =
    "I'm fetching user profile data from an API using async/await. The request succeeds, but when I try to access the user's name and email, both values are undefined. I can't figure out why the data isn't available even though the API returns a valid JSON response. Can you identify the bug and explain how to fix it?";
   
    codeInput.value = exampleCode;
    bugDescription.value = exampleDescription;

    autoResizeTextarea(codeInput);
    autoResizeTextarea(bugDescription);

    analysisResult.innerHTML = "";

    codeInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
function autoResizeTextarea(textarea) {
    textarea.style.height = "auto";

    const maxHeight = window.innerWidth <= 640 ? 280 : 500;

    textarea.style.height =
        Math.min(textarea.scrollHeight, maxHeight) + "px";
}

function highlightChanges(originalCode, fixedCode) {
    const originalLines = originalCode.split("\n");
    const fixedLines = fixedCode.split("\n");

    const changedLines = fixedLines.map((line, index) => {
        const span = document.createElement("span");

        span.textContent = line + "\n";

        if (line !== originalLines[index]) {
            span.classList.add("changed-line");
        }

        return span;
    });

    return changedLines;
}