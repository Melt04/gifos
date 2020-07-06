let inputSearch = document.querySelector('#searchGif');
let buttonSearch = document.querySelector('#buttonSearch');
let imgSearch = document.querySelector('#imgSearch');
let divAutocomplete = document.querySelector('.autocomplete');

function addAutocompleteInput(array) {
  if (array.length < 1) {
    return;
  }
  divAutocomplete.innerHTML = '';
  array.forEach(data => {
    divAutocomplete.style.display = 'block';
    let button = document.createElement('button');
    button.innerText = data.name;
    button.addEventListener('click', () => {
      inputSearch.value = button.innerText;
    });
    divAutocomplete.append(button);
  });
}

function fetchAutocomplete() {
  let complete = inputSearch.value;
  fetch(`${URL_AUTOCOMPLETE}${API_KEY}&q=${complete}&limit=3`)
    .then(response => response.json())
    .then(data => addAutocompleteInput(data.data))
    .catch(err => console.log(err));
}

function fetchGifs(event) {
  event.preventDefault();
  let buscar = inputSearch.value;
  fetch(`${URL_SEARCH}${API_KEY}&q=${buscar}&limit=10`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
function enabledSearch() {
  if (inputSearch.value.length > 0) {
    buttonSearch.removeAttribute('disabled');
    buttonSearch.style.background = '#f7c9f3';
    buttonSearch.style.color = 'black';
    imgSearch.setAttribute('src', './assets/lupa.svg');
    fetchAutocomplete();
  } else {
    buttonSearch.setAttribute('disabled', '');
    imgSearch.setAttribute('src', './assets/lupa_inactive.svg');
    buttonSearch.style.background = '#e6e6e6';
    buttonSearch.style.color = '#b4b4b4';
    divAutocomplete.style.display = 'none';
  }
}
