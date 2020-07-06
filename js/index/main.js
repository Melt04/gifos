// Agregar los events para cambiar los theme

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
inputSearch.addEventListener('keyup', enabledSearch);
buttonSearch.addEventListener('click', fetchGifs);

fetchTrendingGifs();
enabledSearch();
