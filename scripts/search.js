// Fetch the entries data when the page loads
fetch("entries/entries.json")
    .then(response => response.json())
    .then(data => {
        window.entriesData = data; // Store data globally
        console.log("Entries Data:", window.entriesData);
    })
    .catch(err => {
        console.error("Error loading entries data:", err); // This was missing the closing brace
    });  // Close the .catch block here

// Function to search entries based on the query
function searchEntries(query) {
    const results = [];
    
    // Loop through each section in the data
    for (const section in window.entriesData) {
        const sectionEntries = window.entriesData[section];
        
        // Loop through entries in each section
        sectionEntries.forEach(entry => {
            if (entry.title.toLowerCase().includes(query.toLowerCase())) {
                results.push({ section, ...entry });
            }
        });
    }
    
    return results;
}

// Function to display the results in the HTML
function displayResults(results) {
    const resultsSection = document.getElementById("results");
    resultsSection.innerHTML = ""; // Clear any existing results

    // If no results were found
    if (results.length === 0) {
        resultsSection.innerHTML = "<p>No results found.</p>";
    } else {
        let currentSection = null;
        
        // Loop through the results and display them
        results.forEach(result => {
            // Only show the section name once for each section
            if (currentSection !== result.section) {
                const sectionHeader = document.createElement("h2");
                sectionHeader.textContent = result.section;
                resultsSection.appendChild(sectionHeader);
                currentSection = result.section;
            }

            // Create a div for the result entry
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result-item");
            resultDiv.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.description}</p>
            `;
            resultsSection.appendChild(resultDiv);
        });
    }
}

// Event listener to trigger search as the user types
document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value;
    const searchResults = searchEntries(query);
    displayResults(searchResults); // Display the results in the #results section
});

