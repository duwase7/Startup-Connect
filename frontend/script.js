const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
let currentPage = 1;
let lastQuery = '';

async function fetchStartups(query, page = 1) {
  resultsDiv.innerHTML = '<p>Loading...</p>';
  try {
    const res = await fetch(`http://localhost:3000/api/startups?query=${query}&page=${page}`);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      resultsDiv.innerHTML = '<p>No startups found.</p>';
      return;
    }

    resultsDiv.innerHTML = data.items.map(item => `
      <div class="startup-card">
        <h3>${item.name || 'Unnamed Startup'}</h3>
        <p>Industry: ${item.category_list || 'N/A'}</p>
        <p>Location: ${item.location_identifiers || 'N/A'}</p>
      </div>
    `).join('') + paginationControls(data.items.length);
  } catch (err) {
    resultsDiv.innerHTML = '<p>Error fetching startups. Check backend or API keys.</p>';
    console.error(err);
  }
}

function paginationControls(itemsCount) {
  if (itemsCount < 10) return ''; // No pagination if less than 10 items
  return `
    <div class="pagination">
      <button ${currentPage === 1 ? 'disabled' : ''} id="prevBtn">Previous</button>
      <span>Page ${currentPage}</span>
      <button id="nextBtn">Next</button>
    </div>
  `;
}

resultsDiv.addEventListener('click', e => {
  if (e.target.id === 'prevBtn') {
    if (currentPage > 1) currentPage--;
    fetchStartups(lastQuery, currentPage);
  }
  if (e.target.id === 'nextBtn') {
    currentPage++;
    fetchStartups(lastQuery, currentPage);
  }
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value;
  lastQuery = query;
  currentPage = 1;
  fetchStartups(query, currentPage);
});