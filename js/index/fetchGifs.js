function showGifs(array, element) {
  element.innerHTML = '';
  array.forEach(gif => {
    let original = gif.images.original;
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src', original.url);
    div.append(img);
    if (original.width > 500) {
      div.style.gridColumn = 'span 2';
    }
    if (original.height > 500) {
      div.style.gridRow = 'span 2';
    }
    element.append(div);
  });
}
function fetchTrendingGifs() {
  fetch(`${URL_TRENDING}&${API_KEY}&limit=10`)
    .then(response => response.json())
    .then(data => {
      let suggestedGif = document.querySelector('#suggestGrid');
      showGifs(data.data, suggestedGif);
    })
    .catch(err => console.log(err));
}

function fetchAutocomplete() {
  let complete = inputSearch.value;
  fetch(`${URL_AUTOCOMPLETE}&${API_KEY}&q=${complete}&limit=3`)
    .then(response => response.json())
    .then(data => addAutocompleteInput(data.data))
    .catch(err => console.log(err));
}
function fetchSearchGifs(buscar, saveHistory) {
  event.preventDefault();
  divAutocomplete.style.display = 'none';
  if (!panelSearch.classList.contains('busqueda-show')) {
    panelSearch.classList.add('busqueda-show');
  }
  fetch(`${URL_SEARCH}&${API_KEY}&q=${buscar}&limit=20`)
    .then(response => response.json())
    .then(data => {
      let searchGrid = document.querySelector('#searchGrid');
      if (saveHistory) {
        saveSearchLocalStorate(inputSearch.value);
        getSearchHistory();
      }
      showGifs(data.data, searchGrid);
      searchHistory.style.display = 'block';
      inputSearch.innerText = '';
    })
    .catch(err => console.log(err));
}
