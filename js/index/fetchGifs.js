function showTrendingGif(array) {
  let trendingDiv = document.querySelector('.tendencias-grid');
  array.forEach(gif => {
    let img = document.createElement('img');
    img.setAttribute('src', gif.images.fixed_height.url);
    trendingDiv.append(img);
  });
}
function fetchTrendingGifs() {
  fetch(`${URL_TRENDING}${API_KEY}&limit=10`)
    .then(response => response.json())
    .then(data => showTrendingGif(data.data))
    .catch(err => console.log(err));
}
