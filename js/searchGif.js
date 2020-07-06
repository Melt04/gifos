/* let formPanel = document.querySelector('.form-panel');
let input = document.createElement('input');
input.setAttribute('type', 'text');
formPanel.append(input); */
let inputSearch = document.querySelector('#searchGif');
let buttonSearch = document.querySelector('#buttonSearch');
let imgSearch = document.querySelector('#imgSearch');
function fetchAutocomplete() {
  let complete = inputSearch.value;

  fetch(`${URL_AUTOCOMPLETE}${API_KEY}&q=${complete}&limit=3`)
    .then(response => response.json())
    .then(data => console.log(data.data))
    .catch(err => console.log(err));
}
function enabledSearch() {
  if (inputSearch.value.length > 0) {
    buttonSearch.removeAttribute('disabled');

    fetchAutocomplete();
  } else {
    buttonSearch.setAttribute('disabled', '');
  }
}

inputSearch.addEventListener('keyup', enabledSearch);

function searchGif() {
  fetch(`${URL_AUTOCOMPLETE}${API_KEY}&q=ham`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
