const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const query = searchInput.value;
  resultsDiv.innerHTML = 'Loading...';
  try {
    const res = await fetch(`http://localhost:3000/api/startups?query=${query}`);
    const startups = await res.json();
    if (startups.length === 0) {
      resultsDiv.innerHTML = '<p>No startups found.</p>';
      return;
    }
    resultsDiv.innerHTML = startups.map(item => `
      <div class="startup-card">
        <h3>${item.name || 'Unnamed Startup'}</h3>
        <p>Industry: ${item.category_list || 'N/A'}</p>
        <p>Location: ${item.location_identifiers || 'N/A'}</p>
      </div>
    `).join('');
  } catch (err) {
    resultsDiv.innerHTML = '<p>Error fetching startups. Try again later.</p>';
  }
});