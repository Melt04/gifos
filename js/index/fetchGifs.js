async function fetchRandomGifs() {
  let randomGifs = [];
  for (let i = 0; i < 4; i++) {
    randomGifs.push(fetch(`${URL_RANDOM}&${API_KEY}`));
  }
  try {
    let results = await Promise.all(randomGifs);
    let randomGifsJson = [];
    results.forEach(response => {
      randomGifsJson.push(response.json());
    });
    let data = await Promise.all(randomGifsJson);
    let gifs = data.map(data => data.data);
    let suggestedGif = document.querySelector('#suggestGrid');
    showGifs(gifs, suggestedGif, true);
  } catch (e) {
    console.log(e);
  }
}
async function fetchTrendingGifs() {
  try {
    let response = await fetch(`${URL_TRENDING}&${API_KEY}&limit=15`);
    let gifs = await response.json();
    let trendingGrid = document.querySelector('#trendingGrid');
    showGifs(gifs.data, trendingGrid, false);
  } catch (e) {
    console.log(e);
  }
}
async function fetchAutocomplete() {
  try {
    let complete = inputSearch.value;
    let response = await fetch(
      `${URL_AUTOCOMPLETE}&${API_KEY}&q=${complete}&limit=3`
    );
    let data = await response.json();
    addAutocompleteInput(data.data);
  } catch (e) {
    console.log(e);
  }
}
async function fetchSearchGifs(buscar, saveHistory) {
  event.preventDefault();
  divAutocomplete.style.display = 'none';
  if (!panelSearch.classList.contains('busqueda-show')) {
    panelSearch.classList.add('busqueda-show');
  }
  try {
    let response = await fetch(`${URL_SEARCH}&${API_KEY}&q=${buscar}&limit=20`);
    let data = await response.json();

    if (data.data.length < 1) {
      alert('No se encontraron resultados');
    }
    let searchGrid = document.querySelector('#searchGrid');
    if (saveHistory) {
      saveSearchLocalStorate(inputSearch.value);
      getSearchHistory();
    }

    showGifs(data.data, searchGrid);
    searchHistory.style.display = 'block';
    inputSearch.innerText = '';
  } catch (e) {
    console.log(e);
  }
}
