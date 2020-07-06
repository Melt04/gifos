/* let formPanel = document.querySelector('.form-panel');
let input = document.createElement('input');
input.setAttribute('type', 'text');
formPanel.append(input); */
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
    let p = document.createElement('button');
    p.innerText = data.name;
    divAutocomplete.append(p);
  });
}

function fetchAutocomplete() {
  let complete = inputSearch.value;
  fetch(`${URL_AUTOCOMPLETE}${API_KEY}&q=${complete}&limit=3`)
    .then(response => response.json())
    .then(data => addAutocompleteInput(data.data))
    .catch(err => console.log(err));
}
function enabledSearch() {
  if (inputSearch.value.length > 0) {
    buttonSearch.removeAttribute('disabled');
    imgSearch.setAttribute('src', './assets/lupa.svg');
    fetchAutocomplete();
  } else {
    buttonSearch.setAttribute('disabled', '');
    imgSearch.setAttribute('src', './assets/lupa_inactive.svg');
    divAutocomplete.style.display = 'none';
  }
}

inputSearch.addEventListener('keyup', enabledSearch);
