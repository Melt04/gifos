// Agregar los events para cambiar los theme

let bCreateGifos = document.querySelector('#createGifos');

// Event listener para los botones
window.addEventListener('load', () => {
  let theme = localStorage.getItem('theme');
  if (theme) {
    bDarkTheme.click();
  } else {
    bLightTheme.click();
  }
});
bLightTheme.addEventListener('click', changeTheme);
bDarkTheme.addEventListener('click', changeTheme);

inputSearch.addEventListener('keyup', onSearch);

buttonSearch.addEventListener('click', () =>
  fetchSearchGifs(inputSearch.value, true)
);

window.addEventListener('load', getSearchHistory);
window.addEventListener('load', fetchTrendingGifs);
window.addEventListener('load', saveThemeOnRefresh);

bCreateGifos.addEventListener(
  'click',
  () => (window.location = './crearGif.html')
);

fetchRandomGifs();
onSearch();
