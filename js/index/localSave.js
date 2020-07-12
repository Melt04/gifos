function saveSearchLocalStorate(value) {
  let history = JSON.parse(localStorage.getItem(SEARCH_HISTORY)) || [];
  history.unshift(value);
  localStorage.setItem(SEARCH_HISTORY, JSON.stringify(history));
}
function getSearchHistory() {
  searchHistory.innerHTML = '';
  let searchItem = JSON.parse(localStorage.getItem(SEARCH_HISTORY));
  searchItem.map(search => '#' + search).forEach(value => {
    let span = document.createElement('span');
    span.setAttribute('data-search', value.slice(1));
    addOnClickSpan(span);
    span.innerText = value;
    let theme = localStorage.getItem(THEME);
    if (theme) {
      span.classList.add('darkSpan');
    }
    searchHistory.append(span);
  });
}
