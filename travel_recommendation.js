// Navigation logic
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    // Task 4 Note: Hide search bar on About/Contact
    const searchBar = document.getElementById('navSearch');
    searchBar.style.visibility = (sectionId === 'home') ? 'visible' : 'hidden';
}

// Task 6 & 7: Search Logic
const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const resultDiv = document.getElementById('result-container');

async function searchRecommendations() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    resultDiv.innerHTML = ''; // Clear previous

    try {
        const response = await fetch('./travel_recommendation_api.json');
        const data = await response.json();

        let results = [];

        // Task 7: Keyword Variations
        if (input.includes('beach')) {
            results = data.beaches;
        } else if (input.includes('temple')) {
            results = data.temples;
        } else if (input.includes('country')) {
            // For countries, we flatten the cities from the country list
            data.countries.forEach(country => {
                results.push(...country.cities);
            });
        }

        // Task 8: Display Results
        if (results.length > 0) {
            results.forEach(item => {
                resultDiv.innerHTML += `
                    <div class="recommendation-card">
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <div>
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                            <button>Visit</button>
                        </div>
                    </div>
                `;
            });
        } else {
            resultDiv.innerHTML = '<p style="color:black">No results found. Try "beaches", "temples", or "countries".</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Task 9: Reset Button
btnReset.addEventListener('click', () => {
    document.getElementById('conditionInput').value = '';
    resultDiv.innerHTML = '';
});

btnSearch.addEventListener('click', searchRecommendations);