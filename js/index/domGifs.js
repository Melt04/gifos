let inputSearch = document.querySelector('#searchGif');
let buttonSearch = document.querySelector('#buttonSearch');
let imgSearch = document.querySelector('#imgSearch');
let divAutocomplete = document.querySelector('.autocomplete');
let panelSearch = document.querySelector('.busqueda');
let searchHistory = document.querySelector('#searchHistory');

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
      divAutocomplete.style.display = 'none';
    });
    divAutocomplete.append(button);
  });
}

function addOnClickSpan(span) {
  span.addEventListener('click', event => {
    console.log(event.target.attributes[`data-search`].value);
    fetchSearchGifs(event.target.attributes[`data-search`].value, false);
  });
}

function onSearch() {
  if (inputSearch.value.length > 0) {
    searchHistory.style.display = 'none';
    buttonSearch.removeAttribute('disabled');
    buttonSearch.style.background = '#f7c9f3';
    buttonSearch.style.color = 'black';
    divAutocomplete.style.display = 'block';
    imgSearch.setAttribute('src', './assets/lupa.svg');
    fetchAutocomplete();
  } else {
    searchHistory.style.display = 'block';
    buttonSearch.setAttribute('disabled', '');
    imgSearch.setAttribute('src', './assets/lupa_inactive.svg');
    buttonSearch.style.background = '#e6e6e6';
    buttonSearch.style.color = '#b4b4b4';
    divAutocomplete.style.display = 'none';
  }
}
function createWindowAspect(div, img, gif) {
  let span = document.createElement('span');
  let p = document.createElement('p');
  p.innerText = `#${gif.slug}`;
  span.innerText = 'Ver mas...';
  div.append(p);
  div.append(img);
  div.append(span);
  span.setAttribute('data-search', gif.slug);
  addOnClickSpan(span);
}
function showGifs(array, element, createWindow) {
  element.innerHTML = '';
  array.forEach(gif => {
    let original = gif.images.original;
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute('src', original.url);
    if (createWindow) {
      createWindowAspect(div, img, gif);
    } else {
      div.append(img);
    }

    if (original.width > 500) {
      div.style.gridColumn = 'span 2';
    }
    if (original.height > 300) {
      div.style.gridRow = 'span 2';
    }
    element.append(div);
  });
}
